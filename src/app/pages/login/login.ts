import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormField } from '@ui/form-field/form-field';
import { FormFieldLabel } from '@ui/form-field/form-field-label/form-field-label';

@Component({
  selector: 'app-login',
  imports: [NgOptimizedImage, ReactiveFormsModule, FormField, FormFieldLabel],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {
  private readonly fb = inject(FormBuilder);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  onSubmit(): void {
    console.log(this.form.value);
  }
}
