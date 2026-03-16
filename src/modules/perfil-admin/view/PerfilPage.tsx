"use client";

import React, { useState } from "react";
import { usePerfilViewModel } from "@/modules/perfil-admin/viewmodel/usePerfilViewModel";
import PerfilAvatar from "./PerfilAvatar";
import PerfilForm, { FormKey } from "./PerfilForm";
import ChangePasswordModal from "./ChangePasswordModal";

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

export default function PerfilPage() {
  const vm = usePerfilViewModel();
  const [isDirty, setIsDirty] = useState(false);

  const handleFieldChange = (field: FormKey, value: string) => {
    vm.updateField(field, value);
    setIsDirty(true);
  };

  const handleSave = () => {
    vm.saveProfile();
    setIsDirty(false);
  };

  const handleCancel = () => {
    vm.resetForm();
    setIsDirty(false);
  };

  if (vm.loading) return <Spinner />;

  if (vm.error) return (
    <div style={{ padding: "40px 48px" }}>
      <p style={{ color: "#EF4444", fontSize: "14px" }}>Error: {vm.error}</p>
    </div>
  );

  return (
    <div style={{ padding: "40px 48px", minHeight: "100vh", boxSizing: "border-box" as const }}>

      <div style={{ marginBottom: "36px" }}>
        <h1 style={{ fontSize: "20px", fontWeight: 800, color: "#1F2937", margin: "0 0 4px 0" }}>
          Configuración de Perfil
        </h1>
        <p style={{ fontSize: "13px", color: "#6B7280", margin: 0 }}>
          Gestiona tu información personal y preferencias de cuenta.
        </p>
      </div>

      <PerfilAvatar
        nombreCompleto={vm.form?.nombreCompleto ?? ""}
        correoElectronico={vm.form?.correoElectronico ?? ""}
        onDirty={() => setIsDirty(true)}
      />

      <Divider />

      <PerfilForm
        nombreCompleto={vm.form?.nombreCompleto ?? ""}
        correoElectronico={vm.form?.correoElectronico ?? ""}
        telefono={vm.form?.telefono ?? ""}
        saving={vm.saving}
        saved={vm.saved}
        isDirty={isDirty}
        onFieldChange={handleFieldChange}
        onSave={handleSave}
        onCancel={handleCancel}
        onChangePassword={vm.openPasswordModal}
      />

      {vm.isPasswordModalOpen && <ChangePasswordModal onClose={vm.closePasswordModal} />}
    </div>
  );
}