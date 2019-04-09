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

  public constructor(private http: Http) {}

  public getTasks(): Observable<Task[]> {
    return this.http.get(this.tasksUrl)
      .catch(this.handleErrors)
      .map((response: Response) => response.json().data as Task[]);
  }

  public getImportantTasks(): Observable<Task[]> {
    return this.getTasks()
      .catch(this.handleErrors)
      .map(tasks => tasks.slice(0, 4) as Task[]);
  }

  public getTask(id: number): Observable<Task> {
    const url = `${this.tasksUrl}/${id}`;

    return this.http.get(url)
      .catch(this.handleErrors)
      .map((response: Response) => response.json().data as Task);
  }

  private handleErrors(error: Response) {
    console.log('Salvando erro no arquivo de LOG - Detalhes do erro => ', error);
    return Observable.throw(error);
  }

  public createTask(task: Task): Observable<Task> {
    const url = this.tasksUrl;
    const body = JSON.stringify(task);
    const headers = new Headers({ 'Content-type': 'application/json' });

    return this.http.post(url, body, { headers: headers })
      .catch(this.handleErrors)
      .map((response: Response) => response.json().data as Task);
  }

  public updateTask(task: Task): Observable<Task> {
    const url = `${this.tasksUrl}/${task.id}`;
    const body = JSON.stringify(task);
    const headers = new Headers({ 'Content-Type': 'application/json' });

    return this.http.put(url, body, { headers: headers })
      .catch(this.handleErrors)
      .map(() => task);
  }

  public deleteTask(id: number): Observable<null> {
    const url = `${this.tasksUrl}/${id}`;
    const headers = new Headers({ 'Content-type': 'application/json' });

    return this.http.delete(url, { headers: headers })
      .catch(this.handleErrors)
      .map(() => null);
  }
}
