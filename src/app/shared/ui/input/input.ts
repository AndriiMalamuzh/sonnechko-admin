import { Directive, ElementRef, HostBinding, HostListener, inject, output } from '@angular/core';

@Directive({
  selector: '[input]',
})
export class Input {
  public el = inject(ElementRef<HTMLInputElement>);

  focusEvent = output<void>();
  blurEvent = output<void>();
  inputEvent = output<string>();

  @HostBinding('class') className = 'form-field__input';

  setId(id: string): void {
    this.el.nativeElement.id = id;
  }

  getValue(): string {
    return this.el.nativeElement.value;
  }

  focus(): void {
    this.el.nativeElement.focus();
  }

  isDisabled(): boolean {
    return this.el.nativeElement.disabled;
  }

  isRequired(): boolean {
    return this.el.nativeElement.required;
  }

  onFocus(callback: () => void): void {
    this.focusEvent.subscribe(callback);
  }

  onBlur(callback: () => void): void {
    this.blurEvent.subscribe(callback);
  }

  onInput(callback: (value: string) => void): void {
    this.inputEvent.subscribe(callback);
  }

  @HostListener('focus')
  handleFocus(): void {
    this.focusEvent.emit();
  }

  @HostListener('blur')
  handleBlur(): void {
    this.blurEvent.emit();
  }

  @HostListener('input')
  handleInput(): void {
    this.inputEvent.emit(this.el.nativeElement.value);
  }
}
