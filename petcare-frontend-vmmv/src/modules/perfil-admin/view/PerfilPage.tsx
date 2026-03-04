"use client";

import React from "react";
import { usePerfilViewModel } from "@/modules/perfil-admin/viewmodel/usePerfilViewModel";
import PerfilForm from "./PerfilForm";
import ChangePasswordModal from "./ChangePasswordModal";

const C = {
  green: "#6BAF9F",
  white: "#FFFFFF",
  bg: "#F8FAF9",
  textMain: "#1F2937",
  textSub: "#6B7280",
  border: "#E5E7EB",
};

// ─── Spinner ──────────────────────────────────────────────────────────────────
function Spinner() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", backgroundColor: C.bg }}>
      <div style={{ width: "40px", height: "40px", border: "4px solid #E5E7EB", borderTop: `4px solid ${C.green}`, borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}

function Navbar() {
  return (
    <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginBottom: "20px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", backgroundColor: C.white, border: `1px solid ${C.border}`, borderRadius: "10px", padding: "8px 14px", width: "220px" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
          </svg>
          <span style={{ fontSize: "13px", color: "#9CA3AF" }}>Buscar mascotas o servicios...</span>
        </div>
        <p style={{ fontSize: "13px", fontWeight: 700, color: C.textMain }}>Juan Pérez</p>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function PerfilPage() {
  const vm = usePerfilViewModel();

  if (vm.loading) return <Spinner />;

  return (
    <>
      <Navbar />

      {/* Page header */}
      <div style={{ marginBottom: "28px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: 800, color: C.textMain, marginBottom: "4px" }}>
          Configuración de Perfil
        </h1>
        <p style={{ fontSize: "13px", color: C.textSub }}>
          Gestiona tu información personal y preferencias de cuenta.
        </p>
      </div>

      {/* Form card */}
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

      {/* Password modal */}
      {vm.isPasswordModalOpen && (
        <ChangePasswordModal onClose={vm.closePasswordModal} />
      )}
    </>
  );
}