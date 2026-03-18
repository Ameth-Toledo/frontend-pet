import { apiClient } from '@/lib/axios';
import { MascotaResponseDTO } from '../model/dto/response/MascotaResponseDTO';

export const mascotasService = {
  getMascotas: async (): Promise<MascotaResponseDTO[]> => {
    const stored = localStorage.getItem('user');
    if (!stored) return [];
    const user = JSON.parse(stored);
    const vetNombre = user.fullName ?? '';

    const res  = await apiClient.get('/citas/detalle');
    const data = Array.isArray(res.data?.data) ? res.data.data : [];

    const misCitas = data.filter((c: { veterinario: string | null }) =>
      c.veterinario && c.veterinario.toLowerCase().includes(
        vetNombre.toLowerCase().split(' ')[0]
      )
    );

    const mascotasMap = new Map<string, MascotaResponseDTO>();
    misCitas.forEach((c: {
      id_cita: number; mascota: string; especie: string; dueno: string;
    }) => {
      if (!mascotasMap.has(c.mascota)) {
        mascotasMap.set(c.mascota, {
          id:          c.id_cita,
          nombre:      c.mascota,
          especie:     c.especie,
          raza:        c.especie,
          propietario: c.dueno,
          estado:      'ACTIVO',
        });
      }
    });

    return Array.from(mascotasMap.values());
  },
};