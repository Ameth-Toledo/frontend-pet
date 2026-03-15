"use client";

import { useEffect, useState } from "react";
import { getDashboardUseCase } from "../usecases/GetDashboardUseCase";
import { AppointmentUI, PatientUI, StatsUI } from "../model/ui.model";

interface DashboardViewModelState {
  stats: StatsUI | null;
  upcomingAppointments: AppointmentUI[];
  recentPatients: PatientUI[];
  loading: boolean;
  error: string | null;
}

export function useDashboardViewModel(): DashboardViewModelState {
  const [stats, setStats]                           = useState<StatsUI | null>(null);
  const [upcomingAppointments, setUpcomingAppointments] = useState<AppointmentUI[]>([]);
  const [recentPatients, setRecentPatients]         = useState<PatientUI[]>([]);
  const [loading, setLoading]                       = useState(true);
  const [error, setError]                           = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      setError(null);
      try {
        const { stats, appointments, patients } = await getDashboardUseCase();
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