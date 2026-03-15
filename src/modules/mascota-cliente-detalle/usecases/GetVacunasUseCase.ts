import { clienteMascotaDetalleService } from "../services/clienteMascotaDetalle.service";
import { MascotaDetalleMapper } from "../model/mapper";
import { VacunaUI } from "../model/ui.model";

export const getVacunasUseCase = async (mascotaId: string): Promise<VacunaUI[]> => {
  const dtos = await clienteMascotaDetalleService.getVacunasByMascotaId(mascotaId);
  return dtos.map(MascotaDetalleMapper.vacunaFromDTOtoUI);
};