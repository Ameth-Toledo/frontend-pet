import { UserUIModel } from '@/modules/auth/model/ui.model';

export interface LoginResultDTO {
  user: UserUIModel;
  token: string;
  redirectTo: string;
}