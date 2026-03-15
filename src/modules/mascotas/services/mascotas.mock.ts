import { MascotaResponseDTO } from "../model/dto/response/MascotaResponseDTO";

export const mockMascotas: MascotaResponseDTO[] = [
  { id: 1, nombre: "Buddy", especie: "Perro", raza: "Golden Retriever", propietario: "Sarah Jenkins", estado: "ACTIVO"   },
  { id: 2, nombre: "Misty", especie: "Gato",  raza: "Siamés",           propietario: "Mark Thompson", estado: "ACTIVO"   },
  { id: 3, nombre: "Bella", especie: "Perro", raza: "Border Terrier",   propietario: "Linda Garcia",  estado: "INACTIVO" },
];