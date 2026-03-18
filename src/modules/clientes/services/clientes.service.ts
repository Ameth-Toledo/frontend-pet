import { apiClient } from '@/lib/axios';
import { ClienteResponseDTO } from '../model/dto/response/ClienteResponseDTO';

export const clientesService = {
  getClientes: async (): Promise<ClienteResponseDTO[]> => {
    const res  = await apiClient.get('/clients/detalle');
    const data = Array.isArray(res.data?.data) ? res.data.data
      : Array.isArray(res.data)                ? res.data
      : [];

    return data.map((c: {
      id_user: number; nombre: string; apellido: string;
      email: string; telefono?: string; activo: boolean; mascotas: string;
    }) => ({
      id:       String(c.id_user),
      nombre:   `${c.nombre} ${c.apellido}`.trim(),
      telefono: c.telefono ?? '',
      email:    c.email,
      mascotas: c.mascotas ? c.mascotas.split(', ').filter(Boolean) : [],
      estado:   c.activo ? 'ACTIVO' : 'INACTIVO',
    }));
  },
};