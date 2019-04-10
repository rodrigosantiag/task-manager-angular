// Angular Imports
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {NgModule} from '@angular/core';

// Components Imports
import {AppComponent} from './app.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {NavbarComponent} from './navbar/navbar.component';
import {TaskDetailComponent} from './tasks/task-detail/task-detail.component';
import {TaskSearchComponent} from './navbar/task-search/task-search.component';
import {TasksComponent} from './tasks/tasks.component';

// Services Imports
import {TaskService} from './tasks/shared/task.service';

// Modules Imports
import {AppRoutingModule} from './app-routing.module';

// In memory web api
import {InMemoryWebApiModule} from 'angular-in-memory-web-api';
import {InMemoryTaskDataService} from './in-memory-task-data.service';

// rjxs operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

// rxjs modules
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavbarComponent,
    TaskDetailComponent,
    TaskSearchComponent,
    TasksComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    InMemoryWebApiModule.forRoot(InMemoryTaskDataService)
  ],
  providers: [
    TaskService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
