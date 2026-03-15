import { pacientesService } from "../services/pacientes.service";
import { PacienteMapper } from "../model/mapper";
import { PacienteUI } from "../model/ui.model";

export const getPacientesUseCase = async (): Promise<PacienteUI[]> => {
  const dtos = await pacientesService.getPacientes();
  return dtos.map(PacienteMapper.fromDTOtoUI);
};