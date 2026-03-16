"use client";

import React, { useRef, useState } from "react";
import { useClienteConfiguracionViewModel } from "@/modules/perfil-cliente/viewmodel/useClienteConfiguracionViewModel";
import ChangePasswordModal from "./ChangePasswordModal";

const C = {
  green: "#4F8A7C",
  greenDark: "#3E6F63",
  greenLight: "#E6F4F1",
  white: "#FFFFFF",
  textMain: "#1F2937",
  textSub: "#6B7280",
  border: "#E5E7EB",
};

function Spinner() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
      <div style={{ width: "36px", height: "36px", border: "4px solid #E5E7EB", borderTop: `4px solid ${C.green}`, borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}

function FormInput({ label, value, onChange, type = "text" }: {
  label: string; value: string; onChange: (v: string) => void; type?: string;
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

export function ClienteConfiguracionPage() {
  const vm = useClienteConfiguracionViewModel();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isDirty, setIsDirty] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => { setAvatarPreview(ev.target?.result as string); setIsDirty(true); };
    reader.readAsDataURL(file);
  };

  const initials = vm.form.nombreCompleto
    ? vm.form.nombreCompleto.trim().split(" ").slice(0, 2).map((w: string) => w[0]).join("").toUpperCase()
    : "U";

  if (vm.loading) return <Spinner />;

  return (
    <div style={{ padding: "40px 48px", minHeight: "100vh", boxSizing: "border-box" as const }}>

      {/* ── Encabezado de página ── */}
      <div style={{ marginBottom: "36px" }}>
        <h1 style={{ fontSize: "20px", fontWeight: 800, color: C.textMain, margin: "0 0 4px 0" }}>
          Configuración de Perfil
        </h1>
        <p style={{ fontSize: "13px", color: C.textSub, margin: 0 }}>
          Gestiona tu información personal y preferencias de cuenta.
        </p>
      </div>

      {/* ── Avatar + identidad ── */}
      <div style={{ display: "flex", alignItems: "flex-end", gap: "28px" }}>

        <div style={{ position: "relative", flexShrink: 0 }}>
          <div style={{
            width: "120px", height: "120px", borderRadius: "50%",
            backgroundColor: C.greenLight,
            border: `3px solid ${C.green}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            overflow: "hidden",
            boxShadow: "0 4px 20px rgba(79,138,124,0.15)",
          }}>
            {avatarPreview
              ? <img src={avatarPreview} alt="avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              : <span style={{ fontSize: "44px", fontWeight: 700, color: C.green }}>{initials}</span>
            }
          </div>

          <button
            onClick={() => fileInputRef.current?.click()}
            title="Cambiar foto"
            style={{
              position: "absolute", bottom: 2, right: 2,
              width: "30px", height: "30px", borderRadius: "50%",
              backgroundColor: C.green, border: "2.5px solid white",
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
              transition: "background-color 0.15s",
            }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = C.greenDark)}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = C.green)}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
              <circle cx="12" cy="13" r="4" />
            </svg>
          </button>
          <input ref={fileInputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleFileChange} />
        </div>

        {/* Nombre, correo y badge */}
        <div style={{ paddingBottom: "6px" }}>
          <h2 style={{ fontSize: "22px", fontWeight: 700, color: C.textMain, margin: "0 0 4px 0" }}>
            {vm.form.nombreCompleto || "Sin nombre"}
          </h2>
          <p style={{ fontSize: "13px", color: C.textSub, margin: "0 0 12px 0" }}>
            {vm.form.correoElectronico || "Sin correo"}
          </p>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            padding: "3px 12px", borderRadius: "20px",
            fontSize: "11px", fontWeight: 600,
            backgroundColor: C.greenLight, color: C.green,
          }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: C.green }} />
            Activo
          </span>
        </div>
      </div>

      <Divider />

      {/* ── Información personal ── */}
      <SectionLabel>Información personal</SectionLabel>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "20px" }}>
        <FormInput
          label="Nombre completo"
          value={vm.form.nombreCompleto}
          onChange={(v) => { vm.updateFormField("nombreCompleto", v); setIsDirty(true); }}
        />
        <FormInput
          label="Correo electrónico"
          value={vm.form.correoElectronico}
          onChange={(v) => { vm.updateFormField("correoElectronico", v); setIsDirty(true); }}
          type="email"
        />
        <FormInput
          label="Teléfono"
          value={vm.form.telefono}
          onChange={(v) => { vm.updateFormField("telefono", v); setIsDirty(true); }}
          type="tel"
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
          onClick={vm.abrirPasswordModal}
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
      {vm.savedOk && (
        <div style={{ backgroundColor: "#E6F4F1", border: `1px solid ${C.green}`, borderRadius: "8px", padding: "10px 16px", fontSize: "13px", color: "#2F8F7A", marginBottom: "20px" }}>
          ✓ Cambios guardados correctamente.
        </div>
      )}
      {vm.error && (
        <div style={{ backgroundColor: "#FEF2F2", border: "1px solid #FECACA", borderRadius: "8px", padding: "10px 16px", fontSize: "13px", color: "#B91C1C", marginBottom: "20px" }}>
          {vm.error}
        </div>
      )}

      {/* ── Guardar ── */}
      {isDirty && (
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          onClick={() => { vm.guardarCambios(); setIsDirty(false); }}
          disabled={vm.saving}
          style={{
            backgroundColor: vm.saving ? C.greenDark : C.green,
            color: C.white, border: "none", borderRadius: "8px",
            padding: "11px 32px", fontSize: "14px", fontWeight: 600,
            cursor: vm.saving ? "not-allowed" : "pointer",
            opacity: vm.saving ? 0.8 : 1,
            transition: "background-color 0.15s",
          }}
          onMouseEnter={e => { if (!vm.saving) e.currentTarget.style.backgroundColor = C.greenDark; }}
          onMouseLeave={e => { if (!vm.saving) e.currentTarget.style.backgroundColor = C.green; }}
        >
          {vm.saving ? "Guardando..." : "Guardar cambios"}
        </button>
        </div>
      )}

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