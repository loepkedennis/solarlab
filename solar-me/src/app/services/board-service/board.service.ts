import {Task, Setting} from '../../model/model-interfaces'
import {Injectable} from '@angular/core';
import {
  Http, Headers, RequestOptions, RequestMethod, URLSearchParams, RequestOptionsArgs,
  Response
} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import {SettingsService} from '../../services/settings-service/settings-service'


declare let $;

@Injectable()
export class BoardService {


  tasksChanged = new Subject();
  tasks: Task[] = [];
  BASE_URL = '';
  USER_TOKEN = '';

  constructor(private http: Http, private settingservice: SettingsService) {

  }

  setBoardid(boardId: string){
    this.BASE_URL = 'https://api.trello.com/1/boards/'+boardId+'/cards';
  }

  setUserToken(key: string, token: string): string {
    return '?key='+key+'&token='+token;
  }

  getUserToken(key: string, token: string): string {
    return '&key='+key+'&token='+token;
  }

  loadAllTasks(settings: Setting): Observable<Task[]> {
    return this.http.get(this.BASE_URL+ this.setUserToken(settings.trellokey, settings.trellotoken) )
      .map(res => res.json());
  }

  checkTasks(): Observable<Headers> {
    return this.http.head(this.BASE_URL+this.USER_TOKEN)
      .map(res => res.headers);
  }


  getTask(id: number | string, setting: Setting): Observable<Task> {
    return this.http.get(this.BASE_URL +'/'+id + this.setUserToken(setting.trellokey, setting.trellotoken))
      .map(res => res.json());
  }

  getTags(id: string): Observable<Task> {
    return this.http.get(this.BASE_URL +'/'+id + this.USER_TOKEN)
      .map(res => res.json());
  }


  createTask(task: Task, settings: Setting): Observable<Task> {
    return this.http.post(this.BASE_URL+this.setUserToken(settings.trellokey, settings.trellotoken) , task)
      .map(res => res.json());
  }

  createTaskLong(task: Task): Observable<Task> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.BASE_URL+this.USER_TOKEN,
                          JSON.stringify(task),
                          {headers: headers})
      .map(res => res.json());
  }


  updateTask(task: Task, settings: Setting) : Observable<Task>{
    
    return this.http.put('https://api.trello.com/1/cards/'+task.id+this.setUserToken(settings.trellokey, settings.trellotoken), task).map(res =>
      res.json()
    ).do(loadAllTasks => {
      this.tasksChanged.next(loadAllTasks);
    });
    
  }

  deleteTask(task: Task, settings: Setting): Observable<Response> {
    
    return this.http.delete('https://api.trello.com/1/cards/'+task.id+this.setUserToken(settings.trellokey, settings.trellotoken));
  }

  saveTask(task: Task) {
    const options = {
      body: task,
      method: task.id ? RequestMethod.Put :RequestMethod.Post
    };

    return this.http.request(this.BASE_URL+this.USER_TOKEN + (task.id || ''), options)
      .map(res => res.json());
  }

  saveTaskAlternative(task: Task) {
    const requestOptions = new RequestOptions();
    if (task.id) {
      requestOptions.method = 'Put';
    }
    return this.http.post(this.BASE_URL+this.USER_TOKEN + (task.id || ''), task, requestOptions)
      .map(res => res.json());
  }

  findTasksByTitle(title: string): Observable<Task[]> {
    let url = this.BASE_URL+this.USER_TOKEN;
    if (title) {
      url += '?title=' + title;
    }
    return this.http.get(url)
      .map(res => res.json());
  }

  findTasks(query: string = '' , settings: Setting ): Task[] {
  
    this.loadAllTasks(settings).subscribe((tasks) => {
      this.tasks = tasks;
      
    });

    if (!query) {
      return this.tasks;
    }
    return this.tasks.filter(task => {
      return ((task.name && task.name.indexOf(query) !== -1) ||
        (task.desc && task.desc.indexOf(query) !== -1) //||
       // (task.state && task.state.indexOf(query) !== -1)
      );
    });  
   
  }

  updateState(id: number, state: string) {
    const body = {state: state};
    return this.http.patch(this.BASE_URL+this.USER_TOKEN + id, body)
      .map(res => res.json());
  };
}
