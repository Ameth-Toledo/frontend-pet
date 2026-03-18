import { clienteCitasService } from "../services/clienteCitas.service";
import { CitaClienteMapper } from "../model/mapper";
import { CitaUI } from "../model/ui.model";

export const getCitasClienteUseCase = async (): Promise<CitaUI[]> => {
  const stored = localStorage.getItem("user");
  const user = stored ? JSON.parse(stored) : null;
  const userId = user?.id ?? 0;
  const dtos = await clienteCitasService.getCitas(userId);
  return dtos.map(CitaClienteMapper.fromDTOtoUI);
};
