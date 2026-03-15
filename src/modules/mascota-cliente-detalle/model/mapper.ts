import { MascotaDetalleResponseDTO } from "./dto/response/MascotaDetalleResponseDTO";
import { HistorialResponseDTO } from "./dto/response/HistorialResponseDTO";
import { VacunaResponseDTO } from "./dto/response/VacunaResponseDTO";
import { MascotaDetalle } from "./entities/MascotaDetalle";
import { Historial } from "./entities/Historial";
import { Vacuna } from "./entities/Vacuna";
import { MascotaDetalleUI, HistorialUI, VacunaUI } from "./ui.model";

const MESES: Record<number, string> = {
  0: "ENE", 1: "FEB", 2: "MAR", 3: "ABR",
  4: "MAY", 5: "JUN", 6: "JUL", 7: "AGO",
  8: "SEP", 9: "OCT", 10: "NOV", 11: "DIC",
};

const MESES_LARGO: Record<number, string> = {
  0: "Ene", 1: "Feb", 2: "Mar", 3: "Abr",
  4: "May", 5: "Jun", 6: "Jul", 7: "Ago",
  8: "Sep", 9: "Oct", 10: "Nov", 11: "Dic",
};

function parseLocalDate(isoDate: string): Date {
  const [year, month, day] = isoDate.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function formatFechaHistorial(isoDate: string): string {
  const date = parseLocalDate(isoDate);
  return `${date.getDate()} ${MESES[date.getMonth()]} ${date.getFullYear()}`;
}

function formatFechaVacuna(isoDate: string): string {
  const date = parseLocalDate(isoDate);
  return `${date.getDate()} ${MESES_LARGO[date.getMonth()]} ${date.getFullYear()}`;
}

export class MascotaDetalleMapper {
  static toMascotaEntity(dto: MascotaDetalleResponseDTO): MascotaDetalle {
    return {
      id:          dto.id,
      nombre:      dto.nombre,
      especie:     dto.especie,
      raza:        dto.raza,
      edad:        dto.edad,
      propietario: dto.propietario,
      fotoUrl:     dto.fotoUrl,
    };
  }

  static toMascotaUI(entity: MascotaDetalle): MascotaDetalleUI {
    return {
      id:          entity.id,
      nombre:      entity.nombre,
      especie:     entity.especie,
      raza:        entity.raza,
      edad:        `${entity.edad} años`,
      propietario: entity.propietario,
      fotoUrl:     entity.fotoUrl,
    };
  }

  static mascotaFromDTOtoUI(dto: MascotaDetalleResponseDTO): MascotaDetalleUI {
    return MascotaDetalleMapper.toMascotaUI(MascotaDetalleMapper.toMascotaEntity(dto));
  }

  static toHistorialEntity(dto: HistorialResponseDTO): Historial {
    return {
      id:            dto.id,
      fecha:         dto.fecha,
      motivo:        dto.motivo,
      observaciones: dto.observaciones,
      veterinario:   dto.veterinario,
    };
  }

  static toHistorialUI(entity: Historial): HistorialUI {
    return {
      id:               entity.id,
      fechaFormateada:  formatFechaHistorial(entity.fecha),
      motivo:           entity.motivo,
      observaciones:    entity.observaciones,
      veterinario:      entity.veterinario,
    };
  }

  static historialFromDTOtoUI(dto: HistorialResponseDTO): HistorialUI {
    return MascotaDetalleMapper.toHistorialUI(MascotaDetalleMapper.toHistorialEntity(dto));
  }

  static toVacunaEntity(dto: VacunaResponseDTO): Vacuna {
    return { id: dto.id, nombre: dto.nombre, fechaAplicacion: dto.fechaAplicacion };
  }

  static toVacunaUI(entity: Vacuna): VacunaUI {
    return { id: entity.id, nombre: entity.nombre, fecha: formatFechaVacuna(entity.fechaAplicacion) };
  }

  static vacunaFromDTOtoUI(dto: VacunaResponseDTO): VacunaUI {
    return MascotaDetalleMapper.toVacunaUI(MascotaDetalleMapper.toVacunaEntity(dto));
  }
}