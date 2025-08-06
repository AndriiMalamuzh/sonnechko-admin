import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ILoginRequest } from '@interfaces/auth/login-request.interface';
import { TranslateModule } from '@ngx-translate/core';
import { Button } from '@ui/button/button';
import { FormFieldError } from '@ui/form-field/components/form-field-error/form-field-error';
import { FormFieldLabel } from '@ui/form-field/components/form-field-label/form-field-label';
import { FormField } from '@ui/form-field/form-field';
import { Input } from '@ui/input/input';
import { LoginLanguages } from 'src/app/pages/login/login-languages/login-languages';
import { LoginStore } from 'src/app/pages/login/login.store';

@Component({
  selector: 'app-login',
  imports: [
    NgOptimizedImage,
    ReactiveFormsModule,
    TranslateModule,
    FormField,
    FormFieldLabel,
    Input,
    FormFieldError,
    Button,
    LoginLanguages,
  ],
  providers: [LoginStore],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {
  readonly store = inject(LoginStore);

  private readonly fb = inject(FormBuilder);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.form.markAllAsDirty();
      return;
    }
    this.store.login(this.form.value as ILoginRequest);
  }
}
