import { Component, OnInit } from '@angular/core';
import { Profil, User } from '../../model/model-interfaces';
import { UserService } from '../../services/user-service/user.service';
import { AuthenticationService  } from '../../services/authentication-service/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  profil: Profil = {};
  user : User = {};
  constructor(private userservice: UserService, private route: ActivatedRoute,
    private router: Router, private authenticationservice: AuthenticationService) { }

  ngOnInit() {
    this.authenticationservice.logout();
  }


  signin(value:any){
      this.profil = value;

      if(this.profil.key = "SolarLab"){

      this.user.firstname = this.profil.firstname;
      this.user.lastname = this.profil.lastname;
      this.user.password = this.profil.password;
      this.user.username = this.profil.username

      if(this.profil.password === this.profil.passwordw){
        this.userservice.signinUser(this.user).subscribe(
          user => {
            console.log("Useränderung erfolgreich registriert!", user);
            this.router.navigate(['/login']);
          }
        );
      }

    }

  }

}
