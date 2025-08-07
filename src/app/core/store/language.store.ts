import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { TranslateService } from '@ngx-translate/core';

interface LanguageState {
  language: string;
}

const initialState: LanguageState = {
  language: 'de',
};

export const LanguageStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, _translateService = inject(TranslateService)) => ({
    setLanguage(language: string) {
      patchState(store, { language });
      _translateService.use(language);
    },
  }))
);
