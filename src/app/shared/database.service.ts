import { Injectable } from "@angular/core";

import { ICR_Counselor } from "../../models";

@Injectable()
export class DatabaseService {

    private Q    ;
    private mysql;
    private pool ;
    constructor() {
        this.Q          = require("q");
        this.mysql      = require('mysql');
        this.pool = this.mysql.createPool({
            connectionLimit: 10, //important
            host     : '14.63.213.246',
            user     : 'smarttest',
            password : 'test1234',
            port     : 10003,
            database : 'SMART_MESSAGE_VERTWO',
            debug: false
        });
        console.log("DatabaseService constructor here?");
    }

    private getCounselor(login_id: string, callback: any): void {
        var re: ICR_Counselor;
        this.Q.all([this.dbSelectCounselor(login_id)]).then(function(results){
            // console.log("results:" + JSON.stringify(results));
            re = results[0][0][0];
        }).then(function() {
            callback(null, JSON.parse(re.NAME));
        })
        .done();
    }

    private dbSelectCounselor(login_id: string): void {
        var defered = this.Q.defer();

        this.pool.query('SELECT * FROM TB_ICR_COUNSELOR WHERE UNIQUE_ID = ?', login_id, defered.makeNodeResolver());
        return defered.promise;
    }

    private getKeyboardResponse(updateType: string, content: string, user_key: string, callback: any): void {
        var re;
        this.Q.all([this.dbLoadCustomer(user_key)]).then(function(results){
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

    public dbLoadCustomer(user_key: string): void {
        var defered = this.Q.defer();

        this.pool.query('SELECT * FROM TB_AUTOCHAT_CUSTOMER WHERE UNIQUE_ID = ?', user_key, defered.makeNodeResolver());
        return defered.promise;
    }

}