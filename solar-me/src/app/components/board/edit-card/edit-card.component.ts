import { ViewChild, Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Http, Response, RequestOptionsArgs, Headers } from '@angular/http';
import { Task, Gitlab, Trello } from '../../../model/model-interfaces';
import { BoardService } from '../../../services/board-service/board.service';
import { SettingsService } from '../../../services/settings-service/settings-service';
import { TaskService } from '../../../services/task-service/task.service';
import { Subscription } from 'rxjs/Subscription';
import * as model from '../../../model/model-interfaces';

@Component({
  selector: 'app-edit-card',
  templateUrl: './edit-card.component.html',
  styleUrls: ['./edit-card.component.css'],
  providers: [BoardService]
})
export class EditCardComponent implements OnInit, OnDestroy {

  model = model;

  task: Task = {};
  cardId: string;
  saved = false;
  gitlablist: Gitlab[];
  project: Gitlab = {};
  trellolist: Trello[];
  trello: Trello = {};

  @ViewChild(NgForm) form: NgForm;

  subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private taskService: BoardService,
    private settingService: SettingsService,
    private router: Router,
    private titleService: Title,
    private location: Location,
    private http: Http,
    private cardService: TaskService) {
  }

  ngOnInit() {
    let boardId = this.route.snapshot.params['id'];
    this.taskService.setBoardid(boardId);
    // this.subscription = this.route.params
    // .map(params => params['cardid'])
    // .filter(id => id != undefined)
    // .flatMap(id =>  this.taskService.getTask(id))
    // .subscribe(task => {
    //   this.task = task;
    // })

    this.cardId = this.route.snapshot.params['cardid'];
    if (this.cardId != undefined) {
      this.settingService.getSetting().subscribe(res => {
        this.taskService.getTask(this.cardId, res).subscribe(task => {
          this.task = task;

          this.http.get('https://gitlab.com/api/v4/groups/2198287/projects?private_token=' + res.gitlabapitoken)
            .map((response: Response) => response.json())
            .subscribe(res => {
              this.gitlablist = res;

              this.cardService.getTaskById(this.cardId).subscribe(res => {
                if (res != null) {

                  for (let num of this.gitlablist) {


                    if (num.id == res.projectId) {
                      this.project = num;

                    }
                  }

                }
              })

            })

          this.http.get('https://api.trello.com/1/boards/' + boardId + '/lists?key=' + res.trellokey + '&token=' + res.trellotoken)
            .map((response: Response) => response.json())
            .subscribe(res => {
              this.trellolist = res;


              this.cardService.getTaskById(this.cardId).subscribe(res => {
                if (res != null) {

                  for (let num of this.trellolist) {


                    if (num.id == res.mergeby) {
                      this.trello = num;

                    }
                  }

                }
              })

              this.trellolist.sort(function (obj1, obj2) {
                // Ascending: first age less than the previous
                return obj1.pos - obj2.pos;
              });


            });


          this.cardService.getTaskById(this.cardId).subscribe(res => {
            if (res != null) {
              this.task.taskid = res.taskid;
              // beschrebung overload
              if(res.desc !== this.task.desc){
                if(res.desc.length > this.task.desc.length){
                  this.task.desc = res.desc;
                }
              }
              

            }
          })


        })

      })


      //this.cardId = this.route.snapshot.params['cardid'];

    }
    else {

    }



    //   //Statische Alternative:
    //    const id = this.route.snapshot.params['id'];
    //    this.task = this.taskService.getTask(id);

  }

  ngOnDestroy() {
    //this.subscription.unsubscribe();
  }

  /* this.subscription = this.route.params
     .map((params) => params['id'])
     .flatMap((id) => this.taskService.getTaskAsync(id))
     .subscribe(task => this.task = task);
*/

  // addTag() {
  //   this.task.tags = this.task.tags || [];
  //   this.task.tags.push({label: ''});
  //   return false;
  // }

  // removeTag(i: number) {
  //   this.task.tags.splice(i, 1);
  //   return false;
  // }

  saveTask(value: any) {

    this.task.desc = value.desc;
    this.task.name = value.name;
    this.project = value.project;
    this.trello = value.trello;
    this.task.mergeby = this.trello.id;
    this.task.projectId = this.project.id
    console.log(this.project.name_with_namespace);
    console.log(this.task.id + ' ' +
      this.task.desc + ' ' +
      this.task.name + ' ' +
      this.task.projectId + ' ' +
      this.task.taskid
    );

    if (this.task.id && !this.task.taskid) {
      console.log("Trello ID VORHANDEN und Solar ID NICHT VORHANDEN")
      this.cardService.saveTask(this.task).subscribe(result => {

        this.task.taskid = result.taskid;
        if(this.project){

        
        if (this.task.desc.search("### [http://]\w* ###") == +1) {
          console.log("REG WURDE GEFUNDEN!!!")
          this.task.desc = this.task.desc.replace('### [http://]\w* ###', '### ' + this.project.http_url_to_repo + ' Branch: Solar-' + this.task.taskid + ' ###');
        }
        else {
          console.log("REG WURDE NICHT GEFUNDEN!!!")
          this.task.desc = this.task.desc + ' \n### Clone URL:\n ### ' + this.project.http_url_to_repo + ' Branch: Solar-' + this.task.taskid + ' ###';

        }
      }

        this.settingService.getSetting().subscribe(res => {
          this.taskService.updateTask(this.task, res).subscribe(res => console.log(res.name));
          
       
        
          this.http.post('https://gitlab.com/api/v4/projects/'+this.task.projectId+'/repository/branches?branch=Solar-'+this.task.taskid+'&ref=master', {},{
            headers: new Headers({
              'PRIVATE-TOKEN': res.gitlabapitoken
            })
            }).subscribe(res =>{
            console.log(res.status);
          })
        })
      });




    }
    else if(this.task.id && this.task.taskid){
      console.log("Trello ID VORHANDEN und Solar ID VORHANDEN")
      this.cardService.updateTask(this.task).subscribe(res => {
       if(this.project){
        if (this.task.desc.search("### [http://]\w* ###") == +1) {
          console.log("REG WURDE GEFUNDEN!!!")
          this.task.desc = this.task.desc.replace('### [http://]\w* ###', '### ' + this.project.http_url_to_repo + ' Branch: Solar-' + this.task.taskid + ' ###');
        }
        else {
          console.log("REG WURDE NICHT GEFUNDEN!!!")
          this.task.desc = this.task.desc + ' \n### Clone URL:\n ### ' + this.project.http_url_to_repo + ' Branch: Solar-' + this.task.taskid + ' ###';

        }
      }
      this.settingService.getSetting().subscribe(res => {
        this.taskService.updateTask(this.task, res).subscribe(res => console.log(res.name));
      })
      })

    }
    
    else {
      console.log("2 Auswahl!");
      /*
      this.cardService.saveTask(this.task).subscribe(data => {
        this.cardService.getTaskById(this.cardId).subscribe(result => {

          this.task.taskid = result.taskid;


          if (this.task.desc.search("### [http://]\w* ###") == +1) {

            this.task.desc = this.task.desc.replace('### [http://]\w* ###', '### ' + this.project.http_url_to_repo + ' Branch: Solar-' + this.task.taskid + ' ###');
          }
          else {

            this.task.desc = this.task.desc + ' \n### Clone URL:\n ### ' + this.project.http_url_to_repo + ' Branch: Solar-' + this.task.taskid + ' ###';

          }


          this.settingService.getSetting().subscribe(res => {
            this.taskService.updateTask(this.task, res).subscribe();
          })

        })

      })*/
    }

    this.saved = true;
    const url = this.router.parseUrl(this.router.url);

    const relativeUrl = this.router.url.includes('edit') ? '../..' : '..';
    this.router.navigate([relativeUrl], { relativeTo: this.route });
    //  this.router.navigateByUrl(url);
  }


  deleteTask(task: Task) {
    this.settingService.getSetting().subscribe(res => {
      this.taskService.deleteTask(task, res).subscribe(_ => {
        console.log("Löschen erfolgreich")
      })
    })

  }

  cancel() {
    this.location.back();
    return false;
  }

  canDeactivate(): boolean {
    if (this.saved || !this.form.dirty) {
      return true;
    }
    return window.confirm(`Ihr Formular besitzt ungespeicherte Änderungen, möchten Sie die Seite wirklich verlassen?`);
  }

}
