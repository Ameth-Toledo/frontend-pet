"use client";

import { useEffect, useState } from "react";
import { getPerfilUseCase } from "../usecases/GetPerfilUseCase";
import { updatePerfilUseCase } from "../usecases/UpdatePerfilUseCase";
import { ProfileUI, ProfileFormUI } from "../model/profile.ui.model";
import { UserUIModel } from "@/modules/auth/model/ui.model";

export function usePerfilViewModel() {
  const [profile, setProfile]               = useState<ProfileUI | null>(null);
  const [form, setForm]                     = useState<ProfileFormUI>({ nombreCompleto: "", correoElectronico: "", telefono: "" });
  const [loading, setLoading]               = useState(true);
  const [saving, setSaving]                 = useState(false);
  const [saved, setSaved]                   = useState(false);
  const [error, setError]                   = useState<string | null>(null);
  const [userName, setUserName]             = useState("Administrador");
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const raw = localStorage.getItem("user");
      if (raw) {
        const user: UserUIModel = JSON.parse(raw);
        setUserName(user.fullName);
      }
    }
  }, []);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const ui = await getPerfilUseCase();
        setProfile(ui);
        setForm({ nombreCompleto: ui.nombreCompleto, correoElectronico: ui.correoElectronico, telefono: ui.telefono });
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Error al cargar el perfil");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const updateField = (field: keyof ProfileFormUI, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const saveProfile = async () => {
    if (!profile) return;
    setSaving(true);
    setError(null);
    try {
      await updatePerfilUseCase(profile.id, form, profile.rol);
      setProfile((prev) => prev ? { ...prev, ...form } : prev);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error al guardar el perfil");
    } finally {
      setSaving(false);
    }
  };

  const resetForm = () => {
    if (!profile) return;
    setForm({ nombreCompleto: profile.nombreCompleto, correoElectronico: profile.correoElectronico, telefono: profile.telefono });
  };

  return {
    profile, form, loading, saving, saved, error, userName,
    updateField, saveProfile, resetForm,
    isPasswordModalOpen,
    openPasswordModal:  () => setIsPasswordModalOpen(true),
    closePasswordModal: () => setIsPasswordModalOpen(false),
  };
}