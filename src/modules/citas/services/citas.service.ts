import { apiClient } from '@/lib/axios';
import { CitaVetResponseDTO } from '../model/dto/response/CitaVetResponseDTO';

export const citasVetService = {
  getCitas: async (): Promise<CitaVetResponseDTO[]> => {
    const stored = localStorage.getItem('user');
    if (!stored) return [];
    const user = JSON.parse(stored);
    const vetNombre = user.fullName ?? '';

    const res  = await apiClient.get('/citas/detalle');
    const data = Array.isArray(res.data?.data) ? res.data.data : [];

    return data
      .filter((c: { veterinario: string | null }) =>
        c.veterinario && c.veterinario.toLowerCase().includes(vetNombre.toLowerCase().split(' ')[0])
      )
      .map((c: {
        id_cita: number; mascota: string; especie: string;
        dueno: string; servicio: string; fecha_cita: string;
        estado_cita: string; observaciones_cliente: string | null;
      }) => ({
        id:                    String(c.id_cita),
        paciente:              c.mascota,
        raza:                  c.especie,
        species:               c.especie === 'Perro' ? 'dog' : c.especie === 'Gato' ? 'cat' : 'other',
        propietario:           c.dueno,
        servicio:              c.servicio,
        fecha:                 new Date(c.fecha_cita).toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase(),
        hora:                  new Date(c.fecha_cita).toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit', hour12: true }),
        estado:                c.estado_cita as CitaVetResponseDTO['estado'],
        observaciones_cliente: c.observaciones_cliente,
      }));
  },
};