export const ROUTES = {
  PUBLIC: {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
  },
  CLIENTE: {
    DASHBOARD: '/dashboard',
    MASCOTAS: '/mascotas',
    CITAS: '/citas',
    PERFIL: '/perfil',
  },
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    USUARIOS: '/usuarios',
    REPORTES: '/admin/reportes',
  },
  VETERINARIO: {
    DASHBOARD: '/vet/dashboard',
    HISTORIAL: '/historial-clinico',
    CITAS: '/vet/citas',
  },
} as const;

export const getRedirectByRole = (role: string): string => {
  switch (role) {
    case 'CLIENTE':
      return ROUTES.CLIENTE.MASCOTAS;
    case 'ADMIN':
      return ROUTES.ADMIN.USUARIOS;
    case 'VETERINARIO':
      return ROUTES.VETERINARIO.HISTORIAL;
    default:
      return ROUTES.PUBLIC.LOGIN;
  }
};