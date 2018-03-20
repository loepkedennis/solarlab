import {Injectable} from '@angular/core';
import {CanActivate, Router, ActivatedRouteSnapshot,
        RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AuthenticationService} from '../authentication-service/authentication.service'; 

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authenticationservice: AuthenticationService,
              private router: Router) {
  }

  canActivate(routeSnapshot: ActivatedRouteSnapshot,
              routerSnapshot: RouterStateSnapshot): Observable<boolean> | boolean {

    if (!this.authenticationservice.isLoggedIn()) {
      const redirect = encodeURI(routerSnapshot.url);
      this.router.navigate(['/login'], {queryParams: {redirect: redirect}});
    }
    return true;
  }
}
