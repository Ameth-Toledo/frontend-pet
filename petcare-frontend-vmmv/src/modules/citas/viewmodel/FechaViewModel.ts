
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { appointmentsService } from "../services/appointmentsService";

interface Veterinario {
  id?: number;  // Campo del backend
  id_personal?: number;  // Campo alternativo
  nombre: string;
  apellido: string;
  especialidad?: string;
}

export const useFechaViewModel = (nombreMascota: string) => {
  const router = useRouter();
  const [veterinarios, setVeterinarios] = useState<Veterinario[]>([]);
  const [isLoadingVeterinarios, setIsLoadingVeterinarios] = useState(true);
  const [error, setError] = useState("");
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [diasDisponibles, setDiasDisponibles] = useState<Set<number>>(new Set());
  const [isLoadingDias, setIsLoadingDias] = useState(false);

  useEffect(() => {
    if (!nombreMascota) {
      router.push('/agendar-cita/mascota');
      return;
    }

    loadVeterinarios();
  }, [nombreMascota, router]);

  const loadVeterinarios = async () => {
    try {
      setIsLoadingVeterinarios(true);
      setError("");

      const response = await appointmentsService.getProfessionals();

      if (response.success && response.data) {
        const uniqueVets = response.data.reduce((acc: Veterinario[], vet: Veterinario) => {
          const vetId = vet.id || vet.id_personal;
          if (!acc.find(v => (v.id || v.id_personal) === vetId)) {
            acc.push(vet);
          }
          return acc;
        }, []);
        
        console.log('Veterinarios cargados:', uniqueVets);
        setVeterinarios(uniqueVets);
      }
    } catch (err) {
      console.error('Error cargando veterinarios:', err);
      setError('Error al cargar veterinarios');
    } finally {
      setIsLoadingVeterinarios(false);
    }
  };

  const loadDiasDisponibles = async (veterinarioId: number) => {
    try {
      setIsLoadingDias(true);
      const year = currentMonth.getFullYear();
      const month = currentMonth.getMonth();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      
      const disponibles = new Set<number>();
      const diasMuestra = [1, 8, 15, 22, 28];
      
      for (const dia of diasMuestra) {
        if (dia > daysInMonth) continue;
        
        const fecha = `${year}-${String(month + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
        const fechaDate = new Date(fecha);
        const diaSemana = fechaDate.getDay();
        
        try {
          const response = await appointmentsService.getTimeSlots({
            id_personal: veterinarioId,
            fecha: fecha
          });

          console.log(`Día ${dia} (${diaSemana}):`, response.data?.length || 0, 'slots');

          if (response.success && response.data && response.data.length > 0) {
            for (let d = 1; d <= daysInMonth; d++) {
              const checkDate = new Date(year, month, d);
              if (checkDate.getDay() === diaSemana) {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                if (checkDate >= today) {
                  disponibles.add(d);
                }
              }
            }
          }
        } catch (err) {
          console.error(`Error checking day ${dia}:`, err);
        }
      }

      console.log('Días disponibles:', Array.from(disponibles).sort((a, b) => a - b));
      setDiasDisponibles(disponibles);
    } catch (err) {
      console.error('Error cargando días disponibles:', err);
    } finally {
      setIsLoadingDias(false);
    }
  };

  const getDaysInMonth = (date: Date): (number | null)[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days: (number | null)[] = Array(firstDay).fill(null);
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  const isPastDate = (day: number): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const selectedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    
    return selectedDate < today;
  };

  const isDayAvailable = (day: number): boolean => {
    return diasDisponibles.has(day);
  };

  const validateForm = (veterinarioId: number | null, fecha: string): boolean => {
    return !!(veterinarioId && fecha);
  };

  const continuar = (
    veterinarioId: number | null,
    fecha: string,
    saveToContext: (vet: Veterinario, fecha: string) => void
  ) => {
    if (!validateForm(veterinarioId, fecha)) {
      console.error('Formulario incompleto');
      return;
    }

    // Buscar por id o id_personal
    const vet = veterinarios.find(v => (v.id || v.id_personal) === veterinarioId);
    
    if (!vet) {
      console.error('Veterinario no encontrado. ID buscado:', veterinarioId, 'Veterinarios:', veterinarios);
      return;
    }

    saveToContext(vet, fecha);
    router.push('/agendar-cita/horario');
  };

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    setDiasDisponibles(new Set());
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    setDiasDisponibles(new Set());
  };

  return {
    veterinarios,
    isLoadingVeterinarios,
    error,
    currentMonth,
    diasDisponibles,
    isLoadingDias,
    getDaysInMonth,
    isPastDate,
    isDayAvailable,
    validateForm,
    continuar,
    goToPreviousMonth,
    goToNextMonth,
    loadDiasDisponibles
  };
};
