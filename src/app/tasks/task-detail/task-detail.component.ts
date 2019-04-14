import {Component, OnInit, AfterViewInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common';
import {FormGroup, FormControl, FormBuilder, Validators, AbstractControl} from '@angular/forms';

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
  public taskDoneOptions: Array<any>;

  public constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private location: Location,
    private formBuilder: FormBuilder
  ) {

    this.taskDoneOptions = [
      {value: false, text: 'Pendente'},
      {value: true, text: 'Feita'}
    ];

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
    }).on('dp.dp.change', () => this.getField('deadline').setValue($('#deadline').val()));
  }

  public goBack(): void {
    this.location.back();
  }

  public updateTask(): void {
    this.task.title = this.getField('title').value;
    this.task.deadline = this.getField('deadline').value;
    this.task.done = this.getField('done').value;
    this.task.description = this.getField('description').value;

    this.taskService.update(this.task).subscribe(
      () => alert('Tarefa atualizada com sucesso!'),
      () => alert('Ocorreu um erro no servidor, tente mais tarde.')
    );
  }

  // form errors methods

  public fieldClassForErrorOrSuccess(fieldName: string): Object {
    return {
      'is-invalid': this.showFieldError(fieldName),
      'is-valid': this.getField(fieldName).valid
    };
  }

  public showFieldError(fieldName: string): boolean {
    const field = this.getField(fieldName);
    return field.invalid && (field.touched || field.dirty);
  }

  public getField(fieldName: string): AbstractControl {
    return this.reactiveTaskForm.get(fieldName);
  }
}
