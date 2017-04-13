import * as express from 'express'; 
import * as http from "http";
import * as serveStatic from "serve-static";
import * as path from "path";
import * as socketIo from "socket.io";

declare var process, __dirname;

var Q          = require("q");
var mysql      = require('mysql');
var useragent  = require('useragent');
//[useragent] If you want to use automatic updating, please add:
//[useragent]   - request (npm install request --save)
//[useragent]   - yamlparser (npm install yamlparser --save)
//[useragent] To your own package.json

var pool = mysql.createPool({
    connectionLimit: 10, //important
    host     : '14.63.213.246',
    user     : 'smarttest',
    password : 'test1234',
    port     : 10003,
    database : 'smart_message_client',
    debug: false
});

var bodyParser = require('body-parser');

class ShorturlServer {
    public shorturl_app: any;
    private shorturl_server: any;
    private shorturl_io: any;
    private shorturl_root: string;
    private shorturl_port: number;

    // Bootstrap the application.
    public static bootstrap(): ShorturlServer {
        console.log("ApiServer bootstrap");
        useragent(true);
        return new ShorturlServer();
    }

    constructor() {
        console.log("Server constructor");
        // Create expressjs application
        this.shorturl_app = express();

        // Configure application
        this.shorturlConfig();

        // Setup routes
        this.shorturlRoutes();

        // Create server
        this.shorturl_server = http.createServer(this.shorturl_app);

        // Create database connections
        //this.databases();

        // Handle websockets
        this.shorturlSockets();

        // Start listening
        this.shorturlListen();
    }

    // Configuration
    private shorturlConfig(): void {
        console.log("Server config");
        // By default the port should be 5000
        this.shorturl_port = process.env.PORT || 2582;

        // root path is under ../../target
        this.shorturl_root = path.join(path.resolve(__dirname, '../../target'));

    }

    // Configure routes
    private shorturlRoutes(): void {
        console.log("Server shorturlRoutes");
        
        this.shorturl_app.use((request: express.Request, result: express.Response, next: express.NextFunction) => {
            result.header("Access-Control-Allow-Origin", "*");
            result.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });

        this.shorturl_app.use(bodyParser.json());
        this.shorturl_app.use(bodyParser.urlencoded({extended:true}));
        
        this.shorturl_app.get( '/', function(req, res) {
            var agent = useragent.parse(req.headers['user-agent'])
            , another = useragent.fromJSON(JSON.stringify(agent));
 
            console.log("init:" + agent.toString());
            console.log("os:" + agent.os.toString());
            console.log("device:" + agent.device.toString());

            res.status(200).send(agent + "/" + another);
            //res.send("{type: 'text'}");
        });

        this.shorturl_app.all('*', function(req, res, next) {
            res.setHeader("Content-Type", "application/json");
            next();
        });

        // Short URL 생성
        this.shorturl_app.get('/create', (request: express.Request, result: express.Response, next: express.NextFunction) => {
            var long_url = request.query.long_url;
            var re;

            if ( long_url != null && long_url == '') {
                try {
                    this.getShortURL(long_url,  function(err, data) {
                        if(err) {
                            console.log('응답 에러');
                        } else {
                            // re = "{data:" + data.shorturl + "}";
                            re = data.shorturl;
                            console.log("response:" + JSON.stringify(re));
                            result.status(200).send(re);
                        }
                    });
                } catch (exception) {
                    console.log('응답 에러');
                }
            } else {
                result.status(200).send("{data:'long_url is null'}");
            }
        });

        this.shorturl_app.get('*', (request: express.Request, result: express.Response, next: express.NextFunction) =>  {

            var short_url = request.url.substring(1);
            var long_url = '';
            console.log(">" + short_url + "<");
            if ( short_url != null && short_url.length > 0 && short_url != "favicon.ico" ) {
                Q.all([this.dbGetLongUrl(short_url)]).then(function(results) {
                    long_url = results[0][0][0].LONG_URL;
                }).then(function() {
                    console.log("Redirect URL:" + long_url);
                    result.redirect(long_url);
                    result.end();
                    // res.send("{type: '" + long_url + "'}");
                })
                .done();
            } else {
                result.send("{type: 'Not Found Url'}");
            }

        });
    }

    private getShortURL(long_url: string, callback: any): void {
        var re;
        var rtnStr;
        var systemCallRtn;
        var beforeContent;
        if (re == null) {
            Q.all([this.dbGetSeq(long_url)]).then(function(results){
                // console.log("result[0]:" + JSON.stringify(results[0][0][0])); 
                // console.log("result[1]:" + JSON.stringify(results[1][0][0]));
                // Hint : your third query would go here
                rtnStr = results[0][0][0].SEQ;
            }).then(function() {
                if (rtnStr != null && rtnStr != '') {
                    const spawn = require('child_process').spawn;
                    const ls = spawn('/Users/gotaejong/projects/WorkspacesHTML5/tmsg-v3/shorturl', [rtnStr]);

                    ls.stdout.on('data', (data) => {
                        console.log(`stdout: ${data}`);
                        systemCallRtn = `${data}`;
                        if( systemCallRtn != null ) {
                            console.log("response in:" + JSON.stringify(systemCallRtn));
                            pool.query('UPDATE TB_SHORTURL set SHORT_URL = ? WHERE SEQ = ? ', [systemCallRtn, rtnStr], function(err, rows, fields) {
                                console.log("rtnStr in:" + rtnStr);
                                if(err) console.log("Query Error:", err);
                            });
                            var rtnData = {"shorturl":systemCallRtn,"seq": rtnStr};
                            callback(null, rtnData);
                        }
                    });

                    ls.stderr.on('data', (data) => {
                      console.log(`stderr: ${data}`);
                    });

                    ls.on('close', (code) => {
                      console.log(`child process exited with code ${code}`);
                    });
                }
            })
            .done();
        } else {
            callback(null, systemCallRtn);
        }
    }
    
    // Configure sockets
    private shorturlSockets(): void {
        console.log("Server kakaoSockets");
        // Get socket.io handle
        this.shorturl_io = socketIo(this.shorturl_server);

        // let kakaoSocket = new KakaoSocket(this.kakao_io);
   }

    // Start HTTP server listening
    private shorturlListen(): void {
        console.log("Server kakaoListen");
        //listen on provided ports
        this.shorturl_server.listen(this.shorturl_port);

        //add error handler
        this.shorturl_server.on("error", error => {
            console.log("ERROR", error);
        });

        //start listening on port
        this.shorturl_server.on("listening", () => {
            console.log('==> Listening on port %s. Open up http://localhost:%s/ in your browser.', this.shorturl_port, this.shorturl_port);            
        });
    }

    private dbGetSeq(long_url: string): void {
        var defered = Q.defer();
        pool.query('SELECT sp_insert_shorturl( ? ) AS SEQ ', [long_url], defered.makeNodeResolver());
        return defered.promise;
    }

    private dbGetLongUrl(short_url: string): void {
        var defered = Q.defer();
        pool.query('SELECT sp_select_longurl( ? ) AS LONG_URL ', [short_url], defered.makeNodeResolver());
        return defered.promise;
    }
}

// Bootstrap the server
let shortUrl = ShorturlServer.bootstrap();
export = shortUrl.shorturl_app;
