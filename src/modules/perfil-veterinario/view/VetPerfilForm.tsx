import React, { useState } from "react";

const C = {
  green: "#4F8A7C",
  greenDark: "#3E6F63",
  greenLight: "#E6F4F1",
  white: "#FFFFFF",
  textMain: "#1F2937",
  textSub: "#6B7280",
  border: "#E5E7EB",
};

function FormInput({ label, value, onChange, type = "text", placeholder }: {
  label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <label style={{ fontSize: "11px", fontWeight: 700, color: C.textSub, textTransform: "uppercase" as const, letterSpacing: "0.6px" }}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          padding: "10px 14px",
          borderRadius: "8px",
          border: `1.5px solid ${focused ? C.green : C.border}`,
          fontSize: "14px",
          color: C.textMain,
          backgroundColor: C.white,
          outline: "none",
          transition: "border-color 0.15s",
          width: "100%",
          boxSizing: "border-box" as const,
        }}
      />
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: "11px", fontWeight: 700, color: C.textSub, textTransform: "uppercase" as const, letterSpacing: "0.7px", margin: "0 0 20px 0" }}>
      {children}
    </p>
  );
}

function Divider() {
  return <div style={{ height: "1px", backgroundColor: C.border, margin: "36px 0" }} />;
}

export type VetFormKey = "nombreCompleto" | "correoElectronico" | "telefono" | "cedula";

export interface VetPerfilFormProps {
  nombreCompleto: string;
  correoElectronico: string;
  telefono: string;
  cedula: string;
  saving: boolean;
  saved: boolean;
  isDirty: boolean;
  onFieldChange: (field: VetFormKey, value: string) => void;
  onSave: () => void;
  onCancel: () => void;
  onChangePassword: () => void;
}

export default function VetPerfilForm({
  nombreCompleto, correoElectronico, telefono, cedula,
  saving, saved, isDirty,
  onFieldChange, onSave, onCancel, onChangePassword,
}: VetPerfilFormProps) {
  return (
    <>
      {/* ── Información personal ── */}
      <SectionLabel>Información personal</SectionLabel>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
        <FormInput
          label="Nombre completo"
          value={nombreCompleto}
          onChange={(v) => onFieldChange("nombreCompleto", v)}
          placeholder="Nombre del veterinario"
        />
        <FormInput
          label="Correo electrónico"
          value={correoElectronico}
          onChange={(v) => onFieldChange("correoElectronico", v)}
          type="email"
          placeholder="correo@email.com"
        />
        <FormInput
          label="Teléfono"
          value={telefono}
          onChange={(v) => onFieldChange("telefono", v)}
          type="tel"
          placeholder="Número telefónico"
        />
        <FormInput
          label="Cédula profesional"
          value={cedula}
          onChange={(v) => onFieldChange("cedula", v)}
          placeholder="12345678"
        />
      </div>

      <Divider />

      {/* ── Seguridad ── */}
      <SectionLabel>Seguridad</SectionLabel>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div style={{
            width: "38px", height: "38px", borderRadius: "10px",
            backgroundColor: C.greenLight,
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <div>
            <div style={{ fontSize: "14px", fontWeight: 600, color: C.textMain }}>Contraseña</div>
            <div style={{ fontSize: "12px", color: C.textSub, marginTop: "2px" }}>
              Actualiza tu contraseña regularmente para mayor seguridad.
            </div>
          </div>
        </div>
        <button
          onClick={onChangePassword}
          style={{
            border: `1.5px solid ${C.border}`, borderRadius: "8px",
            padding: "9px 20px", fontSize: "13px", fontWeight: 600,
            cursor: "pointer", backgroundColor: "transparent", color: C.textMain,
            whiteSpace: "nowrap", flexShrink: 0,
            transition: "border-color 0.15s, color 0.15s",
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = C.green; e.currentTarget.style.color = C.green; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.textMain; }}
        >
          Cambiar contraseña
        </button>
      </div>

      <Divider />

      {/* ── Feedback ── */}
      {saved && (
        <div style={{ backgroundColor: "#E6F4F1", border: `1px solid ${C.green}`, borderRadius: "8px", padding: "10px 16px", fontSize: "13px", color: "#2F8F7A", marginBottom: "20px" }}>
          ✓ Cambios guardados correctamente.
        </div>
      )}

      {/* ── Acciones (solo si hay cambios) ── */}
      {isDirty && (
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
          <button
            onClick={onCancel}
            style={{
              background: "none", border: "none",
              fontSize: "14px", color: C.textSub, fontWeight: 500,
              cursor: "pointer", padding: "10px 16px",
              transition: "color 0.15s",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = C.textMain)}
            onMouseLeave={e => (e.currentTarget.style.color = C.textSub)}
          >
            Cancelar
          </button>
          <button
            onClick={onSave}
            disabled={saving}
            style={{
              backgroundColor: saving ? C.greenDark : C.green,
              color: C.white, border: "none", borderRadius: "8px",
              padding: "11px 32px", fontSize: "14px", fontWeight: 600,
              cursor: saving ? "not-allowed" : "pointer",
              opacity: saving ? 0.8 : 1,
              transition: "background-color 0.15s",
              display: "flex", alignItems: "center", gap: "8px",
            }}
            onMouseEnter={e => { if (!saving) e.currentTarget.style.backgroundColor = C.greenDark; }}
            onMouseLeave={e => { if (!saving) e.currentTarget.style.backgroundColor = C.green; }}
          >
            {saving && (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" style={{ animation: "spin 0.7s linear infinite" }}>
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
              </svg>
            )}
            {saving ? "Guardando..." : "Guardar cambios"}
          </button>
        </div>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </>
  );
}