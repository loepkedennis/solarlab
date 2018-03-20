import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { Profil } from './profil';
import {UserService} from '../../../services/user-service/user.service';
import {SettingsService} from '../../../services/settings-service/settings-service';
import {User, Setting} from '../../../model/model-interfaces';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profil-edit',
  templateUrl: './profil-edit.component.html',
  styleUrls: ['./profil-edit.component.css']
})
export class ProfilEditComponent implements OnInit {

  profil: Profil = new Profil();
  user: User = {};

  constructor(private location: Location, 
    private userservice: UserService, 
    private settingservice: SettingsService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
  
    this.userservice.getUser().subscribe(data => {
      this.user = data;
      
      this.profil.vorname = this.user.firstname;
      this.profil.nachname = this.user.lastname;
      this.profil.passwort = this.user.password;
      this.profil.passwortw = this.user.password;
      
    }); 
  }

  savePersonalProfil(value: any){
    this.profil = value;
    this.user.firstname = this.profil.vorname;
    this.user.lastname = this.profil.nachname;
    this.user.password = this.profil.passwort;
    this.userservice.updateUser(this.user).subscribe(
      user => {
        console.log("Useränderung erfolgreich gespeichert!", user);
        this.user = user;
        this.reloadProfil();
        this.router.navigate(['/settings']);
      }
    );
  }

  private reloadProfil(){
    this.profil.nachname = this.user.lastname;
    this.profil.vorname = this.user.firstname;
  }

  cancel() {
    this.location.back();
    return false;
  }

}
