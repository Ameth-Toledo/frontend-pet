import { AppointmentResponseDTO } from "./dto/response/AppointmentResponseDTO";
import { PatientResponseDTO } from "./dto/response/PatientResponseDTO";
import { DashboardStatsResponseDTO } from "./dto/response/DashboardStatsResponseDTO";
import { Appointment } from "./entities/Appointment";
import { Patient } from "./entities/Patient";
import { DashboardStats } from "./entities/DashboardStats";
import { AppointmentUI, PatientUI, StatsUI } from "./ui.model";

const typeToLabel: Record<AppointmentResponseDTO["type"], string> = {
  checkup:     "CHEQUEO MÉDICO",
  grooming:    "CORTE DE PELO Y BAÑO",
  vaccination: "VACUNACIÓN",
  surgery:     "CIRUGÍA",
};

const typeToVariant: Record<AppointmentResponseDTO["type"], AppointmentUI["badgeVariant"]> = {
  checkup:     "checkup",
  grooming:    "grooming",
  vaccination: "checkup",
  surgery:     "checkup",
};

export class DashboardMapper {
  static toAppointmentEntity(dto: AppointmentResponseDTO): Appointment {
    return {
      id:             dto.id,
      patientName:    dto.patientName,
      patientBreed:   dto.patientBreed,
      patientSpecies: dto.patientSpecies,
      ownerName:      dto.ownerName,
      time:           dto.time,
      type:           dto.type,
    };
  }

  static toAppointmentUI(entity: Appointment): AppointmentUI {
    return {
      id:             entity.id,
      patientName:    entity.patientName,
      patientBreed:   entity.patientBreed,
      patientSpecies: entity.patientSpecies,
      ownerName:      entity.ownerName,
      time:           entity.time,
      badgeLabel:     typeToLabel[entity.type],
      badgeVariant:   typeToVariant[entity.type],
    };
  }

  static toPatientEntity(dto: PatientResponseDTO): Patient {
    return {
      id:         dto.id,
      name:       dto.name,
      breed:      dto.breed,
      species:    dto.species,
      lastSeenAt: dto.lastSeenAt,
    };
  }

  static toPatientUI(entity: Patient): PatientUI {
    return {
      id:       entity.id,
      name:     entity.name,
      breed:    entity.breed,
      species:  entity.species,
      lastSeen: entity.lastSeenAt,
    };
  }

  static toStatsEntity(dto: DashboardStatsResponseDTO): DashboardStats {
    return {
      appointmentsToday:    dto.appointmentsToday,
      appointmentsTrend:    dto.appointmentsTrend,
      activePatients:       dto.activePatients,
      newPatientsThisWeek:  dto.newPatientsThisWeek,
    };
  }

  static toStatsUI(entity: DashboardStats): StatsUI {
    return {
      appointmentsToday:   entity.appointmentsToday,
      appointmentsTrend:   entity.appointmentsTrend,
      activePatients:      entity.activePatients,
      newPatientsThisWeek: entity.newPatientsThisWeek,
    };
  }

  static appointmentFromDTOtoUI(dto: AppointmentResponseDTO): AppointmentUI {
    return DashboardMapper.toAppointmentUI(DashboardMapper.toAppointmentEntity(dto));
  }

  static patientFromDTOtoUI(dto: PatientResponseDTO): PatientUI {
    return DashboardMapper.toPatientUI(DashboardMapper.toPatientEntity(dto));
  }

  static statsFromDTOtoUI(dto: DashboardStatsResponseDTO): StatsUI {
    return DashboardMapper.toStatsUI(DashboardMapper.toStatsEntity(dto));
  }
}