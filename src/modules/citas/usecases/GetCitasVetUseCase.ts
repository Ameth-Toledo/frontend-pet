import { citasVetService } from "../services/citas.service";
import { CitasVetMapper } from "../model/mapper";
import { CitaVetUI } from "../model/ui.model";

export const getCitasVetUseCase = async (): Promise<CitaVetUI[]> => {
  const dtos = await citasVetService.getCitas();
  return dtos.map(CitasVetMapper.fromDTOtoUI);
};