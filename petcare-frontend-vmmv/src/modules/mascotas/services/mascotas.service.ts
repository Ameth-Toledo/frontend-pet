import { MascotaDTO } from "../model/dto";

const mockMascotas: MascotaDTO[] = [
  { id: 1, nombre: "Buddy", especie: "Perro", raza: "Golden Retriever", propietario: "Sarah Jenkins",  estado: "ACTIVO" },
  { id: 2, nombre: "Misty", especie: "Gato",  raza: "Siam\u00e9s",          propietario: "Mark Thompson",  estado: "ACTIVO" },
  { id: 3, nombre: "Bella", especie: "Perro", raza: "Border Terrier",  propietario: "Linda Garcia",   estado: "INACTIVO" },
];

export const mascotasService = {
  getMascotas: (): Promise<MascotaDTO[]> => Promise.resolve(mockMascotas),
};
