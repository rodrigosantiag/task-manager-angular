import {Component, OnInit} from '@angular/core';

import 'rxjs/add/operator/switchMap';


import { Task } from './shared/task.model';
import {TaskService} from './shared/task.service';
import {Params} from '@angular/router';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html'
})

export class TasksComponent implements OnInit {
  public tasks: Array<Task>;
  public newTask: Task;

  public constructor(private taskService: TaskService) {
    this.newTask = new Task(null, '');
  }

  public ngOnInit(): void {
    this.taskService.getTasks()
      .subscribe(
        tasks => this.tasks =  tasks,
        error => alert('Ocorreu um erro no servidor, tente mais tarde')
      );
  }

  public createTask(): void {
    this.newTask.title = this.newTask.title.trim()

    if (!this.newTask.title) {
      alert('A tarefa deve ter um título');
    } else {
      this.taskService.createTask(this.newTask)
        .subscribe(
          (task) => {
            this.tasks.push(task);
            this.newTask = new Task(null, '');
          },
          () => alert('Ocorreu um erro no servidor, tente mais tarde.')
        );
    }
  }

  public deleteTask(task: Task): void {
    if (confirm(`Deseja realmente excluir a tarefa "${task.title}"?`)) {
      this.taskService.deleteTask(task.id)
        .subscribe(
          () => this.tasks = this.tasks.filter(t => t !== task),
          () => alert('Ocorreu um erro no servidor, tente mais tarde.')
        );
    }

  }

}
