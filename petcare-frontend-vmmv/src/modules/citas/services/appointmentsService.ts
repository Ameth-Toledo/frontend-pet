import axios from 'axios';

const APPOINTMENTS_API = process.env.NEXT_PUBLIC_API_APPOINTMENTS || 'http://localhost:3004';
const PETS_API = process.env.NEXT_PUBLIC_API_PETS || 'http://localhost:3003';

// Cliente con token automático
const apiClient = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token
apiClient.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export const appointmentsService = {
  // Paso 1: Obtener servicios
  async getServices() {
    const response = await apiClient.get(`${APPOINTMENTS_API}/api/appointments/services`);
    return response.data;
  },

  // Paso 2: Obtener veterinarios
  async getProfessionals() {
    const response = await apiClient.get(`${APPOINTMENTS_API}/api/appointments/professionals`);
    return response.data;
  },

  // Paso 4: Obtener disponibilidad de fecha (verificar si trabaja ese día)
  async getAvailability(params: { id_personal: number; fecha: string }) {
    const response = await apiClient.get(`${APPOINTMENTS_API}/api/appointments/availability`, { params });
    return response.data;
  },

  // Paso 5: Obtener horarios disponibles (slots)
  async getTimeSlots(params: { id_personal: number; fecha: string; id_servicio?: number }) {
    const response = await apiClient.get(`${APPOINTMENTS_API}/api/appointments/time-slots`, { params });
    return response.data;
  },

  // Paso 5: Obtener mascotas del cliente
  async getClientPets(clientId: number) {
    const response = await apiClient.get(`${PETS_API}/api/pets/client/${clientId}`);
    return response.data;
  },

  // Paso 6: Crear cita
  async createAppointment(data: {
    id_cliente: number;
    id_mascota: number;
    id_veterinario: number;
    id_servicio: number;
    fecha_hora: string;
    motivo_detalle?: string;
  }) {
    const response = await apiClient.post(`${APPOINTMENTS_API}/api/appointments`, data);
    return response.data;
  },
};