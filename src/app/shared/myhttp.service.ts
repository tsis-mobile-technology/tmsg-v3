import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class MyHttpService {
    constructor(private _http:Http) {}

    getDataObservable(url:string) {
        return this._http.get(url)
            .map(data => {
                console.log("I CAN SEE DATA HERE: ", JSON.stringify(data));
                var body = JSON.stringify(data);

                return body;
                // return body.data;
        });
    }

  // getDataObservable(url:string) {
  //   return this._http.get(url)
  //                   .map(this.extractData)
  //                   .catch(this.handleError);
  // }

  // private extractData(res: Response) {
  //   let body = res.json();
  //   // return data => {body.data};
  //   console.log(body);
  //   return data => body.data || { };
  // }

  // private handleError (error: Response | any) {
  //   // In a real world app, you might use a remote logging infrastructure
  //   let errMsg: string;
  //   if (error instanceof Response) {
  //     const body = error.json() || '';
  //     const err = body.error || JSON.stringify(body);
  //     errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
  //   } else {
  //     errMsg = error.message ? error.message : error.toString();
  //   }
  //   // console.error(JSON.stringify(errMsg));
  //   console.log(errMsg);
  //   return Observable.throw(errMsg);
  // }
}