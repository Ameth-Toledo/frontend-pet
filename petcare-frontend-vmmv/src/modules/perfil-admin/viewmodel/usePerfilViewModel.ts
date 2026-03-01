"use client";

import { useEffect, useState } from "react";
import { perfilService } from "../services/perfil.service";
import { mapProfileDTOtoUI, mapProfileFormUItoDTO } from "../model/mapper";
import { ProfileUI, ProfileFormUI } from "../model/profile.ui.model";

export function usePerfilViewModel() {
  const [profile, setProfile] = useState<ProfileUI | null>(null);
  const [form, setForm] = useState<ProfileFormUI>({
    nombreCompleto: "",
    correoElectronico: "",
    telefono: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const dto = await perfilService.getProfile();
      const ui = mapProfileDTOtoUI(dto);
      setProfile(ui);
      setForm({
        nombreCompleto: ui.nombreCompleto,
        correoElectronico: ui.correoElectronico,
        telefono: ui.telefono,
      });
      setLoading(false);
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
    const dto = mapProfileFormUItoDTO(profile.id, form);
    await perfilService.updateProfile(dto);
    setProfile((prev) => prev ? { ...prev, ...form } : prev);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const resetForm = () => {
    if (!profile) return;
    setForm({
      nombreCompleto: profile.nombreCompleto,
      correoElectronico: profile.correoElectronico,
      telefono: profile.telefono,
    });
  };

  const openPasswordModal = () => setIsPasswordModalOpen(true);
  const closePasswordModal = () => setIsPasswordModalOpen(false);

  return {
    profile, form, loading, saving, saved,
    updateField, saveProfile, resetForm,
    isPasswordModalOpen, openPasswordModal, closePasswordModal,
  };
}