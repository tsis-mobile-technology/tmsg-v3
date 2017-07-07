

export interface TB_AUTOCHAT_SCENARIO {
    SEQ: number;
    STEP: number;
    TRUN: number;
    REQ_MESSAGE: string;
    RES_MESSAGE: string;
    WRTDATA: string;
    ETC1: string;
    ETC2: string;
    ETC3: string;
}

export interface IN_CODE {
    Code: string; //<Code>0000</Code>  
}

export interface IN0002_CUSTOMER {
    Name: string;
    Id: string;
    IdSo: string;
    Address: string;
    Phone: string;
    HandPhone: string;
    Email: string;
    AccountName: string;
    AccountId: string;
    IssueDate: string;
    PayMethod: string;
    Media: string;
    FinancialName: string;
    Account: string;
    Status: string;
    Social: string;
    Products: string;
    SumAmtCurInv: string;
    SumAmtCurNonpmt: string;
    /*
    <Invoices>    
        <invoice YyyymmInv="201706" Service="���ջ�ǰ" Name="HD������ �Ⱑ���̺�" AmtUse="77600" AmtDc="-44000" AmtCurInv="33600" AmtPmt="0" AmtUnpmt="33600" AmtSupply="30000" AmtVat="3000" AmtTrunc="0" CalcStartDay="20170501" CalcEndDay="20170531">     
            <ProdUseDtls>      
                <produsedtl ChrgItmGrp="������" ChrgItm="�Ӵ���" AmtUse="15700" AmtDc="-8000" AmtCurInv="7700" AmtPmt="0" AmtUnpmt="7700" AmtSupply="7000" AmtVat="700" AmtTrunc="0" />      
                <produsedtl ChrgItmGrp="������" ChrgItm="��ü��" AmtUse="600" AmtDc="0" AmtCurInv="600" AmtPmt="0" AmtUnpmt="600" AmtSupply="0" AmtVat="0" AmtTrunc="0" />      
                <produsedtl ChrgItmGrp="������" ChrgItm="������" AmtUse="61300" AmtDc="-36000" AmtCurInv="25300" AmtPmt="0" AmtUnpmt="25300" AmtSupply="23000" AmtVat="2300" AmtTrunc="0" />     
            </ProdUseDtls>    
        </invoice>    
        <invoice YyyymmInv="201705" Service="���ջ�ǰ" Name="HD������ �Ⱑ���̺�" AmtUse="77600" AmtDc="-44000" AmtCurInv="33600" AmtPmt="33600" AmtUnpmt="0" AmtSupply="30000" AmtVat="3000" AmtTrunc="0" CalcStartDay="20170401" CalcEndDay="20170430">     
            <ProdUseDtls>      
                <produsedtl ChrgItmGrp="������" ChrgItm="�Ӵ���" AmtUse="15700" AmtDc="-8000" AmtCurInv="7700" AmtPmt="7700" AmtUnpmt="0" AmtSupply="7000" AmtVat="700" AmtTrunc="0" />      
                <produsedtl ChrgItmGrp="������" ChrgItm="������" AmtUse="61300" AmtDc="-36000" AmtCurInv="25300" AmtPmt="25300" AmtUnpmt="0" AmtSupply="23000" AmtVat="2300" AmtTrunc="0" />      
                <produsedtl ChrgItmGrp="������" ChrgItm="��ü��" AmtUse="600" AmtDc="0" AmtCurInv="600" AmtPmt="600" AmtUnpmt="0" AmtSupply="0" AmtVat="0" AmtTrunc="0" />     
            </ProdUseDtls>    
        </invoice>    
        <invoice YyyymmInv="201704" Service="���ջ�ǰ" Name="HD������ �Ⱑ���̺�" AmtUse="77600" AmtDc="-44000" AmtCurInv="33600" AmtPmt="33600" AmtUnpmt="0" AmtSupply="30000" AmtVat="3000" AmtTrunc="0" CalcStartDay="20170301" CalcEndDay="20170331">     
            <ProdUseDtls>      
                <produsedtl ChrgItmGrp="������" ChrgItm="�Ӵ���" AmtUse="15700" AmtDc="-8000" AmtCurInv="7700" AmtPmt="7700" AmtUnpmt="0" AmtSupply="7000" AmtVat="700" AmtTrunc="0" />      
                <produsedtl ChrgItmGrp="������" ChrgItm="������" AmtUse="61300" AmtDc="-36000" AmtCurInv="25300" AmtPmt="25300" AmtUnpmt="0" AmtSupply="23000" AmtVat="2300" AmtTrunc="0" />      
                <produsedtl ChrgItmGrp="������" ChrgItm="��ü��" AmtUse="600" AmtDc="0" AmtCurInv="600" AmtPmt="600" AmtUnpmt="0" AmtSupply="0" AmtVat="0" AmtTrunc="0" />     
            </ProdUseDtls>    
        </invoice>   
    </Invoices>  
    */
}

