import { TipoCitaDTO } from "../dto/response/AppointmentResponseDTO";

export interface Appointment {
  id: string;
  titulo: string;
  doctor: string;
  mes: string;
  dia: number;
  hora: string;
  tipo: TipoCitaDTO;
}