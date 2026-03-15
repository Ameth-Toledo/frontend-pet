import { apiClient } from "@/lib/axios";
import { VeterinarioResponseDTO } from "../model/dto/response/VeterinarioResponseDTO";
import { CreatePersonalRequestDTO } from "../model/dto/request/CreatePersonalRequestDTO";
import { mockVeterinarios, generarId, generarContrasena } from "./personal.mock";

export const personalService = {
  /**
   * TODO: reemplazar mock por:
   * const res = await apiClient.get<VeterinarioResponseDTO[]>('/admin/personal');
   * return res.data;
   */
  getVeterinarios: (): Promise<VeterinarioResponseDTO[]> =>
    Promise.resolve(mockVeterinarios),

  generarContrasenaTemp: (): Promise<string> =>
    new Promise((resolve) => setTimeout(() => resolve(generarContrasena()), 300)),

  createPersonal: (dto: CreatePersonalRequestDTO): Promise<VeterinarioResponseDTO> =>
    new Promise((resolve) =>
      setTimeout(() => {
        const nuevo: VeterinarioResponseDTO = {
          id:             generarId(),
          nombre:         dto.nombreCompleto,
          especialidad:   dto.rol === "VETERINARIO" ? "Veterinario General" : "Administrador",
          telefono:       "",
          email:          dto.correoElectronico,
          cedula:         dto.cedulaProfesional || "N/A",
          estado:         "ACTIVO",
          avatarInitials: dto.nombreCompleto
            .split(" ")
            .slice(0, 2)
            .map((n) => n[0]?.toUpperCase() ?? "")
            .join(""),
        };
        resolve(nuevo);
      }, 800)
    ),
};

void apiClient;