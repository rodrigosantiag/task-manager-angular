import {Component, OnInit} from '@angular/core';


import { Task } from './shared/task.model';
import {TaskService} from './shared/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  providers: [ TaskService ]
})

export class TasksComponent implements OnInit {
  public tasks: Array<Task>;
  public selectedTask: Task;

  public constructor(private taskService: TaskService) {
  }

  public ngOnInit(): void {
    this.tasks = this.taskService.getTasks();
  }

  public onSelect(task: Task): void {
    this.selectedTask = task;
  }
}
