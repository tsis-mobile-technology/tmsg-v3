

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
                //var data = euckr2utf8.convert(htmlString).toString('utf-8');
                //console.log("from: " + htmlString);
                //console.log("to: " + data);
                var jsonObj = fastXmlParser.parse(htmlString, xmlOptions);
                //var resultObj = JSON.parse(JSON.stringify(jsonObj.list)).customer;

                var resultSets: IN0002_CUSTOMER;
                resultSets = jsonObj.list.customer;
                var binaryName = new Buffer(resultSets.Name, 'binary');
                console.log("resultSets.Name:from" + binaryName);
                console.log("resultSets.Name:to" + euckr2utf8.convert(binaryName));
                console.log("resultSets.Name:to" + euckr2utf8.convert(binaryName).toString());
                console.log("resultSets.Name:to" + euckr2utf8.convert(binaryName).toString('UTF-8'));
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
                console.log("resultSets.Name:from" + buff_euckr);
                console.log("resultSets.Name:to" + euckr2utf8.convert(buff_euckr));

                // console.log('XMLtoJSON:' + JSON.stringify(jsonObj.REQUEST));
                // console.log('XMLtoJSON:' + JSON.parse(JSON.stringify(jsonObj.REQUEST)).RESULT_CODE);
                // console.log('XMLtoJSON:' + JSON.parse(JSON.stringify(jsonObj.REQUEST)).RESULT_MSG);
                // console.log(resultObj);
                //return resultSets.Name + "/" + resultSets.Id + "/" + resultSets.AccountId;
                deferred.resolve( euckr2utf8.convert(binaryName) + "/" + resultSets.Id + "/" + resultSets.AccountId);
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
