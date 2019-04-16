import {Injectable} from '@angular/core';
import {Response} from '@angular/http';

import {Angular2TokenService} from 'angular2-token';
import {Observable} from 'rxjs/Observable';

import {User} from './user.model';

@Injectable()

export class AuthService {
  public constructor(private tokenService: Angular2TokenService) {
  }

  public signUp(user: User) {
    // call Angular2-Token SignUp method here
    // returns an Observable<Response>
  }

  public signIn(uid: string, password: string) {
    // call Angular2-Token SignIn method here
    // returns an Observable<Response>
  }

  public signOut() {
    // call Angular2-Token SignOut method here
    // returns an Observable<Response>
  }

  public userSignedIn() {
    return this.tokenService.userSignedIn();
  }

  private handleErrors(error: Response) {
    console.log('Salvando erro no arquivo de LOG - Detalhes do erro => ', error);
    return Observable.throw(error);
  }
}
