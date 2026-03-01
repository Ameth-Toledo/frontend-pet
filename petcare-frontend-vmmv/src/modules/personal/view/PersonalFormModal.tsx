"use client";

import React from "react";
import { useCreatePersonalViewModel } from "@/modules/personal/viewmodel/useCreatePersonalViewModel";
import { RolUI } from "@/modules/personal/model/create.ui.model";

interface PersonalFormModalProps {
  onClose: () => void;
}

// ─── Colors ───────────────────────────────────────────────────────────────────
const C = {
  green: "#6BAF9F",
  greenDark: "#5AA193",
  greenLight: "#E6F4F1",
  greenBorder: "#C8E6E0",
  white: "#FFFFFF",
  textMain: "#1F2937",
  textSub: "#6B7280",
  border: "#E5E7EB",
  error: "#EF4444",
};

// ─── Shared sub-components ────────────────────────────────────────────────────
function FieldInput({
  label, placeholder, value, onChange, error, type = "text", disabled = false,
}: {
  label: string; placeholder: string; value: string;
  onChange?: (v: string) => void; error?: string;
  type?: string; disabled?: boolean;
}) {
  const [focused, setFocused] = React.useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
      <label style={{ fontSize: "13px", fontWeight: 600, color: C.textMain }}>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          padding: "10px 13px",
          borderRadius: "10px",
          border: `1px solid ${error ? C.error : focused ? C.green : C.border}`,
          fontSize: "13px",
          color: disabled ? C.textSub : C.textMain,
          backgroundColor: disabled ? "#F9FAFB" : C.white,
          outline: "none",
          width: "100%",
          boxSizing: "border-box",
          cursor: disabled ? "not-allowed" : "text",
        }}
      />
      {error && (
        <p style={{ fontSize: "11px", color: C.error }}>{error}</p>
      )}
    </div>
  );
}

