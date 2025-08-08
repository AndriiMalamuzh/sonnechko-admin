import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderUser } from '@core/components/header/header-user/header-user';

@Component({
  selector: 'app-header',
  imports: [HeaderUser],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {}
