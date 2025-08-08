import { Routes } from '@angular/router';
import { authGuard } from '@guards/auth.guard';
import { guestGuard } from '@guards/guest.guard';

export const routes: Routes = [
  {
    path: 'login',
    canActivate: [guestGuard],
    loadComponent: () => import('./pages/login/login').then(c => c.Login),
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./core/components/main/main').then(c => c.Main),
    loadChildren: () => import('./core/components/main/main.routes').then(m => m.routes),
  },
];
