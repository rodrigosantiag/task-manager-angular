import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {Task} from '../../tasks/shared/task.model';
import {TaskService} from '../../tasks/shared/task.service';

import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';


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
    this.searchTerms.switchMap(
      term => term.trim() ? this.taskService.searchByTitle(term) : Observable.of<Task[]>([])
    ).subscribe(tasks => this.results = tasks);
  }

  public search(term: string) {
    this.searchTerms.next(term);
  }

  public goTo(task: Task) {
    this.results = [];
    this.router.navigate(['/tasks', task.id]);
  }
}
