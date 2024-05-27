import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import ContextService from '../services/context.service';
import { POST } from '../../constants';

export const loggedInGuard: CanActivateFn = async (route, state) => {
  const contextService = inject(ContextService);
  const router = inject(Router);

  if (contextService.user?.name) {
    return true;
  }

  const user = localStorage.getItem('user');

  if (user) {
    const userJson = await POST('/user/validate', { id: user });
    if (userJson?.name) {
      contextService.user = userJson;
      return true;
    }

    return false;
  }

  router.navigate(['']);
  return false;
};
