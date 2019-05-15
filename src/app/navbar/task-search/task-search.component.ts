import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {Task} from '../../tasks/shared/task.model';
import {TaskService} from '../../tasks/shared/task.service';

import { of } from 'rxjs';
import {Observable} from 'rxjs/internal/Observable';
import {Subject} from 'rxjs/internal/Subject';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';


@Component({
  selector: 'app-task-search',
  templateUrl: './task-search.component.html'
})

export class TaskSearchComponent implements OnInit {
  public searchTerms: Subject<string> = new Subject();
  public results: Array<Task> = [];

  public constructor(private taskService: TaskService, private router: Router) {
  }

  public ngOnInit() {
    this.searchTerms.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(
        term => term.trim() ? this.taskService.searchByTitle(term) : of(<Task[]>([])
      )))
      .subscribe((tasks: Array<Task>) => this.results = tasks);
  }

  public search(term: string) {
    this.searchTerms.next(term);
  }

  public goTo(task: Task) {
    this.results = [];
    this.router.navigate(['/tasks', task.id]);
  }
}
