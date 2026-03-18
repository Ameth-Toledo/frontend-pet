import { CitaAdminResponseDTO, CitaEstadoDTO } from './dto/response/CitaAdminResponseDTO';
import { CitaAdmin } from './entities/CitaAdmin';
import { CitaUI, CitaEstadoUI } from './ui.model';

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

function getIniciales(nombre: string): string {
  return nombre.split(' ').slice(0, 2).map((n) => n[0]?.toUpperCase() ?? '').join('');
}

export class CitaAdminMapper {
  static toEntity(dto: CitaAdminResponseDTO): CitaAdmin {
    return {
      id:             String(dto.id_cita),
      paciente:       dto.mascota,
      raza:           dto.especie,
      species:        dto.especie === 'Perro' ? 'dog' : dto.especie === 'Gato' ? 'cat' : 'other',
      propietario:    dto.dueno,
      servicio:       dto.servicio,
      fecha:          dto.fecha_cita,
      hora:           dto.fecha_cita,
      estado:         dto.estado_cita,
      id_mascota:     dto.id_cita,
      id_user:        0,
      id_veterinario: null,
      veterinario:    dto.veterinario,
    };
  }

  static toUIModel(entity: CitaAdmin): CitaUI {
    return {
      id:                entity.id,
      paciente:          entity.paciente,
      raza:              entity.raza,
      species:           entity.species,
      iniciales:         getIniciales(entity.paciente),
      propietario:       entity.propietario,
      servicio:          entity.servicio,
      servicioSubtitulo: '',
      fecha:             formatFecha(entity.fecha),
      hora:              formatHora(entity.hora),
      estado:            estadoMap[entity.estado as CitaEstadoDTO] ?? 'Pendiente',
      id_mascota:        entity.id_mascota,
      id_user:           entity.id_user,
      id_veterinario:    entity.id_veterinario,
      veterinario:       entity.veterinario,
    };
  }

  static fromDTOtoUI(dto: CitaAdminResponseDTO): CitaUI {
    return CitaAdminMapper.toUIModel(CitaAdminMapper.toEntity(dto));
  }
}