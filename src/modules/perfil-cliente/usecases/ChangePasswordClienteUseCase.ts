import { clienteConfiguracionService } from '../services/clienteConfiguracion.service';
import { ClienteConfiguracionMapper } from '../model/mapper';
import { ChangePasswordFormUI } from '../model/ui.model';

export const changePasswordClienteUseCase = async (form: ChangePasswordFormUI): Promise<void> => {
  const dto = ClienteConfiguracionMapper.toChangePasswordRequestDTO(form);
  await clienteConfiguracionService.changePassword(dto);
};