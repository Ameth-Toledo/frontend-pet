import { personalService } from "../services/personal.service";
import { PersonalMapper } from "../model/mapper";
import { VeterinarioUI } from "../model/ui.model";

export const getPersonalUseCase = async (): Promise<VeterinarioUI[]> => {
  const dtos = await personalService.getVeterinarios();
  return dtos.map(PersonalMapper.fromDTOtoUI);
};