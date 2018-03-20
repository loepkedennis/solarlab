import { Injectable } from '@angular/core';
import { Http, Headers, Response, Request, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class AuthenticationService {
    private authUrl = 'http://localhost:8080/login';
    private headers = new Headers({'Content-Type': 'application/json'});
    constructor(private http: Http) { }

    login(username: string, password: string): Observable<boolean> {
        this.logout();
        
        return this.http.post(this.authUrl, JSON.stringify({username: username, password: password}), {headers: this.headers})
        .map((response: Response) => {
           
            let token = response.headers.get("authorization");
           
            if(token){
                localStorage.setItem('currentUser', JSON.stringify({token: token}));
                
                return true;
            }else{
                return false;
            }
        
        });

        // return this.http.post(this.authUrl, JSON.stringify({username: username, password: password}))
        // .map((request: Response) => {
        //     console.log(request.headers.get("authorization"));
        //     var token = request.headers.get("authorization").replace("Bearer ", ""); 
        //     console.log(token);
        //     return true;

        // });
       
          // We're assuming the response will be an object
          // with the JWT on an id_token key 
       
    }

    getToken(): String {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if(currentUser === null){
            return "";
        }
        else {
       
        return currentUser.token;
        }
    }

    isLoggedIn(): boolean {
        var token =  this.getToken();
      
        return token && token.length > 0;
      }

    logout() {
        // remove user from local storage to log user out
            localStorage.removeItem('currentUser');
        
        
    }

    getAuthHeader():  RequestOptions {
        let header = new Headers({
            'Content-Type': 'application/json',
            'Authorization': this.getToken()
          }) ;
        
        return  new RequestOptions ({headers: header});
     }
}