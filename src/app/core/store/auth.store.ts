import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ILoginRequest } from '@interfaces/auth/login-request.interface';
import { ILoginResponse } from '@interfaces/auth/login-response.interface';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { AuthService } from '@services/auth.service';
import { UserStore } from '@store/user.store';
import { ToastService } from '@ui/toast/toast.service';
import { pipe, switchMap, tap } from 'rxjs';

interface AuthState {
  isLoading: boolean;
}

const initialState: AuthState = {
  isLoading: false,
};

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods(
    (
      store,
      _authService = inject(AuthService),
      _userStore = inject(UserStore),
      _toastService = inject(ToastService),
      _router = inject(Router)
    ) => ({
      login: rxMethod<ILoginRequest>(
        pipe(
          tap(() => {
            patchState(store, { isLoading: true });
          }),
          switchMap((data: ILoginRequest) =>
            _authService.login(data).pipe(
              tapResponse({
                next: (res: ILoginResponse) => {
                  if (res.user.role !== 'admin') {
                    _toastService.open({
                      message: 'EMAIL_OR_PASSWORD_INCORRECT',
                      type: 'error',
                    });
                    return;
                  }
                  _userStore.setUser(res.user);
                  localStorage.setItem('accessToken', res.accessToken);
                  _router.navigate(['/dashboard']);
                },
                error: (error: HttpErrorResponse) => {
                  _toastService.open({
                    message:
                      error.status === 404 ? 'EMAIL_OR_PASSWORD_INCORRECT' : error.error.message,
                    type: 'error',
                  });
                },
                finalize: () => patchState(store, { isLoading: false }),
              })
            )
          )
        )
      ),
      logout: rxMethod<void>(
        pipe(
          tap(() => {
            _userStore.setUser(null);
            localStorage.removeItem('accessToken');
            _router.navigate(['/login']);
          }),
          switchMap(() => _authService.logout())
        )
      ),
    })
  )
);
