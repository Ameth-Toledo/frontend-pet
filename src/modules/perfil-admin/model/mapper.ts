import { ProfileResponseDTO } from "./dto/response/ProfileResponseDTO";
import { UpdateProfileRequestDTO } from "./dto/request/UpdateProfileRequestDTO";
import { Profile } from "./entities/Profile";
import { ProfileUI, ProfileFormUI } from "./profile.ui.model";

export class ProfileMapper {
  static toEntity(dto: ProfileResponseDTO): Profile {
    return {
      id:                dto.id,
      nombreCompleto:    dto.nombreCompleto,
      correoElectronico: dto.correoElectronico,
      telefono:          dto.telefono,
      rol:               dto.rol,
    };
  }

  static toUIModel(entity: Profile): ProfileUI {
    return {
      id:                entity.id,
      nombreCompleto:    entity.nombreCompleto,
      correoElectronico: entity.correoElectronico,
      telefono:          entity.telefono,
      rol:               entity.rol,
    };
  }

  static fromDTOtoUI(dto: ProfileResponseDTO): ProfileUI {
    return ProfileMapper.toUIModel(ProfileMapper.toEntity(dto));
  }

  static toUpdateRequestDTO(id: string, form: ProfileFormUI, rol: string): UpdateProfileRequestDTO {
    return {
      id,
      nombreCompleto:    form.nombreCompleto,
      correoElectronico: form.correoElectronico,
      telefono:          form.telefono,
      rol,
    };
  }
}