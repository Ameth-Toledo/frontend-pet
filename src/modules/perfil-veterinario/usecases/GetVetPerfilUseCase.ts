import { veterinarioConfiguracionService } from "../services/veterinarioConfiguracion.service";
import { VetProfileMapper } from "../model/mapper";
import { VeterinarioProfileUI } from "../model/ui.model";

export const getVetPerfilUseCase = async (): Promise<VeterinarioProfileUI> => {
  const dto = await veterinarioConfiguracionService.getProfile();
  return VetProfileMapper.fromDTOtoUI(dto);
};