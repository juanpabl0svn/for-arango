import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import ContextService from '../services/context.service';
import { POST } from '../../constants';

export const loggedOutGuard: CanActivateFn = async (route, state) => {
  const contextService = inject(ContextService);
  const router = inject(Router);

  const token = localStorage.getItem('user');

  if (token) {
    const userJson = await POST('/user/validate', { token });
    if (userJson?.name) {
      contextService.user = userJson;
      router.navigate(['/home']);
      return false;
    }
    return true;
  }

  return true;
};
