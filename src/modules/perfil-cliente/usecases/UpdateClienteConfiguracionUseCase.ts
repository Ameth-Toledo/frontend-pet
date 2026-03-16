import { clienteConfiguracionService } from '../services/clienteConfiguracion.service';
import { ClienteConfiguracionMapper } from '../model/mapper';
import { ClienteConfiguracionUI } from '../model/ui.model';

export const updateClienteConfiguracionUseCase = async (form: ClienteConfiguracionUI): Promise<void> => {
  const dto = ClienteConfiguracionMapper.toUpdateRequestDTO(form);
  await clienteConfiguracionService.updateConfiguracion(dto);
};