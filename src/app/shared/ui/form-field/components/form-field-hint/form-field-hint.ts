import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-form-field-hint',
  imports: [],
  templateUrl: './form-field-hint.html',
  styleUrl: './form-field-hint.scss',
})
export class FormFieldHint {}
