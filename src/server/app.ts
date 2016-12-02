import * as express from "express";
import * as http from "http";
import * as serveStatic from "serve-static";
import * as path from "path";
import * as socketIo from "socket.io";
import * as mongoose from "mongoose";

import { RoomSocket, UserSocket, KakaoSocket } from "./socket";

declare var process, __dirname;

class Server {
    public app: any;
    public kakao_app: any;
    private server: any;
    private kakao_server: any;
    private io: any;
    private kakao_io: any;
    private mongo: any;
    private root: string;
    private kakao_root: string;
    private port: number;
    private kakao_port: number;

    // Bootstrap the application.
    public static bootstrap(): Server {
        console.log("Server bootstrap");
        return new Server();
    }

    constructor() {
        console.log("Server constructor");
        // Create expressjs application
        this.app = express();
        this.kakao_app = express();

        // Configure application
        this.config();
        this.kakaoConfig();

        // Setup routes
        this.routes();
        this.kakaoRoutes();

        // Create server
        this.server = http.createServer(this.app);
        this.kakao_server = http.createServer(this.kakao_app);

        // Create database connections
        this.databases();

        // Handle websockets
        this.sockets();
        this.kakaoSockets();

        // Start listening
        this.listen();
        this.kakaoListen();
    }

    // Configuration
    private config(): void {
        console.log("Server config");
        // By default the port should be 5000
        this.port = process.env.PORT || 3000;

        // root path is under ../../target
        this.root = path.join(path.resolve(__dirname, '../../target'));

    }

    // Configuration
    private kakaoConfig(): void {
        console.log("Server config");
        // By default the port should be 5000
        this.kakao_port = process.env.PORT || 5000;

        // root path is under ../../target
        this.kakao_root = path.join(path.resolve(__dirname, '../../target'));

    }

    // Configure routes
    private routes(): void {
        console.log("Server routes");
        let router: express.Router;
        router = express.Router();

        // Static assets
        this.app.use('/assets', serveStatic(path.resolve(this.root, 'assets')));

        // Set router to serve index.html (e.g. single page app)
        // counseolor in
        router.get('/', (request: express.Request, result: express.Response) => {
            result.sendFile(path.join(this.root, '/index.html'));
        });

        // Set app to use router as the default route
        // counselor
        this.app.use('*', router);
    }

    // Configure routes
    private kakaoRoutes(): void {
        console.log("Server routes");
        let router: express.Router;
        router = express.Router();

        // Static assets
        this.kakao_app.use('/assets', serveStatic(path.resolve(this.root, 'assets')));

        // Set router to serve index.html (e.g. single page app)
        // counseolor in
        router.get('/', (request: express.Request, result: express.Response) => {
            console.log("kakaoRoutes keyboard");
            //result.sendFile(path.join(this.root, '/chat.html'));
            let resultString: string = "<HTML><BODY>melong</BODY></HTML>";
            result.status(200).send(resultString);
        });

        // router.get('/keyboard', (request: express.Request, result: express.Response) => {
        //     console.log("kakaoRoutes keyboard");
        //     let re: any = {type:'text'};
        //     //re.data = result;
        //     result.status(200).send(re);

        // });

        // Set app to use router as the default route
        // counselor
        this.kakao_app.use('*', router);
        this.kakao_app.all('*', (request: express.Request, result: express.Response) => {
            result.setHeader("Content-Type", "application/json");
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
    private sockets(): void {
        console.log("Server sockets");
        // Get socket.io handle
        this.io = socketIo(this.server);
        let roomSocket = new RoomSocket(this.io);
        // add socket.io handle
        let userSocket = new UserSocket(this.io);
    }
    
    // Configure sockets
    private kakaoSockets(): void {
        console.log("Server kakaoSockets");
        // Get socket.io handle
        this.kakao_io = socketIo(this.kakao_server);
        let kakaoSocket = new KakaoSocket(this.kakao_io);
   }

    // Start HTTP server listening
    private listen(): void {
        console.log("Server listen");
        //listen on provided ports
        this.server.listen(this.port);

        //add error handler
        this.server.on("error", error => {
            console.log("ERROR", error);
        });

        //start listening on port
        this.server.on("listening", () => {
            console.log('==> Listening on port %s. Open up http://localhost:%s/ in your browser.', this.port, this.port);            
        });

    }

    // Start HTTP server listening
    private kakaoListen(): void {
        console.log("Server listen");
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
let server = Server.bootstrap();
export = server.app;