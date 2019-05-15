import {Component, OnInit, AfterViewInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Location} from '@angular/common';
import {FormGroup, FormControl, FormBuilder, Validators, AbstractControl} from '@angular/forms';
import { switchMap } from 'rxjs/operators';



import {FormUtils} from '../../shared/form.utils';
import {Task} from '../shared/task.model';
import {TaskService} from '../shared/task.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html'
})

export class TaskDetailComponent implements OnInit, AfterViewInit {
  public form: FormGroup;
  public task: Task;
  public taskDoneOptions: Array<any>;
  public formUtils: FormUtils;

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

    this.form = this.formBuilder.group({
      title: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
      deadline: [null, Validators.required],
      done: [null, Validators.required],
      description: [null]
    });

    this.formUtils = new FormUtils(this.form);
  }

  public ngOnInit(): void {
    this.task = new Task(null, null);

    this.route.paramMap.pipe(switchMap((params: ParamMap) => this.taskService.getById(+params.get('id'))))
      .subscribe(
        (task: Task) => this.setTask(task),
        error => alert('Ocorreu um erro no servidor, tente mais tarde.')
      );
  }

  public setTask(task: Task): void {
    this.task = task;
    this.form.patchValue(task);
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
    }).on('dp.dp.change', () => this.formUtils.getField('deadline').setValue($('#deadline').val()));
  }

  public goBack(): void {
    this.location.back();
  }

  public updateTask(): void {
    this.task.title = this.formUtils.getField('title').value;
    this.task.deadline = this.formUtils.getField('deadline').value;
    this.task.done = this.formUtils.getField('done').value;
    this.task.description = this.formUtils.getField('description').value;

    this.taskService.update(this.task).subscribe(
      () => alert('Tarefa atualizada com sucesso!'),
      () => alert('Ocorreu um erro no servidor, tente mais tarde.')
    );
  }
}
