import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  // inyectamos lo servicios a usar y el router
  const authService = inject(UserService);
  const router = inject(Router);

  // Verifica si el usuario está autenticado
  if (authService.isAuthenticated()) {
    return true;
  }

  // Redirige a la página de login si no está autenticado
  router.navigate(['/']);
  return false;
};
