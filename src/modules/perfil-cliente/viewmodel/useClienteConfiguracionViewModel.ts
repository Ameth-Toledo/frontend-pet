'use client';

import { useEffect, useState } from 'react';
import { getClienteConfiguracionUseCase } from '../usecases/GetClienteConfiguracionUseCase';
import { updateClienteConfiguracionUseCase } from '../usecases/UpdateClienteConfiguracionUseCase';
import { changePasswordClienteUseCase } from '../usecases/ChangePasswordClienteUseCase';
import { ClienteConfiguracionUI, ChangePasswordFormUI } from '../model/ui.model';

export function useClienteConfiguracionViewModel() {
  const [configuracion, setConfiguracion] = useState<ClienteConfiguracionUI | null>(null);
  const [form, setForm]                   = useState<ClienteConfiguracionUI>({ id: '', nombreCompleto: '', correoElectronico: '', telefono: '', rol: '' });
  const [loading, setLoading]             = useState(true);
  const [saving, setSaving]               = useState(false);
  const [savedOk, setSavedOk]             = useState(false);
  const [error, setError]                 = useState<string | null>(null);

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [passwordLoading, setPasswordLoading]         = useState(false);
  const [passwordError, setPasswordError]             = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const ui = await getClienteConfiguracionUseCase();
        setConfiguracion(ui);
        setForm(ui);
      } catch {
        setError('No se pudo cargar la configuración.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const updateFormField = (field: keyof ClienteConfiguracionUI, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setSavedOk(false);
  };

  const guardarCambios = async () => {
    setSaving(true);
    setError(null);
    try {
      await updateClienteConfiguracionUseCase(form);
      setConfiguracion({ ...form });
      setSavedOk(true);
      setTimeout(() => setSavedOk(false), 2500);
    } catch {
      setError('No se pudieron guardar los cambios.');
    } finally {
      setSaving(false);
    }
  };

  const cancelarCambios = () => {
    if (configuracion) setForm({ ...configuracion });
    setSavedOk(false);
  };

  const abrirPasswordModal = () => {
    setPasswordError(null);
    setIsPasswordModalOpen(true);
  };

  const cerrarPasswordModal = () => {
    setPasswordError(null);
    setIsPasswordModalOpen(false);
  };

  const cambiarPassword = async (passwordForm: ChangePasswordFormUI) => {
    setPasswordLoading(true);
    setPasswordError(null);
    try {
      await changePasswordClienteUseCase(passwordForm);
      cerrarPasswordModal();
    } catch (err: unknown) {
      setPasswordError(err instanceof Error ? err.message : 'Error al cambiar la contraseña.');
    } finally {
      setPasswordLoading(false);
    }
  };

  return {
    configuracion, form, loading, saving, savedOk, error,
    updateFormField, guardarCambios, cancelarCambios,
    isPasswordModalOpen, passwordLoading, passwordError,
    abrirPasswordModal, cerrarPasswordModal, cambiarPassword,
  };
}