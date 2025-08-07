import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  effect,
  ElementRef,
  signal,
  viewChild,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { FormFieldError } from '@ui/form-field/components/form-field-error/form-field-error';
import { FormFieldLabel } from '@ui/form-field/components/form-field-label/form-field-label';
import { Input } from '@ui/input/input';
import { Select } from '@ui/select/select';

@Component({
  selector: 'app-form-field',
  imports: [],
  templateUrl: './form-field.html',
  styleUrl: './form-field.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormField implements AfterViewInit {
  formFieldElement = viewChild<ElementRef>('formFieldElement');
  inputDirective = contentChild(Input);
  selectComponent = contentChild(Select);
  errorComponent = contentChild(FormFieldError);
  labelComponent = contentChild(FormFieldLabel);
  ngControl = contentChild(NgControl);

  inputId = signal<string>(`input-${crypto.randomUUID()}`);
  isFocused = signal(false);
  isHasValue = signal(false);
  isDisabled = signal(false);
  isRequired = signal(false);
  isTextarea = computed(() => {
    return this.inputDirective()?.el?.nativeElement?.tagName?.toLowerCase() === 'textarea';
  });

  constructor() {
    effect(() => {
      if (this.selectComponent()) {
        this.isHasValue.set(!!this.selectComponent()?.selectedValues()?.length);
      }
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.updateValues();
    });

    if (this.ngControl()?.control) {
      this.ngControl().control.valueChanges?.subscribe(value => {
        this.isHasValue.set(!!value?.length);
      });
      this.isHasValue.set(!!this.ngControl().control.value);
    }
  }

  updateValues(): void {
    if (this.inputDirective()) {
      this.inputDirective().setId(this.inputId());
      this.isDisabled.set(this.inputDirective().isDisabled());
      this.isRequired.set(this.inputDirective().isRequired());
      this.inputDirective().onFocus(() => this.isFocused.set(true));
      this.inputDirective().onBlur(() => this.isFocused.set(false));
      this.inputDirective().onInput((value: string) => this.isHasValue.set(value.length > 0));
    } else if (this.selectComponent()) {
      this.isDisabled.set(this.selectComponent().disabled());
      this.isRequired.set(this.selectComponent().required());
    }
    if (this.ngControl()?.control) {
      this.isHasValue.set(this.ngControl().control?.value?.length > 0);
    }
  }

  onFormFieldClick(): void {
    if (this.inputDirective() && !this.isDisabled()) {
      this.inputDirective()?.focus();
    }
    if (this.selectComponent() && !this.isDisabled()) {
      this.selectComponent().toggleDropdown();
    }
  }

  get controlClasses(): string {
    if (!this.ngControl() || !this.ngControl().control) return '';

    return [
      this.ngControl().control.touched ? 'ng-touched' : 'ng-untouched',
      this.ngControl().control.dirty ? 'ng-dirty' : 'ng-pristine',
      this.ngControl().control.invalid ? 'ng-invalid' : 'ng-valid',
    ]
      .filter(Boolean)
      .join(' ');
  }
}
