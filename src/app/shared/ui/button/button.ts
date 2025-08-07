import { Directive, HostBinding, input } from '@angular/core';

@Directive({
  selector: '[button]',
})
export class Button {
  color = input<'primary' | 'secondary'>();
  view = input<'flat' | 'stroked'>('flat');
  isIcon = input<boolean>(false);

  @HostBinding('class') get classes(): string {
    const colorClass = this.color() ? 'button-' + this.color() : '';
    return (
      `button button-${this.view()}` +
      (colorClass ? ' ' + colorClass : '') +
      (this.isIcon() ? ' button-icon' : '')
    );
  }
}