function RoleCard({
  label, description, selected, onSelect, icon,
}: {
  label: RolUI; description: string; selected: boolean;
  onSelect: () => void; icon: React.ReactNode;
}) {
  return (
    <div
      onClick={onSelect}
      style={{
        flex: 1,
        border: `1.5px solid ${selected ? C.green : C.border}`,
        borderRadius: "12px",
        padding: "12px 14px",
        backgroundColor: selected ? C.greenLight : C.white,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        position: "relative",
      }}
    >
      <div
        style={{
          width: "36px", height: "36px", borderRadius: "50%",
          backgroundColor: selected ? C.green : C.greenLight,
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div>
        <p style={{ fontSize: "13px", fontWeight: 700, color: C.textMain }}>{label}</p>
        <p style={{ fontSize: "11px", color: C.textSub }}>{description}</p>
      </div>
      {selected && (
        <div
          style={{
            position: "absolute", top: "8px", right: "8px",
            width: "18px", height: "18px", borderRadius: "50%",
            backgroundColor: C.green,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
            <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}
    </div>
  );
}

// ─── Modal ────────────────────────────────────────────────────────────────────
export default function PersonalFormModal({ onClose }: PersonalFormModalProps) {
  const vm = useCreatePersonalViewModel({ onSuccess: onClose });

  // Close on overlay click
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      onClick={handleOverlayClick}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.45)",
        backdropFilter: "blur(3px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "16px",
      }}
    >
      <div
        style={{
          backgroundColor: C.white,
          borderRadius: "16px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.18)",
          padding: "32px",
          width: "100%",
          maxWidth: "520px",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        {/* Title */}
        <div style={{ marginBottom: "24px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: 800, color: C.textMain, marginBottom: "4px" }}>
            Registrar nuevo personal
          </h2>
          <p style={{ fontSize: "13px", color: C.textSub }}>
            Complete los datos para habilitar el acceso a la plataforma PetCare.
          </p>
        </div>

        {/* Tipo de usuario */}
        <div style={{ marginBottom: "20px" }}>
          <p style={{ fontSize: "13px", fontWeight: 600, color: C.textMain, marginBottom: "10px" }}>
            Tipo de usuario
          </p>
          <div style={{ display: "flex", gap: "12px" }}>
            <RoleCard
              label="Administrador"
              description="Gestión total de clínica y personal"
              selected={vm.rol === "Administrador"}
              onSelect={() => vm.setRol("Administrador")}
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke={vm.rol === "Administrador" ? "#fff" : C.green} strokeWidth="2">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M6 20v-1a6 6 0 0 1 12 0v1" />
                  <path d="M16 4l2 2-3 3" strokeLinecap="round" />
                </svg>
              }
            />
            <RoleCard
              label="Veterinario"
              description="Acceso a pacientes y expedientes"
              selected={vm.rol === "Veterinario"}
              onSelect={() => vm.setRol("Veterinario")}
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke={vm.rol === "Veterinario" ? "#fff" : C.green} strokeWidth="2">
                  <ellipse cx="12" cy="16" rx="5" ry="4" />
                  <circle cx="9" cy="7" r="2" />
                  <circle cx="15" cy="7" r="2" />
                </svg>
              }
            />
          </div>
        </div>

        {/* Nombre completo */}
        <div style={{ marginBottom: "16px" }}>
          <FieldInput
            label="Nombre completo"
            placeholder="Ej. Dr. Mario Casas"
            value={vm.nombreCompleto}
            onChange={vm.setNombreCompleto}
            error={vm.errors.nombreCompleto}
          />
        </div>

        {/* Correo + Cédula */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: vm.rol === "Veterinario" ? "1fr 1fr" : "1fr",
            gap: "14px",
            marginBottom: "20px",
          }}
        >
          <FieldInput
            label="Correo electrónico"
            placeholder="mario.casas@petcare.com"
            value={vm.correoElectronico}
            onChange={vm.setCorreoElectronico}
            error={vm.errors.correoElectronico}
            type="email"
          />
          {vm.rol === "Veterinario" && (
            <FieldInput
              label="Cédula profesional"
              placeholder="12345678"
              value={vm.cedulaProfesional}
              onChange={vm.setCedulaProfesional}
              error={vm.errors.cedulaProfesional}
            />
          )}
        </div>

        {/* Credenciales */}
        <div
          style={{
            backgroundColor: C.greenLight,
            border: `1px solid ${C.greenBorder}`,
            borderRadius: "12px",
            padding: "16px 18px",
            marginBottom: "28px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "8px" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span style={{ fontSize: "13px", fontWeight: 700, color: C.textMain }}>
              Credenciales de acceso
            </span>
          </div>

          <p style={{ fontSize: "10px", fontWeight: 700, color: C.textSub, letterSpacing: "0.08em", marginBottom: "8px" }}>
            CONTRASEÑA TEMPORAL
          </p>

          <div
            style={{
              display: "flex", alignItems: "center", gap: "8px",
              backgroundColor: C.white,
              border: `1px solid ${C.border}`,
              borderRadius: "8px",
              padding: "9px 12px",
              marginBottom: "8px",
            }}
          >
            <span style={{ flex: 1, fontSize: "14px", fontWeight: 600, color: C.textMain, letterSpacing: "0.02em" }}>
              {vm.contrasenaTemporal}
            </span>

            {/* Copy */}
            <button
              onClick={vm.copiarContrasena}
              title="Copiar"
              style={{ background: "none", border: "none", cursor: "pointer", color: C.textSub, display: "flex", padding: "2px" }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
            </button>

            {/* Regenerar */}
            <button
              onClick={vm.regenerarContrasena}
              disabled={vm.regenerating}
              style={{
                background: "none", border: "none", cursor: "pointer",
                display: "flex", alignItems: "center", gap: "4px",
                color: C.green, fontSize: "12px", fontWeight: 600,
                opacity: vm.regenerating ? 0.6 : 1,
              }}
            >
              <svg
                width="13" height="13" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2"
                style={{ animation: vm.regenerating ? "spin 0.7s linear infinite" : "none" }}
              >
                <path d="M23 4v6h-6" /><path d="M1 20v-6h6" />
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
              </svg>
              Regenerar
            </button>
          </div>

          <p style={{ fontSize: "11px", color: C.textSub }}>
            Esta contraseña deberá ser cambiada por el usuario en su primer inicio de sesión.
          </p>
        </div>

        {/* Botones */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button
            onClick={vm.submit}
            disabled={vm.loading}
            style={{
              flex: 1,
              display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
              backgroundColor: vm.loading ? "#9ECEC6" : C.green,
              color: C.white, border: "none", borderRadius: "10px",
              padding: "12px 20px", fontSize: "14px", fontWeight: 700,
              cursor: vm.loading ? "not-allowed" : "pointer",
            }}
            onMouseEnter={(e) => {
              if (!vm.loading) (e.currentTarget as HTMLButtonElement).style.backgroundColor = C.greenDark;
            }}
            onMouseLeave={(e) => {
              if (!vm.loading) (e.currentTarget as HTMLButtonElement).style.backgroundColor = C.green;
            }}
          >
            {vm.loading ? (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"
                  style={{ animation: "spin 0.7s linear infinite" }}>
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                </svg>
                Registrando...
              </>
            ) : (
              <>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M6 20v-1a6 6 0 0 1 12 0v1" />
                </svg>
                Confirmar registro
              </>
            )}
          </button>

          <button
            onClick={onClose}
            disabled={vm.loading}
            style={{
              background: "none", border: "none",
              fontSize: "14px", color: C.textSub, fontWeight: 500,
              cursor: "pointer", padding: "12px 16px",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = C.textMain; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = C.textSub; }}
          >
            Cancelar
          </button>
        </div>

        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );
}