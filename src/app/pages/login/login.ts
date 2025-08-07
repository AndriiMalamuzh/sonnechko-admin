import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ILoginRequest } from '@interfaces/auth/login-request.interface';
import { TranslateModule } from '@ngx-translate/core';
import { AuthStore } from '@store/auth.store';
import { Button } from '@ui/button/button';
import { FormFieldError } from '@ui/form-field/components/form-field-error/form-field-error';
import { FormFieldLabel } from '@ui/form-field/components/form-field-label/form-field-label';
import { FormFieldSuffix } from '@ui/form-field/directives/form-field-suffix';
import { FormField } from '@ui/form-field/form-field';
import { Icon } from '@ui/icon/icon';
import { Input } from '@ui/input/input';
import { Spinner } from '@ui/spinner/spinner';
import { LoginLanguages } from 'src/app/pages/login/login-languages/login-languages';

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
    LoginLanguages,
    Spinner,
    Button,
    Icon,
    FormFieldSuffix,
  ],
  providers: [],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {
  readonly store = inject(AuthStore);

  private readonly fb = inject(FormBuilder);

  readonly isShowPassword = signal<boolean>(false);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  togglePasswordVisibility(): void {
    this.isShowPassword.update(res => !res);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.form.markAllAsDirty();
      return;
    }
    this.store.login(this.form.value as ILoginRequest);
  }
}
