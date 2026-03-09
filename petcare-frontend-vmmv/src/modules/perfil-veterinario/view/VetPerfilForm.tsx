import React from "react";
import { VeterinarioProfileFormUI } from "../model/ui.model";

const C = {
  green: "#4F8A7C",
  greenDark: "#3E6F63",
  white: "#FFFFFF",
  textMain: "#1F2937",
  textSub: "#6B7280",
  border: "#E5E7EB",
  error: "#EF4444",
};

interface VetPerfilFormProps {
  form: VeterinarioProfileFormUI;
  saving: boolean;
  saved: boolean;
  onFieldChange: (field: keyof VeterinarioProfileFormUI, value: string) => void;
  onSave: () => void;
  onCancel: () => void;
  onChangePassword: () => void;
}

function FormInput({
  label, value, onChange, type = "text", placeholder,
}: {
  label: string; value: string; onChange: (v: string) => void;
  type?: string; placeholder?: string;
}) {
  const [focused, setFocused] = React.useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <label style={{ fontSize: "13px", fontWeight: 600, color: C.textSub }}>{label}</label>
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
          border: `1px solid ${focused ? C.green : C.border}`,
          fontSize: "14px",
          color: C.textMain,
          backgroundColor: C.white,
          outline: "none",
          width: "100%",
          boxSizing: "border-box",
        }}
      />
    </div>
  );
}

export default function VetPerfilForm({
  form, saving, saved, onFieldChange, onSave, onCancel, onChangePassword,
}: VetPerfilFormProps) {
  return (
    <div
      style={{
        backgroundColor: C.white,
        borderRadius: "16px",
        border: `1px solid ${C.border}`,
        padding: "32px 36px",
        maxWidth: "720px",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* Row 1: Nombre + Correo */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
        <FormInput
          label="Nombre completo"
          value={form.nombreCompleto}
          onChange={(v) => onFieldChange("nombreCompleto", v)}
          placeholder="Nombre del veterinario"
        />
        <FormInput
          label="Correo electrónico"
          value={form.correoElectronico}
          onChange={(v) => onFieldChange("correoElectronico", v)}
          type="email"
          placeholder="correo@email.com"
        />
      </div>

      {/* Row 2: Teléfono + Cédula */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "28px" }}>
        <FormInput
          label="Teléfono"
          value={form.telefono}
          onChange={(v) => onFieldChange("telefono", v)}
          type="tel"
          placeholder="Número telefónico"
        />
        <FormInput
          label="Cédula profesional"
          value={form.cedula}
          onChange={(v) => onFieldChange("cedula", v)}
          placeholder="12345678"
        />
      </div>

      {/* Divider */}
      <div style={{ height: "1px", backgroundColor: C.border, marginBottom: "28px" }} />

      {/* Security */}
      <div style={{ marginBottom: "32px" }}>
        <h3 style={{ fontSize: "16px", fontWeight: 700, color: C.textMain, marginBottom: "14px" }}>Seguridad</h3>
        <div
          style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            backgroundColor: "#F9FAFB", border: `1px solid ${C.border}`,
            borderRadius: "10px", padding: "16px 18px",
          }}
        >
          <div>
            <p style={{ fontSize: "14px", fontWeight: 600, color: C.textMain, marginBottom: "3px" }}>Contraseña</p>
            <p style={{ fontSize: "12px", color: C.textSub }}>Actualiza tu contraseña regularmente para mayor seguridad.</p>
          </div>
          <button
            onClick={onChangePassword}
            style={{
              backgroundColor: C.white, border: `1px solid ${C.border}`,
              borderRadius: "8px", padding: "7px 16px",
              fontSize: "13px", fontWeight: 500, color: C.textMain, cursor: "pointer", flexShrink: 0,
            }}
            onMouseEnter={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor = C.green; b.style.color = C.green; }}
            onMouseLeave={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor = C.border; b.style.color = C.textMain; }}
          >
            Cambiar contraseña
          </button>
        </div>
      </div>

      {/* Success banner */}
      {saved && (
        <div
          style={{
            backgroundColor: "#E6F4F1", border: `1px solid ${C.green}`,
            borderRadius: "8px", padding: "10px 16px",
            fontSize: "13px", color: C.green, fontWeight: 600, marginBottom: "20px",
          }}
        >
          ✓ Cambios guardados correctamente.
        </div>
      )}

      {/* Action buttons */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "12px" }}>
        <button
          onClick={onCancel}
          style={{ background: "none", border: "none", fontSize: "14px", color: C.textSub, fontWeight: 500, cursor: "pointer", padding: "10px 16px" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = C.textMain; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = C.textSub; }}
        >
          Cancelar
        </button>
        <button
          onClick={onSave}
          disabled={saving}
          style={{
            backgroundColor: saving ? "#9ECEC6" : C.green, color: C.white,
            border: "none", borderRadius: "10px", padding: "10px 22px",
            fontSize: "14px", fontWeight: 700, cursor: saving ? "not-allowed" : "pointer",
            display: "flex", alignItems: "center", gap: "8px",
          }}
          onMouseEnter={(e) => { if (!saving) (e.currentTarget as HTMLButtonElement).style.backgroundColor = C.greenDark; }}
          onMouseLeave={(e) => { if (!saving) (e.currentTarget as HTMLButtonElement).style.backgroundColor = C.green; }}
        >
          {saving ? "Guardando..." : "Guardar cambios"}
        </button>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
