"use client";

import React, { useState } from "react";
import { useVeterinarioConfiguracionViewModel } from "@/modules/perfil-veterinario/viewmodel/useVeterinarioConfiguracionViewModel";
import VetPerfilAvatar from "./VetPerfilAvatar";
import VetPerfilForm, { VetFormKey } from "./VetPerfilForm";
import VetScheduleConfig from "./VetScheduleConfig";
import VetChangePasswordModal from "./VetChangePasswordModal";

function Spinner() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
      <div style={{ width: "36px", height: "36px", border: "4px solid #E5E7EB", borderTop: "4px solid #4F8A7C", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}

function Divider() {
  return <div style={{ height: "1px", backgroundColor: "#E5E7EB", margin: "36px 0" }} />;
}

export default function VeterinarioConfiguracionPage() {
  const vm = useVeterinarioConfiguracionViewModel();
  const [isDirty, setIsDirty] = useState(false);

  const handleFieldChange = (field: VetFormKey, value: string) => {
    vm.updateField(field, value);
    setIsDirty(true);
  };

  const handleSave = () => {
    vm.saveProfile();
    setIsDirty(false);
  };

  const handleCancel = () => {
    setIsDirty(false);
  };

  if (vm.loading) return <Spinner />;

  return (
    <div style={{ padding: "40px 48px", minHeight: "100vh", boxSizing: "border-box" as const }}>

      {/* ── Encabezado ── */}
      <div style={{ marginBottom: "36px" }}>
        <h1 style={{ fontSize: "20px", fontWeight: 800, color: "#1F2937", margin: "0 0 4px 0" }}>
          Configuración de Perfil
        </h1>
        <p style={{ fontSize: "13px", color: "#6B7280", margin: 0 }}>
          Gestiona tu información personal y preferencias de cuenta.
        </p>
      </div>

      {/* ── Avatar ── */}
      <VetPerfilAvatar
        nombreCompleto={vm.form?.nombreCompleto ?? ""}
        correoElectronico={vm.form?.correoElectronico ?? ""}
        onDirty={() => setIsDirty(true)}
      />

      <Divider />

      {/* ── Formulario + Seguridad + Acciones ── */}
      <VetPerfilForm
        nombreCompleto={vm.form?.nombreCompleto ?? ""}
        correoElectronico={vm.form?.correoElectronico ?? ""}
        telefono={vm.form?.telefono ?? ""}
        cedula={vm.form?.cedula ?? ""}
        saving={vm.saving}
        saved={vm.saved}
        isDirty={isDirty}
        onFieldChange={handleFieldChange}
        onSave={handleSave}
        onCancel={handleCancel}
        onChangePassword={vm.openPasswordModal}
      />

      {/* ── Horarios ── */}
      <VetScheduleConfig
        schedule={vm.schedule}
        onScheduleChange={vm.handleScheduleChange}
        duration={vm.duration}
        setDuration={vm.setDuration}
        onSave={vm.saveSchedule}
        saving={vm.saving}
        saved={vm.scheduleSaved}
        error={vm.scheduleError}
      />

      {/* ── Modal contraseña ── */}
      {vm.isPasswordModalOpen && (
        <VetChangePasswordModal
          onClose={vm.closePasswordModal}
          newPassword={vm.newPassword}
          setNewPassword={vm.setNewPassword}
          confirmPassword={vm.confirmPassword}
          setConfirmPassword={vm.setConfirmPassword}
          passwordError={vm.passwordError}
          passwordSaving={vm.passwordSaving}
          onSubmit={vm.submitPassword}
        />
      )}
    </div>
  );
}