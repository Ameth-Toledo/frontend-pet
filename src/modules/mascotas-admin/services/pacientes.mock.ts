import { PacienteResponseDTO } from "../model/dto/response/PacienteResponseDTO";

export const mockPacientes: PacienteResponseDTO[] = [
  { id: "PAC-001", nombre: "Buddy", especie: "PERRO", raza: "Golden Retriever", propietario: "Sarah Jenkins", estado: "ACTIVO"   },
  { id: "PAC-002", nombre: "Misty", especie: "GATO",  raza: "Siames",           propietario: "Mark Thompson", estado: "ACTIVO"   },
  { id: "PAC-003", nombre: "Bella", especie: "PERRO", raza: "Border Terrier",   propietario: "Linda Garcia",  estado: "INACTIVO" },
  { id: "PAC-004", nombre: "Max",   especie: "PERRO", raza: "Labrador",         propietario: "James Wilson",  estado: "ACTIVO"   },
  { id: "PAC-005", nombre: "Luna",  especie: "GATO",  raza: "Persa",            propietario: "Emma Davis",    estado: "ACTIVO"   },
  { id: "PAC-006", nombre: "Rocky", especie: "PERRO", raza: "Pug",              propietario: "Carlos Méndez", estado: "INACTIVO" },
];