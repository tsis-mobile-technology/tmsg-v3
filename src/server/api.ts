import * as express from 'express'; 
// import * as bodyParser from 'body-parser'; 
import * as http from "http";
import * as serveStatic from "serve-static";
import * as path from "path";
import * as socketIo from "socket.io";
import * as mongoose from "mongoose";

import { RoomSocket, UserSocket, KakaoSocket } from "./socket";

declare var process, __dirname;

var bodyParser = require('body-parser');

class ApiServer {
    public kakao_app: any;
    private kakao_server: any;
    private kakao_io: any;
    private mongo: any;
    private kakao_root: string;
    private kakao_port: number;

    // Bootstrap the application.
    public static bootstrap(): ApiServer {
        console.log("ApiServer bootstrap");
        return new ApiServer();
    }

    constructor() {
        console.log("Server constructor");
        // Create expressjs application
        this.kakao_app = express();

        // Configure application
        this.kakaoConfig();

        // Setup routes
        this.kakaoRoutes();

        // Create server
        this.kakao_server = http.createServer(this.kakao_app);

        // Create database connections
        //this.databases();

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
            console.log("keyboard");
            var re;
            try {
            re = {type:'text'};
            } catch (exception) {
            alert('키보드 에러');
            } finally {
            //re.data = result;
            result.status(200).send(re);
            }
        });

        // 응답
        this.kakao_app.post('/message', (request: express.Request, result: express.Response, next: express.NextFunction) => {
            console.log("kakao message" + JSON.stringify(request.body));

            var user_key = request.body.user_key;
            var type = request.body.type;
            var content = request.body.content;
            var re;
            console.log("req : " + content);
            this.kakao_io.emit('chat message', content);
            try {
                if (content == '주소') {
                    re = {text:'서울특별시 중구 칠패로 42 우리빌딩 5층'};
                    re = {message:re};
                    result.status(200).send(re);
                } else if (content == '전화번호') {
                    re = {text:'070-8188-0500'};
                    re = {message:re};
                    result.status(200).send(re);
                } else if (content == 'testKey') {
                    re = {text:'응답 대기 10초 param : '+ user_key+"/"+type+"/"+content};
                    re = {message:re};
                    result.status(200).send(re);
                } else{
                    re = {text:'다른 질문을 하기거나 잠시만 기다려 주세요!.'+ user_key+"/"+type+"/"+content};
                    re = {message:re};
                    result.status(200).send(re);
                } 
            } catch (exception) {
                console.log('응답 에러');
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
                console.log('키보드 에러');
            } finally {
                result.status(200).send(re);
            }
        });

        // 친구 삭제
        this.kakao_app.delete('/friend/:user_key', (request: express.Request, result: express.Response, next: express.NextFunction) => {
            console.log('friend del');
            console.log('user key : ' + request.params.user_key);
            var user_key = request.body.user_key;
            var re;
            try {
                re = {text:'param : ' + user_key};
            } catch (exception) {
                console.log('키보드 에러');
            } finally {
                result.status(200).send(re);
            }
        });

        // 채팅방 삭제
        this.kakao_app.delete('/chat_room/:user_key', (request: express.Request, result: express.Response, next: express.NextFunction) => {
            console.log('chat_room del');
            console.log('user key : '+request.params.user_key);
            var user_key = request.body.user_key;
            var re;
            try {
                re = {text:'param : ' + user_key};
            } catch (exception) {
                console.log('키보드 에러');
            } finally {
                result.status(200).send(re);
            }
        });
    }

    // Configure databases
    private databases(): void {
        console.log("Server database");
        // MongoDB URL
        let mongoDBUrl = process.env.MONGODB_URI || 'mongodb://localhost/chat';

        // Get MongoDB handle
        this.mongo = mongoose.connect(mongoDBUrl);
    }
    
    // Configure sockets
    private kakaoSockets(): void {
        console.log("Server kakaoSockets");
        // Get socket.io handle
        this.kakao_io = socketIo(this.kakao_server);

        let kakaoSocket = new KakaoSocket(this.kakao_io);
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
}

// Bootstrap the server
let api = ApiServer.bootstrap();
export = api.kakao_app;