"use client";

import { useEffect, useState } from "react";
import { getVeterinarioDashboardUseCase } from "../usecases/GetVeterinarioDashboardUseCase";
import { VetAppointmentUI, VetPatientUI, VetStatsUI } from "../model/ui.model";

interface VeterinarioDashboardViewModelState {
  stats: VetStatsUI | null;
  upcomingAppointments: VetAppointmentUI[];
  recentPatients: VetPatientUI[];
  loading: boolean;
  error: string | null;
}

export function useVeterinarioDashboardViewModel(): VeterinarioDashboardViewModelState {
  const [stats, setStats]                               = useState<VetStatsUI | null>(null);
  const [upcomingAppointments, setUpcomingAppointments] = useState<VetAppointmentUI[]>([]);
  const [recentPatients, setRecentPatients]             = useState<VetPatientUI[]>([]);
  const [loading, setLoading]                           = useState(true);
  const [error, setError]                               = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      setError(null);
      try {
        const { stats, appointments, patients } = await getVeterinarioDashboardUseCase();
        setStats(stats);
        setUpcomingAppointments(appointments);
        setRecentPatients(patients);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Error al cargar el dashboard");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return { stats, upcomingAppointments, recentPatients, loading, error };
}