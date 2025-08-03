import {
  Component,
  ChangeDetectionStrategy,
  inject,
  PLATFORM_ID,
  OnInit,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App implements OnInit {
  private platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    this.initializeThemeListener();
  }

  private initializeThemeListener(): void {
    if (isPlatformBrowser(this.platformId)) {
      const themeMatchMedia = window.matchMedia('(prefers-color-scheme: dark)');

      const themeChangeListener = (e: any) => {
        document.body.classList.toggle('dark-theme', e.matches);
        document.body.classList.toggle('light-theme', !e.matches);
      };

      themeMatchMedia.addEventListener('change', themeChangeListener);
      themeChangeListener(themeMatchMedia);
    }
  }
}
