import { VetAppointmentResponseDTO } from "./dto/response/VetAppointmentResponseDTO";
import { VetPatientResponseDTO } from "./dto/response/VetPatientResponseDTO";
import { VetDashboardStatsResponseDTO } from "./dto/response/VetDashboardStatsResponseDTO";
import { VetAppointment } from "./entities/VetAppointment";
import { VetPatient } from "./entities/VetPatient";
import { VetDashboardStats } from "./entities/VetDashboardStats";
import { VetAppointmentUI, VetPatientUI, VetStatsUI } from "./ui.model";

const typeToLabel: Record<VetAppointmentResponseDTO["type"], string> = {
  checkup:     "CHEQUEO MÉDICO",
  grooming:    "CORTE DE PELO Y BAÑO",
  vaccination: "VACUNACIÓN",
  surgery:     "CIRUGÍA",
};

const typeToVariant: Record<VetAppointmentResponseDTO["type"], VetAppointmentUI["badgeVariant"]> = {
  checkup:     "checkup",
  grooming:    "grooming",
  vaccination: "checkup",
  surgery:     "checkup",
};

export class VeterinarioDashboardMapper {
  static toAppointmentEntity(dto: VetAppointmentResponseDTO): VetAppointment {
    return {
      id:             dto.id,
      patientName:    dto.patientName,
      patientBreed:   dto.patientBreed,
      patientSpecies: dto.patientSpecies,
      ownerName:      dto.ownerName,
      time:           dto.time,
      service:        dto.service,
      type:           dto.type,
    };
  }

static toAppointmentUI(entity: VetAppointment): VetAppointmentUI {
  return {
    id:             entity.id,
    patientName:    entity.patientName,
    patientBreed:   entity.patientBreed,
    patientSpecies: entity.patientSpecies,
    ownerName:      entity.ownerName,
    time:           entity.time,
    service:        entity.service,
    badgeLabel:     typeToLabel[entity.type],
    badgeVariant:   typeToVariant[entity.type],
    _raw:           (entity as any)._raw,
  };
}

  static toPatientEntity(dto: VetPatientResponseDTO): VetPatient {
    return { id: dto.id, name: dto.name, breed: dto.breed };
  }

  static toPatientUI(entity: VetPatient): VetPatientUI {
    return { id: entity.id, name: entity.name, breed: entity.breed };
  }

  static toStatsEntity(dto: VetDashboardStatsResponseDTO): VetDashboardStats {
    return {
      appointmentsToday:   dto.appointmentsToday,
      appointmentsTrend:   dto.appointmentsTrend,
      activePatients:      dto.activePatients,
      newPatientsThisWeek: dto.newPatientsThisWeek,
    };
  }

  static toStatsUI(entity: VetDashboardStats): VetStatsUI {
    return {
      appointmentsToday:   entity.appointmentsToday,
      appointmentsTrend:   entity.appointmentsTrend,
      activePatients:      entity.activePatients,
      newPatientsThisWeek: entity.newPatientsThisWeek,
    };
  }

  static appointmentFromDTOtoUI(dto: VetAppointmentResponseDTO): VetAppointmentUI {
    return VeterinarioDashboardMapper.toAppointmentUI(
      VeterinarioDashboardMapper.toAppointmentEntity(dto)
    );
  }

  static patientFromDTOtoUI(dto: VetPatientResponseDTO): VetPatientUI {
    return VeterinarioDashboardMapper.toPatientUI(
      VeterinarioDashboardMapper.toPatientEntity(dto)
    );
  }

  static statsFromDTOtoUI(dto: VetDashboardStatsResponseDTO): VetStatsUI {
    return VeterinarioDashboardMapper.toStatsUI(
      VeterinarioDashboardMapper.toStatsEntity(dto)
    );
  }
}