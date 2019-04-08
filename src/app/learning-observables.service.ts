import {Http, Response} from '@angular/http';
import {Injectable} from '@angular/core';

// Tratando erros
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()

export class LearningObservablesService {
  public constructor(private http: Http) {
    //  Criando um objeto observador
    // const observer = {
    //   next: function (newData) {
    //     console.log('Chamou o método next e passou como parâmetro o \'newData\' => ', newData);
    //   },
    //   error: function (errorData) {
    //     console.log('Chamou o método error e passou como parâmetro o \'errorData\' => ', errorData);
    //   },
    //   complete: function () {
    //     console.log('Chamou o método complete e encerrou');
    //   }
    // };
    //
    // //  Criando um objeto observado e passando um observador como parâmetro
    // this.http.get('api/tasks')
    //   .subscribe(observer);
    //
    // //  Criando um objeto observado e criando um observador no parâmetro
    // this.http.get('api/tasks')
    //   .subscribe({
    //     next: function (newData) {
    //       console.log('Chamou o método next e passou como parâmetro o \'newData\' => ', newData);
    //     },
    //     error: function (errorData) {
    //       console.log('Chamou o método error e passou como parâmetro o \'errorData\' => ', errorData);
    //     },
    //     complete: function () {
    //       console.log('Chamou o método complete e encerrou');
    //     }
    //   });
    //
    // //  Passando os métodos (next, error e complete) como parâmetro
    // this.http.get('api/tasks')
    //   .subscribe(
    //     function (newData) {
    //       console.log('Chamou o método next e passou como parâmetro o \'newData\' => ', newData);
    //     },
    //     function (errorData) {
    //       console.log('Chamou o método error e passou como parâmetro o \'errorData\' => ', errorData);
    //     },
    //     function () {
    //       console.log('Chamou o método complete e encerrou');
    //     });
    //
    // //  Passando os métodos (next, error e complete) como parâmetro (usando arrow functions)
    // this.http.get('api/tasks')
    //   .subscribe(
    //     newData => console.log('Chamou o método next e passou como parâmetro o \'newData\' => ', newData),
    //     errorData => console.log('Chamou o método error e passou como parâmetro o \'errorData\' => ', errorData),
    //     () => console.log('Chamou o método complete e encerrou')
    //   );

    //  Passando apenas o método next como parâmetro (usando arrow functions)
    this.http.get('api/tasdsfgvdks')
      .catch(this.handleErrors)
      .subscribe({
        next: function (newData) {
          console.log('Chamou o método next e passou como parâmetro o \'newData\' => ', newData);
        },
        error: function (errorData) {
          alert('Ocorreu um erro no servidor. Por favor tente mais tarde.');
        },
        complete: function () {
          console.log('Chamou o método complete e encerrou');
        }
      });
  }

  public handleErrors(error: Response) {
    console.log('Salvando erro em banco de dados para o desenvolvedor => ', error);
    return Observable.throw(error);
  }
}
