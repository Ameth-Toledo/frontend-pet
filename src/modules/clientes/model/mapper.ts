import { ClienteResponseDTO, ClienteStatusDTO } from "./dto/response/ClienteResponseDTO";
import { Cliente } from "./entities/Cliente";
import { ClienteUI, ClienteStatusUI } from "./ui.model";

const estadoMap: Record<ClienteStatusDTO, ClienteStatusUI> = {
  ACTIVO:   "Activo",
  INACTIVO: "Inactivo",
};

function getIniciales(nombre: string): string {
  return nombre
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0].toUpperCase())
    .join("");
}

export class ClienteMapper {
  static toEntity(dto: ClienteResponseDTO): Cliente {
    return {
      id:       dto.id,
      nombre:   dto.nombre,
      telefono: dto.telefono,
      email:    dto.email,
      mascotas: dto.mascotas,
      estado:   dto.estado,
    };
  }

  static toUIModel(entity: Cliente): ClienteUI {
    const estado: ClienteStatusDTO = entity.estado;
    return {
      id:        entity.id,
      nombre:    entity.nombre,
      iniciales: getIniciales(entity.nombre),
      telefono:  entity.telefono,
      email:     entity.email,
      mascotas:  entity.mascotas,
      estado:    estadoMap[estado],
    };
  }

  static fromDTOtoUI(dto: ClienteResponseDTO): ClienteUI {
    return ClienteMapper.toUIModel(ClienteMapper.toEntity(dto));
  }
}