export interface IN0002_RESULT {
    customer: IN0002_CUSTOMER[]; 
    code: IN_CODE[];   
}

export class KakaoSocket {
    private mtIP: string;
    private mtURL: string;
    private mtPort: number;
    private hpURL: string;
    private IN0002_URL: string;
    private IN0002_PARAM: string;
    private ls: any;
    private nOTP: any;
    private options: any;
    private kakaoDb: any;
    private inputDatas: TB_AUTOCHAT_SCENARIO[];
    private validator     = require('validator');
    private Q             = require("q");
    private net           = require('net');
    private spawn         = require('child_process').spawn;
    private fastXmlParser = require('fast-xml-parser');
    private errorSuccess = '{"keyboard":{"type":"text"}, "message":{"text":"고객님의 죄송합니다!. 시스템 점검중으로 잠시후 다시 시도하여 주십시요.\n 처음으로 가시려면 "#"을 입력해 주세요."}}';
                        //  위 시스템 회신 문자는  SYS_ERR

    /* private io의 경우 본 api 서버가 기동 될때 한번 불러와서 여러번 사용한다. 
       그렇게 되면 본 class를 사용하는 쪽에서 한번에 생성해야 한다.
    */
    constructor(private io: TB_AUTOCHAT_SCENARIO[]) {
        this.inputDatas = io;

        this.mtURL = "http://125.132.2.120:30063";
        this.mtIP = "125.132.2.120";
        this.mtPort = 30063;
        this.hpURL = "http://172.16.180.224:30034"; //dev
        // this.hpURL = "http://172.16.28.27:30034"; //live
        this.IN0002_URL = "/interface/tbroad/xml_module/CustInvoiceDtlXml";
        //this.IN0002_PARAM = "KEY_NUM=1234561234567&MONTH_CNT=2&NM_CUST=홍길동&CORP=3200&ID_INSERT=U000000000";
        this.IN0002_PARAM = "CORP=TBRD&KEY_NUM=MC0GCCqGSIb3DQIJAyEAgw8aXEa%2FEaSbidYQzkCI9WfamqzaFtL%2F7NOaD8JNWGU%3D&NM_CUST=%C1%A4%BC%B1%BF%B5&MONTH_CNT=2";
        this.options = {
                            attrPrefix: "@_",
                            textNodeName: "#text",
                            ignoreNonTextNodeAttr: true,
                            ignoreTextNodeAttr: true,
                            ignoreNameSpace: true,
                            textNodeConversion: true
                        };        
    }

    // Add signal
    public findScenario(tagName: string): string {
        console.log("findScenario call:" + tagName);
        if( this.inputDatas != null ) {
            // this.inputData.filter(function (item) { console.log(item.REQ_MESSAGE); return item.REQ_MESSAGE === tagName; });
            var rtnObj: TB_AUTOCHAT_SCENARIO[] = this.inputDatas.filter( inputData => inputData.REQ_MESSAGE === tagName);
            return rtnObj[0].RES_MESSAGE;
        }
        else { return this.errorSuccess;}
    }

    private getKeyboardResponse(content: string, callback: any): void {
        console.log("call KakaoSocket.getKeyboardResponse!:" + content);
        var re;
        this.Q.all([this.kakaoDb.dbSelectScenario(content)]).then(function(results){
            re = results[0][0][0];

        }).then(function() {
            callback(null, JSON.parse(re.RES_MESSAGE).keyboard);
        })
        .done();
    }

    private getMessageResponseNew(content: string, user_key: string, type: string, callback: any): void {
        console.log("call KakaoSocket.getMessageResponseNew!:" + content);
    }

