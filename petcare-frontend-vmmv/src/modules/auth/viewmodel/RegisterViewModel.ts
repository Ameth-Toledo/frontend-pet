import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthService } from "../services/auth.service";
import { appointmentsService } from "@/modules/citas/services/appointmentsService";

interface RegisterData {
  email: string;
  nombre: string;
  apellido: string;
  telefono: string;
  password: string;
}

interface AppointmentData {
  servicio: any;
  veterinario: any;
  fecha: string;
  horario: string;
  motivo: string;
  userData: any;
  mascotaData: {
    especie: string;
    nombreMascota: string;
    raza: string;
  };
}

export const useRegisterViewModel = (fromAppointment: boolean) => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const register = async (data: RegisterData) => {
    try {
      setIsLoading(true);
      setError("");

      const registerResponse = await AuthService.register(data);

      if (!registerResponse || (registerResponse as any).success === false) {
        throw new Error((registerResponse as any).message || "Error en el registro");
      }

      const loginResponse = await AuthService.login({
        email: data.email,
        password: data.password
      });

      if (typeof window !== 'undefined') {
        localStorage.setItem('token', loginResponse.token);
        localStorage.setItem('user', JSON.stringify(loginResponse.user));
      }
      
      if (fromAppointment) {
        await createPendingAppointment(loginResponse.user.id, loginResponse.token);
      } else {
        redirectToDashboard(loginResponse.user.role);
      }

    } catch (err: any) {
      console.error("❌ Error en registro:", err);
      setError(err.response?.data?.message || err.message || "Error al crear la cuenta");
    } finally {
      setIsLoading(false);
    }
  };

  const createPendingAppointment = async (userId: number, token: string) => {
    const pendingData = localStorage.getItem('pendingAppointmentData');
    
    if (!pendingData) {
      router.push('/cliente/dashboard');
      return;
    }

    const appointmentData: AppointmentData = JSON.parse(pendingData);
    
    try {
      const mascotaResponse = await createPet(userId, appointmentData.mascotaData, token);
      
      if (!mascotaResponse.success) {
        throw new Error(mascotaResponse.error || "Error al crear la mascota");
      }

      const citaResponse = await createAppointment(
        userId, 
        mascotaResponse.data.id_mascota,
        appointmentData,
        token
      );

      if (citaResponse.success) {
        localStorage.removeItem('pendingAppointmentData');
        localStorage.removeItem('agendarCitaFlow');
        router.push('/agendar-cita/confirmado');
      } else {
        throw new Error(citaResponse.error || "Error al crear la cita");
      }

    } catch (err: any) {
      console.error("❌ Error creando cita:", err);
      setError(`Cuenta creada, pero hubo un error al agendar la cita: ${err.message}. Por favor agenda tu cita desde el dashboard.`);
      setTimeout(() => router.push('/cliente/dashboard'), 5000);
    }
  };

  const createPet = async (clientId: number, mascotaData: any, token: string) => {
    const petData = {
      id_cliente: clientId,
      nombre: mascotaData.nombreMascota,
      id_especie: mascotaData.especie === 'perro' ? 1 : 2,
      id_raza: 1,
      fecha_nacimiento: '2020-01-01',
      sexo: 'M',
      color: 'Sin especificar',
      peso_actual: 0,
      esterilizado: false
    };

    const response = await fetch('http://localhost:3003/api/pets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(petData)
    });

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.error || 'Error al crear mascota');
    }

    return result;
  };

  const createAppointment = async (
    clientId: number,
    mascotaId: number,
    appointmentData: AppointmentData,
    token: string
  ) => {
    // Crear fecha ISO completa
    const fechaHora = `${appointmentData.fecha}T${appointmentData.horario}:00.000Z`;
    
    const citaData = {
      id_cliente: clientId,
      id_mascota: mascotaId,
      id_veterinario: appointmentData.veterinario?.id_personal || 4,
      id_servicio: appointmentData.servicio?.id_servicio || 1,
      fecha_hora: fechaHora, // String ISO
      motivo_detalle: appointmentData.motivo || 'Consulta general'
    };

    return await appointmentsService.createAppointment(citaData);
  };

  const redirectToDashboard = (role: string) => {
    if (role === "ADMIN") {
      router.push("/admin/dashboard");
    } else if (role === "VETERINARIO") {
      router.push("/veterinario/dashboard");
    } else {
      router.push("/cliente/dashboard");
    }
  };

  return {
    register,
    error,
    isLoading,
    setError
  };
};