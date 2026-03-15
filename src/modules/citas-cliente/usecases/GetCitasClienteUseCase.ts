import { clienteCitasService } from "../services/clienteCitas.service";
import { CitaClienteMapper } from "../model/mapper";
import { CitaUI } from "../model/ui.model";

export const getCitasClienteUseCase = async (): Promise<CitaUI[]> => {
  const dtos = await clienteCitasService.getCitas();
  return dtos.map(CitaClienteMapper.fromDTOtoUI);
};