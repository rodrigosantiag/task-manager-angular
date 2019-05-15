
import {throwError as observableThrowError} from 'rxjs';
import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {SignInData} from 'angular2-token';
import {TokenService} from './token.service';

import {Observable} from 'rxjs/internal/Observable';
import {catchError} from 'rxjs/operators';

import {User} from './user.model';

@Injectable()

export class AuthService {
  public constructor(private tokenService: TokenService) {
  }

  public signUp(user: User): Observable<Response> {
    return this.tokenService.registerAccount(user as any)
      .pipe(catchError(this.handleErrors));
  }

  public signIn(uid: string, password: string): Observable<Response> {
    const signInData: SignInData = {
      email: uid,
      password: password
    };

    return this.tokenService.signIn(signInData)
      .pipe(catchError(this.handleErrors));
  }

  public signOut(): Observable<Response> {
    return this.tokenService.signOut()
      .pipe(catchError(this.handleErrors));
  }

  public userSignedIn(): boolean {
    return this.tokenService.userSignedIn();
  }

  private handleErrors(error: Response) {
    console.log('Salvando erro no arquivo de LOG - Detalhes do erro => ', error);
    return observableThrowError(error);
  }
}
