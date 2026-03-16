import { CitaClienteResponseDTO } from './dto/response/CitaClienteResponseDTO';
import { CitaCliente } from './entities/CitaCliente';
import { CitaUI } from './ui.model';

const DIAS: Record<number, string> = {
  0: 'DOMINGO', 1: 'LUNES',   2: 'MARTES',
  3: 'MIÉRCOLES', 4: 'JUEVES', 5: 'VIERNES', 6: 'SÁBADO',
};

const MESES: Record<number, string> = {
  0: 'ENE', 1: 'FEB', 2: 'MAR',  3: 'ABR',
  4: 'MAY', 5: 'JUN', 6: 'JUL',  7: 'AGO',
  8: 'SEP', 9: 'OCT', 10: 'NOV', 11: 'DIC',
};

function formatFecha(isoDate: string): string {
  const date = new Date(isoDate);
  return `${DIAS[date.getDay()]} ${date.getDate()} DE ${MESES[date.getMonth()]}`;
}

function formatHora(isoDate: string): string {
  const date = new Date(isoDate);
  const h = date.getHours().toString().padStart(2, '0');
  const m = date.getMinutes().toString().padStart(2, '0');
  return `${h}:${m}`;
}

export class CitaClienteMapper {
  static toEntity(dto: CitaClienteResponseDTO): CitaCliente {
    return {
      id:            String(dto.id),
      fecha:         dto.fecha,
      hora:          formatHora(dto.fecha),
      motivo:        dto.observaciones_cliente ?? 'Sin observaciones',
      mascotaNombre: `Mascota #${dto.id_mascota}`,
      estado:        dto.estado,
    };
  }

  static toUIModel(entity: CitaCliente): CitaUI {
    return {
      id:              entity.id,
      fechaFormateada: formatFecha(entity.fecha),
      hora:            entity.hora,
      titulo:          entity.motivo,
      mascotaNombre:   entity.mascotaNombre,
      motivo:          entity.motivo,
      estado:          entity.estado,
    };
  }

  static fromDTOtoUI(dto: CitaClienteResponseDTO): CitaUI {
    return CitaClienteMapper.toUIModel(CitaClienteMapper.toEntity(dto));
  }
}