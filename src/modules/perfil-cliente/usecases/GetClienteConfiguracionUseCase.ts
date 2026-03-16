import { clienteConfiguracionService } from '../services/clienteConfiguracion.service';
import { ClienteConfiguracionMapper } from '../model/mapper';
import { ClienteConfiguracionUI } from '../model/ui.model';

export const getClienteConfiguracionUseCase = async (): Promise<ClienteConfiguracionUI> => {
  const dto = await clienteConfiguracionService.getConfiguracion();
  return ClienteConfiguracionMapper.fromDTOtoUI(dto);
};