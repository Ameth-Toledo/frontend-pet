"use client";

import React from "react";
import { useVeterinarioConfiguracionViewModel } from "@/modules/perfil-veterinario/viewmodel/useVeterinarioConfiguracionViewModel";
import VetPerfilForm from "./VetPerfilForm";
import VetScheduleConfig from "./VetScheduleConfig";
import VetChangePasswordModal from "./VetChangePasswordModal";

export default function VeterinarioConfiguracionPage() {
  const vm = useVeterinarioConfiguracionViewModel();

  if (vm.loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
        <div
          style={{
            width: "36px", height: "36px",
            border: "3px solid #E5E7EB",
            borderTop: "3px solid #4F8A7C",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
          }}
        />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{ padding: "40px 24px", minHeight: "100vh", backgroundColor: "#F9FAFB", boxSizing: "border-box" }}>
      {/* User name top-right */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "32px" }}>
        <span style={{ fontSize: "14px", fontWeight: 600, color: "#1F2937" }}>Dr. Smith</span>
      </div>

      {/* Centered content */}
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>
        {/* Page title */}
        <div style={{ marginBottom: "28px" }}>
          <h1 style={{ fontSize: "24px", fontWeight: 800, color: "#1F2937", marginBottom: "6px" }}>
            Configuración de Perfil
          </h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>
            Gestiona tu información personal y preferencias de cuenta.
          </p>
        </div>

        {/* Profile form */}
        <VetPerfilForm
          form={vm.form}
          saving={vm.saving}
          saved={vm.saved}
          onFieldChange={vm.updateField}
          onSave={vm.saveProfile}
          onCancel={() => {}}
          onChangePassword={vm.openPasswordModal}
        />

        {/* Schedule config */}
        <VetScheduleConfig
          schedule={vm.schedule}
          onScheduleChange={vm.handleScheduleChange}
          duration={vm.duration}
          setDuration={vm.setDuration}
          onSave={vm.saveSchedule}
          saving={vm.saving}
          saved={vm.scheduleSaved}
          error={vm.scheduleError || null}
        />

        {/* Password modal */}
        {vm.isPasswordModalOpen && (
          <VetChangePasswordModal
            onClose={vm.closePasswordModal}
            newPassword={vm.newPassword}
            setNewPassword={vm.setNewPassword}
            confirmPassword={vm.confirmPassword}
            setConfirmPassword={vm.setConfirmPassword}
            passwordError={vm.passwordError || null}
            passwordSaving={vm.passwordSaving}
            onSubmit={vm.submitPassword}
          />
        )}
      </div>
    </div>
  );
}