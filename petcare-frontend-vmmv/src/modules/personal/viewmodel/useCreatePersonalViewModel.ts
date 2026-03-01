"use client";

import { useState } from "react";
import { personalService } from "../services/personal.service";
import { mapCreatePersonalUItoDTO } from "../model/mapper";
import { RolUI, CreatePersonalErrorsUI } from "../model/create.ui.model";

interface UseCreatePersonalViewModelProps {
  onSuccess: () => void;
}

export function useCreatePersonalViewModel({ onSuccess }: UseCreatePersonalViewModelProps) {
  const [rol, setRol] = useState<RolUI>("Administrador");
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [correoElectronico, setCorreoElectronico] = useState("");
  const [cedulaProfesional, setCedulaProfesional] = useState("");
  const [contrasenaTemporal, setContrasenaTemporal] = useState("PetCare-2024-X9Z");
  const [errors, setErrors] = useState<CreatePersonalErrorsUI>({});
  const [loading, setLoading] = useState(false);
  const [regenerating, setRegenerating] = useState(false);

  const reset = () => {
    setRol("Administrador");
    setNombreCompleto("");
    setCorreoElectronico("");
    setCedulaProfesional("");
    setContrasenaTemporal("PetCare-2024-X9Z");
    setErrors({});
    setLoading(false);
  };

  const regenerarContrasena = async () => {
    setRegenerating(true);
    const nueva = await personalService.generarContrasenaTemp();
    setContrasenaTemporal(nueva);
    setRegenerating(false);
  };

  const copiarContrasena = () => {
    navigator.clipboard.writeText(contrasenaTemporal).catch(() => {});
  };

  const validate = (): boolean => {
    const newErrors: CreatePersonalErrorsUI = {};
    if (!nombreCompleto.trim())
      newErrors.nombreCompleto = "El nombre es obligatorio";
    if (!correoElectronico.trim())
      newErrors.correoElectronico = "El correo es obligatorio";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correoElectronico))
      newErrors.correoElectronico = "Formato de correo inválido";
    if (rol === "Veterinario" && !cedulaProfesional.trim())
      newErrors.cedulaProfesional = "La cédula es obligatoria para veterinarios";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submit = async () => {
    if (!validate()) return;
    setLoading(true);
    const dto = mapCreatePersonalUItoDTO({
      rol,
      nombreCompleto,
      correoElectronico,
      cedulaProfesional,
      contrasenaTemporal,
    });
    await personalService.createPersonal(dto);
    setLoading(false);
    reset();
    onSuccess();
  };

  return {
    // state
    rol, setRol,
    nombreCompleto, setNombreCompleto,
    correoElectronico, setCorreoElectronico,
    cedulaProfesional, setCedulaProfesional,
    contrasenaTemporal,
    errors,
    loading,
    regenerating,
    // actions
    reset,
    regenerarContrasena,
    copiarContrasena,
    submit,
  };
}