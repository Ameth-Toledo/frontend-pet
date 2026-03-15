"use client";

import { useEffect, useState } from "react";
import { getVetPerfilUseCase } from "../usecases/GetVetPerfilUseCase";
import { updateVetPerfilUseCase } from "../usecases/UpdateVetPerfilUseCase";
import { getScheduleUseCase } from "../usecases/GetScheduleUseCase";
import { saveScheduleUseCase } from "../usecases/SaveScheduleUseCase";
import { changePasswordVetUseCase } from "../usecases/ChangePasswordVetUseCase";
import { veterinarioConfiguracionService } from "../services/veterinarioConfiguracion.service";
import { VeterinarioProfileFormUI, ScheduleUI } from "../model/ui.model";
import { UserUIModel } from "@/modules/auth/model/ui.model";

export function useVeterinarioConfiguracionViewModel() {
  const [profileId, setProfileId]       = useState("");
  const [form, setForm]                 = useState<VeterinarioProfileFormUI>({ nombreCompleto: "", correoElectronico: "", telefono: "", cedula: "" });
  const [schedule, setSchedule]         = useState<ScheduleUI>({});
  const [duration, setDuration]         = useState("30");
  const [loading, setLoading]           = useState(true);
  const [saving, setSaving]             = useState(false);
  const [saved, setSaved]               = useState(false);
  const [scheduleSaved, setScheduleSaved] = useState(false);
  const [scheduleError, setScheduleError] = useState<string | null>(null);
  const [userName, setUserName]         = useState("Veterinario");
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const [newPassword, setNewPassword]         = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError]     = useState<string | null>(null);
  const [passwordSaving, setPasswordSaving]   = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const raw = localStorage.getItem("user");
      if (raw) {
        const user: UserUIModel = JSON.parse(raw);
        setUserName(`Dr. ${user.fullName}`);
      }
    }
  }, []);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const [ui, scheduleUI] = await Promise.all([
          getVetPerfilUseCase(),
          getScheduleUseCase(),
        ]);
        setProfileId(ui.id);
        setForm({ nombreCompleto: ui.nombreCompleto, correoElectronico: ui.correoElectronico, telefono: ui.telefono, cedula: ui.cedula });
        setSchedule(scheduleUI);
        setDuration(veterinarioConfiguracionService.getDuration());
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const updateField = (field: keyof VeterinarioProfileFormUI, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const saveProfile = async () => {
    setSaving(true);
    try {
      await updateVetPerfilUseCase(profileId, form);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } finally {
      setSaving(false);
    }
  };

  const handleScheduleChange = (
    day: string,
    field: "enabled" | "start" | "end",
    value: boolean | string
  ) => {
    setSchedule((prev) => ({ ...prev, [day]: { ...prev[day], [field]: value } }));
    setScheduleSaved(false);
    setScheduleError(null);
  };

  const saveSchedule = async () => {
    setSaving(true);
    setScheduleError(null);
    try {
      await saveScheduleUseCase(schedule, duration);
      setScheduleSaved(true);
      setTimeout(() => setScheduleSaved(false), 3000);
    } catch (err: unknown) {
      setScheduleError(err instanceof Error ? err.message : "Error al guardar");
    } finally {
      setSaving(false);
    }
  };

  const submitPassword = async () => {
    setPasswordSaving(true);
    setPasswordError(null);
    try {
      await changePasswordVetUseCase(newPassword, confirmPassword);
      setIsPasswordModalOpen(false);
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: unknown) {
      setPasswordError(err instanceof Error ? err.message : "Error al cambiar contraseña");
    } finally {
      setPasswordSaving(false);
    }
  };

  return {
    form, updateField, saving, saved, saveProfile, loading, userName,
    schedule, handleScheduleChange, duration, setDuration, saveSchedule, scheduleSaved, scheduleError,
    isPasswordModalOpen,
    openPasswordModal:  () => setIsPasswordModalOpen(true),
    closePasswordModal: () => { setIsPasswordModalOpen(false); setNewPassword(""); setConfirmPassword(""); setPasswordError(null); },
    newPassword, setNewPassword,
    confirmPassword, setConfirmPassword,
    passwordError, passwordSaving, submitPassword,
  };
}