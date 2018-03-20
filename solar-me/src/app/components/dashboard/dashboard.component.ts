import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Board } from '../board/board';
import { UserService } from '../../services/user-service/user.service';
import { AuthenticationService } from '../../services/authentication-service/authentication.service';
import { SettingsService } from '../../services/settings-service/settings-service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  boards: Board[];

  constructor(private http: Http, private settingservice: SettingsService, private userservice: UserService, private authenticationservice: AuthenticationService) { 

  }

  ngOnInit() {
    this.boards = [];
    
    this.settingservice.getSetting().subscribe(data =>{
         
         this.http.get('https://api.trello.com/1/members/me/boards?key=' +  data.trellokey + '&token=' + data.trellotoken)
         .map((response: Response) => response.json())
         .subscribe(boards => {this.boards = boards;
     
       }); 
    });
   
  }

  public addBoard(){
    console.log('neues Board hinzugefügt');


  }

}
