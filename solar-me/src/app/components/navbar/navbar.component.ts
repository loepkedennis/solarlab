import { Component, Input, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {AuthenticationService} from '../../services/authentication-service/authentication.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() title;
  constructor(private location: Location, private router: Router,  private authenticationservice: AuthenticationService) { }

  ngOnInit() {
  }

  logout(){
    this.authenticationservice.logout();
    this.router.navigate(['/login']);
  }

  routing(){
    if(!!this.title)
    this.location.back();
  }

}
