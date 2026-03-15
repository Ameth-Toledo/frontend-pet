import { CitaClienteResponseDTO } from "../model/dto/response/CitaClienteResponseDTO";

export const mockCitasCliente: CitaClienteResponseDTO[] = [
  { id: "1", fecha: "2025-02-22", hora: "10:00", motivo: "General Checkup",  mascotaNombre: "Fierrolais", estado: "CONFIRMADA" },
  { id: "2", fecha: "2025-02-28", hora: "08:30", motivo: "General Checkup",  mascotaNombre: "Firu",       estado: "CANCELADA"  },
  { id: "3", fecha: "2025-02-12", hora: "15:45", motivo: "Desparasitación",  mascotaNombre: "Luna",       estado: "COMPLETADA" },
];