import * as express from 'express'; 
import * as http from "http";
import * as serveStatic from "serve-static";
import * as path from "path";
import * as socketIo from "socket.io";

declare var process, __dirname;

var Q          = require("q");
var mysql      = require('mysql');
var useragent  = require('useragent');
var cookieParser = require('cookie-parser');
//[useragent] If you want to use automatic updating, please add:
//[useragent]   - request (npm install request --save)
//[useragent]   - yamlparser (npm install yamlparser --save)
//[useragent] To your own package.json

//var pool = mysql.createPool({
//    connectionLimit: 10, //important
//    host     : '14.63.213.246',
//    user     : 'smarttest',
//    password : 'test1234',
//    port     : 10003,
//    database : 'SMART_MESSAGE_VERTWO',
//    debug: false
//});

var pool = mysql.createPool({
    connectionLimit: 2, //important
    host     : '172.27.0.214',
    user     : 'smarttest',
    password : 'test1234',
    port     : 3306,
    database : 'SMART_MESSAGE_VERTWO',
    debug: false
});
var bodyParser = require('body-parser');

var auth_html = '<!DOCTYPE html>' +
'<html lang="ko">' +
'<head>' +
'    <meta charset="utf-8">' +
'    <meta http-equiv="X-UA-Compatible" content="IE=Edge">' +
'    <title>스마트메시징</title>' +
'    <style>' +
'        .loginbox { position: absolute; top: 200px; left: 50%; margin-left: -85px; }' +
'    </style>' +
'</head>' +
'<body>' +
'<div class="loginbox">' +
'    <form action="http://14.63.213.246:2582/auth/" method="post">' +
'        <h1>스마트메시징</h1>' +
'        <p>생년월일 (ex: 19801230)</p>' +
'        <div class="formbox">' +
'            <input type="number" id="inputBth" name="inputBth" maxlength="8" class="input_txt" placeholder="생년월일 입력">' +
'            <button type="submit" class="btn btn_send">전송</button>' +
'        </div>' +
'    </form>' +
'</div>' +
'</body>' +
'</html>';

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
        this.shorturl_app.use(cookieParser());
        
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
//console.log('request:' + JSON.stringify(request.query));
            var long_url = request.query.long_url;
            var re;
            var agent = useragent.parse(request.headers['user-agent']);
            var agent_os = agent.os.toString();
            var agent_device = agent.device.toString();

            if ( long_url != null && long_url != '') {
                try {
                    this.getShortURL(long_url, agent_os, agent_device, function(err, data) {
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

        this.shorturl_app.get('/errorpage', (request: express.Request, result: express.Response, next: express.NextFunction) => {
            var long_url = request.query.long_url;
            var short_url = request.query.short_url;
            var re;
            var agent = useragent.parse(request.headers['user-agent']);
            var agent_os = agent.os.toString();
            var agent_device = agent.device.toString();

            result.status(200).send("sorry!!!!");
        });

        this.shorturl_app.post('/auth', (request: express.Request, result: express.Response, next: express.NextFunction) => {
            var inputBth = request.body.inputBth;
            var short_url = request.cookies.short_url;
console.log('request:' + JSON.stringify(request.body));            
console.log('Cookies: ', request.cookies);
console.log("inputBth:" + inputBth);
console.log("short_url:" + short_url);
            // result.setHeader("Content-Type", "text/html");
            // result.send(auth_html);
            // result.end();
            // result.status(200).send();
            var bRedirect = false;
            var long_url = '';
            var call_cnt = '';
            var write_date = '';
            var link_auth = ''; // TB_SHORTURL.LINK_AUTH : 인증 정보(ex:생년월일)
            var link_limit = ''; // TB_SHORTURL.LINK_LIMIT : 발송 기준 접근 기한(ex:5[days])
            var link_cnt = ''; // TB_SHORTURL.LINK_CNT :  접근제한 수(ex:1, 0인 경우 무제한)
            var now_date = new Date();
            if ( short_url != null && short_url.length > 0 && short_url != "favicon.ico" ) {
                //Q.all([this.dbGetLongUrl(short_url)]).then(function(results) {
                Q.all([this.dbGetRow(short_url)]).then(function(results) {
                    if(results[0][0][0] != null) {
                        long_url = results[0][0][0].LONG_URL;
                        call_cnt = results[0][0][0].CALL_CNT;
                        write_date = results[0][0][0].WRTDATE;
                        link_auth = results[0][0][0].LINK_AUTH;
                        link_limit = results[0][0][0].LINK_LIMIT;
                        link_cnt = results[0][0][0].LINK_CNT;
                    }
                }).then(function() {
                    if(link_cnt != '0' && link_cnt < call_cnt) 
                        bRedirect = true;
                    else bRedirect = false;
                }).then(function() {
                    var old_date = new Date(write_date);
                    var limit_date = new Date(old_date.getFullYear(),old_date.getMonth(),old_date.getDate() + Number(link_limit));

                    if(write_date != null && limit_date.valueOf() > now_date.valueOf() ) 
                        bRedirect = true;
                    else bRedirect = false;
                }).then(function() {
                    if(link_auth != null && link_auth.length > 0 && link_auth == inputBth ) {
                        console.log("Redirect URL:" + long_url);
                        if(bRedirect == true) {
                            result.redirect(long_url);
                            pool.query('UPDATE TB_SHORTURL SET CALL_CNT = CALL_CNT + 1 WHERE SHORT_URL = ? AND ETC1 is null', short_url);
                        }
                        else {
                            result.redirect("http://14.63.213.246:2582/errorpage");
                        }
                        result.end();
                    }
                    // res.send("{type: '" + long_url + "'}");
                })
                .done();
            } else {
                result.redirect("http://14.63.213.246:2582/errorpage");
            }
        });

        this.shorturl_app.get('*', (request: express.Request, result: express.Response, next: express.NextFunction) =>  {

            var short_url = request.url.substring(1);
            var bRedirect = false;
            var long_url = '';
            var call_cnt = '';
            var write_date = '';
            var link_auth = ''; // TB_SHORTURL.LINK_AUTH : 인증 정보(ex:생년월일)
            var link_limit = ''; // TB_SHORTURL.LINK_LIMIT : 발송 기준 접근 기한(ex:5[days])
            var link_cnt = ''; // TB_SHORTURL.LINK_CNT :  접근제한 수(ex:1, 0인 경우 무제한)
            var now_date = new Date();

            if ( short_url != null && short_url.length > 0 && short_url != "favicon.ico" ) {
                //Q.all([this.dbGetLongUrl(short_url)]).then(function(results) {
                Q.all([this.dbGetRow(short_url)]).then(function(results) {
                    if(results[0][0][0] != null) {
                        long_url = results[0][0][0].LONG_URL;
                        call_cnt = results[0][0][0].CALL_CNT;
                        write_date = results[0][0][0].WRTDATE;
                        link_auth = results[0][0][0].LINK_AUTH;
                        link_limit = results[0][0][0].LINK_LIMIT;
                        link_cnt = results[0][0][0].LINK_CNT;
                    }
                }).then(function() {
                    if(link_cnt != '0' && link_cnt < call_cnt) 
                        bRedirect = true;
                    else bRedirect = false;
                }).then(function() {
                    var old_date = new Date(write_date);
                    var limit_date = new Date(old_date.getFullYear(),old_date.getMonth(),old_date.getDate() + Number(link_limit));

                    if(write_date != null && limit_date.valueOf() > now_date.valueOf() ) 
                        bRedirect = true;
                    else bRedirect = false;
                }).then(function() {
                    if(link_auth != null && link_auth.length > 0 ) {
                        //result.redirect("http://14.63.213.246:2582/auth?short_url=" + short_url);
                        result.header("Access-Control-Allow-Origin", "*"); 
                        result.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); 
                        result.setHeader("Content-Type", "text/html");
                        result.cookie('short_url', short_url, { maxAge: 30000 });
                        result.send(auth_html);
                        //result.send("<HTML><body><H1>a</H1></body></HTML>");
                        result.end();
                    }
                    else {
                        console.log("Redirect URL:" + long_url);
                        if(bRedirect == true) {
                            result.redirect(long_url);
                            pool.query('UPDATE TB_SHORTURL SET CALL_CNT = CALL_CNT + 1 WHERE SHORT_URL = ? AND ETC1 is null', short_url);
                        }
                        else {
                            result.redirect("http://14.63.213.246:2582/errorpage");
                        }
                        result.end();
                    }
                    // res.send("{type: '" + long_url + "'}");
                })
                .done();
            } else {
                result.send("{type: 'Not Found Url'}");
            }

        });
    }

    private getShortURL(long_url: string, agent_os: string, agent_device: string, callback: any): void {
        var re;
        var rtnStr;
        var systemCallRtn;
        var beforeContent;
        if (re == null) {
            Q.all([this.dbGetSeq(long_url, agent_os, agent_device)]).then(function(results){
                // console.log("result[0]:" + JSON.stringify(results[0][0][0])); 
                // console.log("result[1]:" + JSON.stringify(results[1][0][0]));
                // Hint : your third query would go here
                rtnStr = results[0][0][0].SEQ;
            }).then(function() {
                if (rtnStr != null && rtnStr != '') {
                    const spawn = require('child_process').spawn;
                    //const ls = spawn('/Users/gotaejong/projects/WorkspacesHTML5/tmsg-v3/shorturl', [rtnStr]);
                    const ls = spawn('/home/icr/tmsg-v3/shorturl', [rtnStr]);

                    ls.stdout.on('data', (data) => {
                        console.log(`stdout: ${data}`);
                        systemCallRtn = `${data}`;
                        if( systemCallRtn != null ) {
                            console.log("response in:" + JSON.stringify(systemCallRtn));
                            pool.query('UPDATE TB_SHORTURL set SHORT_URL = ? WHERE SEQ = ?  AND ETC1 is null', [systemCallRtn, rtnStr], function(err, rows, fields) {
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
            console.log('==> Listening on port %s. Open up http://14.63.213.246:%s/ in your browser.', this.shorturl_port, this.shorturl_port);            
        });
    }

    private dbGetSeq(long_url: string, agent_os: string, agent_device: string): void {
        var defered = Q.defer();
        pool.query('SELECT sp_insert_shorturl( ?, ?, ? ) AS SEQ ', [long_url, agent_os, agent_device], defered.makeNodeResolver());
        return defered.promise;
    }

    private dbGetLongUrl(short_url: string): void { // 추후에 수정 필요 
        var defered = Q.defer();
        pool.query('SELECT sp_select_longurl( ? ) AS LONG_URL ', [short_url], defered.makeNodeResolver());
        return defered.promise;
    }

    private dbGetRow(short_url: string): void {
        var defered = Q.defer();
        pool.query('SELECT * FROM TB_SHORTURL WHERE SHORT_URL = ? AND ETC1 is null', short_url, defered.makeNodeResolver());
        return defered.promise;
    }

    private dbUpdateCallCnt(short_url: string): void {
        var defered = Q.defer();
        pool.query('UPDATE TB_SHORTURL SET CALL_CNT = CALL_CNT + 1 WHERE SHORT_URL = ? AND ETC1 is null', short_url, defered.makeNodeResolver());
        return defered.promise;
    }
}

// Bootstrap the server
let shortUrl = ShorturlServer.bootstrap();
export = shortUrl.shorturl_app;
