
export class KakaoDb {
	private Q      = require("q");
	private mysql  = require('mysql');
	//private pool = this.mysql.createPool({
	//	connectionLimit: 10, //important
	//	host     : 'localhost',
	//	user     : 'icr',
	//	password : '1q2w3e4r',
	//	port     : 3306,
	//	database : 'SMART_MESSAGE_VERTWO',
	//	debug: false
	//});
    private pool = this.mysql.createPool({
      connectionLimit: 20,
      host: '125.132.2.20 ',
      user: 'icr',
      password: '1q2w3e4r5t^Y',
      port: 3306,
      database: 'SMART_MESSAGE_VERTWO',
      debug: false
    });

    constructor() { }

	public dbCheckHistory(content: string, user_key: string): void {
		var defered = this.Q.defer();
		this.pool.query('select a.*, b.step, b.trun from TB_AUTOCHAT_HISTORY as a, TB_AUTOCHAT_SCENARIO as b where a.UNIQUE_ID = ? and b.REQ_MESSAGE = a.MESSAGE order by a.wrtdate desc LIMIT 1', [user_key], defered.makeNodeResolver());
		return defered.promise;
	}

	public dbLoadCustomer(user_key: string): void {
        var defered = this.Q.defer();

        this.pool.query('SELECT * FROM TB_AUTOCHAT_CUSTOMER WHERE UNIQUE_ID = ?', user_key, defered.makeNodeResolver());
        return defered.promise;
    }

    public dbBeforeSelectScenario(content: string, user_key: string): void {
        var defered = this.Q.defer();
        // console.log("content:" + content);
        this.pool.query('SELECT a.* FROM TB_AUTOCHAT_SCENARIO as a, (select * from TB_AUTOCHAT_HISTORY where UNIQUE_ID = ? order by wrtdate desc LIMIT 1)  as b WHERE a.REQ_MESSAGE = b.MESSAGE', user_key, defered.makeNodeResolver());
        return defered.promise;
    }

    public dbSelectScenario(content: string): void {
        var defered = this.Q.defer();
        console.log("content:" + content);
        this.pool.query('SELECT * FROM TB_AUTOCHAT_SCENARIO WHERE REQ_MESSAGE = ?', content, defered.makeNodeResolver());
        return defered.promise;
    }

    public dbSelectScenarioSystem(content: string): void {
        var defered = this.Q.defer();
        // console.log("content:" + content);
        this.pool.query('SELECT * FROM TB_AUTOCHAT_SCENARIO WHERE ETC3 = ?', content, defered.makeNodeResolver());
        return defered.promise;
    }

}
