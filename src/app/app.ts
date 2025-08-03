import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App implements OnInit {
  private platformId = inject(PLATFORM_ID);
  private translateService = inject(TranslateService);

  ngOnInit(): void {
    this.initializeThemeListener();
    this.initializeLanguage();
  }

  private initializeThemeListener(): void {
    if (isPlatformBrowser(this.platformId)) {
      const themeMatchMedia = window.matchMedia('(prefers-color-scheme: dark)');

      const themeChangeListener = (e: any) => {
        document.body.classList.toggle('dark-theme', e.matches);
      };

      themeMatchMedia.addEventListener('change', themeChangeListener);
      themeChangeListener(themeMatchMedia);
    }
  }

  private initializeLanguage(): void {
    const availableLanguages = ['de', 'en', 'ru', 'uk'];

    if (isPlatformBrowser(this.platformId)) {
      const browserLang = navigator.language.split('-')[0];
      const langToUse = availableLanguages.includes(browserLang) ? browserLang : 'de';
      this.translateService.use(langToUse);
    } else {
      this.translateService.use('de');
    }
  }
}
