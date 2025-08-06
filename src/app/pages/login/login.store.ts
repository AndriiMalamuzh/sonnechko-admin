import { inject } from '@angular/core';
import { ILoginRequest } from '@interfaces/auth/login-request.interface';
import { ILoginResponse } from '@interfaces/auth/login-response.interface';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { AuthService } from '@services/auth.service';
import { UserStore } from '@store/user.store';
import { pipe, switchMap, tap } from 'rxjs';

interface LoginState {
  isLoading: boolean;
}

const initialState: LoginState = {
  isLoading: false,
};

export const LoginStore = signalStore(
  withState(initialState),
  withMethods((store, _authService = inject(AuthService), _userStore = inject(UserStore)) => ({
    login: rxMethod<ILoginRequest>(
      pipe(
        tap(() => {
          patchState(store, { isLoading: true });
        }),
        switchMap((data: ILoginRequest) =>
          _authService.login(data).pipe(
            tapResponse({
              next: (res: ILoginResponse) => {
                _userStore.setUser(res.user);
                localStorage.setItem('accessToken', res.accessToken);
              },
              error: error => {
                console.log(error);
              },
              finalize: () => patchState(store, { isLoading: false }),
            })
          )
        )
      )
    ),
  }))
);
