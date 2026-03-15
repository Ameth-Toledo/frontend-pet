import { clienteMascotasService } from "../services/clienteMascotas.service";
import { MascotaClienteMapper } from "../model/mapper";
import { MascotaUI } from "../model/ui.model";

export const getMascotasClienteUseCase = async (): Promise<MascotaUI[]> => {
  const dtos = await clienteMascotasService.getMascotas();
  return dtos.map(MascotaClienteMapper.fromDTOtoUI);
};