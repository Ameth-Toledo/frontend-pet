import { authService } from '@/modules/auth/services/auth.service';

export const logoutUseCase = (): void => {
  authService.logout();
  window.location.href = '/login';
};