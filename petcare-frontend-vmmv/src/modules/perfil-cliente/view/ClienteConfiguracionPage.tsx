"use client";

import React from "react";
import { useClienteConfiguracionViewModel } from "@/modules/perfil-cliente/viewmodel/useClienteConfiguracionViewModel";
import ChangePasswordModal from "./ChangePasswordModal";

const C = {
  green: "#4F8A7C",
  greenDark: "#3E6F63",
  white: "#FFFFFF",
  bg: "#F7F9FB",
  textMain: "#1F2937",
  textSub: "#6B7280",
  border: "#E5E7EB",
};

function Spinner() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", backgroundColor: C.bg }}>
      <div
        style={{
          width: "36px",
          height: "36px",
          border: "4px solid #E5E7EB",
          borderTop: `4px solid ${C.green}`,
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
        }}
      />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}

function FormInput({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  const [focused, setFocused] = React.useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
      <label style={{ fontSize: "12px", fontWeight: 600, color: C.textSub }}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          padding: "9px 13px",
          borderRadius: "8px",
          border: `1px solid ${focused ? C.green : C.border}`,
          fontSize: "14px",
          color: C.textMain,
          backgroundColor: C.white,
          outline: "none",
        }}
      />
    </div>
  );
}

export function ClienteConfiguracionPage() {
  const vm = useClienteConfiguracionViewModel();

  if (vm.loading) return <Spinner />;

  return (
    <div style={{ padding: "32px", backgroundColor: C.bg, minHeight: "100vh" }}>

      {/* Header */}
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "22px", fontWeight: 800, color: C.textMain, margin: 0 }}>
          Configuración de Perfil
        </h1>
        <p style={{ fontSize: "13px", color: C.textSub, margin: "4px 0 0 0" }}>
          Gestiona tu información personal y preferencias de cuenta.
        </p>
      </div>

      {/* Card */}
      <div
        style={{
          backgroundColor: C.white,
          border: `1px solid ${C.border}`,
          borderRadius: "16px",
          maxWidth: "700px",
          overflow: "hidden",
        }}
      >
        {/* Form fields area */}
        <div style={{ padding: "28px 32px 24px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "18px",
              marginBottom: "18px",
            }}
          >
            <FormInput
              label="Nombre completo"
              value={vm.form.nombreCompleto}
              onChange={(v) => vm.updateFormField("nombreCompleto", v)}
            />
            <FormInput
              label="Correo electrónico"
              value={vm.form.correoElectronico}
              onChange={(v) => vm.updateFormField("correoElectronico", v)}
              type="email"
            />
          </div>

          <div style={{ maxWidth: "calc(50% - 9px)" }}>
            <FormInput
              label="Teléfono"
              value={vm.form.telefono}
              onChange={(v) => vm.updateFormField("telefono", v)}
              type="tel"
            />
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", backgroundColor: C.border }} />

        {/* Seguridad section */}
        <div style={{ padding: "24px 32px" }}>
          <h3 style={{ fontSize: "15px", fontWeight: 700, color: C.textMain, margin: "0 0 16px 0" }}>
            Seguridad
          </h3>

          {/* Password row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              border: `1px solid ${C.border}`,
              borderRadius: "10px",
              padding: "14px 18px",
            }}
          >
            <div>
              <div style={{ fontSize: "14px", fontWeight: 600, color: C.textMain }}>
                Contraseña
              </div>
              <div style={{ fontSize: "12px", color: C.textSub, marginTop: "2px" }}>
                Actualiza tu contraseña regularmente para mayor seguridad.
              </div>
            </div>
            <button
              onClick={vm.abrirPasswordModal}
              style={{
                border: `1px solid ${C.border}`,
                borderRadius: "8px",
                padding: "8px 16px",
                fontSize: "13px",
                fontWeight: 500,
                cursor: "pointer",
                backgroundColor: C.white,
                color: C.textMain,
                whiteSpace: "nowrap",
                flexShrink: 0,
                marginLeft: "16px",
              }}
            >
              Cambiar contraseña
            </button>
          </div>
        </div>

        {/* Feedback messages */}
        {(vm.savedOk || vm.error) && (
          <div style={{ padding: "0 32px" }}>
            {vm.savedOk && (
              <div
                style={{
                  backgroundColor: "#E6F4F1",
                  border: `1px solid ${C.green}`,
                  borderRadius: "8px",
                  padding: "10px 16px",
                  fontSize: "13px",
                  color: "#2F8F7A",
                  marginBottom: "16px",
                }}
              >
                ✓ Cambios guardados correctamente.
              </div>
            )}
            {vm.error && (
              <div
                style={{
                  backgroundColor: "#FEF2F2",
                  border: "1px solid #FECACA",
                  borderRadius: "8px",
                  padding: "10px 16px",
                  fontSize: "13px",
                  color: "#B91C1C",
                  marginBottom: "16px",
                }}
              >
                {vm.error}
              </div>
            )}
          </div>
        )}

        {/* Divider */}
        <div style={{ height: "1px", backgroundColor: C.border }} />

        {/* Action buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "12px",
            padding: "16px 32px",
          }}
        >
          <button
            onClick={vm.guardarCambios}
            disabled={vm.saving}
            style={{
              backgroundColor: vm.saving ? C.greenDark : C.green,
              color: C.white,
              border: "none",
              borderRadius: "8px",
              padding: "10px 22px",
              fontSize: "14px",
              fontWeight: 600,
              cursor: vm.saving ? "not-allowed" : "pointer",
              opacity: vm.saving ? 0.8 : 1,
            }}
          >
            {vm.saving ? "Guardando..." : "Guardar cambios"}
          </button>
        </div>
      </div>

      <ChangePasswordModal
        isOpen={vm.isPasswordModalOpen}
        onClose={vm.cerrarPasswordModal}
        onSubmit={vm.cambiarPassword}
        loading={vm.passwordLoading}
        error={vm.passwordError}
      />
    </div>
  );
}