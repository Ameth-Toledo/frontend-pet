import { analisisService } from "../services/analisis.service";
import { AnalisisMapper } from "../model/mapper";
import { DashboardMetricsUI } from "../model/metrics.ui.model";

export const getAnalisisUseCase = async (): Promise<DashboardMetricsUI> => {
  const dto = await analisisService.getDashboardMetrics();
  return AnalisisMapper.fromDTOtoUI(dto);
};