import { Injectable }    from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate} from '@angular/router';
import { Observable }    from 'rxjs/Observable';
import {EditCardComponent} from './edit-card.component';

@Injectable()
export class EditTaskGuard implements CanDeactivate<EditCardComponent> {

  canDeactivate(component: EditCardComponent,
                route: ActivatedRouteSnapshot,
                router: RouterStateSnapshot): Observable<boolean> | boolean {
    return component.canDeactivate();
  }
}
