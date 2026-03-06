"use client";

import { useRouter } from "next/navigation";
import { useAgendarCita } from "../context";
import { useEffect, useState } from "react";
import { appointmentsService } from "@/modules/citas/services/appointmentsService";

export default function ResumenPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    selectedService,
    motivo,
    nombre,
    apellido,
    email,
    telefono,
    especie,
    nombreMascota,
    raza,
    selectedFecha,
    selectedHorario,
    selectedVeterinario,
  } = useAgendarCita();

  useEffect(() => {
    if (!selectedHorario) {
      router.replace('/agendar-cita/horario');
    }
  }, [selectedHorario, router]);

  const handleConfirm = async () => {
    const isLoggedIn = localStorage.getItem('token');
    
    if (!isLoggedIn) {
      // Usuario nuevo - Guardar datos y redirigir a registro
      const appointmentData = {
        servicio: selectedService,
        veterinario: selectedVeterinario,
        fecha: selectedFecha,
        horario: selectedHorario,
        motivo,
        userData: { email, nombre, apellido, telefono },
        mascotaData: { especie, nombreMascota, raza }
      };
      
      localStorage.setItem('pendingAppointmentData', JSON.stringify(appointmentData));
      router.push('/?from=appointment');
    } else {
      // Usuario logueado - Crear cita directamente
      await crearCita();
    }
  };

  const crearCita = async () => {
    try {
      setIsLoading(true);
      setError("");

      const user = JSON.parse(localStorage.getItem('user') || '{}');
      
      // Formato de fecha y hora para el backend
      const fechaHora = `${selectedFecha}T${selectedHorario}:00`;

      const citaData = {
        id_cliente: user.id,
        id_mascota: 1, // TODO: Obtener ID real de mascota creada
        id_veterinario: selectedVeterinario?.id_personal || 1,
        id_servicio: selectedService?.id_servicio || 1,
        fecha_hora: fechaHora,
        motivo_detalle: motivo
      };

      const response = await appointmentsService.createAppointment(citaData);

      if (response.success) {
        router.push('/agendar-cita/confirmado');
      }
    } catch (err: any) {
      console.error('Error creando cita:', err);
      setError(err.response?.data?.error || 'Error al crear la cita');
    } finally {
      setIsLoading(false);
    }
  };

  const servicioTexto = selectedService?.nombre || "No seleccionado";

  return (
    <>
      <h1 className="text-2xl font-semibold text-[#1E293B] text-center mb-2">
        Resumen de tu cita
      </h1>

      <p className="text-sm text-[#64748B] text-center mb-10">
        Revisa la información antes de confirmar.
      </p>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      <div className="space-y-6 text-sm text-[#1E293B] mb-10">
        <div className="flex justify-between border-b pb-2">
          <span>Servicio</span>
          <span>{servicioTexto}</span>
        </div>

        {motivo && (
          <div className="flex justify-between border-b pb-2">
            <span>Motivo</span>
            <span>{motivo}</span>
          </div>
        )}

        <div className="flex justify-between border-b pb-2">
          <span>Paciente</span>
          <span>{nombreMascota} ({especie})</span>
        </div>

        <div className="flex justify-between border-b pb-2">
          <span>Raza</span>
          <span>{raza}</span>
        </div>

        <div className="flex justify-between border-b pb-2">
          <span>Propietario</span>
          <span>{nombre} {apellido}</span>
        </div>

        <div className="flex justify-between border-b pb-2">
          <span>Contacto</span>
          <span>{email} | {telefono}</span>
        </div>

        <div className="flex justify-between border-b pb-2">
          <span>Fecha</span>
          <span>{selectedFecha}</span>
        </div>

        <div className="flex justify-between border-b pb-2">
          <span>Horario</span>
          <span>{selectedHorario}</span>
        </div>

        {selectedVeterinario && (
          <div className="flex justify-between border-b pb-2">
            <span>Veterinario</span>
            <span>Dr. {selectedVeterinario.nombre} {selectedVeterinario.apellido}</span>
          </div>
        )}
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => router.push('/agendar-cita/horario')}
          className="text-sm text-[#64748B]"
          disabled={isLoading}
        >
          ← Volver
        </button>

        <button
          onClick={handleConfirm}
          disabled={isLoading}
          className={`h-12 px-10 rounded-xl font-medium text-sm transition-colors
            ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#2F8F83] text-white hover:bg-[#267A6F]"
            }`}
        >
          {isLoading ? "Procesando..." : "Confirmar Cita"}
        </button>
      </div>
    </>
  );
}