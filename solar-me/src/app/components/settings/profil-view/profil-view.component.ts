import { Component, OnInit } from '@angular/core';
import {User} from '../../../model/model-interfaces';
import {UserService} from '../../../services/user-service/user.service';

@Component({
  selector: 'app-profil-view',
  templateUrl: './profil-view.component.html',
  styleUrls: ['./profil-view.component.css']
})
export class ProfilViewComponent implements OnInit {

  user:User = {}

  constructor(private userservice: UserService) { }

  ngOnInit() {
    this.userservice.getUser().subscribe(data => {
      this.user = data;  
    });
  }

}
