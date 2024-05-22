import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../../../shared/services/auth.service';
import { AuthStatus } from '../../../../shared/interfaces';


export const isAuthenticatedGuard: CanActivateFn = (route, state) => {


  const authService = inject(AuthService);
  const router      = inject(Router)

  if(authService.authStatus() === AuthStatus.authenticated) return true;


  // const url = state.url;
  router.navigateByUrl('/auth/login')

  return false;
};
