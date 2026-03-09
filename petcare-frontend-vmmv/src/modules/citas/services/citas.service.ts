import { CitaVetDTO } from "../model/dto";

const mockCitas: CitaVetDTO[] = [
  {
    id: "VCIT-001",
    paciente: "Buddy",
    raza: "Golden Retriever",
    species: "dog",
    propietario: "Sarah Jenkins",
    servicio: "CHEQUEO_MEDICO",
    fecha: "12 Oct, 2023",
    hora: "10:30 AM",
    estado: "CONFIRMADA",
  },
  {
    id: "VCIT-002",
    paciente: "Bini",
    raza: "Border Terrier",
    species: "dog",
    propietario: "Linda Garcia",
    servicio: "LIMPIEZA_DENTAL",
    fecha: "13 Oct, 2023",
    hora: "09:00 AM",
    estado: "CONFIRMADA",
  },
  {
    id: "VCIT-003",
    paciente: "Toro",
    raza: "Pug",
    species: "dog",
    propietario: "James Wilson",
    servicio: "CONTROL_PESO",
    fecha: "13 Oct, 2023",
    hora: "03:30 PM",
    estado: "CANCELADA",
  },
  {
    id: "VCIT-004",
    paciente: "Luna",
    raza: "Siamese Cat",
    species: "cat",
    propietario: "Mark Thompson",
    servicio: "VACUNACION",
    fecha: "14 Oct, 2023",
    hora: "11:00 AM",
    estado: "CONFIRMADA",
  },
];

export const citasVetService = {
  getCitas: (): Promise<CitaVetDTO[]> => Promise.resolve(mockCitas),
};
