// Angular Imports
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';

// Components Imports
import {AppComponent} from './app.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {NavbarComponent} from './navbar/navbar.component';
import {SignInFormComponent} from './sign-in-form/sign-in-form.component';
import {SignUpFormComponent} from './sign-up-form/sign-up-form-component';
import {TaskDetailComponent} from './tasks/task-detail/task-detail.component';
import {TaskSearchComponent} from './navbar/task-search/task-search.component';
import {TasksComponent} from './tasks/tasks.component';

// Services Imports
import {AuthService} from './shared/auth.service';
import {TaskService} from './tasks/shared/task.service';
import {TokenService} from './shared/token.service';

// guards imports
import {AuthGuard} from './guards/auth.guard';
import {NotAuthenticatedGuard} from './guards/not-authenticated.guard';

// Modules Imports
import {AppRoutingModule} from './app-routing.module';

// imports jquery
import * as $ from 'jquery';
import * as datetimepicker from 'eonasdan-bootstrap-datetimepicker';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavbarComponent,
    SignInFormComponent,
    SignUpFormComponent,
    TaskDetailComponent,
    TaskSearchComponent,
    TasksComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    NotAuthenticatedGuard,
    TaskService,
    TokenService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
