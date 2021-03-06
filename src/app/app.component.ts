import { Component } from '@angular/core';

import {TokenService} from './shared/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Gerenciador de Tarefas';

  public constructor(private tokenService: TokenService){
    this.tokenService.init({
      // apiBase: 'http://api.taskmanager.local:3000',
      apiBase: 'https://taskmanager-santive.herokuapp.com',
      globalOptions: {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/vnd.taskmanager.v2'
        }
      }
    });
  }
}
