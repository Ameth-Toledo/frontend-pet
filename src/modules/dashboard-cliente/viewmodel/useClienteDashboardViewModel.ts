'use client';

import { useEffect, useState } from 'react';
import { clienteDashboardService } from '../services/clientedashboard.service';
import { GetCitaResponse } from '../model/dto/response/AppointmentResponseDTO';

export function useClienteDashboardViewModel() {
  const [citas,   setCitas]   = useState<GetCitaResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState<string | null>(null);

  const getUserId = (): number | null => {
    try {
      const stored = localStorage.getItem('user');
      return stored ? JSON.parse(stored).id : null;
    } catch { return null; }
  };

  useEffect(() => {
    const load = async () => {
      const userId = getUserId();
      if (!userId) { setLoading(false); return; }
      setLoading(true);
      try {
        const data = await clienteDashboardService.getCitas(userId);
        setCitas(data);
      } catch {
        setError('No se pudieron cargar las citas.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return { citas, loading, error };
}