"use client";

import React from "react";
import { useClienteConfiguracionViewModel } from "@/modules/perfil-cliente/viewmodel/useClienteConfiguracionViewModel";
import ChangePasswordModal from "./ChangePasswordModal";
import { ClienteConfiguracionUI } from "../model/ui.model";

const C = {
  green: "#4F8A7C",
  greenDark: "#3E6F63",
  white: "#FFFFFF",
  bg: "#F7F9FB",
  textMain: "#1F2937",
  textSub: "#6B7280",
  border: "#E5E7EB",
};

// ─── Spinner ──────────────────────────────────────────────────────────────────
function Spinner() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", backgroundColor: C.bg }}>
      <div style={{ width: "36px", height: "36px", border: "4px solid #E5E7EB", borderTop: `4px solid ${C.green}`, borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────
const NAV_ICONS: Record<string, React.ReactNode> = {
  dashboard: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <rect x="3" y="3" width="8" height="8" rx="1" /><rect x="13" y="3" width="8" height="8" rx="1" />
      <rect x="3" y="13" width="8" height="8" rx="1" /><rect x="13" y="13" width="8" height="8" rx="1" />
    </svg>
  ),
  citas: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M3 9h18M8 2v4M16 2v4" strokeLinecap="round" />
    </svg>
  ),
  mascotas: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <ellipse cx="12" cy="16" rx="5" ry="4" />
      <circle cx="6" cy="10" r="2" /><circle cx="18" cy="10" r="2" />
      <circle cx="9" cy="7" r="2" /><circle cx="15" cy="7" r="2" />
    </svg>
  ),
  configuracion: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  ),
};

const NAV_ITEMS = [
  { label: "Panel principal", key: "dashboard" },
  { label: "Mis Citas",       key: "citas" },
  { label: "Mis mascotas",    key: "mascotas" },
  { label: "Configuración",   key: "configuracion", active: true },
];

function PawIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <ellipse cx="12" cy="16" rx="5" ry="4" fill="#fff" />
      <circle cx="6" cy="10" r="2" fill="#fff" />
      <circle cx="18" cy="10" r="2" fill="#fff" />
      <circle cx="9" cy="7" r="2" fill="#fff" />
      <circle cx="15" cy="7" r="2" fill="#fff" />
    </svg>
  );
}

function Sidebar() {
  return (
    <aside style={{ width: "190px", minHeight: "100vh", backgroundColor: C.white, borderRight: `1px solid ${C.border}`, padding: "20px 12px", display: "flex", flexDirection: "column", flexShrink: 0 }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "32px", padding: "0 8px" }}>
        <div style={{ width: "32px", height: "32px", borderRadius: "10px", backgroundColor: C.green, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <PawIcon />
        </div>
        <span style={{ fontSize: "17px", fontWeight: 700, color: C.textMain }}>PetCare</span>
      </div>
      <nav style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
        {NAV_ITEMS.map((item) => (
          <div key={item.key} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "9px 12px", borderRadius: "10px", cursor: "pointer", backgroundColor: item.active ? C.green : "transparent", color: item.active ? C.white : C.textSub, fontSize: "13px", fontWeight: item.active ? 600 : 400 }}>
            {NAV_ICONS[item.key]}
            {item.label}
          </div>
        ))}
      </nav>
    </aside>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar({ nombre }: { nombre: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 32px", backgroundColor: C.white, borderBottom: `1px solid ${C.border}` }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", backgroundColor: "#F3F4F6", borderRadius: "10px", padding: "8px 14px", width: "260px" }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
          <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
        </svg>
        <span style={{ fontSize: "13px", color: "#9CA3AF" }}>Buscar mascotas o servicios...</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{ textAlign: "right" }}>
          <p style={{ fontSize: "13px", fontWeight: 700, color: C.textMain }}>{nombre}</p>
          <p style={{ fontSize: "11px", color: C.textSub }}>Premium Member</p>
        </div>
        <div style={{ width: "36px", height: "36px", borderRadius: "50%", backgroundColor: "#D4B896", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 700, color: "#fff" }}>
          JP
        </div>
      </div>
    </div>
  );
}

