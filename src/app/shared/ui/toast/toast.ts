import { ChangeDetectionStrategy, Component, inject, model, OnInit, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Icon } from '@ui/icon/icon';
import { ToastService } from '@ui/toast/toast.service';

@Component({
  selector: 'app-toast',
  imports: [Icon, TranslatePipe],
  templateUrl: './toast.html',
  styleUrl: './toast.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Toast implements OnInit {
  private toastService = inject(ToastService);

  message = model<string>();
  type = model<'success' | 'error' | 'warning' | 'info'>();
  duration = model<number>();

  show = signal<boolean>(false);

  ngOnInit(): void {
    setTimeout(() => {
      this.show.set(true);
    }, 10);
    setTimeout(() => {
      this.show.set(false);
    }, this.duration());
  }

  onClose(): void {
    this.show.set(false);
    setTimeout(() => {
      this.toastService.close();
    }, 150);
  }
}
