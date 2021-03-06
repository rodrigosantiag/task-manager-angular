import {Component} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {AuthService} from '../shared/auth.service';
import {FormUtils} from '../shared/form.utils';
import {User} from '../shared/user.model';

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html'
})

export class SignInFormComponent {
  public form: FormGroup;
  public formErrors: Array<string>;
  public formUtils: FormUtils;
  public submitted: boolean;

  public constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) {
    this.setupForm();
    this.formUtils = new FormUtils(this.form);
    this.submitted = false;
    this.formErrors = null;
  }

  public signInUser() {
    this.submitted = true;
    this.authService.signIn(this.form.get('email').value, this.form.get('password').value)
      .subscribe(
        () => {
          this.router.navigate(['/dashboard']);
          this.formErrors = null;
        },
        error => {
          if (error.status === 401) {
            this.formErrors = JSON.parse(error._body).errors;
          }else {
            this.formErrors = ['Não possível processar a sua solicitação. Por favor, tente mais tarde.'];
          }
          this.submitted = false;
        }
      );
  }

  private setupForm() {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    });
  }
}
