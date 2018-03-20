import {Routes, RouterModule} from '@angular/router';
import {ProfilViewComponent} from './profil-view/profil-view.component';
import {ProfilEditComponent} from './profil-edit/profil-edit.component';
import {SettingsComponent} from './settings.component';
import {EditComponent} from './edit/edit.component';


export const settingsRoutes: Routes = [{
  path: '', component: SettingsComponent,
  children: [
    {
      path: '',
      component: ProfilViewComponent
    },
    {path: '',
    component: EditComponent,
    outlet: 'editview'},
    {
      path: 'edit', component: ProfilEditComponent,
    }
  ]
},

];

export const settingsRoutingComponents = [SettingsComponent, ProfilViewComponent, ProfilEditComponent, EditComponent];
export const settingsRoutingProviders = [];

export const settingsRouting = RouterModule.forChild(settingsRoutes);