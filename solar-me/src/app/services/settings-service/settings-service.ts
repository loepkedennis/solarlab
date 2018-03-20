import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {AuthenticationService} from '../authentication-service/authentication.service';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


import {Setting} from '../../model/model-interfaces';


@Injectable()
export class SettingsService {

    setting: Setting = {};


    settingURL="http://localhost:8080/setting";

    BASE_URL="";
    constructor(private http: Http, private authenticationService: AuthenticationService) {
    }

    getSetting(): Observable<Setting> {
        return this.http.get(this.settingURL+"/user", this.authenticationService.getAuthHeader())
        .map((response: Response) => {
                return response.json();
        }).catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
 
    updateSetting(setting: Setting): Observable<Setting>{
      
        return this.http.post(this.settingURL+"/user", setting, this.authenticationService.getAuthHeader())
        .map(res => res.json());
    }

        
    getTrelloToken(): Observable<string>  {
       // let setting: Setting = {}
       return this.getSetting().map(res => {
           return  res.trellokey;
        });

        //return setting.trellotoken + '' + setting.trellokey;
    }
        
}