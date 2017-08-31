import * as express from 'express'; 
import * as http from "http";
import * as serveStatic from "serve-static";
import * as path from "path";
import * as socketIo from "socket.io";

import { KakaoSocket, KakaoDb } from "./socket";

// var Q = require('q');
var mysql  = require('mysql');
var net    = require('net');
var fastXmlParser = require('fast-xml-parser');
// var validator     = require('validator');
var spawn         = require('child_process').spawn;
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
            var user_key = request.body.user_key;
            var re;
            try {
                // this.kakaoDb.dbClearCustomer(user_key);
                
                this.kakaoSocket.clearCustomer(user_key, function(err, data) {
                    if(err) {
                        // console.log('message:응답 에러:'+err);
                        re = {text:'param : ' + user_key};
                        result.status(200).send(re);
                    } else {
                        re = {text:'param : ' + user_key};
                        // console.log("response:" + JSON.stringify(re));
                        result.status(200).send(re);
                        console.log('friend:응답 성공');
                    }
                });
                // re = {text:'param : ' + user_key};
            } catch (exception) {
                console.log('friend del:응답 에러');
            } finally {
                result.status(200).send(re);
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
                re = {text:'param : ' + user_key};
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
/*
    private getMessageResponse(content: string, user_key: string, type: string, callback: any): void {
        var re = null;
        var beforeResMessage = null;
        var beforeReqMessage = null;
        var rtnStr = null;
        var updateType = null;
        var beforeContent = null;
        var beforeStep = null;
        var nowStep = null;
        var keyboardContent = null;
        var systemContent = null;
        var nOTP = null;
        var contentValidation = null;
        var hpIf = null;

        if (content == "#" || content == "처음으로") content = "keyboard";

        Q.all([this.dbSelectScenario(content)]) // 1. 요청 문구에 대한 시나리오 확인
            .then(function(results) {

            if( results[0][0][0] != null ) {
                re = results[0][0][0].RES_MESSAGE;
                nowStep = results[0][0][0].STEP;
                hpIf = results[0][0][0].ETC3;
                if( nowStep != '1' ) {
                    var msg = JSON.parse(re);
                    if( msg.keyboard.buttons != null && msg.keyboard.buttons.length > 0 ) {
                        msg.keyboard.buttons.push("처음으로");
                        re = JSON.stringify(msg);
                    }
                }
            }
        }).then(function() {
            if(re != null /*&& hpIf == null* / && content != "요금조회") {

                if( re != null ) {
                    var post = {UNIQUE_ID:user_key, MESSAGE:content};
                    console.log("db values:" + JSON.stringify(post));

                    pool.query('INSERT INTO TB_AUTOCHAT_HISTORY SET ?', post, function(err, rows, fields) {
                        if (err) console.log('Error while performing Query.', err);
                    });
                }

                callback(null, re);
            } else {
console.log("else content:" + content);
console.log("else user_key:" + user_key);
                let kakaoDb = new KakaoDb();

                Q.all([ kakaoDb.dbCheckHistory(content, user_key),             // 2. 사용자별 최종 사용(메뉴)이력 확인(TB_AUTOCHAT_HISTORY)
                        kakaoDb.dbLoadCustomer(user_key),                      // 3. 사용자 정보 조회
                        kakaoDb.dbBeforeSelectScenario(content, user_key),     // 4. 사용자별 최종 접근(메뉴)이력 확인(TB_AUTOCHAT_SCENARIO)
                        kakaoDb.dbSelectScenario("keyboard"),                  // 5. "#"등 기본 응답 메세지 선택
                        kakaoDb.dbSelectScenarioSystem("system")])             // 6. 본 시스템에서 사용하는 기본 메세지 
                .then(function(results){
// console.log("results:" + JSON.stringify(results));                    
                    if( results[0][0][0] != null ) {
                        beforeContent = results[0][0][0].MESSAGE;
                        beforeStep = results[0][0][0].STEP;
                    }
                    else beforeContent = null;

                    if( results[1][0][0] != null )
                        rtnStr = results[1][0][0];
                    else rtnStr = null;

                    if( results[2][0][0] != null ) {
                        beforeResMessage = results[2][0][0].RES_MESSAGE;
                        beforeReqMessage = results[2][0][0].REQ_MESSAGE;
                    }
                    else {
                        beforeResMessage = null;
                        beforeReqMessage = null;
                    }

                    if( results[3][0][0] != null )
                        keyboardContent = JSON.parse(results[3][0][0].RES_MESSAGE).keyboard;
                    else keyboardContent = null;

                    if (results[4][0][0] != null) {
                        systemContent = results[4][0];
                    }
                    else
                        systemContent = null;

console.log("beforeContent:" + beforeContent);
console.log("beforeStep:" + beforeStep);
console.log("beforeResMessage:" + beforeResMessage);
console.log("beforeReqMessage:" + beforeReqMessage);
                }).then(function() {
                    if (re == null) {
console.log("re is null");
                        if (beforeContent == "사진 첨부 후 문의하기") {
                            /*
                            등록한 사진을 어디론가 옮기고 이력저장하고 
                            * /
                            var post = {UNIQUE_ID:user_key, REQ_MESSAGE:content};
                            console.log("db values:" + JSON.stringify(post));

                            pool.query('INSERT INTO TB_AUTOCHAT_QUESTION SET ?', post, function(err, rows, fields) {
                            if (err)
                            console.log('Error while performing Query.', err);
                            });

                            let kakaoSocket = new KakaoSocket(systemContent);
                            re = kakaoSocket.findScenario("QUESTION_OK");
                            var msg = JSON.parse(re);
                            if( msg.keyboard.buttons != null && msg.keyboard.buttons.length > 0 ) {
                                msg.keyboard.buttons.push("처음으로");
                                re = JSON.stringify(msg);
                            }
                        } else if (beforeContent == "문의사항만 입력") {
                            /*
                            등록한 사진을 어디론가 옮기고 이력저장하고 
                            * /
                            var post = {UNIQUE_ID:user_key, REQ_MESSAGE:content};
                            console.log("db values:" + JSON.stringify(post));

                            pool.query('INSERT INTO TB_AUTOCHAT_QUESTION SET ?', post, function(err, rows, fields) {
                            if (err)
                            console.log('Error while performing Query.', err);
                            });

                            let kakaoSocket = new KakaoSocket(systemContent);
                            re = kakaoSocket.findScenario("QUESTION_OK");
                            var msg = JSON.parse(re);
                            if( msg.keyboard.buttons != null && msg.keyboard.buttons.length > 0 ) {
                                msg.keyboard.buttons.push("처음으로");
                                re = JSON.stringify(msg);
                            }
                        } else if (beforeContent == "티브로드에 문의하기") {
                            /*
                            등록한 사진을 어디론가 옮기고 이력저장하고 
                            * /
                            var post = {UNIQUE_ID:user_key, REQ_MESSAGE:content};
                            console.log("db values:" + JSON.stringify(post));

                            pool.query('INSERT INTO TB_AUTOCHAT_QUESTION SET ?', post, function(err, rows, fields) {
                            if (err)
                            console.log('Error while performing Query.', err);
                            });

                            let kakaoSocket = new KakaoSocket(systemContent);
                            re = kakaoSocket.findScenario("QUESTION_OK");
                            var msg = JSON.parse(re);
                            if( msg.keyboard.buttons != null && msg.keyboard.buttons.length > 0 ) {
                                msg.keyboard.buttons.push("처음으로");
                                re = JSON.stringify(msg);
                            }
                        } else if ( beforeContent != "keyboard" && beforeStep == '3' ) {
                            re = {
                                "message": 
                                    {"text": "1:1 자동응답 기능 테스트 용입니다. 좀더 다양한 기능은 추후 제공 하도록 하겠습니다.\n 처음으로 돌아가시려면 '#'을 입력하세요!"},
                                "keyboard": 
                                    {"type":"text"}
                                };
                        } 

                        if(content == '취소하기' || content == '#' || content == '처음으로' || content == '돌아가기') {
                            re = { "message": {"text": "아래 내용 중 선택해 주세요!"},"keyboard": keyboardContent};
                        } 
                            
                        // if(re == null && beforeResMessage != null ) {
                        //     re = beforeResMessage;
                        // }
                    }
                }).then(function() {
                    let kakaoSocket = new KakaoSocket(systemContent);
                    if( re == null && content != "keyboard" && content != "처음으로" && content != "취소하기" && beforeReqMessage == "요금조회" ) {

                        if (rtnStr != null && rtnStr.PHONE != null && rtnStr.NAME != null && rtnStr.YN_AUTH == "Y" ) {
                            // 메뉴 중에 개인 정보가 필요하건에 대해서는 연동처리 하여 응답한다. 
                            // 그렇다면 시나리오에 연동이 필요한것인지 필요하다면 URL, Parameter 등등 정보를 관리하여 응답할수 있도록
                            // 기능 추가
                            console.log("이어서 합시다!");
                            let kakaoSocket = new KakaoSocket(null);
                        
                            Q.all([kakaoSocket.getHomepageRequest(content)]).then(function(result){
                                console.log("요금조회, result:" + result);
                                //re = kakaoSocket.findScenario("RES_MSG");
                                //var msg = JSON.parse(JSON.stringify(re));
                                //msg.message. text.push(result);
                                //re = JSON.stringify(msg);
                                //console.log(JSON.stringify(re));
                                //re = JSON.stringify(result);
                                re = "{\"message\":{\"text\":\"고객님 안녕하세요.\\n요청하신 정보는 다음과 같습니다.\\n고객명>정선영\\n주소>경기도 안산시 단원구 부부로5길 5  3101호\\n이메일>\\n납부자명>정선영\\n납입일>20\\n납부방법>은행자동이체\\n청구매체>알림톡\\n은행(카드사)명>KEB하나\\n계좌or카드번호>4029109550****\\n당월총청구금액>\\n당월미납금액> 처음으로 이동하시려면 #을 입력하여주십시요!\"},\"keyboard\":{\"type\":\"text\"}}";
                            }).then(function() {
                                callback(null, re);
                            }).done();
                            // this.fetch = createFetch( base(this.hpURL));
                            // this.fetch(this.IN0002_URL + this.IN0002_PARAM);
                        } else {
                            // 근데 위 조건에 충족하지 않는다고 해서 무조건 아래와 같은것을 태우는것은 문제가 있다.
                            // 입력된 "content"가 시나리오에서 못찾을 경우 만 거치도록 추가 수정
                            // 고객의 가장 최근 이력(히스토리) 메뉴가 본인인증이 되어 있어야 사용가능한지를 시나리오 관리 테이블에서 추가로
                            // 관리하자.
                            // var result = kakaoSocket.checkCustomerInfo(rtnStr, content, kakaoSocket, beforeResMessage);
                            // console.log("result:" + result);
                            // updateType = result.updateType;
                            // re = result.re;
                            
                            if( rtnStr == null) {
                                updateType = "INS_PHONE";
                                re = kakaoSocket.findScenario("NAME");
                                contentValidation = validator.isDecimal(content);
                                if( contentValidation != true ) { // 숫자 비교해서 같은면
                                    //re = kakaoSocket.findScenario("AUTH_OK");
                                    re = kakaoSocket.findScenario("PHONE_NOK");
                                    updateType = "PHONE_NOK";
                                }
                            } else if (rtnStr.PHONE == null && rtnStr.NAME == null) {
                                updateType = "UPD_PHONE";
                                re = kakaoSocket.findScenario("NAME");
                                contentValidation = validator.isDecimal(content);
                                if( contentValidation != true ) { // 숫자 비교해서 같은면
                                    //re = kakaoSocket.findScenario("AUTH_OK");
                                    re = kakaoSocket.findScenario("PHONE_NOK");
                                    updateType = "PHONE_NOK";
                                }
                            } else if (rtnStr.PHONE != null && rtnStr.NAME == null) {
                                updateType = "NAME";
                                re = kakaoSocket.findScenario("AUTH");
                            } else if (rtnStr.PHONE != null && rtnStr.NAME != null && rtnStr.YN_AUTH == "N" && rtnStr.ETC1 == null) {
                                updateType = "NAME";
                                //  beforeContent에 해당하는 기간계 정보를 호출한다. (20170615)
                                re = kakaoSocket.findScenario("AUTH");
                            } else if (rtnStr.PHONE != null && rtnStr.NAME != null && rtnStr.YN_AUTH == "N" && rtnStr.ETC1 != null) {
                                updateType = "AUTH";
                                //  beforeContent에 해당하는 기간계 정보를 호출한다. (20170615)
                                contentValidation = validator.isDecimal(content);
                                if( contentValidation == true && content == rtnStr.ETC1 ) { // 숫자 비교해서 같은면
                                    //re = kakaoSocket.findScenario("AUTH_OK");
                                    //re = beforeResMessage;
                                    re = keyboardContent;
                                    updateType = "AUTH_OK";// 인증을 성공하였으면 마지막 메뉴로 자동 이동시켜 원하는 정보를 선택하게 한다.
                                } else {
                                    re = kakaoSocket.findScenario("AUTH_NOK");
                                    updateType = "AUTH_NOK";
                                }
                            } else {
                                re = kakaoSocket.findScenario("AUTH_NOK");
                            }
                        }

                        if( updateType == "INS_PHONE" ) {
                            var cust_post = {UNIQUE_ID:user_key, PHONE:content};
                            pool.query('INSERT INTO TB_AUTOCHAT_CUSTOMER SET ?', cust_post, function(err, rows, fields) {
                                if(err) console.log("Query Error:", err);
                            });
                        } else if( updateType == "UPD_PHONE" ) {
                            pool.query('UPDATE TB_AUTOCHAT_CUSTOMER SET PHONE = ?, YN_AUTH = ? WHERE UNIQUE_ID = ?', [content, "N", user_key], function(err, rows, fields) {
                                if(err) console.log("Query Error:", err);
                            });
                        } else if( updateType == "NAME" ) {
                                // local case
                                //this.ls = spawn('/Users/gotaejong/projects/WorkspacesHTML5/tmsg-v3/shorturl');
                                // linux case
                                //kakaoSocket.ls = spawn('/home/proidea/workspaceHTML5/tmsg-v3/shorturl');
                                // tbroad case
                                kakaoSocket.ls = spawn('/home/icr/tmsg-v3/shorturl');
                                kakaoSocket.ls.stdout.on('data', (data) => {
                                    console.log(`stdout: ${data}`);
                                    nOTP = data;
                                    if( nOTP != null ) {
                                        // 1. send SMS customer phone
                                        // 2. DB Update
                                        // const client = socketIoClient.connect(mtURL, options);

                                        // var messageSize = mtMessage.length+"";
                                        var sendMessage = "<?xml version=\"1.0\" encoding=\"EUC-KR\"?><REQUEST><SEND_TYPE>SMS</SEND_TYPE><MSG_TYPE>TEST</MSG_TYPE><MSG_CONTENTS>" + nOTP + "</MSG_CONTENTS><SEND_NUMBER>07081883757</SEND_NUMBER><RECV_NUMBER>" + rtnStr.PHONE + "</RECV_NUMBER><FGSEND>I</FGSEND><IDSO>1000</IDSO></REQUEST>";
                                        var messageSize = sendMessage.length + "";
                                        while (messageSize.length < 5) messageSize = "0" + messageSize;

                                        var sendData = messageSize + sendMessage;
                                        
                                        var client = new net.Socket();
                                        client.connect(kakaoSocket.mtPort, kakaoSocket.mtIP, function () {
                                            console.log('CONNECTED TO: ' + kakaoSocket.mtIP + ':' + kakaoSocket.mtPort);
                                            // Write a message to the socket as soon as the client is connected, the server will receive it as message from the client 
                                            client.write(sendData);
                                        });
                                        // Add a 'data' event handler for the client socket
                                        // data is what the server sent to this socket
                                        client.on('data', function (data) {
                                            console.log("data:" + data);
                                            var str = data;
                                            // Close the client socket completely
                                            var res = new String(str.slice(5));
                                            // res = res.replace(/\\r\\n/g, "");
                                            if (fastXmlParser.validate(res) === true) {
                                                var jsonObj = fastXmlParser.parse(res, options);
                                                var resultObj = JSON.parse(JSON.stringify(jsonObj.REQUEST)).RESULT_MSG;
                                                // console.log('XMLtoJSON:' + JSON.stringify(jsonObj.REQUEST));
                                                // console.log('XMLtoJSON:' + JSON.parse(JSON.stringify(jsonObj.REQUEST)).RESULT_CODE);
                                                // console.log('XMLtoJSON:' + JSON.parse(JSON.stringify(jsonObj.REQUEST)).RESULT_MSG);
                                                if (resultObj == "SUCCESS") {
                                                    pool.query('UPDATE TB_AUTOCHAT_CUSTOMER SET NAME = ?, YN_AUTH = ?, ETC1 = ? WHERE UNIQUE_ID = ?', [content, "N", nOTP, user_key], function (err, rows, fields) {
                                                        if (err)
                                                            console.log("Query Error:", err);
                                                    });
                                                }
                                            }
                                            client.destroy();
                                        });
                                        // Add a 'close' event handler for the client socket
                                        client.on('close', function () {
                                            console.log('Connection closed');
                                        });

                                        client.on('timeout', function() {
                                            console.log('Socket Timeout'); 
                                        })

                                        client.on('error', function(error) {
                                            console.log('Socket Error:' + error); 
                                        })
                                    }
                                });

                                kakaoSocket.ls.stderr.on('data', (data) => {
                                  console.log(`stderr: ${data}`);
                                  // retry ? 
                                });

                                kakaoSocket.ls.on('close', (code) => {
                                  console.log(`child process exited with code ${code}`);
                                });
                        } else if( updateType == "AUTH_OK") {
                            pool.query('UPDATE TB_AUTOCHAT_CUSTOMER SET YN_AUTH = ? WHERE UNIQUE_ID = ?', ["Y", user_key], function(err, rows, fields) {
                                if(err) console.log("Query Error:", err);
                            });
                        } else if( updateType == "AUTH_NOK") {
                            pool.query('UPDATE TB_AUTOCHAT_CUSTOMER SET YN_AUTH = ? WHERE UNIQUE_ID = ?', ["N", user_key], function(err, rows, fields) {
                                if(err) console.log("Query Error:", err);
                            });
                        } else if( updateType == "PHONE_NOK") {
                            re = this.findScenario("PHONE_NOK");
                        }
                    }
                })/*.then(function() {
                    let kakaoSocket = new KakaoSocket(systemContent);
                    Q.all([kakaoSocket.updateCustomerInfo(updateType, user_key, content, pool, rtnStr)]).then(function(result){
                        console.log("updateCustomerInfo->result:" + JSON.stringify(result));
                    }).done();
                })* /.then(function() {

                    if(content == "요금조회" && rtnStr != null && rtnStr.PHONE != null && rtnStr.NAME != null && rtnStr.YN_AUTH == "Y") {
                        let kakaoSocket = new KakaoSocket(null);
                        
                        Q.all([kakaoSocket.getHomepageRequest(content)]).then(function(result){
                            console.log("요금조회, result:" + result);
                            //re = kakaoSocket.findScenario("RES_MSG");
                            //var msg = JSON.parse(JSON.stringify(re));
                            //msg.message. text.push(result);
                            //re = JSON.stringify(msg);
                            //console.log(JSON.stringify(re));
                            //re = JSON.stringify(result);
                            re = "{\"message\":{\"text\":\"고객님 안녕하세요.\\n요청하신 정보는 다음과 같습니다.\\n고객명>정선영\\n주소>경기도 안산시 단원구 부부로5길 5  3101호\\n이메일>\\n납부자명>정선영\\n납입일>20\\n납부방법>은행자동이체\\n청구매체>알림톡\\n은행(카드사)명>KEB하나\\n계좌or카드번호>4029109550****\\n당월총청구금액>\\n당월미납금액> 처음으로 이동하시려면 #을 입력하여주십시요!\"},\"keyboard\":{\"type\":\"text\"}}";
                        }).then(function() {
                            callback(null, re);
                        }).done();
                        //re = "{\"message\":{\"text\":\"고객님 안녕하세요.\\n요청하신 정보는 다음과 같습니다.\\n고객명>정선영\\n고객ID>4020520882\\n계열사ID>3400\\n주소>경기도 안산시 단원구 부부로5길 5  3101호\\n전화번호>\\n핸드폰>010-4898-0329\\n이메일>\\n납부자명>정선영\\n납부계정ID>4002184313\\n납입일>20\\n납부방법>은행자동이체\\n청구매체>알림톡\\n은행(카드사)명>KEB하나\\n계좌or카드번호>4029109550****\\n고객상태>사용중\\n고객신분>N\\n당월총청구금액>\\n당월미납금액>\"},\"keyboard\":{\"type\":\"text\"}}";
                    } else {
                        callback(null, re);
                    }
                }).done();
            }
        }).done();       
    }

*/

    // Configure databases
    // private databases(): void {
    //     console.log("Server database");
    //     // MongoDB URL
    //     let mongoDBUrl = process.env.MONGODB_URI || 'mongodb://localhost/chat';

    //     // Get MongoDB handle
    //     this.mongo = mongoose.connect(mongoDBUrl);
    // }
    
    // Configure sockets

/*
    private dbSaveHistory(content: string, user_key: string, type: string): void {
        var post = {UNIQUE_ID:user_key, MESSAGE:content};
        console.log("db values:" + JSON.stringify(post));

        pool.query('INSERT INTO TB_AUTOCHAT_HISTORY SET ?', post, function(err, rows, fields) {
            if (err)
                console.log('Error while performing Query.', err);
        });
    }
*/
/*
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
*/

    // public dbLoadCustomer(user_key: string): void {
    //     var defered = Q.defer();

    //     pool.query('SELECT * FROM TB_AUTOCHAT_CUSTOMER WHERE UNIQUE_ID = ?', user_key, defered.makeNodeResolver());
    //     return defered.promise;
    // }

    // public dbSelectScenario(content: string): void {
    //     var defered = Q.defer();
    //     console.log("content:" + content);
    //     pool.query('SELECT * FROM TB_AUTOCHAT_SCENARIO WHERE REQ_MESSAGE = ?', content, defered.makeNodeResolver());
    //     return defered.promise;
    // }

    // public dbSelectScenarioSystem(content: string): void {
    //     var defered = Q.defer();
    //     // console.log("content:" + content);
    //     pool.query('SELECT * FROM TB_AUTOCHAT_SCENARIO WHERE ETC3 = ?', content, defered.makeNodeResolver());
    //     return defered.promise;
    // }

    // public dbBeforeSelectScenario(content: string, user_key: string): void {
    //     var defered = Q.defer();
    //     // console.log("content:" + content);
    //     pool.query('SELECT a.* FROM TB_AUTOCHAT_SCENARIO as a, (select * from TB_AUTOCHAT_HISTORY where UNIQUE_ID = ? order by wrtdate desc LIMIT 1)  as b WHERE a.REQ_MESSAGE = b.MESSAGE', user_key, defered.makeNodeResolver());
    //     return defered.promise;
    // }

    // public dbCheckHistory(content: string, user_key: string): void {
    //     var defered = Q.defer();
    //     pool.query('select a.*, b.step, b.trun from TB_AUTOCHAT_HISTORY as a, TB_AUTOCHAT_SCENARIO as b where a.UNIQUE_ID = ? and b.REQ_MESSAGE = a.MESSAGE order by a.wrtdate desc LIMIT 1', [user_key], defered.makeNodeResolver());
    //     return defered.promise;
    // }
    /*
    public callHp(content: string): string {
        var defered = Q.defer();
        let kakaoSocket = new KakaoSocket(null);
        defered.makeNodeResolver(kakaoSocket.getHomepageRequest(content));
        return defered.promise;
    }
    */
}

// Bootstrap the server
let api = ApiServer.bootstrap();
export = api.kakao_app;
