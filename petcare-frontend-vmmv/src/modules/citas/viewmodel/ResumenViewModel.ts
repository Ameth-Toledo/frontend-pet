import { useState } from "react";
import { useRouter } from "next/navigation";
import { appointmentsService } from "../services/appointmentsService";

interface AppointmentData {
  servicio: any;
  veterinario: any;
  fecha: string;
  horario: string;
  motivo: string;
  userData: {
    email: string;
    nombre: string;
    apellido: string;
    telefono: string;
  };
  mascotaData: {
    especie: string;
    nombreMascota: string;
    raza: string;
  };
}

export const useResumenViewModel = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const formatFecha = (fecha: string): string => {
    const months = [
      "enero", "febrero", "marzo", "abril", "mayo", "junio",
      "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
    ];
    
    const [year, month, day] = fecha.split('-');
    const monthName = months[parseInt(month) - 1];
    
    return `${parseInt(day)} de ${monthName} de ${year}`;
  };

  const formatHorario = (horario: string): string => {
    return horario;
  };

  const isUserLoggedIn = (): boolean => {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem('token');
  };

  const confirmarCita = async (appointmentData: AppointmentData) => {
    try {
      setIsLoading(true);
      setError("");

      const isLoggedIn = isUserLoggedIn();

      if (!isLoggedIn) {
        // Usuario no logueado: guardar datos y redirigir a registro
        localStorage.setItem('pendingAppointmentData', JSON.stringify(appointmentData));
        router.push('/register?from=appointment');
      } else {
        // Usuario logueado: crear cita directamente
        await crearCita(appointmentData);
      }
    } catch (err: any) {
      console.error('Error confirmando cita:', err);
      setError('Error al confirmar la cita. Por favor intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const crearCita = async (appointmentData: AppointmentData) => {
    const userStr = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!userStr || !token) {
      throw new Error('Usuario no autenticado');
    }

    const user = JSON.parse(userStr);

    // 1. Crear mascota
    const mascotaResponse = await fetch('http://localhost:3003/api/pets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        id_cliente: user.id,
        nombre: appointmentData.mascotaData.nombreMascota,
        id_especie: appointmentData.mascotaData.especie === 'perro' ? 1 : 2,
        id_raza: 1,
        fecha_nacimiento: '2020-01-01',
        sexo: 'M',
        color: 'Sin especificar',
        peso_actual: 0,
        esterilizado: false
      })
    });

    const mascotaData = await mascotaResponse.json();

    if (!mascotaData.success) {
      throw new Error('Error al crear la mascota');
    }

    // 2. Crear cita
    const fechaHora = `${appointmentData.fecha}T${appointmentData.horario}:00.000Z`;

    const citaResponse = await appointmentsService.createAppointment({
      id_cliente: user.id,
      id_mascota: mascotaData.data.id_mascota,
      id_veterinario: appointmentData.veterinario?.id_personal || 4,
      id_servicio: appointmentData.servicio?.id_servicio || 1,
      fecha_hora: fechaHora,
      motivo_detalle: appointmentData.motivo || 'Consulta general'
    });

    if (citaResponse.success) {
      // Limpiar localStorage
      localStorage.removeItem('agendarCitaFlow');
      router.push('/agendar-cita/confirmado');
    } else {
      throw new Error('Error al crear la cita');
    }
  };

  const modificarPaso = (paso: string) => {
    router.push(`/agendar-cita/${paso}`);
  };

  return {
    isLoading,
    error,
    formatFecha,
    formatHorario,
    confirmarCita,
    modificarPaso
  };
};