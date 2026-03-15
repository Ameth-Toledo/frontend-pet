import { personalService } from "../services/personal.service";
import { PersonalMapper } from "../model/mapper";
import { CreatePersonalUI } from "../model/create.ui.model";
import { VeterinarioUI } from "../model/ui.model";

export const createPersonalUseCase = async (ui: CreatePersonalUI): Promise<VeterinarioUI> => {
  const requestDTO = PersonalMapper.toRequestDTO(ui);
  const responseDTO = await personalService.createPersonal(requestDTO);
  return PersonalMapper.fromDTOtoUI(responseDTO);
};