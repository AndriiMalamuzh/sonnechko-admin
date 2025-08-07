import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { IUser } from '@interfaces/user/user.interface';
import { UsersService } from '@services/users.service';
import { AuthStore } from '@store/auth.store';
import { UserStore } from '@store/user.store';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-dashboard',
  standalone: true,
  template: `
    <div>
      <h1>Dashboard</h1>
      <p>This is a protected route that requires authentication</p>
      <p>{{ userStore.user()?.email }}</p>
      <button type="button" (click)="onGetMe()">Get me</button>
      <button type="button" (click)="logout()">Logout</button>
    </div>
  `,
})
export class Dashboard {
  private readonly authStore = inject(AuthStore);
  readonly userStore = inject(UserStore);
  private readonly usersService = inject(UsersService);

  constructor() {
    effect(() => {
      console.log(this.userStore.user());
    });
  }

  onGetMe(): void {
    this.usersService.getCurrentUser().subscribe((res: IUser) => {
      const user = { ...res, email: 'new.email@gmail.com' };
      this.userStore.setUser(user);
    });
  }

  logout(): void {
    this.authStore.logout();
  }
}
