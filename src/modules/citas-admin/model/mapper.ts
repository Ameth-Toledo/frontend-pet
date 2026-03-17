import { CitaAdminResponseDTO, CitaEstadoDTO } from './dto/response/CitaAdminResponseDTO';
import { CitaAdmin } from './entities/CitaAdmin';
import { CitaUI, CitaEstadoUI } from './ui.model';

const servicioMap: Record<number, { label: string; subtitulo: string }> = {
  1: { label: 'Consulta general',  subtitulo: 'Revisión general de salud' },
  2: { label: 'Vacunación',        subtitulo: 'Aplicación de vacuna' },
  3: { label: 'Baño y corte',      subtitulo: 'Servicio de estética' },
  4: { label: 'Desparasitación',   subtitulo: 'Tratamiento antiparasitario' },
  5: { label: 'Cirugía menor',     subtitulo: 'Procedimiento quirúrgico' },
};

const estadoMap: Record<CitaEstadoDTO, CitaEstadoUI> = {
  PENDIENTE:  'Pendiente',
  CONFIRMADA: 'Confirmada',
  CANCELADA:  'Cancelada',
  ATENDIDA:   'Atendida',
};

function formatFecha(isoDate: string): string {
  const d = new Date(isoDate);
  return d.toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase();
}

function formatHora(isoDate: string): string {
  const d = new Date(isoDate);
  return d.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit', hour12: true });
}

export class CitaAdminMapper {
  static toEntity(dto: CitaAdminResponseDTO): CitaAdmin {
    return {
      id:             String(dto.id),
      paciente:       `Mascota #${dto.id_mascota}`,
      raza:           '',
      species:        'other',
      propietario:    `Usuario #${dto.id_user}`,
      servicio:       String(dto.id_servicio),
      fecha:          dto.fecha,
      hora:           dto.fecha,
      estado:         dto.estado,
      id_mascota:     dto.id_mascota,
      id_user:        dto.id_user,
      id_veterinario: dto.id_veterinario ?? null,
    };
  }

  static toUIModel(entity: CitaAdmin): CitaUI {
    const servicio = servicioMap[parseInt(entity.servicio)] ?? { label: 'Servicio', subtitulo: '' };
    return {
      id:                entity.id,
      paciente:          entity.paciente,
      raza:              entity.raza,
      species:           entity.species,
      iniciales:         `M${entity.id_mascota}`,
      propietario:       entity.propietario,
      servicio:          servicio.label,
      servicioSubtitulo: servicio.subtitulo,
      fecha:             formatFecha(entity.fecha),
      hora:              formatHora(entity.hora),
      estado:            estadoMap[entity.estado as CitaEstadoDTO] ?? 'Pendiente',
      id_mascota:        entity.id_mascota,
      id_user:           entity.id_user,
      id_veterinario:    entity.id_veterinario,
    };
  }

  static fromDTOtoUI(dto: CitaAdminResponseDTO): CitaUI {
    return CitaAdminMapper.toUIModel(CitaAdminMapper.toEntity(dto));
  }
}