import { clientesService } from "../services/clientes.service";
import { ClienteMapper } from "../model/mapper";
import { ClienteUI } from "../model/ui.model";

export const getClientesUseCase = async (): Promise<ClienteUI[]> => {
  const dtos = await clientesService.getClientes();
  return dtos.map(ClienteMapper.fromDTOtoUI);
};