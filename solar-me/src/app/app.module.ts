import { Title, BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { UserService } from './services/user-service/user.service';
import { routingComponents, appRouting } from './app.routing';
import { AlertService } from './services/alert-service/alert.service';
import { AuthenticationService } from './services/authentication-service/authentication.service';
import { TaskService } from './services/task-service/task.service'
import { SettingsService } from './services/settings-service/settings-service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { BoardService } from './services/board-service/board.service';
import { EditCardComponent } from './components/board/edit-card/edit-card.component';
import { CardItemComponent } from './components/board/card-item/card-item.component';
import { CardOverviewComponent } from './components/board/card-overview/card-overview.component';
import {EditTaskGuard} from './components/board/edit-card/edit-card.guard';
import {AuthGuard} from './services/auth-guard/auth.guard';




@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    NavbarComponent,
    TasksComponent,
    CardItemComponent,
    EditCardComponent,
    CardItemComponent,
    CardOverviewComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    appRouting
  ],
  providers: [
    UserService,
    Title,
    AlertService,
    BoardService,
    EditTaskGuard,
    AuthenticationService,
    TaskService,
    SettingsService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
