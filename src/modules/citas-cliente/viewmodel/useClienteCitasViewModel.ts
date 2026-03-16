'use client';

import { useEffect, useState } from 'react';
import { clienteCitasService } from '../services/clienteCitas.service';
import { CitaClienteMapper } from '../model/mapper';
import { CitaUI } from '../model/ui.model';

export function useClienteCitasViewModel() {
  const [citas,         setCitas]         = useState<CitaUI[]>([]);
  const [isLoading,     setIsLoading]     = useState(true);
  const [error,         setError]         = useState<string | null>(null);
  const [selectedCita,  setSelectedCita]  = useState<CitaUI | null>(null);

  const getUserId = (): number | null => {
    try {
      const stored = localStorage.getItem('user');
      return stored ? JSON.parse(stored).id : null;
    } catch { return null; }
  };

  useEffect(() => {
    const load = async () => {
      const userId = getUserId();
      if (!userId) { setIsLoading(false); return; }
      setIsLoading(true);
      setError(null);
      try {
        const data = await clienteCitasService.getCitas(userId);
        setCitas(data.map(CitaClienteMapper.fromDTOtoUI));
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Error al cargar las citas');
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  return { citas, isLoading, error, selectedCita, setSelectedCita };
}