    public getTest(): void {
    	var Iconv  = require('iconv').Iconv;

    	var euckr2utf8 = new Iconv('EUC-KR', 'UTF-8');
    	var utf82euckr = new Iconv('UTF-8', 'EUC-KR');

    	// utf8 안녕하세요
    	var buff_utf8 = new Buffer(15); 
    	buff_utf8[0] = 0xec;
    	buff_utf8[1] = 0x95;
    	buff_utf8[2] = 0x88;
    	buff_utf8[3] = 0xeb;
    	buff_utf8[4] = 0x85;
    	buff_utf8[5] = 0x95;
    	buff_utf8[6] = 0xed;
    	buff_utf8[7] = 0x95;
    	buff_utf8[8] = 0x98;
    	buff_utf8[9] = 0xec;
    	buff_utf8[10] = 0x84;
    	buff_utf8[11] = 0xb8;
    	buff_utf8[12] = 0xec;
    	buff_utf8[13] = 0x9a;
    	buff_utf8[14] = 0x94;

    	// euc-kr 안녕하세요
    	var buff_euckr = new Buffer(10);
    	buff_euckr[0] = 0xbe;
    	buff_euckr[1] = 0xc8;
    	buff_euckr[2] = 0xb3;
    	buff_euckr[3] = 0xe7;
    	buff_euckr[4] = 0xc7;
    	buff_euckr[5] = 0xcf;
    	buff_euckr[6] = 0xbc;
    	buff_euckr[7] = 0xbc;
    	buff_euckr[8] = 0xbf;
    	buff_euckr[9] = 0xe4;

    	console.log("---------------------------------------");
    	console.log("euckr : "+buff_euckr.toString());
    	console.log("euckr2uf8 : "+euckr2utf8.convert(buff_euckr));

    	console.log("\n---------------------------------------");
    	console.log("utf8 : "+buff_utf8.toString());
    	console.log("utf82euckr : "+utf82euckr.convert(buff_utf8));
    }

    public getHomepageRequest(cmd: string): string {
        //var bodyParser = require('body-parser');
        //bodyParser.urlencoded(KEY_NUM, 'euc-kr');

        // response charset EUC-KR -> UTF-8
        var Iconv = require('iconv').Iconv;
        //var euckr2utf8 = new Iconv('EUC-KR', 'UTF-8//TRANSLIT//IGNORE');
        var euckr2utf8 = new Iconv('euc-kr', 'utf-8');

        var options = {
            method: 'POST',
            uri: this.hpURL + this.IN0002_URL,
            body: this.IN0002_PARAM,
            headers: {
                'content-type': 'application/x-www-form-urlencoded; charset=EUC-KR'
            },
            encoding: 'binary'
            //; charset=euc-kr;
        };
        var fastXmlParser = require('fast-xml-parser');
        var xmlOptions = {
                attrPrefix: "@_",
                textNodeName: "#text",
                ignoreNonTextNodeAttr: true,
                ignoreTextNodeAttr: true,
                ignoreNameSpace: true,
                textNodeConversion: true
            };
        var rp = require('request-promise');
        var Q      = require("q");
        var deferred = Q.defer();

        rp(options)
        .then(function(htmlString) {

            if (fastXmlParser.validate(htmlString) === true) {
                var binaryString = new Buffer(htmlString, 'binary');
                //console.log("htmlString:to" + euckr2utf8.convert(binaryString));
                //var data = euckr2utf8.convert(htmlString).toString('utf-8');
                //console.log("from: " + htmlString);
                //console.log("to: " + data);
                //var jsonObj = fastXmlParser.parse(htmlString, xmlOptions);
                var jsonObj = fastXmlParser.parse(euckr2utf8.convert(binaryString), xmlOptions);
                //var resultObj = JSON.parse(JSON.stringify(jsonObj.list)).customer;

                var resultSets: IN0002_CUSTOMER;
                resultSets = jsonObj.list.customer;
                //var binaryName = new Buffer(resultSets.Name, 'binary');
                //console.log("resultSets.Name:from" + binaryName);
                //console.log("resultSets.Name:to" + euckr2utf8.convert(binaryName));
                //console.log("resultSets.Name:to" + euckr2utf8.convert(binaryName).toString());
                //console.log("resultSets.Name:to" + euckr2utf8.convert(binaryName).toString('UTF-8'));


                // console.log('XMLtoJSON:' + JSON.stringify(jsonObj.REQUEST));
                // console.log('XMLtoJSON:' + JSON.parse(JSON.stringify(jsonObj.REQUEST)).RESULT_CODE);
                // console.log('XMLtoJSON:' + JSON.parse(JSON.stringify(jsonObj.REQUEST)).RESULT_MSG);
                // console.log(resultObj);
                //return resultSets.Name + "/" + resultSets.Id + "/" + resultSets.AccountId;
                var returnMsg = "고객님 안녕하세요.\\n" +
                                    "요청하신 정보는 다음과 같습니다. \\n" +
                                    "고객명>" + resultSets.Name + "\\n" +
                                    "고객ID>" + resultSets.Id + "\\n" +
                                    "계열사ID>" + resultSets.IdSo + "\\n" +
                                    "주소>" + resultSets.Address + "\\n" +
                                    "전화번호>" + resultSets.Phone + "\\n" +
                                    "핸드폰>" + resultSets.HandPhone + "\\n" +
                                    "이메일>" + resultSets.Email + "\\n" +
                                    "납부자명>" + resultSets.AccountName + "\\n" +
                                    "납부계정ID>" + resultSets.AccountId + "\\n" +
                                    "납입일>" + resultSets.IssueDate + "\\n" +
                                    "납부방법>" + resultSets.PayMethod + "\\n" +
                                    "청구매체>" + resultSets.Media + "\\n" +
                                    "은행(카드사)명>" + resultSets.FinancialName + "\\n" +
                                    "계좌or카드번호>" + resultSets.Account + "\\n" +
                                    "고객상태>" + resultSets.Status + "\n" +
                                    "고객신분>" + resultSets.Social + "\\n" +
                                    "당월총청구금액>" + resultSets.SumAmtCurInv + "\\n" +
                                    "당월미납금액>" + resultSets.SumAmtCurNonpmt + "\\n" +
                                    "\\n 처음으로 가시려면 #을 입력하여주십시요!";
                var returnString = "{\"message\":{\"text\":\"" + returnMsg + "\"},\"keyboard\":{\"type\":\"text\"}}";

                //deferred.resolve( resultSets.Name + "/" + resultSets.Id + "/" + resultSets.AccountId);
                deferred.resolve( returnString );
            }
            
            /*
            var resultSets: string;
            resultSets = euckr2utf8.convert(htmlString);
            if( resultSets != null ) {
                console.log(resultSets);
                return resultSets;
            }
            */
        })
        .catch(function(err) {
            //console.log("error:" + err);
            //return err;
            deferred.reject(err);
        });
        // this.http.get(this.hpURL + this.IN0002_URL + this.IN0002_PARAM ).toPromise()
        // .then(response => console.log("response:" + response.toString()));

        //return "default";
        return deferred.promise;
    }

