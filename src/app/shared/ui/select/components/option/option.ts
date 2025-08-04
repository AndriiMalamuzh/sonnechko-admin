import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  inject,
  input,
  signal,
} from '@angular/core';
import { Select } from '@ui/select/select';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-option',
  imports: [],
  templateUrl: './option.html',
  styleUrl: './option.scss',
})
export class Option {
  private select = inject(Select);
  el = inject(ElementRef);

  value = input<string>();
  isSelected = signal<boolean>(false);

  @HostListener('click')
  onClick(): void {
    this.select.selectOption(this);
  }
}
