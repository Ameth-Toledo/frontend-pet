"use client";

import { useEffect, useState } from "react";
import { veterinarioDashboardService } from "../services/veterinarioDashboard.service";
import {
  mapVetAppointmentDTOtoUI,
  mapVetPatientDTOtoUI,
  mapVetStatsDTOtoUI,
} from "../model/mapper";
import { VetAppointmentUI, VetPatientUI, VetStatsUI } from "../model/ui.model";

interface VeterinarioDashboardViewModelState {
  stats: VetStatsUI | null;
  upcomingAppointments: VetAppointmentUI[];
  recentPatients: VetPatientUI[];
  loading: boolean;
}

export function useVeterinarioDashboardViewModel(): VeterinarioDashboardViewModelState {
  const [stats, setStats] = useState<VetStatsUI | null>(null);
  const [upcomingAppointments, setUpcomingAppointments] = useState<VetAppointmentUI[]>([]);
  const [recentPatients, setRecentPatients] = useState<VetPatientUI[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [statsDTO, appointmentsDTO, patientsDTO] = await Promise.all([
        veterinarioDashboardService.getStats(),
        veterinarioDashboardService.getUpcomingAppointments(),
        veterinarioDashboardService.getRecentPatients(),
      ]);

      setStats(mapVetStatsDTOtoUI(statsDTO));
      setUpcomingAppointments(appointmentsDTO.map(mapVetAppointmentDTOtoUI));
      setRecentPatients(patientsDTO.map(mapVetPatientDTOtoUI));
      setLoading(false);
    };

    fetchData();
  }, []);

  return { stats, upcomingAppointments, recentPatients, loading };
}
