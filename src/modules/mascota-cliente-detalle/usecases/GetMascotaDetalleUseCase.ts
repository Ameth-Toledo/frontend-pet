import { clienteMascotaDetalleService } from "../services/clienteMascotaDetalle.service";
import { MascotaDetalleMapper } from "../model/mapper";
import { MascotaDetalleUI } from "../model/ui.model";

export const getMascotaDetalleUseCase = async (
  mascotaId: string
): Promise<MascotaDetalleUI | null> => {
  const dto = await clienteMascotaDetalleService.getMascotaDetalle(mascotaId);
  if (!dto) return null;
  return MascotaDetalleMapper.mascotaFromDTOtoUI(dto);
};