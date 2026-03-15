import { ClienteConfiguracionResponseDTO } from "./dto/response/ClienteConfiguracionResponseDTO";
import { UpdateClienteConfiguracionRequestDTO } from "./dto/request/UpdateClienteConfiguracionRequestDTO";
import { ChangePasswordClienteRequestDTO } from "./dto/request/ChangePasswordClienteRequestDTO";
import { ClienteConfiguracion } from "./entities/ClienteConfiguracion";
import { ClienteConfiguracionUI, ChangePasswordFormUI } from "./ui.model";

export class ClienteConfiguracionMapper {
  static toEntity(dto: ClienteConfiguracionResponseDTO): ClienteConfiguracion {
    return {
      id:                dto.id,
      nombreCompleto:    dto.nombreCompleto,
      correoElectronico: dto.correoElectronico,
      telefono:          dto.telefono,
      rol:               dto.rol,
    };
  }

  static toUIModel(entity: ClienteConfiguracion): ClienteConfiguracionUI {
    return {
      id:                entity.id,
      nombreCompleto:    entity.nombreCompleto,
      correoElectronico: entity.correoElectronico,
      telefono:          entity.telefono,
      rol:               entity.rol,
    };
  }

  static fromDTOtoUI(dto: ClienteConfiguracionResponseDTO): ClienteConfiguracionUI {
    return ClienteConfiguracionMapper.toUIModel(ClienteConfiguracionMapper.toEntity(dto));
  }

  static toUpdateRequestDTO(ui: ClienteConfiguracionUI): UpdateClienteConfiguracionRequestDTO {
    return {
      id:                ui.id,
      nombreCompleto:    ui.nombreCompleto,
      correoElectronico: ui.correoElectronico,
      telefono:          ui.telefono,
      rol:               ui.rol,
    };
  }

  static toChangePasswordRequestDTO(form: ChangePasswordFormUI): ChangePasswordClienteRequestDTO {
    return {
      passwordActual:    form.passwordActual,
      nuevaPassword:     form.nuevaPassword,
      confirmarPassword: form.confirmarPassword,
    };
  }
}