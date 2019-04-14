import {Component, OnInit, AfterViewInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';

import 'rxjs/add/operator/switchMap';

import {Task} from '../shared/task.model';
import {TaskService} from '../shared/task.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html'
})

export class TaskDetailComponent implements OnInit, AfterViewInit {
  public reactiveTaskForm: FormGroup;
  public task: Task;
  public taskDoneOptions: Array<any> = [
    {value: false, text: 'Pendente'},
    {value: true, text: 'Feita'}
  ]

  public constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private location: Location,
    private formBuilder: FormBuilder
  ) {
    this.reactiveTaskForm = this.formBuilder.group({
      title: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
      deadline: [null, Validators.required],
      done: [null, Validators.required],
      description: [null]
    });
  }

  public ngOnInit(): void {
    this.task = new Task(null, null);

    this.route.params.switchMap((params: Params) => this.taskService.getById(+params['id']))
      .subscribe(
        task => this.setTask(task),
        error => alert('Ocorreu um erro no servidor, tente mais tarde.')
      );
  }

  public setTask(task: Task): void {
    this.task = task;

    // setValue
    /*const formModel = {
      title: task.title || null,
      deadline: task.deadline || null,
      done: task.done || null,
      description: task.description || null
    };

    this.reactiveTaskForm.setValue(formModel);*/

    // patchValue
    /*const formModel = {
      title: task.title || null,
      description: task.description || 'Teste'
    };*/

    this.reactiveTaskForm.patchValue(task);
  }

  public ngAfterViewInit(): void {
    $('#deadline').datetimepicker({
      sideBySide: true,
      locale: 'pt-br',
      icons: {
        time: 'mdi mdi-clock-outline',
        date: 'mdi mdi-calendar',
        up: 'mdi mdi-chevron-up',
        down: 'mdi mdi-chevron-down',
        previous: 'mdi mdi-chevron-left',
        next: 'mdi mdi-chevron-right',
        today: 'mdi mdi-calendar-check-outline',
        clear: 'mdi mdi-delete-outline',
        close: 'mdi mdi-close'
      },
      showTodayButton: true,
      showClear: true,
      showClose: true
    }).on('dp.dp.change', () => this.reactiveTaskForm.get('deadline').setValue($('#deadline').val()));
  }

  public goBack(): void {
    this.location.back();
  }

  public updateTask(): void {
    this.taskService.update(this.task).subscribe(
      () => alert('Tarefa atualizada com sucesso!'),
      () => alert('Ocorreu um erro no servidor, tente mais tarde.')
    );
  }

  public showFieldError(field): boolean {
    return field.invalid && (field.touched || field.dirty);
  }
}
