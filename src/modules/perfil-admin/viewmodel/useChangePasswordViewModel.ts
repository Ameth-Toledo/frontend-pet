"use client";

import { useState } from "react";
import { changePasswordUseCase } from "../usecases/ChangePasswordUseCase";

interface UseChangePasswordViewModelProps {
  onSuccess: () => void;
}

export function useChangePasswordViewModel({ onSuccess }: UseChangePasswordViewModelProps) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword,     setNewPassword]     = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent,     setShowCurrent]     = useState(false);
  const [showNew,         setShowNew]         = useState(false);
  const [showConfirm,     setShowConfirm]     = useState(false);
  const [loading,         setLoading]         = useState(false);
  const [error,           setError]           = useState<string | null>(null);

  const isValid = newPassword.length >= 8 && newPassword === confirmPassword;

  const getError = (): string | null => {
    if (newPassword.length > 0 && newPassword.length < 8)
      return "La contraseña debe tener al menos 8 caracteres.";
    if (confirmPassword.length > 0 && newPassword !== confirmPassword)
      return "Las contraseñas no coinciden.";
    return null;
  };

  const reset = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setShowCurrent(false);
    setShowNew(false);
    setShowConfirm(false);
    setError(null);
    setLoading(false);
  };

  const submit = async () => {
    const validationError = getError();
    if (validationError) { setError(validationError); return; }
    if (!isValid) return;
    setLoading(true);
    setError(null);
    try {
      await changePasswordUseCase(currentPassword, newPassword);
      reset();
      onSuccess();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error al cambiar la contraseña");
    } finally {
      setLoading(false);
    }
  };

  return {
    currentPassword, setCurrentPassword,
    newPassword,     setNewPassword,
    confirmPassword, setConfirmPassword,
    showCurrent,     setShowCurrent,
    showNew,         setShowNew,
    showConfirm,     setShowConfirm,
    loading,
    error: error ?? getError(),
    isValid,
    reset, submit,
  };
}