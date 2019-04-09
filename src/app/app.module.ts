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
