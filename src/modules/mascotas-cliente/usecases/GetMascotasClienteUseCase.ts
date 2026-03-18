import { clienteMascotasService } from "../services/clienteMascotas.service";
import { MascotaClienteMapper } from "../model/mapper";
import { MascotaUI } from "../model/ui.model";

export const getMascotasClienteUseCase = async (): Promise<MascotaUI[]> => {
  const stored = localStorage.getItem("user");
  const user = stored ? JSON.parse(stored) : null;
  const userId = user?.id ?? 0;
  const dtos = await clienteMascotasService.getMascotas(userId);
  return dtos.map(MascotaClienteMapper.fromDTOtoUI);
};
