export const ROUTES = {
  PUBLIC: {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    AGENDAR_CITA: '/agendar-cita',
    AGENDAR_CITA_MASCOTA: '/agendar-cita/mascota',
    AGENDAR_CITA_FECHA: "/agendar-cita/fecha",
    AGENDAR_CITA_HORARIO: "/agendar-cita/horario",
    AGENDAR_CITA_RESUMEN: "/agendar-cita/resumen",
    AGENDAR_CITA_CONFIRMADO: "/agendar-cita/confirmado",
    AGENDAR_CITA_SERVICIO: '/agendar-cita/servicio',
    AGENDAR_CITA_DATOS: '/agendar-cita/datos',
  },

  CLIENTE: {
    DASHBOARD:      '/cliente/dashboard',
    MIS_CITAS:      '/cliente/miscitas',
    MIS_MASCOTAS:   '/cliente/mismascotas',
    CONFIGURACION:  '/cliente/configuracion',
  },

  ADMIN: {
    DASHBOARD:      '/admin/dashboard',
    CLIENTES:       '/admin/clientes',
    CITAS:          '/admin/citas',
    MASCOTAS:       '/admin/mascotas',
    PERSONAL:       '/admin/personal',
    ANALISIS:       '/admin/analisis',
    CONFIGURACION:  '/admin/configuracion',
    // USUARIOS:    '/admin/usuarios',  // ← descomentar cuando esté lista la vista
  },

  VETERINARIO: {
    DASHBOARD:        '/veterinario/dashboard',
    CITAS:            '/veterinario/citas',
    MIS_PACIENTES:    '/veterinario/mis-pacientes',
    HISTORIAL:        '/veterinario/historial-clinico',
    // CONFIGURACION: '/veterinario/configuracion',
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
