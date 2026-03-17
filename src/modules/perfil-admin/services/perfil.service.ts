import { apiClient } from '@/lib/axios';
import { ProfileResponseDTO } from '../model/dto/response/ProfileResponseDTO';
import { ChangePasswordRequestDTO } from '../model/dto/request/ChangePasswordRequestDTO';

export const perfilService = {

  getProfile: async (): Promise<ProfileResponseDTO> => {
    const stored = localStorage.getItem('user');
    if (!stored) throw new Error('No hay sesión activa');
    const user = JSON.parse(stored);

    const res  = await apiClient.get(`/clients/${user.id}`);
    const data = res.data.data ?? res.data;

    return {
      id:                String(data.id ?? user.id),
      nombreCompleto:    data.nombre && data.apellido
                           ? `${data.nombre} ${data.apellido}`.trim()
                           : user.fullName ?? '',
      correoElectronico: data.email    ?? user.email ?? '',
      telefono:          data.telefono ?? '',
      rol:               user.role     ?? '',
    };
  },

  updateProfile: async (dto: { nombreCompleto: string; correoElectronico: string; telefono: string }): Promise<void> => {
    const stored = localStorage.getItem('user');
    if (!stored) throw new Error('No hay sesión activa');
    const user = JSON.parse(stored);
    const [nombre, ...rest] = dto.nombreCompleto.trim().split(' ');
    const apellido = rest.join(' ');
    await apiClient.put(`/clients/${user.id}`, {
      nombre,
      apellido,
      email:    dto.correoElectronico,
      telefono: dto.telefono,
    });
    user.fullName = dto.nombreCompleto;
    user.email    = dto.correoElectronico;
    localStorage.setItem('user', JSON.stringify(user));
  },

  changePassword: async (dto: ChangePasswordRequestDTO): Promise<void> => {
    await apiClient.put('/veterinarios/cambiar-password', {
      password_nueva: dto.newPassword,
    });
  },
};