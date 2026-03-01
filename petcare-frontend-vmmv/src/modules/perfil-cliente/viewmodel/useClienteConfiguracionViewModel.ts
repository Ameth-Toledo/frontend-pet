"use client";

import { useEffect, useState } from "react";
import { clienteConfiguracionService } from "../services/clienteConfiguracion.service";
import {
  mapClienteConfiguracionDTOtoUI,
  mapClienteConfiguracionUItoDTO,
  mapChangePasswordFormUItoDTO,
} from "../model/mapper";
import { ClienteConfiguracionUI, ChangePasswordFormUI } from "../model/ui.model";

export function useClienteConfiguracionViewModel() {
  // ── Profile state ──────────────────────────────────────────────────────────
  const [configuracion, setConfiguracion] = useState<ClienteConfiguracionUI | null>(null);
  const [form, setForm] = useState<ClienteConfiguracionUI>({
    id: "", nombreCompleto: "", correoElectronico: "", telefono: "", rol: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedOk, setSavedOk] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ── Password modal state ───────────────────────────────────────────────────
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  // ── Load on mount ──────────────────────────────────────────────────────────
  useEffect(() => {
    cargarConfiguracion();
  }, []);

  const cargarConfiguracion = async () => {
    setLoading(true);
    setError(null);
    try {
      const dto = await clienteConfiguracionService.getConfiguracion();
      const ui = mapClienteConfiguracionDTOtoUI(dto);
      setConfiguracion(ui);
      setForm(ui);
    } catch {
      setError("No se pudo cargar la configuración.");
    } finally {
      setLoading(false);
    }
  };

  const updateFormField = (field: keyof ClienteConfiguracionUI, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setSavedOk(false);
  };

  const guardarCambios = async () => {
    setSaving(true);
    setError(null);
    try {
      const dto = mapClienteConfiguracionUItoDTO(form);
      await clienteConfiguracionService.updateConfiguracion(dto);
      setConfiguracion({ ...form });
      setSavedOk(true);
      setTimeout(() => setSavedOk(false), 2500);
    } catch {
      setError("No se pudieron guardar los cambios.");
    } finally {
      setSaving(false);
    }
  };

  const cancelarCambios = () => {
    if (configuracion) setForm({ ...configuracion });
    setSavedOk(false);
  };

  // ── Password modal ─────────────────────────────────────────────────────────
  const abrirPasswordModal = () => {
    setPasswordError(null);
    setIsPasswordModalOpen(true);
  };

  const cerrarPasswordModal = () => {
    setPasswordError(null);
    setIsPasswordModalOpen(false);
  };

  const cambiarPassword = async (passwordForm: ChangePasswordFormUI) => {
    if (passwordForm.nuevaPassword.length < 8) {
      setPasswordError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }
    if (passwordForm.nuevaPassword !== passwordForm.confirmarPassword) {
      setPasswordError("Las contraseñas no coinciden.");
      return;
    }
    setPasswordLoading(true);
    setPasswordError(null);
    try {
      const dto = mapChangePasswordFormUItoDTO(passwordForm);
      await clienteConfiguracionService.changePassword(dto);
      cerrarPasswordModal();
    } catch {
      setPasswordError("Ocurrió un error al cambiar la contraseña.");
    } finally {
      setPasswordLoading(false);
    }
  };

  return {
    // profile
    configuracion, form, loading, saving, savedOk, error,
    updateFormField, guardarCambios, cancelarCambios,
    // password modal
    isPasswordModalOpen, passwordLoading, passwordError,
    abrirPasswordModal, cerrarPasswordModal, cambiarPassword,
  };
}