import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserImage } from '@components/user-image/user-image';
import { TranslateModule } from '@ngx-translate/core';
import { AuthStore } from '@store/auth.store';
import { UserStore } from '@store/user.store';
import { Icon } from '@ui/icon/icon';

@Component({
  selector: 'app-header-user-menu',
  imports: [UserImage, RouterLink, Icon, TranslateModule],
  templateUrl: './header-user-menu.html',
  styleUrl: './header-user-menu.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderUserMenu {
  readonly userStore = inject(UserStore);
  private readonly authStore = inject(AuthStore);

  onLogout(): void {
    this.authStore.logout();
  }
}
