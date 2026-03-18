import { apiClient } from '@/lib/axios';
import { PacienteResponseDTO } from '../model/dto/response/PacienteResponseDTO';

export const pacientesService = {
  getPacientes: async (): Promise<PacienteResponseDTO[]> => {
    const res  = await apiClient.get('/pets/detalle');
    const data = Array.isArray(res.data?.data) ? res.data.data : [];

    return data.map((p: {
      id_mascota: number; nombre: string; especie: string;
      propietario: string; activo: boolean; email_propietario?: string;
    }) => ({
      id:               String(p.id_mascota),
      nombre:           p.nombre,
      especie:          p.especie === 'Perro' ? 'PERRO' : p.especie === 'Gato' ? 'GATO' : 'OTRO',
      raza:             p.especie,
      propietario:      p.propietario,
      emailPropietario: p.email_propietario ?? '',
      estado:           p.activo ? 'ACTIVO' : 'INACTIVO',
    }));
  },
};