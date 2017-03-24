import * as express from 'express'; 
// import * as bodyParser from 'body-parser'; 
import * as http from "http";
import * as serveStatic from "serve-static";
import * as path from "path";
import * as socketIo from "socket.io";
import * as mongoose from "mongoose";

import { RoomSocket, UserSocket, KakaoSocket } from "./socket";

declare var process, __dirname;

var Q          = require("q");
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '14.63.213.246',
  user     : 'smarttest',
  password : 'test1234',
  port     : 10003,
  database : 'smart_message_client'
});

var pool = mysql.createPool({
    connectionLimit: 100, //important
    host     : '14.63.213.246',
    user     : 'smarttest',
    password : 'test1234',
    port     : 10003,
    database : 'smart_message_client',
    debug: false
});

var bodyParser = require('body-parser');
var depth_First = {"type": "buttons", "buttons": ["자주하는 질문", "주문 조회/변경", "문의하기"]};
 var depth_First_First = { 
                        "message": 
                            {"text": "다른 고객님들이 궁금해 하시는 내용입니다.궁금하신 내용을 선택해주세요!"},
                        "keyboard": 
                            {"type":"buttons", "buttons": ["콜센터 전화번호", "배송기간", "취소하기"]}
                        };
 var depth_First_First_First = { 
                        "message": 
                            {
                                "text": "콜센터 전화번호는 1234-1234입니다.\n 처음으로 돌아가시려면 '#'을 입력하세요.",
                                "message_button": {
                                    "label": "홈페이지 방문",
                                    "url": "https://www.shoppingntmall.com/index"
                                }
                            },
                        "keyboard": 
                            {"type":"text"}
                        };
 var depth_First_First_Second = { 
                        "message": 
                            {
                                "text": "상품에 따라 배송기간의 차이가 있습니다. 예상 배송일자가 궁금하시면 콜센터(1234-1234)로 전화주세요!\n 처음으로 돌아가시려면 '#'을 입력하세요.",
                                "message_button": {
                                    "label": "홈페이지 방문",
                                    "url": "https://www.shoppingntmall.com/index"
                                }
                            },
                        "keyboard": 
                            {"type":"text"}
                        };
 var depth_First_Second_Name = { 
                        "message": 
                            {"text": "고객님의 성함을 입력해 주세요.\n 취소하시려면 '#'을 입력해 주세요."},
                        "keyboard": 
                            {"type":"text"}
                        };
 var depth_First_Second_Phone = { 
                        "message": 
                            {"text": "주문하신 고객님의 핸드폰번호를 '-'없이 숫자만 입력해 주세요.\n 취소하시려면 '#'을 입력해 주세요."},
                        "keyboard": 
                            {"type":"text"}
                        };
 var depth_First_Second_Auth = { 
                        "message": 
                            {"text": "입력하신 전화번호로 인증번호를 문자로 보냈습니다.인증번호 6자리를 입력해 주세요.\n 취소하시려면 '#'을 입력해 주세요."},
                        "keyboard": 
                            {"type":"text"}
                        };
 var depth_First_Second = { 
                        "message": 
                            {"text": "아래 내용 중 선택해 주세요!"},
                        "keyboard": 
                            {"type":"buttons", "buttons": ["주문 조회", "배송지 변경", "주문 취소", "반품 문의", "취소하기"]}
                        };
 var depth_First_Second_First_Response = {
                        "message": 
                            {"text": "최근 3개월 내 고객님의 주문 내역이 없습니다.\n 취소하시려면 '#'을 입력해 주세요."},
                        "keyboard": 
                            {"type":"text"}
                        };
 var depth_First_Second_Second_Response = {
                        "message": 
                            {"text": "배송지 변경 가능한 주문내역이 없습니다.\n 취소하시려면 '#'을 입력해 주세요."},
                        "keyboard": 
                            {"type":"text"}
                        };
 var depth_First_Second_Third_Response = {
                        "message": 
                            {"text": "주문 취소 가능한 내역이 없습니.\n 취소하시려면 '#'을 입력해 주세요."},
                        "keyboard": 
                            {"type":"text"}
                        };
