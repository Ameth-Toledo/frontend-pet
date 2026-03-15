import { mascotasService } from "../services/mascotas.service";
import { MascotaMapper } from "../model/mapper";
import { MascotaUI } from "../model/ui.model";

export const getMascotasUseCase = async (): Promise<MascotaUI[]> => {
  const dtos = await mascotasService.getMascotas();
  return dtos.map(MascotaMapper.fromDTOtoUI);
};