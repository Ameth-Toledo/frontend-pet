import { CitaDTO } from "../model/dto";

const mockCitas: CitaDTO[] = [
  {
    id: "1",
    fecha: "2025-02-22",
    hora: "10:00",
    motivo: "General Checkup",
    mascotaNombre: "Fierrolais",
    estado: "CONFIRMADA",
  },
  {
    id: "2",
    fecha: "2025-02-28",
    hora: "08:30",
    motivo: "General Checkup",
    mascotaNombre: "firu",
    estado: "CANCELADA",
  },
  {
    id: "3",
    fecha: "2025-02-12",
    hora: "15:45",
    motivo: "Desparasitación",
    mascotaNombre: "Luna",
    estado: "COMPLETADA",
  },
];

export const clienteCitasService = {
  getCitas: (): Promise<CitaDTO[]> =>
    new Promise((resolve) => setTimeout(() => resolve(mockCitas), 500)),
};