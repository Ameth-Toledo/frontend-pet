import { perfilService } from "../services/perfil.service";
import { ProfileMapper } from "../model/mapper";
import { ProfileUI } from "../model/profile.ui.model";

export const getPerfilUseCase = async (): Promise<ProfileUI> => {
  const dto = await perfilService.getProfile();
  return ProfileMapper.fromDTOtoUI(dto);
};