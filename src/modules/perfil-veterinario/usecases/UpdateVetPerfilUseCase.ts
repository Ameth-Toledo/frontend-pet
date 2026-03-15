import { veterinarioConfiguracionService } from "../services/veterinarioConfiguracion.service";
import { VetProfileMapper } from "../model/mapper";
import { VeterinarioProfileFormUI } from "../model/ui.model";

export const updateVetPerfilUseCase = async (
  id: string,
  form: VeterinarioProfileFormUI
): Promise<void> => {
  const dto = VetProfileMapper.toUpdateRequestDTO(id, form);
  await veterinarioConfiguracionService.updateProfile(dto);
};