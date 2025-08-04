import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormFieldLabel } from '@ui/form-field/components/form-field-label/form-field-label';
import { FormField } from '@ui/form-field/form-field';
import { Input } from '@ui/input/input';

@Component({
  selector: 'app-login',
  imports: [NgOptimizedImage, ReactiveFormsModule, FormField, FormFieldLabel, Input],
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
