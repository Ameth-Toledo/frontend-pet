import { VeterinarioProfileDTO, ScheduleDTO } from "./dto";
import { VeterinarioProfileUI, VeterinarioProfileFormUI, ScheduleUI } from "./ui.model";

export function mapVetProfileDTOtoUI(dto: VeterinarioProfileDTO): VeterinarioProfileUI {
  return { ...dto };
}

export function mapVetProfileFormToDTO(
  id: string,
  form: VeterinarioProfileFormUI
): VeterinarioProfileDTO {
  return { id, ...form };
}

export function mapScheduleDTOtoUI(dto: ScheduleDTO): ScheduleUI {
  return dto;
}

export function mapScheduleUItoDTO(ui: ScheduleUI): ScheduleDTO {
  return ui;
}
