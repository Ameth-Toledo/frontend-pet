import { PetResponseDTO, TipoPetDTO } from "./dto/response/PetResponseDTO";
import { AppointmentResponseDTO, TipoCitaDTO } from "./dto/response/AppointmentResponseDTO";
import { ClienteDashboardResponseDTO } from "./dto/response/ClienteDashboardResponseDTO";
import { Pet } from "./entities/Pet";
import { Appointment } from "./entities/Appointment";
import { ClienteDashboard } from "./entities/ClienteDashboard";
import { PetUI, AppointmentUI, ClienteDashboardUI, TipoPetUI, TipoCitaUI } from "./ui.model";

const tipoPetMap: Record<TipoPetDTO, TipoPetUI> = {
  PERRO: "perro",
  GATO:  "gato",
  AVE:   "ave",
  OTRO:  "otro",
};

const tipoCitaMap: Record<TipoCitaDTO, TipoCitaUI> = {
  CONSULTA: "consulta",
  VACUNA:   "vacuna",
  CIRUGIA:  "cirugia",
  OTRO:     "otro",
};

function buildInitials(nombre: string): string {
  return nombre
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase() ?? "")
    .join("");
}

export class ClienteDashboardMapper {
  static toPetEntity(dto: PetResponseDTO): Pet {
    return { id: dto.id, nombre: dto.nombre, tipo: dto.tipo, raza: dto.raza };
  }

  static toPetUI(entity: Pet): PetUI {
    const tipo: TipoPetDTO = entity.tipo;
    return { id: entity.id, nombre: entity.nombre, tipo: tipoPetMap[tipo], raza: entity.raza };
  }

  static toAppointmentEntity(dto: AppointmentResponseDTO): Appointment {
    return { id: dto.id, titulo: dto.titulo, doctor: dto.doctor, mes: dto.mes, dia: dto.dia, hora: dto.hora, tipo: dto.tipo };
  }

  static toAppointmentUI(entity: Appointment): AppointmentUI {
    const tipo: TipoCitaDTO = entity.tipo;
    return { id: entity.id, titulo: entity.titulo, doctor: entity.doctor, mes: entity.mes, dia: entity.dia, hora: entity.hora, tipo: tipoCitaMap[tipo] };
  }

  static toDashboardEntity(dto: ClienteDashboardResponseDTO): ClienteDashboard {
    return {
      usuarioNombre:    dto.usuarioNombre,
      usuarioMembresia: dto.usuarioMembresia,
      mascotas:         dto.mascotas.map(ClienteDashboardMapper.toPetEntity),
      proximasCitas:    dto.proximasCitas.map(ClienteDashboardMapper.toAppointmentEntity),
    };
  }

  static toDashboardUI(entity: ClienteDashboard): ClienteDashboardUI {
    return {
      usuarioNombre:    entity.usuarioNombre,
      usuarioMembresia: entity.usuarioMembresia,
      usuarioInitials:  buildInitials(entity.usuarioNombre),
      mascotas:         entity.mascotas.map(ClienteDashboardMapper.toPetUI),
      proximasCitas:    entity.proximasCitas.map(ClienteDashboardMapper.toAppointmentUI),
    };
  }

  static fromDTOtoUI(dto: ClienteDashboardResponseDTO): ClienteDashboardUI {
    return ClienteDashboardMapper.toDashboardUI(ClienteDashboardMapper.toDashboardEntity(dto));
  }
}