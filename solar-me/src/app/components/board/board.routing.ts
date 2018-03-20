import {Routes} from '@angular/router';
import {BoardComponent} from './board.component';
import {EditCardComponent} from './edit-card/edit-card.component';
import {EditTaskGuard} from './edit-card/edit-card.guard';
import {CardOverviewComponent} from './card-overview/card-overview.component';
import {CardItemComponent} from './card-item/card-item.component';

export const boardRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '', component: BoardComponent,
        data: {title: 'Task-Übersicht'}
      },
      {
        path: 'edit/:cardid', component: EditCardComponent,
        data: {title: 'Aufgabe bearbeiten'},
        canDeactivate: [EditTaskGuard]
      },
      {
        path: 'new', component: EditCardComponent,
        data: {title: 'Neue Aufgabe anlegen'},
        canDeactivate: [EditTaskGuard]
      },

      {
        path: 'overview/:overviewid',
        component: CardOverviewComponent
      },

      {path: 'e/:cardid', redirectTo: 'edit/:cardid'},
      {path: '**', redirectTo: ''},
    ]
  }, 
];

export const boardRoutingComponents = [BoardComponent, CardItemComponent, EditCardComponent, CardOverviewComponent];
export const boardRoutingProviders = [EditTaskGuard];

