
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
    constructor(private io: TB_AUTOCHAT_SCENARIO[]) {
        this.inputDatas = io;
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
}