import { VeterinarioProfileResponseDTO } from "./dto/response/VeterinarioProfileResponseDTO";
import { ScheduleResponseDTO, DayScheduleDTO } from "./dto/response/ScheduleResponseDTO";
import { UpdateVetProfileRequestDTO } from "./dto/request/UpdateVetProfileRequestDTO";
import { SaveScheduleRequestDTO } from "./dto/request/SaveScheduleRequestDTO";
import { VeterinarioProfile } from "./entities/VeterinarioProfile";
import { Schedule } from "./entities/DaySchedule";
import { VeterinarioProfileUI, VeterinarioProfileFormUI, ScheduleUI, DayScheduleUI } from "./ui.model";

export class VetProfileMapper {
  static toEntity(dto: VeterinarioProfileResponseDTO): VeterinarioProfile {
    return { id: dto.id, nombreCompleto: dto.nombreCompleto, correoElectronico: dto.correoElectronico, telefono: dto.telefono, cedula: dto.cedula };
  }

  static toUIModel(entity: VeterinarioProfile): VeterinarioProfileUI {
    return { id: entity.id, nombreCompleto: entity.nombreCompleto, correoElectronico: entity.correoElectronico, telefono: entity.telefono, cedula: entity.cedula };
  }

  static fromDTOtoUI(dto: VeterinarioProfileResponseDTO): VeterinarioProfileUI {
    return VetProfileMapper.toUIModel(VetProfileMapper.toEntity(dto));
  }

  static toUpdateRequestDTO(id: string, form: VeterinarioProfileFormUI): UpdateVetProfileRequestDTO {
    return { id, nombreCompleto: form.nombreCompleto, correoElectronico: form.correoElectronico, telefono: form.telefono, cedula: form.cedula };
  }

  static scheduleToUI(dto: ScheduleResponseDTO): ScheduleUI {
    const result: ScheduleUI = {};
    for (const day in dto) {
      const d: DayScheduleDTO = dto[day];
      result[day] = { enabled: d.enabled, start: d.start, end: d.end };
    }
    return result;
  }

  static scheduleToRequestDTO(ui: ScheduleUI): SaveScheduleRequestDTO {
    const result: SaveScheduleRequestDTO = {};
    for (const day in ui) {
      const d: DayScheduleUI = ui[day];
      result[day] = { enabled: d.enabled, start: d.start, end: d.end };
    }
    return result;
  }
}