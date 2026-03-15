import { veterinarioConfiguracionService } from "../services/veterinarioConfiguracion.service";
import { VetProfileMapper } from "../model/mapper";
import { ScheduleUI } from "../model/ui.model";

export const getScheduleUseCase = async (): Promise<ScheduleUI> => {
  const dto = await veterinarioConfiguracionService.getSchedule();
  return VetProfileMapper.scheduleToUI(dto);
};