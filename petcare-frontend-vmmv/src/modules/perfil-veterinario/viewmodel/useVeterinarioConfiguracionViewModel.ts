"use client";

import { useEffect, useState } from "react";
import { veterinarioConfiguracionService } from "../services/veterinarioConfiguracion.service";
import { mapVetProfileDTOtoUI, mapVetProfileFormToDTO, mapScheduleUItoDTO } from "../model/mapper";
import { VeterinarioProfileFormUI, ScheduleUI } from "../model/ui.model";

export function useVeterinarioConfiguracionViewModel() {
  const [profileId, setProfileId] = useState("");
  const [form, setForm] = useState<VeterinarioProfileFormUI>({
    nombreCompleto: "",
    correoElectronico: "",
    telefono: "",
    cedula: "",
  });
  const [schedule, setSchedule] = useState<ScheduleUI>({});
  const [duration, setDuration] = useState("30");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [scheduleSaved, setScheduleSaved] = useState(false);
  const [scheduleError, setScheduleError] = useState("");
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  // Password modal state
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSaving, setPasswordSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const [profileDTO, scheduleDTO] = await Promise.all([
        veterinarioConfiguracionService.getProfile(),
        veterinarioConfiguracionService.getSchedule(),
      ]);
      const ui = mapVetProfileDTOtoUI(profileDTO);
      setProfileId(ui.id);
      setForm({
        nombreCompleto: ui.nombreCompleto,
        correoElectronico: ui.correoElectronico,
        telefono: ui.telefono,
        cedula: ui.cedula,
      });
      setSchedule(scheduleDTO);
      setDuration(veterinarioConfiguracionService.getDuration());
      setLoading(false);
    };
    load();
  }, []);

  const updateField = (field: keyof VeterinarioProfileFormUI, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const saveProfile = async () => {
    setSaving(true);
    const dto = mapVetProfileFormToDTO(profileId, form);
    await veterinarioConfiguracionService.updateProfile(dto);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleScheduleChange = (
    day: string,
    field: "enabled" | "start" | "end",
    value: boolean | string
  ) => {
    setSchedule((prev) => ({ ...prev, [day]: { ...prev[day], [field]: value } }));
    setScheduleSaved(false);
    setScheduleError("");
  };

  const saveSchedule = async () => {
    setSaving(true);
    setScheduleError("");
    try {
      await veterinarioConfiguracionService.saveSchedule(
        mapScheduleUItoDTO(schedule),
        duration
      );
      setScheduleSaved(true);
      setTimeout(() => setScheduleSaved(false), 3000);
    } catch (e: any) {
      setScheduleError(e.message ?? "Error al guardar");
    } finally {
      setSaving(false);
    }
  };

  const submitPassword = async () => {
    if (newPassword !== confirmPassword) {
      setPasswordError("Las contrase\u00f1as no coinciden.");
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError("La contrase\u00f1a debe tener al menos 6 caracteres.");
      return;
    }
    setPasswordSaving(true);
    await veterinarioConfiguracionService.changePassword({ newPassword, confirmPassword });
    setPasswordSaving(false);
    setIsPasswordModalOpen(false);
    setNewPassword("");
    setConfirmPassword("");
    setPasswordError("");
  };

  return {
    form, updateField, saving, saved, saveProfile, loading,
    schedule, handleScheduleChange, duration, setDuration, saveSchedule, scheduleSaved, scheduleError,
    isPasswordModalOpen,
    openPasswordModal: () => setIsPasswordModalOpen(true),
    closePasswordModal: () => { setIsPasswordModalOpen(false); setNewPassword(""); setConfirmPassword(""); setPasswordError(""); },
    newPassword, setNewPassword,
    confirmPassword, setConfirmPassword,
    passwordError, passwordSaving, submitPassword,
  };
}
