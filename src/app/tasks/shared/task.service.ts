import { Headers, Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import {Task} from './task.model';

@Injectable()

export class TaskService {
  public tasksUrl = 'api/tasks';
  public headers: Headers = new Headers({ 'Content-type': 'application/json' });

  public constructor(private http: Http) {}

  public getAll(): Observable<Task[]> {
    return this.http.get(this.tasksUrl)
      .catch(this.handleErrors)
      .map((response: Response) => response.json().data as Task[]);
  }

  public getImportant(): Observable<Task[]> {
    return this.getAll()
      .catch(this.handleErrors)
      .map(tasks => tasks.slice(0, 4) as Task[]);
  }

  public getById(id: number): Observable<Task> {
    const url = `${this.tasksUrl}/${id}`;

    return this.http.get(url)
      .catch(this.handleErrors)
      .map((response: Response) => response.json().data as Task);
  }

  private handleErrors(error: Response) {
    console.log('Salvando erro no arquivo de LOG - Detalhes do erro => ', error);
    return Observable.throw(error);
  }

  public create(task: Task): Observable<Task> {
    const url = this.tasksUrl;
    const body = JSON.stringify(task);

    return this.http.post(url, body, { headers: this.headers })
      .catch(this.handleErrors)
      .map((response: Response) => response.json().data as Task);
  }

  public update(task: Task): Observable<Task> {
    const url = `${this.tasksUrl}/${task.id}`;
    const body = JSON.stringify(task);

    return this.http.put(url, body, { headers: this.headers })
      .catch(this.handleErrors)
      .map(() => task);
  }

  public delete(id: number): Observable<null> {
    const url = `${this.tasksUrl}/${id}`;

    return this.http.delete(url, { headers: this.headers })
      .catch(this.handleErrors)
      .map(() => null);
  }
}
