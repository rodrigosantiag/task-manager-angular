import { Component } from '@angular/core';

@Component({
  selector: 'app-learning-bindings',
  templateUrl: './learning-bind.component.html'
})

export class LearningBindsComponent {
  // mouse events
  public onClick() {
    console.log('Evento onClick disparado!');
  }

  public onMouseOver() {
    console.log('Evento onMouseOver disparado!');
  }

  // key events
  public onKeyDown() {
    console.log('Evento onKeyDown disparado!');
  }

  public onKeyUp() {
    console.log('Evento onKeyUp disparado!');
  }
}
