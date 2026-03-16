'use client';

import { useEffect, useState } from 'react';
import { MascotaUI } from '../model/ui.model';
import { MascotaClienteMapper } from '../model/mapper';
import { clienteMascotasService } from '../services/clienteMascotas.service';
import { createMascotaUseCase } from '../usecases/CreateMascotaUseCase';
import { CreateMascotaRequestDTO } from '../model/dto/request/CreateMascotaRequestDTO';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { UserUIModel } from '@/modules/auth/model/ui.model';

export function useClienteMascotasViewModel() {
  const [user] = useLocalStorage<UserUIModel | null>('user', null);

  const [mascotas, setMascotas] = useState<MascotaUI[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [creating, setCreating] = useState(false);
  const [error,    setError]    = useState<string | null>(null);

  const getUserId = (): number | null => {
    try {
      const stored = localStorage.getItem('user');
      return stored ? JSON.parse(stored).id : user?.id ?? null;
    } catch {
      return user?.id ?? null;
    }
  };

  const fetchMascotas = async () => {
    const userId = getUserId();
    if (!userId) return;
    setLoading(true);
    setError(null);
    try {
      const data = await clienteMascotasService.getMascotas(userId);
      setMascotas(data.map(MascotaClienteMapper.fromDTOtoUI));
    } catch {
      setError('Error al cargar las mascotas');
    } finally {
      setLoading(false);
    }
  };

  const createMascota = async (
    form: Omit<CreateMascotaRequestDTO, 'id_user'>
  ): Promise<{ success: boolean }> => {
    const userId = getUserId();
    if (!userId) {
      setError('No se pudo identificar al usuario');
      return { success: false };
    }
    setCreating(true);
    setError(null);
    try {
      const nueva = await createMascotaUseCase({ ...form, id_user: userId });
      setMascotas(prev => [...prev, nueva]);
      return { success: true };
    } catch (err) {
      console.error('Error al crear mascota:', err);
      setError('Error al registrar la mascota');
      return { success: false };
    } finally {
      setCreating(false);
    }
  };

  useEffect(() => {
    fetchMascotas();
  }, []);

  return {
    mascotas,
    loading,
    creating,
    error,
    createMascota,
    refetch: fetchMascotas,
  };
}