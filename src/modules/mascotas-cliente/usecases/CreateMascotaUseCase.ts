import { clienteMascotasService } from '../services/clienteMascotas.service';
import { CreateMascotaRequestDTO } from '../model/dto/request/CreateMascotaRequestDTO';
import { MascotaClienteMapper } from '../model/mapper';
import { MascotaUI } from '../model/ui.model';

export const createMascotaUseCase = async (
  data: CreateMascotaRequestDTO
): Promise<MascotaUI> => {
  const response = await clienteMascotasService.createMascota(data);
  return MascotaClienteMapper.fromDTOtoUI(response);
};