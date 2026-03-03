import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export const useHorarioViewModel = (selectedFecha: string) => {
  const router = useRouter();

  useEffect(() => {
    // Validar que vengan datos del paso anterior
    if (!selectedFecha) {
      router.push('/agendar-cita/fecha');
    }
  }, [selectedFecha, router]);

  const generateTimeSlots = (): string[] => {
    const slots: string[] = [];
    for (let hour = 9; hour <= 18; hour++) {
      slots.push(`${String(hour).padStart(2, '0')}:00`);
      if (hour < 18) {
        slots.push(`${String(hour).padStart(2, '0')}:30`);
      }
    }
    return slots;
  };

  const validateForm = (horario: string): boolean => {
    return !!horario;
  };

  const continuar = (
    horario: string,
    saveToContext: (horario: string) => void
  ) => {
    if (!validateForm(horario)) {
      console.error('Horario no seleccionado');
      return;
    }

    saveToContext(horario);
    router.push('/agendar-cita/resumen');
  };

  const volver = () => {
    router.push('/agendar-cita/fecha');
  };

  return {
    generateTimeSlots,
    validateForm,
    continuar,
    volver
  };
};