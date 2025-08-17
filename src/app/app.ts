import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Languages } from '@constants/languages';
import { TranslateService } from '@ngx-translate/core';
import { LanguageStore } from '@store/language.store';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App implements OnInit {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly translateService = inject(TranslateService);
  private readonly languageStore = inject(LanguageStore);

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
    const availableLanguages = Languages.map(i => i.code);

    if (isPlatformBrowser(this.platformId)) {
      const browserLang = navigator.language.split('-')[0];
      if (availableLanguages.includes(browserLang)) {
        this.languageStore.setLanguage(browserLang);
      }
    }
    this.translateService.use(this.languageStore.language());
  }
}
