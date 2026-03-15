"use client";

import React from "react";
import { usePerfilViewModel } from "@/modules/perfil-admin/viewmodel/usePerfilViewModel";
import PerfilForm from "./PerfilForm";
import ChangePasswordModal from "./ChangePasswordModal";

function Spinner() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "60vh" }}>
      <div style={{ width: "36px", height: "36px", border: "4px solid #E5E7EB", borderTop: "4px solid #4F8A7C", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}

export default function PerfilPage() {
  const vm = usePerfilViewModel();

  if (vm.loading) return <Spinner />;

  if (vm.error) return (
    <div style={{ padding: "32px" }}>
      <p style={{ color: "#EF4444", fontSize: "14px" }}>Error: {vm.error}</p>
    </div>
  );

  return (
    <div style={{ padding: "32px", minHeight: "100vh" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "28px" }}>
        <div>
          <h1 style={{ fontSize: "22px", fontWeight: 800, color: "#1F2937", margin: 0 }}>Configuración de Perfil</h1>
          <p style={{ fontSize: "13px", color: "#6B7280", margin: "4px 0 0 0" }}>Gestiona tu información personal y preferencias de cuenta.</p>
        </div>
        <span style={{ fontSize: "14px", fontWeight: 600, color: "#1F2937", whiteSpace: "nowrap" }}>
          {vm.userName}
        </span>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        {vm.form && (
          <PerfilForm
            form={vm.form}
            saving={vm.saving}
            saved={vm.saved}
            onFieldChange={vm.updateField}
            onSave={vm.saveProfile}
            onCancel={vm.resetForm}
            onChangePassword={vm.openPasswordModal}
          />
        )}
      </div>

      {vm.isPasswordModalOpen && <ChangePasswordModal onClose={vm.closePasswordModal} />}
    </div>
  );
}
