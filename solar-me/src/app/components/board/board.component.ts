import {Component, OnInit, OnDestroy} from '@angular/core';
import {Location} from '@angular/common';
import {FormControl} from '@angular/forms';
import {Task} from '../../model/model-interfaces';
import {BoardService} from '../../services/board-service/board.service';
import {Router, ActivatedRoute} from '@angular/router';
import {Observable, Subscription} from 'rxjs/Rx';
import {Http, Response, RequestOptionsArgs} from '@angular/http';
import { SettingsService } from '../../services/settings-service/settings-service';
import { TaskService } from '../../services/task-service/task.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  providers: [BoardService],
})
export class BoardComponent implements OnInit {

  tasksChangedSubscription: Subscription;
  selectedTaskId: string | number = null;
  
   // private $tasks: Observable<Task[]>;
  
    public tasks: Task[];
  
    public searchTerm = new FormControl();
  
    private error: string;
  
    private errorHandler = (error) => {
      console.log('Es ist ein Fehler aufgetreten', error);
      return Observable.of([]);
    }
  
  
    constructor(private taskService: BoardService,
                private router: Router,
                private route: ActivatedRoute,
                private location: Location,
                private http: Http, private settingsservice: SettingsService, 
                private cardservice : TaskService) {
    }
  
    ngOnInit() {    
    
    let boardId = this.route.snapshot.params['id'];
    
    this.taskService.setBoardid(boardId);
 
      // this.taskService.checkTasks().subscribe((headers) => {
      //   console.log('Die Größe des Inhalts beträgt',
      //     headers.get('Content-Length'));
      // });
  /*
      // 1.Version: Verwendung von http in der Komponente
  
      this.http.get(` http://localhost:3000/api/tasks`)
        .map((response: Response) => response.json())
        .subscribe((tasks) => {
            this.tasks = tasks;
          },
          (error: Response) => {
            switch (error.status) {
              case 404:
                console.log('Der Endpunkt wurde nicht gefunden', error);
                break;
              case 500:
                console.log('Server-Fehler beim Laden der Aufgaben', error);
                break;
              default:
                console.log('Irgendetwas anderes ist schief gelaufen', error);
            }
          });
  */
  
  this.tasksChangedSubscription = this.settingsservice.getSetting().subscribe(res =>{
    this.tasksChangedSubscription = this.taskService.loadAllTasks(res).subscribe(tasks => {
      this.tasks = tasks;
    });
  });


  
      //this.$tasks = this.taskService.loadAllTasks();
  
  
  /*
      this.route.queryParams.subscribe((params) => {
        const query = decodeURI(params['query'] || '');
        this.searchTerm.setValue(query);
        this.$tasks = this.taskService.findTasks(query);
      });

  */
  
  }

  ngOnDestroy(){
  
    this.tasksChangedSubscription.unsubscribe();
  }
  
    deleteTask(task: Task) {
      
      if(task.id){
        this.cardservice.deleteTask(task.id).subscribe(res => {
          console.log(res.status);
        })
      }

      this.settingsservice.getSetting().subscribe(res => {
        this.taskService.deleteTask(task, res).subscribe(_ => {
          this.tasks = this.tasks.filter(_task => {
            return _task.id !== task.id;
          });
        })

      })

    }
  
    selectTask(taskId: string | number) {
      this.selectedTaskId = taskId;
    }
  
    findTasks(queryString: string) {
      this.settingsservice.getSetting().subscribe(res =>{
      this.tasks = this.taskService.findTasks(queryString, res);
      });
     
      this.adjustBrowserUrl(queryString);
    }
  
    adjustBrowserUrl(queryString: string = '') {
      var absoluteUrl = this.location.path().split('?')[0];
      var queryPart = queryString !== '' ? `query=${queryString}` :'';
      this.location.replaceState(absoluteUrl, queryPart);
    }

}
