import { citasAdminService } from "../services/citas.service";
import { CitaAdminMapper } from "../model/mapper";
import { CitaUI } from "../model/ui.model";

export const getCitasAdminUseCase = async (): Promise<CitaUI[]> => {
  const dtos = await citasAdminService.getCitas();
  return dtos.map(CitaAdminMapper.fromDTOtoUI);
};