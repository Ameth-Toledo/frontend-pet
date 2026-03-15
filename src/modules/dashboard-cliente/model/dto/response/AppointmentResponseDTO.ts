export type TipoCitaDTO = "CONSULTA" | "VACUNA" | "CIRUGIA" | "OTRO";

export interface AppointmentResponseDTO {
  id: string;
  titulo: string;
  doctor: string;
  mes: string;
  dia: number;
  hora: string;
  tipo: TipoCitaDTO;
}