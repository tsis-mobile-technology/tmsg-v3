

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

export class KakaoSocket {
    public inputDatas: TB_AUTOCHAT_SCENARIO[];
    public errorSuccess = '{"keyboard":{"type":"text"}, "message":{"text":"고객님의 죄송합니다!. 시스템 점검중으로 잠시후 다시 시도하여 주십시요.\n 처음으로 가시려면 "#"을 입력해 주세요."}}';
    private mtURL: string;
    private mtIP: string;
    private mtPort: number;
    private hpURL: string;
    private IN0002_URL: string;
    private IN0002_PARAM: string;

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
    }

    // Add signal
    public findXml(tagName: string): string {
        console.log("findXml call:" + tagName);
        if( this.inputDatas != null ) {
            // this.inputData.filter(function (item) { console.log(item.REQ_MESSAGE); return item.REQ_MESSAGE === tagName; });
            var rtnObj: TB_AUTOCHAT_SCENARIO[] = this.inputDatas.filter( inputData => inputData.REQ_MESSAGE === tagName);
            return rtnObj[0].RES_MESSAGE;
        }
        else { return this.errorSuccess;}
    }

    public getHomepageRequest(method: string): string {
        //var bodyParser = require('body-parser');
        //bodyParser.urlencoded(KEY_NUM, 'euc-kr');

        // response charset EUC-KR -> UTF-8
        var Iconv = require('iconv').Iconv;
        var iconv = new Iconv('EUC-KR', 'UTF-8');

        var options = {
            method: 'POST',
            uri: this.hpURL + this.IN0002_URL,
            body: this.IN0002_PARAM,
            headers: {
                'content-type': 'application/x-www-form-urlencoded; charset=euc-kr'
            }
        };

        console.log("getHomepageRequest:" + method);
        var rp = require('request-promise');
        //rp(this.hpURL + this.IN0002_URL + this.IN0002_PARAM)
        rp(options)
        .then(function(htmlString) {
            console.log("success:" + htmlString);
            console.log("iconv:" + iconv.convert(htmlString));
        })
        .catch(function(err) {
            console.log("error:" + err);
        });
        // this.http.get(this.hpURL + this.IN0002_URL + this.IN0002_PARAM ).toPromise()
        // .then(response => console.log("response:" + response.toString()));

        return "";
    }
}