import { MascotaDTO } from "../model/dto";

const mockMascotas: MascotaDTO[] = [
  { id: "pet-001", nombre: "Luna",     especie: "GATO",  edad: 3 },
  { id: "pet-002", nombre: "Firulais", especie: "PERRO", edad: 5 },
  { id: "pet-003", nombre: "Rocky",    especie: "PERRO", edad: 2 },
  { id: "pet-004", nombre: "Bella",    especie: "GATO",  edad: 4 },
];

export const clienteMascotasService = {
  getMascotas: (): Promise<MascotaDTO[]> =>
    new Promise((resolve) => setTimeout(() => resolve(mockMascotas), 500)),
};