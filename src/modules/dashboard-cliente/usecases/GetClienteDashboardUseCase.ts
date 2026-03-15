import { clienteDashboardService } from "../services/clientedashboard.service";
import { ClienteDashboardMapper } from "../model/mapper";
import { ClienteDashboardUI } from "../model/ui.model";

export const getClienteDashboardUseCase = async (): Promise<ClienteDashboardUI> => {
  const dto = await clienteDashboardService.getDashboard();
  return ClienteDashboardMapper.fromDTOtoUI(dto);
};