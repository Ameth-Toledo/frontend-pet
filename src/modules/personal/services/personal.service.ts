import { apiClient } from '@/lib/axios';
import { VeterinarioResponseDTO } from '../model/dto/response/VeterinarioResponseDTO';
import { CreatePersonalRequestDTO } from '../model/dto/request/CreatePersonalRequestDTO';

function generarContrasena(): string {
  return Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
}

export const personalService = {

  getVeterinarios: async (): Promise<VeterinarioResponseDTO[]> => {
    const [resVets, resAdmins] = await Promise.all([
      apiClient.get('/veterinarios/listar'),
      apiClient.get('/auth/users/admins'),
    ]);

    const vets  = Array.isArray(resVets.data?.data)   ? resVets.data.data   : [];
    const admins = Array.isArray(resAdmins.data?.data) ? resAdmins.data.data : [];

    const veterinariosUI: VeterinarioResponseDTO[] = vets.map((v: {
      id: number; nombre: string; apellido: string;
      especialidad?: string; telefono?: string;
      email: string; cedula_profesional?: string; activo: boolean;
    }) => ({
      id:             String(v.id),
      nombre:         `${v.nombre} ${v.apellido}`.trim(),
      especialidad:   v.especialidad ?? 'Veterinario General',
      telefono:       v.telefono    ?? '',
      email:          v.email,
      cedula:         v.cedula_profesional ?? '',
      estado:         'ACTIVO' as const,
      avatarInitials: `${v.nombre[0] ?? ''}${v.apellido?.[0] ?? ''}`.toUpperCase(),
      rol:            'VETERINARIO' as const,
    }));

    const adminsUI: VeterinarioResponseDTO[] = admins.map((a: {
      id_user: number; nombre: string; apellido: string;
      telefono?: string; email: string; activo: boolean;
    }) => ({
      id:             String(a.id_user),
      nombre:         `${a.nombre} ${a.apellido}`.trim(),
      especialidad:   'Administrador',
      telefono:       a.telefono ?? '',
      email:          a.email,
      cedula:         'N/A',
      estado:         a.activo ? 'ACTIVO' as const : 'INACTIVO' as const,
      avatarInitials: `${a.nombre[0] ?? ''}${a.apellido?.[0] ?? ''}`.toUpperCase(),
      rol:            'ADMINISTRADOR' as const,
    }));

    return [...veterinariosUI, ...adminsUI];
  },

  generarContrasenaTemp: (): Promise<string> =>
    new Promise((resolve) => setTimeout(() => resolve(generarContrasena()), 300)),

  createPersonal: async (dto: CreatePersonalRequestDTO): Promise<VeterinarioResponseDTO> => {
    const [nombre, ...rest] = dto.nombreCompleto.trim().split(' ');
    const apellido = rest.join(' ');

    if (dto.rol === 'VETERINARIO') {
      await apiClient.post('/veterinarios/registrar', {
        nombre,
        apellido,
        email:              dto.correoElectronico,
        password:           dto.contrasenaTemporal,
        telefono:           '0000000000',
        cedula_profesional: dto.cedulaProfesional,
        especialidad:       'Veterinario General',
      });
    } else {
      await apiClient.post('/auth/register', {
        nombre,
        apellido,
        email:    dto.correoElectronico,
        password: dto.contrasenaTemporal,
        telefono: '0000000000',
        rol:      'ADMIN',
      });
    }

    return {
      id:             String(Math.random()),
      nombre:         dto.nombreCompleto,
      especialidad:   dto.rol === 'VETERINARIO' ? 'Veterinario General' : 'Administrador',
      telefono:       '',
      email:          dto.correoElectronico,
      cedula:         dto.cedulaProfesional || 'N/A',
      estado:         'ACTIVO' as const,
      avatarInitials: `${nombre[0] ?? ''}${apellido[0] ?? ''}`.toUpperCase(),
      rol:            dto.rol === 'VETERINARIO' ? 'VETERINARIO' as const : 'ADMINISTRADOR' as const,
    };
  },
};