    public getMTEventRequest(content:string, user_key:string, pool:any, rtnStr:any): string {
        var Q      = require("q");
        var deferred = Q.defer();
        // local case
        //this.ls = this.spawn('/Users/gotaejong/projects/WorkspacesHTML5/tmsg-v3/shorturl');
        // linux case
        this.ls = this.spawn('/home/proidea/workspaceHTML5/tmsg-v3/shorturl');
        // tbroad case
        // this.ls = this.spawn('/home/icr/tmsg-v3/shorturl');
        this.ls.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
        this.nOTP = data;
        if( this.nOTP != null ) {
            // 1. send SMS customer phone
            // 2. DB Update
            // const client = socketIoClient.connect(mtURL, options);

            // var messageSize = mtMessage.length+"";
            var sendMessage = "<?xml version=\"1.0\" encoding=\"EUC-KR\"?><REQUEST><SEND_TYPE>SMS</SEND_TYPE><MSG_TYPE>TEST</MSG_TYPE><MSG_CONTENTS>" + this.nOTP + "</MSG_CONTENTS><SEND_NUMBER>07081883757</SEND_NUMBER><RECV_NUMBER>" + rtnStr.PHONE + "</RECV_NUMBER><FGSEND>I</FGSEND><IDSO>1000</IDSO></REQUEST>";
            var messageSize = sendMessage.length + "";
            while (messageSize.length < 5) messageSize = "0" + messageSize;

            var sendData = messageSize + sendMessage;
            
            var client = new this.net.Socket();
            client.setTimeout(1000);
            client.connect(this.mtPort, this.mtIP, function () {
                console.log('CONNECTED TO: ' + this.mtIP + ':' + this.mtPort);
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
                if (this.fastXmlParser.validate(res) === true) {
                    var jsonObj = this.fastXmlParser.parse(res, this.options);
                    var resultObj = JSON.parse(JSON.stringify(jsonObj.REQUEST)).RESULT_MSG;
                    // console.log('XMLtoJSON:' + JSON.stringify(jsonObj.REQUEST));
                    // console.log('XMLtoJSON:' + JSON.parse(JSON.stringify(jsonObj.REQUEST)).RESULT_CODE);
                    // console.log('XMLtoJSON:' + JSON.parse(JSON.stringify(jsonObj.REQUEST)).RESULT_MSG);
                    if (resultObj == "SUCCESS") {
                        pool.query('UPDATE TB_AUTOCHAT_CUSTOMER SET NAME = ?, YN_AUTH = ?, ETC1 = ? WHERE UNIQUE_ID = ?', [content, "N", this.nOTP, user_key], function (err, rows, fields) {
                            if (err)
                                console.log("Query Error:", err);
                        });
                        deferred.resolve("success");
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
                deferred.resolve("timeout");
            })

            client.on('error', function(error) {
                console.log('Socket Error:' + error); 
                deferred.resolve("timeout");
            })
        }
        });

        this.ls.stderr.on('data', (data) => {
            console.log(`stderr: ${data}`);
        // retry ? 
        });

        this.ls.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
        });

        return deferred.promise;
    }

    public checkCustomerInfo(rtnStr: any, content: any, kakaoSocket: any, beforeResMessage: any): any {
        // var Q      = require("q");
        // var defered = Q.defer();
        var updateType = null;
        var contentValidation = null;
        var re = null;

        if( rtnStr == null) {
            updateType = "INS_PHONE";
            re = kakaoSocket.findScenario("NAME");
            contentValidation = this.validator.isDecimal(content);
            if( contentValidation != true ) { // 숫자 비교해서 같은면
                //re = kakaoSocket.findScenario("AUTH_OK");
                re = kakaoSocket.findScenario("PHONE_NOK");
                updateType = "PHONE_NOK";
            }
        } else if (rtnStr.PHONE == null && rtnStr.NAME == null) {
            updateType = "UPD_PHONE";
            re = kakaoSocket.findScenario("NAME");
            contentValidation = this.validator.isDecimal(content);
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
            contentValidation = this.validator.isDecimal(content);
            if( contentValidation == true && content == rtnStr.ETC1 ) { // 숫자 비교해서 같은면
                //re = kakaoSocket.findScenario("AUTH_OK");
                re = beforeResMessage;
                updateType = "AUTH_OK";// 인증을 성공하였으면 마지막 메뉴로 자동 이동시켜 원하는 정보를 선택하게 한다.
            } else {
                re = kakaoSocket.findScenario("AUTH_NOK");
                updateType = "AUTH_NOK";
            }
        } else {
            re = kakaoSocket.findScenario("AUTH_NOK");
        }
        console.log(">updateType:" + updateType);
        console.log(">re:" + JSON.stringify(re));

        //defered.makeNodeResolver(updateType + "," + re);
        var result = {"updateType": updateType, "re":re};
        
        // defered.resolve(result);

        return result;
    }

    public updateCustomerInfo(updateType:string, user_key:string, content:string, pool:any, rtnStr:any): any {
        var Q  = require("q");
        var deferred = Q.defer();
        var re = null;
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
                                    Q.all([this.getMTEventRequest(content, user_key, pool, rtnStr)]).then(function(result){
                                        console.log("call getMTEventRequest Result:" + result);
                                        if(result != "success") 
                                            re = this.findScenario("AUTH_NO_SEND");
                                    }).then(function() {
                                        return re;
                                    }).done();

/*
                                    // local case
                                    //this.ls = spawn('/Users/gotaejong/projects/WorkspacesHTML5/tmsg-v3/shorturl');
                                    // linux case
                                    kakaoSocket.ls = spawn('/home/proidea/workspaceHTML5/tmsg-v3/shorturl');
                                    // tbroad case
                                    // this.ls = spawn('/home/icr/tmsg-v3/shorturl');
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
                                        }
                                    });

                                    kakaoSocket.ls.stderr.on('data', (data) => {
                                      console.log(`stderr: ${data}`);
                                      // retry ? 
                                    });

                                    kakaoSocket.ls.on('close', (code) => {
                                      console.log(`child process exited with code ${code}`);
                                    });
*/
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
deferred.resolve(re);
                            return deferred.promise;
    }
}

