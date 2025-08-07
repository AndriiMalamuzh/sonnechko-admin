import { Directive, ElementRef, HostBinding, inject } from '@angular/core';

@Directive({
  selector: '[form-field-suffix]',
})
export class FormFieldSuffix {
  public elementRef = inject(ElementRef<HTMLElement>);

  @HostBinding('class') className = 'form-field__suffix';
}
