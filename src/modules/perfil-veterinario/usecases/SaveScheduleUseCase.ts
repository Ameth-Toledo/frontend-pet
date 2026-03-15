import { veterinarioConfiguracionService } from "../services/veterinarioConfiguracion.service";
import { VetProfileMapper } from "../model/mapper";
import { ScheduleUI } from "../model/ui.model";

export const saveScheduleUseCase = async (
  schedule: ScheduleUI,
  duration: string
): Promise<void> => {
  const dto = VetProfileMapper.scheduleToRequestDTO(schedule);
  await veterinarioConfiguracionService.saveSchedule(dto, duration);
};