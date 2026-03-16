import { apiClient } from '@/lib/axios';
import { ClienteConfiguracionResponseDTO } from '../model/dto/response/ClienteConfiguracionResponseDTO';
import { ChangePasswordClienteRequestDTO } from '../model/dto/request/ChangePasswordClienteRequestDTO';
import { UpdateClienteConfiguracionRequestDTO } from '../model/dto/request/UpdateClienteConfiguracionRequestDTO';

export const clienteConfiguracionService = {

  getConfiguracion: async (): Promise<ClienteConfiguracionResponseDTO> => {
    const stored = localStorage.getItem('user');
    if (!stored) throw new Error('No hay sesión activa');
    const user = JSON.parse(stored);
    const res = await apiClient.get(`/clients/${user.id}`);
    const data = res.data.data ?? res.data;
    return {
      id:                String(data.id),
      nombreCompleto:    `${data.nombre} ${data.apellido}`.trim(),
      correoElectronico: data.email     ?? '',
      telefono:          data.telefono  ?? '',
      rol:               user.role      ?? '',
    };
  },

  updateConfiguracion: async (dto: UpdateClienteConfiguracionRequestDTO): Promise<void> => {
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
    // Actualizar localStorage
    user.fullName = dto.nombreCompleto;
    user.email    = dto.correoElectronico;
    localStorage.setItem('user', JSON.stringify(user));
  },

  changePassword: async (dto: ChangePasswordClienteRequestDTO): Promise<void> => {
    await apiClient.put('/veterinarios/cambiar-password', {
      password_actual: dto.passwordActual,
      password_nueva:  dto.nuevaPassword,
    });
  },
};