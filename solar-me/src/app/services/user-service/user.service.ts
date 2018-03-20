import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { AuthenticationService } from '../authentication-service/authentication.service';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { User } from '../../model/model-interfaces';


@Injectable()
export class UserService {

  private userUrl = 'http://localhost:8080/user';
  user: User = {};

  constructor(private http: Http,  private authenticationService: AuthenticationService) {
  }

  private headersContentTyp = new Headers({
    'Content-Type': 'application/json',
  });

  getUser(): Observable<User> {
    
    return this.http.get(this.userUrl, this.authenticationService.getAuthHeader())
      .map(res => {
        return res.json();
      });
  }

  updateUser(user: User): Observable<User> {
    return this.http.post(this.userUrl, user, this.authenticationService.getAuthHeader())
      .map((response: Response) => {
        return response.json();
      });
  }

  signinUser(user: User): Observable<boolean> {
     return this.http.post(this.userUrl+'/sign-up', user, {headers: this.headersContentTyp })
      .map((response: Response) => {
         
         return true;
      });
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred: ', error); // for demo only
    return Promise.reject(error.message || error);
  }



}
