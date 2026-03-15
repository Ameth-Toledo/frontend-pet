import { perfilService } from "../services/perfil.service";
import { ProfileMapper } from "../model/mapper";
import { ProfileFormUI } from "../model/profile.ui.model";

export const updatePerfilUseCase = async (
  id: string,
  form: ProfileFormUI,
  rol: string
): Promise<void> => {
  const dto = ProfileMapper.toUpdateRequestDTO(id, form, rol);
  await perfilService.updateProfile(dto);
};