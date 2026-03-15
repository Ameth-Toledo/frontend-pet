import { apiClient } from "@/lib/axios";
import { ProfileResponseDTO } from "../model/dto/response/ProfileResponseDTO";
import { UpdateProfileRequestDTO } from "../model/dto/request/UpdateProfileRequestDTO";
import { ChangePasswordRequestDTO } from "../model/dto/request/ChangePasswordRequestDTO";
import { mockProfile } from "./perfil.mock";

export const perfilService = {
  /**
   * TODO: reemplazar mocks por:
   * const res = await apiClient.get<ProfileResponseDTO>('/admin/perfil');
   * return res.data;
   */
  getProfile: (): Promise<ProfileResponseDTO> =>
    new Promise((resolve) => setTimeout(() => resolve({ ...mockProfile }), 800)),

  updateProfile: (dto: UpdateProfileRequestDTO): Promise<void> =>
    new Promise((resolve) => {
      setTimeout(() => {
        Object.assign(mockProfile, dto);
        resolve();
      }, 800);
    }),

  changePassword: (dto: ChangePasswordRequestDTO): Promise<void> =>
    new Promise((resolve) => setTimeout(() => resolve(), 800)),
};

void apiClient;