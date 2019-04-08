import { Component } from '@angular/core';

import { LearningObservablesService } from './learning-observables.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ LearningObservablesService ]
})

export class AppComponent {
  title = 'Gerenciador de Tarefas';

  public constructor(private learningObservables: LearningObservablesService) {}
}
