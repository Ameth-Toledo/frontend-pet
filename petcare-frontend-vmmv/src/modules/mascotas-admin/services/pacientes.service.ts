import { PacienteDTO } from "../model/dto";

const mockPacientes: PacienteDTO[] = [
  {
    id: "PAC-001",
    nombre: "Buddy",
    especie: "PERRO",
    raza: "Golden Retriever",
    propietario: "Sarah Jenkins",
    estado: "ACTIVO",
  },
  {
    id: "PAC-002",
    nombre: "Misty",
    especie: "GATO",
    raza: "Siames",
    propietario: "Mark Thompson",
    estado: "ACTIVO",
  },
  {
    id: "PAC-003",
    nombre: "Bella",
    especie: "PERRO",
    raza: "Border Terrier",
    propietario: "Linda Garcia",
    estado: "INACTIVO",
  },
  {
    id: "PAC-004",
    nombre: "Max",
    especie: "PERRO",
    raza: "Labrador",
    propietario: "James Wilson",
    estado: "ACTIVO",
  },
  {
    id: "PAC-005",
    nombre: "Luna",
    especie: "GATO",
    raza: "Persa",
    propietario: "Emma Davis",
    estado: "ACTIVO",
  },
  {
    id: "PAC-006",
    nombre: "Rocky",
    especie: "PERRO",
    raza: "Pug",
    propietario: "Carlos Méndez",
    estado: "INACTIVO",
  },
];

export const pacientesService = {
  getPacientes: (): Promise<PacienteDTO[]> => Promise.resolve(mockPacientes),
};