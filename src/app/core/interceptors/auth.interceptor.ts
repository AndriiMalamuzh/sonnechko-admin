import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ILoginResponse } from '@interfaces/auth/login-response.interface';
import { AuthService } from '@services/auth.service';
import { AuthStore } from '@store/auth.store';
import { UserStore } from '@store/user.store';
import { catchError, switchMap, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const userStore = inject(UserStore);
  const authStore = inject(AuthStore);
  const accessToken = localStorage.getItem('accessToken');
  const isRefreshRequest = req.url.includes('/refresh-tokens');

  req = req.clone({
    setHeaders: {
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  });

  return next(req).pipe(
    catchError(error => {
      if (error.status === 401 && accessToken && !isRefreshRequest) {
        return authService.refreshTokens().pipe(
          switchMap((res: ILoginResponse) => {
            userStore.setUser(res.user);
            localStorage.setItem('accessToken', res.accessToken);
            const clonedReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${res.accessToken}`,
              },
              withCredentials: true,
            });
            return next(clonedReq);
          }),
          catchError(err => {
            authStore.logout();
            return throwError(() => err);
          })
        );
      }
      return throwError(() => error);
    })
  );
};
