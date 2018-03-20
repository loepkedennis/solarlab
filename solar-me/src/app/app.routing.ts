import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BoardComponent } from './components/board/board.component';
import { EditCardComponent } from './components/board/edit-card/edit-card.component';
import {settingsRoutes, settingsRoutingComponents, settingsRoutingProviders} from './components/settings/settings.routing';
import {boardRoutes, boardRoutingComponents, boardRoutingProviders } from './components/board/board.routing';
//import { AuthGuard } from './_guards/index';
import {AuthGuard} from './services/auth-guard/auth.guard'

const appRoutes: Routes = [
    { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'board/:id', children: boardRoutes, canActivate: [AuthGuard]},
    { path: 'settings', children: settingsRoutes, canActivate: [AuthGuard]},
   // { path: 'new', component: EditCardComponent},
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRouting = RouterModule.forRoot(appRoutes);
export const routingComponents = [DashboardComponent, LoginComponent, RegisterComponent, BoardComponent, ...settingsRoutingComponents, ...boardRoutingComponents];