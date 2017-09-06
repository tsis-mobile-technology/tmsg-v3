import * as express from 'express'; 
import * as http from "http";
import * as serveStatic from "serve-static";
import * as path from "path";
import * as socketIo from "socket.io";

import { KakaoSocket, KakaoDb } from "./socket";

// var Q = require('q');
// var mysql  = require('mysql');
// var net    = require('net');
// var fastXmlParser = require('fast-xml-parser');
// var validator     = require('validator');
// var spawn         = require('child_process').spawn;
var bodyParser    = require('body-parser');

declare var process, __dirname;

class ApiServer {
    public kakao_app: any;
    private kakao_server: any;
    private kakao_io: any;
    private mongo: any;
    private kakao_root: string;
    private kakao_port: number;
    private kakaoDb: any;
    public kakaoSocket: any;

    // Bootstrap the application.
    public static bootstrap(): ApiServer {
        console.log("ApiServer bootstrap");
        return new ApiServer();
    }

    constructor() {
        console.log("Server constructor");
        // Create expressjs application
        this.kakaoDb = new KakaoDb();
        this.kakaoSocket = new KakaoSocket(null, null);
        this.kakao_app = express();

        // Configure application
        this.kakaoConfig();

        // Setup routes
        this.kakaoRoutes();

        // Create server
        this.kakao_server = http.createServer(this.kakao_app);

        // Create database connections
        this.kakaoInitial();

        // Handle websockets
        this.kakaoSockets();

        // Start listening
        this.kakaoListen();
    }

    // Configuration
    private kakaoConfig(): void {
        console.log("Server config");
        // By default the port should be 5000
        this.kakao_port = process.env.PORT || 2580;

        // root path is under ../../target
        this.kakao_root = path.join(path.resolve(__dirname, '../../target'));
    }

    // Configure routes
    private kakaoRoutes(): void {
        console.log("Server kakaoRoutes");
        
        this.kakao_app.use((request: express.Request, result: express.Response, next: express.NextFunction) => {
            result.header("Access-Control-Allow-Origin", "*");
            result.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });

        this.kakao_app.use(bodyParser.json());
        this.kakao_app.use(bodyParser.urlencoded({extended:true}));
        
        this.kakao_app.get( '/', function(req, res) {
            res.send("{type: 'text'}");
        });

        this.kakao_app.all('*', function(req, res, next) {
            res.setHeader("Content-Type", "application/json");
            next();
        });

        // 키보드
        this.kakao_app.get('/keyboard', (request: express.Request, result: express.Response, next: express.NextFunction) => {
            var re;
            var content = "keyboard";
            try {
                this.kakaoSocket.getKeyboardResponse(content, function(err, data) {
                    if(err) {
                        console.log('keyboard:응답 에러');
                    } else {
                        re = data;
                        result.status(200).send(re);
                        console.log('keyboard:응답 성공');
                    }
                });
            } catch (exception) {
                console.log('keyboard:응답 에러:'+ exception);
            }

        });

        // 응답
        this.kakao_app.post('/message', (request: express.Request, result: express.Response, next: express.NextFunction) => {
            console.log("kakao message" + JSON.stringify(request.body));
            var user_key = request.body.user_key;
            var type = request.body.type;
            var content = request.body.content;
            var re;
            this.kakao_io.emit('chat message', content);
            try {
                this.kakaoSocket.getMessageResponseNew(content, user_key, type, function(err, data) {
                    if(err) {
                        // console.log('message:응답 에러:'+err);
                        re = data;
                        result.status(200).send(re);
                    } else {
                        re = data;
                        // console.log("response:" + JSON.stringify(re));
                        result.status(200).send(re);
                        console.log('message:응답 성공');
                    }
                });
            } catch (exception) {
                console.log('message:응답 에러');
            }
        });

        // 친구 추가
        this.kakao_app.post('/friend', (request: express.Request, result: express.Response, next: express.NextFunction) => {
            console.log('friend add');
            console.log('user key : '+request.body.user_key);
            var user_key = request.body.user_key;
            var re;
            try {
                re = {text:'param : ' + user_key};
            } catch (exception) {
                console.log('friend:응답 에러');
            } finally {
                result.status(200).send(re);
                console.log('friend:응답 성공');
            }
        });

        // 친구 삭제
        this.kakao_app.delete('/friend/:user_key', (request: express.Request, result: express.Response, next: express.NextFunction) => {
            console.log('friend del');
            console.log('user key : ' + request.params.user_key);
            var user_key = request.params.user_key;
            var re;
            try {
                // this.kakaoDb.dbClearCustomer(user_key);
                
                this.kakaoSocket.clearCustomer(user_key, function(err, data) {
                    if(err) {
                        // console.log('message:응답 에러:'+err);
                        re = {text:'failure'};
                        result.status(200).send(re);
                    } else {
                        re = {text:'success'};
                        result.status(200).send(re);
                        console.log('friend:응답 성공');
                    }
                });
                // re = {text:'param : ' + user_key};
            } catch (exception) {
                console.log('friend del:응답 에러');
            } finally {
                // re = {text:'success'};
                // result.status(200).send(re);
                console.log('friend del:응답 성공');
            }
        });

        // 채팅방 삭제
        this.kakao_app.delete('/chat_room/:user_key', (request: express.Request, result: express.Response, next: express.NextFunction) => {
            console.log('chat_room del');
            console.log('user key : '+request.params.user_key);
            var user_key = request.body.user_key;
            var re;
            try {
                re = {text:'param>' + user_key};
            } catch (exception) {
                console.log('chat_room del:응답 에러');
            } finally {
                result.status(200).send(re);
                console.log('chat_room del:응답 성공');
            }
        });
    }

    private kakaoSockets(): void {
        console.log("Server kakaoSockets");
        // Get socket.io handle
        this.kakao_io = socketIo(this.kakao_server);

        // let kakaoSocket = new KakaoSocket(this.kakao_io);
   }

    // Start HTTP server listening
    private kakaoListen(): void {
        console.log("Server kakaoListen");
        //listen on provided ports
        this.kakao_server.listen(this.kakao_port);

        //add error handler
        this.kakao_server.on("error", error => {
            console.log("ERROR", error);
        });

        //start listening on port
        this.kakao_server.on("listening", () => {
            console.log('==> Listening on port %s. Open up http://localhost:%s/ in your browser.', this.kakao_port, this.kakao_port);            
        });
    }

    // Database initail 
    private kakaoInitial(): void {
        var Q = require('q');
        var GKakaoSocket = this.kakaoSocket;
        var GKakaoDb = this.kakaoDb;
        Q.all([this.kakaoDb.dbSelectScenarioSystem("system")]).then(function(results) {
            GKakaoSocket.setSystemScenario(results[0][0]);
            GKakaoSocket.setKakaoDb(GKakaoDb);
        }).done();
    }
}

// Bootstrap the server
let api = ApiServer.bootstrap();
export = api.kakao_app;