/* IN0002 result XML
<?xml version="1.0" encoding="euc-kr"?>
<list>  
    <customer>   
        <Name>������</Name>   
        <Id>4020520882</Id>   
        <IdSo>3400</IdSo>   
        <Address>���⵵ �Ȼ��� �ܿ��� �κη�5�� 5  3101ȣ</Address>   
        <Phone></Phone>   
        <HandPhone>010-4898-0329</HandPhone>   
        <Email></Email>   
        <AccountName>������</AccountName>   
        <AccountId>4002184313</AccountId>   
        <IssueDate>20</IssueDate>   
        <PayMethod>�����ڵ���ü</PayMethod>   
        <Media>�˸���</Media>   
        <FinancialName>KEB�ϳ�</FinancialName>   
        <Account>4029109550****</Account>   
        <Status>������</Status>   
        <Social>N</Social>   
        <Products></Products>   
        <SumAmtCurInv></SumAmtCurInv>   
        <SumAmtCurNonpmt></SumAmtCurNonpmt>   
        <Invoices>    
            <invoice YyyymmInv="201706" Service="���ջ�ǰ" Name="HD������ �Ⱑ���̺�" AmtUse="77600" AmtDc="-44000" AmtCurInv="33600" AmtPmt="0" AmtUnpmt="33600" AmtSupply="30000" AmtVat="3000" AmtTrunc="0" CalcStartDay="20170501" CalcEndDay="20170531">     
                <ProdUseDtls>      
                    <produsedtl ChrgItmGrp="������" ChrgItm="�Ӵ���" AmtUse="15700" AmtDc="-8000" AmtCurInv="7700" AmtPmt="0" AmtUnpmt="7700" AmtSupply="7000" AmtVat="700" AmtTrunc="0" />      
                    <produsedtl ChrgItmGrp="������" ChrgItm="��ü��" AmtUse="600" AmtDc="0" AmtCurInv="600" AmtPmt="0" AmtUnpmt="600" AmtSupply="0" AmtVat="0" AmtTrunc="0" />      
                    <produsedtl ChrgItmGrp="������" ChrgItm="������" AmtUse="61300" AmtDc="-36000" AmtCurInv="25300" AmtPmt="0" AmtUnpmt="25300" AmtSupply="23000" AmtVat="2300" AmtTrunc="0" />     
                </ProdUseDtls>    
            </invoice>    
            <invoice YyyymmInv="201705" Service="���ջ�ǰ" Name="HD������ �Ⱑ���̺�" AmtUse="77600" AmtDc="-44000" AmtCurInv="33600" AmtPmt="33600" AmtUnpmt="0" AmtSupply="30000" AmtVat="3000" AmtTrunc="0" CalcStartDay="20170401" CalcEndDay="20170430">     
                <ProdUseDtls>      
                    <produsedtl ChrgItmGrp="������" ChrgItm="�Ӵ���" AmtUse="15700" AmtDc="-8000" AmtCurInv="7700" AmtPmt="7700" AmtUnpmt="0" AmtSupply="7000" AmtVat="700" AmtTrunc="0" />      
                    <produsedtl ChrgItmGrp="������" ChrgItm="������" AmtUse="61300" AmtDc="-36000" AmtCurInv="25300" AmtPmt="25300" AmtUnpmt="0" AmtSupply="23000" AmtVat="2300" AmtTrunc="0" />      
                    <produsedtl ChrgItmGrp="������" ChrgItm="��ü��" AmtUse="600" AmtDc="0" AmtCurInv="600" AmtPmt="600" AmtUnpmt="0" AmtSupply="0" AmtVat="0" AmtTrunc="0" />     
                </ProdUseDtls>    
            </invoice>    
            <invoice YyyymmInv="201704" Service="���ջ�ǰ" Name="HD������ �Ⱑ���̺�" AmtUse="77600" AmtDc="-44000" AmtCurInv="33600" AmtPmt="33600" AmtUnpmt="0" AmtSupply="30000" AmtVat="3000" AmtTrunc="0" CalcStartDay="20170301" CalcEndDay="20170331">     
                <ProdUseDtls>      
                    <produsedtl ChrgItmGrp="������" ChrgItm="�Ӵ���" AmtUse="15700" AmtDc="-8000" AmtCurInv="7700" AmtPmt="7700" AmtUnpmt="0" AmtSupply="7000" AmtVat="700" AmtTrunc="0" />      
                    <produsedtl ChrgItmGrp="������" ChrgItm="������" AmtUse="61300" AmtDc="-36000" AmtCurInv="25300" AmtPmt="25300" AmtUnpmt="0" AmtSupply="23000" AmtVat="2300" AmtTrunc="0" />      
                    <produsedtl ChrgItmGrp="������" ChrgItm="��ü��" AmtUse="600" AmtDc="0" AmtCurInv="600" AmtPmt="600" AmtUnpmt="0" AmtSupply="0" AmtVat="0" AmtTrunc="0" />     
                </ProdUseDtls>    
            </invoice>   
        </Invoices>  
    </customer>  
    <code>   
        <Code>0000</Code>  
    </code> 
</list>
*/
