import { Injectable } from "@angular/core";

 var Q          = require("q");
 var mysql      = require('mysql');

 var pool = mysql.createPool({
    connectionLimit: 10, //important
    host     : '14.63.213.246',
    user     : 'smarttest',
    password : 'test1234',
    port     : 10003,
    database : 'SMART_MESSAGE_VERTWO',
    debug: false
});

@Injectable()
export class DatabaseService {

    constructor() {
        console.log("DatabaseService constructor here?");
    }

    private getKeyboardResponse(updateType: string, content: string, user_key: string, callback: any): void {
        var re;
        Q.all([this.dbLoadCustomer(user_key)]).then(function(results){
            // console.log("results:" + JSON.stringify(results));
            re = results[0][0][0];
            this.dbSaveCustomer(updateType, content, user_key);
        }).then(function() {
            callback(null, JSON.parse(re.RES_MESSAGE).keyboard);
        })
        .done();
    }

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

    public dbLoadCustomer(user_key: string): void {
        var defered = Q.defer();

        pool.query('SELECT * FROM TB_AUTOCHAT_CUSTOMER WHERE UNIQUE_ID = ?', user_key, defered.makeNodeResolver());
        return defered.promise;
    }

}