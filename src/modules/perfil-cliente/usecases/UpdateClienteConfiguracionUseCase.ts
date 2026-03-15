import { clienteConfiguracionService } from "../services/clienteConfiguracion.service";
import { ClienteConfiguracionMapper } from "../model/mapper";
import { ClienteConfiguracionUI } from "../model/ui.model";

export const updateClienteConfiguracionUseCase = async (
  ui: ClienteConfiguracionUI
): Promise<void> => {
  const dto = ClienteConfiguracionMapper.toUpdateRequestDTO(ui);
  await clienteConfiguracionService.updateConfiguracion(dto);
};