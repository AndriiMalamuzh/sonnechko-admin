import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { UserImage } from '@components/user-image/user-image';
import { HeaderUserMenu } from '@core/components/header/header-user/header-user-menu/header-user-menu';
import { UserStore } from '@store/user.store';
import { Icon } from '@ui/icon/icon';

@Component({
  selector: 'app-header-user',
  imports: [UserImage, Icon, HeaderUserMenu],
  templateUrl: './header-user.html',
  styleUrl: './header-user.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderUser {
  readonly userStore = inject(UserStore);

  headerUserElement = viewChild<ElementRef>('headerUserElement');
  isShowMenu = signal<boolean>(false);

  @HostListener('document:click', ['$event'])
  onOutsideClick(event: MouseEvent): void {
    const clickedInside = this.headerUserElement().nativeElement.contains(event.target);
    if (!clickedInside) {
      this.isShowMenu.set(false);
    }
  }
}
