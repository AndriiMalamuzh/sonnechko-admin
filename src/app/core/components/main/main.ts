import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '@core/components/header/header';
import { Sidebar } from '@core/components/sidebar/sidebar';

@Component({
  selector: 'app-main',
  imports: [RouterOutlet, Header, Sidebar],
  templateUrl: './main.html',
  styleUrl: './main.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Main {}
