
export class TB_AUTOCHAT_SCENARIO {
    SEQ: number;
    STEP: number;
    TRUN: number;
    REQ_MESSAGE: string;
    RES_MESSAGE: string;
    WRTDATa: Date;
    ETC1: string;
    ETC2: string;
    ETC3: string;
};

export class KakaoSocket {
    public inputData: TB_AUTOCHAT_SCENARIO[];

    constructor(private io: any) {
        console.log("KakaoSocket constructor: " + io);
        this.inputData = io;
    }

    // Add signal
    public findXml(tagName: string): void {
        console.log("findXml call:" + tagName);
        
        this.inputData.filter(function (item) { return item.REQ_MESSAGE === tagName; });
    }
}