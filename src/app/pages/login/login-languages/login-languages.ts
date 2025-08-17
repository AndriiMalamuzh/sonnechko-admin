import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Languages } from '@constants/languages';
import { LanguageStore } from '@store/language.store';

@Component({
  selector: 'app-login-languages',
  imports: [],
  templateUrl: './login-languages.html',
  styleUrl: './login-languages.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginLanguages {
  readonly store = inject(LanguageStore);

  readonly languages = Languages;

  onLanguageChange(language: string): void {
    if (this.store.language() !== language) {
      this.store.setLanguage(language);
    }
  }
}
