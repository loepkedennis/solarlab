import { Injectable } from '@angular/core';
import { Http, Headers, Response, Request, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {AuthenticationService} from '../authentication-service/authentication.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import {Task} from '../../model/model-interfaces';

@Injectable()
export class TaskService {
    private taskURL = 'http://localhost:8080/tasks';

    constructor(private http: Http, private authenticationService: AuthenticationService) {
    }


    saveTask(task: Task): Observable<Task>{
       return  this.http.post(this.taskURL, task, this.authenticationService.getAuthHeader()).map(res =>{
            return res.json();
            
        })
    }

    updateTask(task: Task): Observable<Task>{
        return this.http.put(this.taskURL, task, this.authenticationService.getAuthHeader()).map( res =>{
            return {}
        });
    }

    deleteTask(id: string): Observable<Response> {
       return this.http.delete(this.taskURL+'/'+id, this.authenticationService.getAuthHeader());
    }

    getTaskById(id: string): Observable<Task>{
        return this.http.get(this.taskURL+'/'+id, this.authenticationService.getAuthHeader()).map( res => {
                    if(res.ok){
                    return res.json()
                    }
                    else{
                        return {}
                    }
            
            }
        );
    }

}