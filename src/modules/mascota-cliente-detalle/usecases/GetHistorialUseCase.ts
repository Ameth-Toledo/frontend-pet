import { clienteMascotaDetalleService } from "../services/clienteMascotaDetalle.service";
import { MascotaDetalleMapper } from "../model/mapper";
import { HistorialUI } from "../model/ui.model";

export const getHistorialUseCase = async (mascotaId: string): Promise<HistorialUI[]> => {
  const dtos = await clienteMascotaDetalleService.getHistorialByMascotaId(mascotaId);
  return dtos.map(MascotaDetalleMapper.historialFromDTOtoUI);
};