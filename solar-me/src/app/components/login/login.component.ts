import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticationService } from '../../services/authentication-service/authentication.service';
import { AlertService } from '../../services/alert-service/alert.service';
import { User} from '../../model/model-interfaces';


@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    model: User = {};
    loading = false;
    error = '';
    returnUrl: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        //this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login(value: any) {
        this.loading = true;
        this.model = value;
        console.log(this.model.username);
        console.log(this.model.password);
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
                result => {
                    if(result === true){
                        console.log("Login erfolgreich!");
                        this.router.navigate(['/']);
                    }else{
                        this.error = 'Username or password is incorrect';
                        this.loading = false;
                    }
                    
                },
                error => {
                   // this.alertService.error(error);
                    this.loading = false;
                    this.error = error
                });
    }
}
