export const ROUTES = {
  PUBLIC: {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    AGENDAR_CITA: '/agendar-cita',

    // 🔹 Flujo agendar cita
    AGENDAR_CITA_SERVICIO: '/agendar-cita/servicio',
    AGENDAR_CITA_DATOS: '/agendar-cita/datos',
  },

  CLIENTE: {
    DASHBOARD: '/cliente/dashboard',
    MASCOTAS: '/cliente/mascotas',
    CITAS: '/cliente/citas',
    PERFIL: '/cliente/perfil',
  },

  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    USUARIOS: '/admin/usuarios',
    REPORTES: '/admin/reportes',
  },

  VETERINARIO: {
    DASHBOARD: '/veterinario/dashboard',
    HISTORIAL: '/veterinario/historial-clinico',
    CITAS: '/veterinario/citas',
  },
} as const;

export const getRedirectByRole = (role: string): string => {
  switch (role) {
    case 'CLIENTE':
      return ROUTES.CLIENTE.DASHBOARD;
    case 'ADMIN':
      return ROUTES.ADMIN.DASHBOARD;
    case 'VETERINARIO':
      return ROUTES.VETERINARIO.DASHBOARD;
    default:
      return ROUTES.PUBLIC.LOGIN;
  }
};