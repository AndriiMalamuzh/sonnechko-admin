import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { AuthStore } from '@store/auth.store';
import { UserStore } from '@store/user.store';
import { catchError, of, switchMap } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const userStore = inject(UserStore);
  const authStore = inject(AuthStore);
  const router = inject(Router);
  const authService = inject(AuthService);

  if (userStore.user()) {
    return true;
  }

  const token = localStorage.getItem('accessToken');
  if (!token) {
    authStore.logout();
    return router.createUrlTree(['/login']);
  }

  return authService.refreshTokens().pipe(
    switchMap(response => {
      localStorage.setItem('accessToken', response.accessToken);
      userStore.setUser(response.user);
      return of(true);
    }),
    catchError(() => {
      authStore.logout();
      return of(false);
    })
  );
};
