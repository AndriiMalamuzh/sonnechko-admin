import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { IUser } from '@interfaces/user/user.interface';

@Component({
  selector: 'app-user-image',
  imports: [],
  templateUrl: './user-image.html',
  styleUrl: './user-image.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserImage {
  readonly user = input.required<IUser>();

  readonly userInitials = computed<string>(() => {
    return this.user().first_name.charAt(0) + this.user().last_name.charAt(0);
  });
}