// ─── Form field ───────────────────────────────────────────────────────────────
function FormInput({
  label, value, onChange, type = "text",
}: {
  label: string; value: string; onChange: (v: string) => void; type?: string;
}) {
  const [focused, setFocused] = React.useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
      <label style={{ fontSize: "12px", fontWeight: 600, color: C.textSub }}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          padding: "9px 13px", borderRadius: "8px",
          border: `1px solid ${focused ? C.green : C.border}`,
          fontSize: "14px", color: C.textMain,
          backgroundColor: C.white, outline: "none",
          width: "100%", boxSizing: "border-box",
        }}
      />
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export function ClienteConfiguracionPage() {
  const vm = useClienteConfiguracionViewModel();

  if (vm.loading) return <Spinner />;

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: C.bg, fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <Sidebar />

      <div style={{ flex: 1, minWidth: 0 }}>
        <Navbar nombre={vm.form.nombreCompleto || "Juan Pérez"} />

        <main style={{ padding: "32px" }}>
          {/* Page header */}
          <div style={{ marginBottom: "24px" }}>
            <h1 style={{ fontSize: "22px", fontWeight: 800, color: C.textMain, marginBottom: "4px" }}>
              Configuración de Perfil
            </h1>
            <p style={{ fontSize: "13px", color: C.textSub }}>
              Gestiona tu información personal y preferencias de cuenta.
            </p>
          </div>

          {/* Main card */}
          <div style={{ backgroundColor: C.white, border: `1px solid ${C.border}`, borderRadius: "16px", padding: "28px 32px", maxWidth: "700px" }}>

            {/* Fields grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px", marginBottom: "18px" }}>
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
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px", marginBottom: "28px" }}>
              <FormInput
                label="Teléfono"
                value={vm.form.telefono}
                onChange={(v) => vm.updateFormField("telefono", v)}
                type="tel"
              />
            </div>

            {/* Divider */}
            <div style={{ height: "1px", backgroundColor: C.border, marginBottom: "24px" }} />

            {/* Security section */}
            <div style={{ marginBottom: "28px" }}>
              <h3 style={{ fontSize: "15px", fontWeight: 700, color: C.textMain, marginBottom: "12px" }}>Seguridad</h3>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", backgroundColor: "#F9FAFB", border: `1px solid ${C.border}`, borderRadius: "10px", padding: "14px 18px" }}>
                <div>
                  <p style={{ fontSize: "14px", fontWeight: 600, color: C.textMain, marginBottom: "2px" }}>Contraseña</p>
                  <p style={{ fontSize: "12px", color: C.textSub }}>Actualiza tu contraseña regularmente para mayor seguridad.</p>
                </div>
                <button
                  onClick={vm.abrirPasswordModal}
                  style={{ backgroundColor: C.white, border: `1px solid ${C.border}`, borderRadius: "8px", padding: "7px 16px", fontSize: "13px", fontWeight: 500, color: C.textMain, cursor: "pointer", flexShrink: 0, whiteSpace: "nowrap" }}
                  onMouseEnter={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor = C.green; b.style.color = C.green; }}
                  onMouseLeave={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor = C.border; b.style.color = C.textMain; }}
                >
                  Cambiar contraseña
                </button>
              </div>
            </div>

            {/* Success banner */}
            {vm.savedOk && (
              <div style={{ backgroundColor: "#E6F4F1", border: `1px solid ${C.green}`, borderRadius: "8px", padding: "10px 16px", fontSize: "13px", color: "#2F8F7A", fontWeight: 600, marginBottom: "20px" }}>
                ✓ Cambios guardados correctamente.
              </div>
            )}

            {/* Error banner */}
            {vm.error && (
              <div style={{ backgroundColor: "#FEF2F2", border: "1px solid #FECACA", borderRadius: "8px", padding: "10px 16px", fontSize: "13px", color: "#B91C1C", marginBottom: "20px" }}>
                {vm.error}
              </div>
            )}

            {/* Action buttons */}
            <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "12px" }}>
              <button
                onClick={vm.cancelarCambios}
                style={{ background: "none", border: "none", fontSize: "14px", color: C.textSub, fontWeight: 500, cursor: "pointer", padding: "10px 16px" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = C.textMain; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = C.textSub; }}
              >
                Cancelar
              </button>
              <button
                onClick={vm.guardarCambios}
                disabled={vm.saving}
                style={{ backgroundColor: vm.saving ? "#9ECEC6" : C.green, color: C.white, border: "none", borderRadius: "10px", padding: "10px 22px", fontSize: "14px", fontWeight: 700, cursor: vm.saving ? "not-allowed" : "pointer", display: "flex", alignItems: "center", gap: "8px" }}
                onMouseEnter={(e) => { if (!vm.saving) (e.currentTarget as HTMLButtonElement).style.backgroundColor = C.greenDark; }}
                onMouseLeave={(e) => { if (!vm.saving) (e.currentTarget as HTMLButtonElement).style.backgroundColor = C.green; }}
              >
                {vm.saving && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" style={{ animation: "spin 0.7s linear infinite" }}>
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                  </svg>
                )}
                {vm.saving ? "Guardando..." : "Guardar cambios"}
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* Password modal */}
      <ChangePasswordModal
        isOpen={vm.isPasswordModalOpen}
        onClose={vm.cerrarPasswordModal}
        onSubmit={vm.cambiarPassword}
        loading={vm.passwordLoading}
        error={vm.passwordError}
      />

      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}