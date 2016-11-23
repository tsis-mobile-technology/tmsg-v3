import * as express from "express";
import * as http from "http";
import * as serveStatic from "serve-static";
import * as path from "path";
import * as socketIo from "socket.io";
import * as mongoose from "mongoose";

import { RoomSocket } from "./socket";

declare var process, __dirname;

class Server {
    public app: any;
    private server: any;
    private io: any;
    private mongo: any;
    private root: string;
    private port: number;

    // Bootstrap the application.
    public static bootstrap(): Server {
        console.log("Server bootstrap");
        return new Server();
    }

    constructor() {
        console.log("Server constructor");
        // Create expressjs application
        this.app = express();

        // Configure application
        this.config();

        // Setup routes
        this.routes();

        // Create server
        this.server = http.createServer(this.app);

        // Create database connections
        this.databases();

        // Handle websockets
        this.sockets();

        // Start listening
        this.listen();
    }

    // Configuration
    private config(): void {
        console.log("Server config");
        // By default the port should be 5000
        this.port = process.env.PORT || 5000;

        // root path is under ../../target
        this.root = path.join(path.resolve(__dirname, '../../target'));

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
}

// Bootstrap the server
let server = Server.bootstrap();
export = server.app;