import { VetAppointmentDTO, VetPatientDTO, VetDashboardStatsDTO } from "./dto";
import { VetAppointmentUI, VetPatientUI, VetStatsUI } from "./ui.model";

const typeToLabel: Record<VetAppointmentDTO["type"], string> = {
  checkup: "CHEQUEO MÉDICO",
  grooming: "CORTE DE PELO Y BAÑO",
  vaccination: "VACUNACIÓN",
  surgery: "CIRUGÍA",
};

const typeToVariant: Record<VetAppointmentDTO["type"], VetAppointmentUI["badgeVariant"]> = {
  checkup: "checkup",
  grooming: "grooming",
  vaccination: "checkup",
  surgery: "checkup",
};

export function mapVetAppointmentDTOtoUI(dto: VetAppointmentDTO): VetAppointmentUI {
  return {
    id: dto.id,
    patientName: dto.patientName,
    patientBreed: dto.patientBreed,
    patientSpecies: dto.patientSpecies,
    ownerName: dto.ownerName,
    time: dto.time,
    service: dto.service,
    badgeLabel: typeToLabel[dto.type],
    badgeVariant: typeToVariant[dto.type],
  };
}

export function mapVetPatientDTOtoUI(dto: VetPatientDTO): VetPatientUI {
  return {
    id: dto.id,
    name: dto.name,
    breed: dto.breed,
  };
}

export function mapVetStatsDTOtoUI(dto: VetDashboardStatsDTO): VetStatsUI {
  return {
    appointmentsToday: dto.appointmentsToday,
    appointmentsTrend: dto.appointmentsTrend,
    activePatients: dto.activePatients,
    newPatientsThisWeek: dto.newPatientsThisWeek,
  };
}