// var depth_First_Second_Second = { 
//                         "message": 
//                             {
//                                 "text": "준비 중인 서비스 입니다.",
//                                 "message_button": {
//                                     "label": "홈페이지 방문",
//                                     "url": "https://www.shoppingntmall.com/index"
//                                 }
//                             },
//                         "keyboard": 
//                             {"type":"buttons", "buttons": ["주문 조회/변경"]}
//                         };
// var depth_First_Second_Third = { 
//                         "message": 
//                             {
//                                 "text": "준비 중인 서비스 입니다.",
//                                 "message_button": {
//                                     "label": "홈페이지 방문",
//                                     "url": "https://www.shoppingntmall.com/index"
//                                 }
//                             },
//                         "keyboard": 
//                             {"type":"buttons", "buttons": ["주문 조회/변경"]}
//                         };
 var depth_First_Second_Fifth = { 
                        "message": 
                            {
                                "text": "주문 반품은 콜센터 1234-1234로 전화하셔서 신청가능합니다.",
                                "message_button": {
                                    "label": "홈페이지 방문",
                                    "url": "https://www.shoppingntmall.com/index"
                                }
                            },
                        "keyboard": 
                            {"type":"buttons", "buttons": ["주문 조회/변경"]}
                        };
 var depth_First_Third = { 
                        "message": 
                            {"text": "문의하실 내용을 선택해 주세요!"},
                        "keyboard": 
                            {"type":"buttons", "buttons": ["사진 첨부 후 문의하기", "문의사항만 입력", "취소하기"]}
                        };
 var depth_First_Third_First = { 
                        "message": 
                            {
                                "text": "입력창 왼쪽에 잇는 +버튼을 눌러 사진을 선택하신 후 전송 버튼을 눌러주세요.",
                                "message_button": {
                                    "label": "홈페이지 방문",
                                    "url": "https://www.shoppingntmall.com/index"
                                }
                            },
                        "keyboard": 
                            {"type":"text"}
                        };
 var depth_First_Third_Second = { 
                        "message": 
                            {
                                "text": "문의하실 내용을 모두 입력 후 전송 버튼을 눌러주세요.",
                                "message_button": {
                                    "label": "홈페이지 방문",
                                    "url": "https://www.shoppingntmall.com/index"
                                }
                            },
                        "keyboard": 
                            {"type":"text"}
                        };
 var depth_First_Third_Last_Response = {
                        "message": 
                            {"text": "문의가 정상적으로 접수되었습니다. 평일 9시~18시, 빠른 시간 안에 답변 드리겠습니다.\n 취소하시려면 '#'을 입력해 주세요."},
                        "keyboard": 
                            {"type":"text"}
                        };

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
            var re;
            try {
            	//re = {type:'text'};
            	//re = {type:"buttons", buttons: ["자동응답", "채팅상담"]};
                re = depth_First;
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
            this.kakao_io.emit('chat message', content);
            try {
                this.getMessageResponse(content, user_key, type, function(err, data) {
                    if(err) {
                        console.log('응답 에러');
                    } else {
                        re = data;
                        console.log("response:" + JSON.stringify(re));
                        result.status(200).send(re);
                    }
                });
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

    private getMessageResponse(content: string, user_key: string, type: string, callback: any): void {
        var re;
        var rtnStr;
        var updateType;
        var beforeContent;
        
        if (content == '자주하는 질문') {re = depth_First_First; this.dbSaveHistory(content, user_key, type);}
        else if (content == "콜센터 전화번호") {re = depth_First_First_First; this.dbSaveHistory(content, user_key, type);}
        else if (content == "배송기간") {re = depth_First_First_Second; this.dbSaveHistory(content, user_key, type);}

        /* 하위 메뉴에 대한 응답 처리 이전에 해당 아이디로 하여 성명, 전화번호, 인증 유무등을 체크하여 단계 진입을 선택해하여야 한다.*/
        if (content == '주문 조회/변경') {re = depth_First_Second; this.dbSaveHistory(content, user_key, type);}
        else if (content == "주문 조회") {re = depth_First_Second_Name; this.dbSaveHistory(content, user_key, type);}
        else if (content == "배송지 변경") {re = depth_First_Second_Name; this.dbSaveHistory(content, user_key, type);}
        else if (content == "주문 취소") {re = depth_First_Second_Name; this.dbSaveHistory(content, user_key, type);}
        else if (content == "반품 문의") {re = depth_First_Second_Fifth; this.dbSaveHistory(content, user_key, type);}

        if (content == '문의하기') {re = depth_First_Third; this.dbSaveHistory(content, user_key, type);}
        else if (content == "사진 첨부 후 문의하기") {re = depth_First_Third_First; this.dbSaveHistory(content, user_key, type);}
        else if (content == "문의사항만 입력") {re = depth_First_Third_Second; this.dbSaveHistory(content, user_key, type);}

        if (re == null) {
            Q.all([this.dbCheckHistory(content, user_key),this.dbLoadCustomer(user_key)]).then(function(results){
                // console.log("result[0]:" + JSON.stringify(results[0][0][0])); 
                // console.log("result[1]:" + JSON.stringify(results[1][0][0]));
                // Hint : your third query would go here
                beforeContent = results[0][0][0].MESSAGE;
                rtnStr = results[1][0][0];
            }).then(function() {
                if (beforeContent == "주문 조회") {
                    if (rtnStr == null) {
                        updateType = "Name";
                        re = depth_First_Second_Phone;
                    } else if(rtnStr.PHONE == null) {
                        updateType = "Phone";
                        re = depth_First_Second_Auth;
                        // 인증번호 보내기 기능 추가 
                    } else if(rtnStr.YN_AUTH == 'N') {
                        updateType = "Auth";
                        re = depth_First_Second_First_Response;
                    } else if(rtnStr.YN_AUTH == 'Y') {
                        re = depth_First_Second_First_Response;
                    }
                } else if (beforeContent == "배송지 변경") {
                    if (rtnStr == null) {
                        updateType = "Name";
                        re = depth_First_Second_Phone;
                    } else if(rtnStr.PHONE == null) {
                        updateType = "Phone";
                        re = depth_First_Second_Auth;
                        // 인증번호 보내기 기능 추가 
                    } else if(rtnStr.YN_AUTH == 'N') {
                        updateType = "Auth";
                        re = depth_First_Second_Second_Response;
                    } else if(rtnStr.YN_AUTH == 'Y') {
                        re = depth_First_Second_Second_Response;
                    }
                } else if (beforeContent == "주문 최소") {
                    if (rtnStr == null) {
                        updateType = "Name";
                        re = depth_First_Second_Phone;
                    } else if(rtnStr.PHONE == null) {
                        updateType = "Phone";
                        re = depth_First_Second_Auth;
                        // 인증번호 보내기 기능 추가 
                    } else if(rtnStr.YN_AUTH == 'N') {
                        updateType = "Auth";
                        re = depth_First_Second_Third_Response;
                    } else if(rtnStr.YN_AUTH == 'Y') {
                        re = depth_First_Second_Third_Response;
                    }
                } else if (beforeContent == "사진 첨부 후 문의하기") {
                    /*
                        등록한 사진을 어디론가 옮기고 이력저장하고 
                    */
                    re = depth_First_Third_Last_Response;
                } else if (beforeContent == "문의사항만 입력") {
                    /*
                        등록한 사진을 어디론가 옮기고 이력저장하고 
                    */
                    re = depth_First_Third_Last_Response;
                }  

                if(content == '취소하기') {
                    re = { "message": {"text": "아래 내용 중 선택해 주세요!"},"keyboard": depth_First};
                } else if(content == '#') {
                    re = { "message": {"text": "아래 내용 중 선택해 주세요!"},"keyboard": depth_First};
                } else if(content == '이전단계1') {
                    re = depth_First_First;
                } else if(content == '이전단계2') {
                    re = depth_First_Second;
                } else if(content == '이전단계3') {
                    re = depth_First_Third;
                } 
                if (re == null) {
                    re = {"message": {"text":"제대로 인식하지 못했습니다. 취소하시려명 '#'을 입력하여주십시요!"}};
                }
            })
            .then(function() {
                var post = {UNIQUE_ID:user_key, NAME:content};
                if( updateType == "Name" ) {
                    pool.query('INSERT INTO TB_AUTOCHAT_CUSTOMER SET ?', post, function(err, rows, fields) {
                        if(err) console.log("Query Error:", err);
                    });
                } else if( updateType == "Phone" ) {
                    pool.query('UPDATE TB_AUTOCHAT_CUSTOMER SET PHONE = ? WHERE UNIQUE_ID = ?', [content, user_key], function(err, rows, fields) {
                        if(err) console.log("Query Error:", err);
                    });
                } else if( updateType == "Auth") {
                    pool.query('UPDATE TB_AUTOCHAT_CUSTOMER SET YN_AUTH = ? WHERE UNIQUE_ID = ?', ["Y", user_key], function(err, rows, fields) {
                        if(err) console.log("Query Error:", err);
                    });
                }
            })
            .then(function() {
                console.log("re:" + JSON.stringify(re)); 
                callback(null, re);
            })
            .done();
        } else {
            callback(null, re);
        }

          //       if (content == '주소') {
          //           re = {text:'서울특별시 중구 칠패로 42 우리빌딩 5층'};
          //           re = {message:re};
          //           result.status(200).send(re);
          //       } else if (content == '전화번호') {
          //           re = {text:'070-8188-0500'};
          //           re = {message:re};
          //           result.status(200).send(re);
          //       } else if (content == 'testKey') {
          //           re = {text:'응답 대기 10초 param : '+ user_key+"/"+type+"/"+content};
          //           re = {message:re};
          //           result.status(200).send(re);
                // } else if (content == '자동응답') {
          //           re = {text:'주소, 전화번호 중 한가지를 입력해주세요!'};
          //           re = {message:re};
          //           result.status(200).send(re);
                // } else if (content == '채팅상담') {
          //           re = {text:'http://test.proidea.kr:2581/cust/'+ user_key};
          //           re = {message:re};
          //           result.status(200).send(re);
          //       } else{
          //           re = {text:'주소, 전화번호 중 한가지를 입력하거나 좀더 자세한 상담을 원하시면 링크를 선택하세요!(http://test.proidea.kr:2581/cust/'+ user_key + ')'};
          //           re = {message:re};
          //           result.status(200).send(re);
          //       } 
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

    private dbSaveHistory(content: string, user_key: string, type: string): void {
        var post = {UNIQUE_ID:user_key, MESSAGE:content};
        console.log("db values:" + JSON.stringify(post));

        pool.query('INSERT INTO TB_AUTOCHAT_HISTORY SET ?', post, function(err, rows, fields) {
            if (err)
                console.log('Error while performing Query.', err);
        });
    }

//     private dbSaveCustomer(updateType: string, content: string, user_key: string): void {
//         var defered = Q.defer();
// console.log("1");
//         var post = {UNIQUE_ID:user_key, NAME:content};
// console.log("2");
//         console.log("db values:" + JSON.stringify(post));
// console.log("3");
//         if( updateType == "Name" ) {
// console.log("4");
//             connection.query('INSERT INTO TB_AUTOCHAT_CUSTOMER SET ?', post, defered.makeNodeResolver());
//         } else if( updateType == "Phone" ) {
//             connection.query('UPDATE TB_AUTOCHAT_CUSTOMER SET PHONE = ? WHERE UNIQUE_ID = ?', [content, user_key], defered.makeNodeResolver());
//         } else if( updateType == "Auth") {
//             connection.query('UPDATE TB_AUTOCHAT_CUSTOMER SET AUTH = ? WHERE UNIQUE_ID = ?', ["Y", user_key], defered.makeNodeResolver());
//         }
// console.log("5");
//         return defered.promise;
//     }

    private dbSaveCustomer(updateType: string, content: string, user_key: string): void {

        var post = {UNIQUE_ID:user_key, NAME:content};
        console.log("db values:" + JSON.stringify(post));
        if( updateType == "Name" ) {
            pool.query('INSERT INTO TB_AUTOCHAT_CUSTOMER SET ?', post, function(err, rows, fields) {
                if(err) console.log("Query Error:", err);
            });
        } else if( updateType == "Phone" ) {
            pool.query('UPDATE TB_AUTOCHAT_CUSTOMER SET PHONE = ? WHERE UNIQUE_ID = ?', [content, user_key], function(err, rows, fields) {
                if(err) console.log("Query Error:", err);
            });
        } else if( updateType == "Auth") {
            pool.query('UPDATE TB_AUTOCHAT_CUSTOMER SET AUTH = ? WHERE UNIQUE_ID = ?', ["Y", user_key], function(err, rows, fields) {
                if(err) console.log("Query Error:", err);
            });
        }
    }

    // private dbSaveCustomerName(content: string, user_key: string): void {
    //     var defered = Q.defer();
    //     var post = {UNIQUE_ID:user_key, NAME:content};
    //     console.log("db values:" + JSON.stringify(post));
    //     connection.query('INSERT INTO TB_AUTOCHAT_CUSTOMER SET ?', post, defered.makeNodeResolver());
    //     return defered.promise;
    // }

    // private dbSaveCustomerPhone(content: string, user_key: string): void {

    //     connection.query('UPDATE TB_AUTOCHAT_CUSTOMER SET PHONE = ? WHERE UNIQUE_ID = ?', [content, user_key], function(err, rows, fields) {
    //         if (err)
    //             console.log('Error while performing Query.', err);
    //     });
    // }

    // private dbSaveCustomerAuth(content: string, user_key: string): void {

    //     connection.query('UPDATE TB_AUTOCHAT_CUSTOMER SET AUTH = ? WHERE UNIQUE_ID = ?', ["Y", user_key], function(err, rows, fields) {
    //         if (err)
    //             console.log('Error while performing Query.', err);
    //     });
    // }

    private dbLoadCustomer(user_key: string): void {
        var defered = Q.defer();

        pool.query('SELECT * FROM TB_AUTOCHAT_CUSTOMER WHERE UNIQUE_ID = ?', user_key, defered.makeNodeResolver());
        return defered.promise;
    }


    private dbCheckHistory(content: string, user_key: string): void {
        var defered = Q.defer();
        pool.query('select * from TB_AUTOCHAT_HISTORY where UNIQUE_ID = ? order by wrtdate desc LIMIT 1', [user_key], defered.makeNodeResolver());
        return defered.promise;
    }

    public dbConnection(): void {
        connection.connect();
    }

    public dbRelease(): void {
        connection.end();
    }
}

// Bootstrap the server
let api = ApiServer.bootstrap();
export = api.kakao_app;
