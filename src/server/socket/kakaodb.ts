
export class KakaoDb {
	private Q      = require("q");
	private mysql  = require('mysql');
	private pool   = null;

  constructor() {  
    this.pool = this.mysql.createPool({
      connectionLimit: 2,
      host: '14.63.213.246',
      user: 'smarttest',
      password: 'test1234',
      port: 10003,
      database: 'SMART_MESSAGE_VERTWO',
      debug: false
    });
  // this.pool = this.mysql.createPool({
  //   connectionLimit: 10, //important
  //   host     : 'localhost',
  //   user     : 'icr',
  //   password : '1q2w3e4r',
  //   port     : 3306,
  //   database : 'SMART_MESSAGE_VERTWO',
  //   debug: false
  // });
  // console.log("KakaoDB constructor()");
  // this.pool = this.mysql.createPool({
  //   connectionLimit: 20,
  //   host: '125.132.2.20 ',
  //   user: 'icr',
  //   password: '1q2w3e4r5t^Y',
  //   port: 3306,
  //   database: 'SMART_MESSAGE_VERTWO',
  //   debug: false
  // });
  }

	public dbCheckHistory(content: string, user_key: string): any {
		var defered = this.Q.defer();
		this.pool.query('select a.*, b.step, b.trun from TB_AUTOCHAT_HISTORY as a, TB_AUTOCHAT_SCENARIO as b where a.UNIQUE_ID = ? and b.REQ_MESSAGE = a.MESSAGE order by a.wrtdate desc LIMIT 1', [user_key], defered.makeNodeResolver());
		return defered.promise;
	}

  public dbLoadCustomer(user_key: string): any {
    var defered = this.Q.defer();

    this.pool.query('SELECT * FROM TB_AUTOCHAT_CUSTOMER WHERE UNIQUE_ID = ?', user_key, defered.makeNodeResolver());
    return defered.promise;
  }

  public dbClearCustomer(user_key: string): any {
    var defered = this.Q.defer();

    this.pool.query('DELETE FROM TB_AUTOCHAT_CUSTOMER WHERE UNIQUE_ID = ?', user_key, defered.makeNodeResolver());
    return defered.promise;
  }

  public dbBeforeSelectScenario(content: string, user_key: string): any {
    var defered = this.Q.defer();
    // console.log("content:" + content);
    this.pool.query('SELECT a.* FROM TB_AUTOCHAT_SCENARIO as a, (select * from TB_AUTOCHAT_HISTORY where UNIQUE_ID = ? order by wrtdate desc LIMIT 1)  as b WHERE a.REQ_MESSAGE = b.MESSAGE', user_key, defered.makeNodeResolver());
    return defered.promise;
  }

  public dbSelectScenario(content: string): any {
    var defered = this.Q.defer();
    console.log("dbSelectScenario:" + content);
    this.pool.query('SELECT * FROM TB_AUTOCHAT_SCENARIO WHERE REQ_MESSAGE = ?', content, defered.makeNodeResolver());
    return defered.promise;
  }

  public dbSelectScenarioSystem(content: string): any {
    var defered = this.Q.defer();
console.log("dbSelectScenarioSystem:" + content);
    this.pool.query('SELECT * FROM TB_AUTOCHAT_SCENARIO WHERE ETC3 = ?', content, defered.makeNodeResolver());
    return defered.promise;
  }

  private dbSaveHistory(content: string, user_key: string, type: string): any {
    var defered = this.Q.defer();
    var post = {UNIQUE_ID:user_key, MESSAGE:content};

    this.pool.query('INSERT INTO TB_AUTOCHAT_HISTORY SET ?', post, defered.makeNodeResolver());
    return defered.promise;
  }

  private dbSaveCustomer(updateType: string, content: string, user_key: string): any {

    var post = {UNIQUE_ID:user_key, NAME:content};
    console.log("db values:" + JSON.stringify(post));

    if( updateType == "Name" ) {
      this.pool.query('INSERT INTO TB_AUTOCHAT_CUSTOMER SET ?', post, function(err, rows, fields) {
        if(err) console.log("Query Error:", err);
      });
    } else if( updateType == "Phone" ) {
      this.pool.query('UPDATE TB_AUTOCHAT_CUSTOMER SET PHONE = ? WHERE UNIQUE_ID = ?', [content, user_key], function(err, rows, fields) {
        if(err) console.log("Query Error:", err);
      });
    } else if( updateType == "Auth") {
      this.pool.query('UPDATE TB_AUTOCHAT_CUSTOMER SET AUTH = ? WHERE UNIQUE_ID = ?', ["Y", user_key], function(err, rows, fields) {
        if(err) console.log("Query Error:", err);
      });
    }
  }

}
