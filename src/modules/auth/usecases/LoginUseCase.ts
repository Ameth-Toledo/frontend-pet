import { authService } from '@/modules/auth/services/auth.service';
import { LoginRequestDTO } from '@/modules/auth/model/dto/request/LoginRequestDTO';
import { LoginResultDTO } from '@/modules/auth/model/dto/response/LoginResultDTO';
import { AuthMapper } from '@/modules/auth/model/mapper';
import { getRedirectByRole } from '@/lib/routes';

export const loginUseCase = async (credentials: LoginRequestDTO): Promise<LoginResultDTO> => {
  const response = await authService.login(credentials);
  const data = response.data;

  const entity = AuthMapper.toEntity(data.user);
  const user = AuthMapper.toUIModel(entity);
  const token = data.token;

  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  const redirectTo = getRedirectByRole(user.role);

  return { user, token, redirectTo };
};