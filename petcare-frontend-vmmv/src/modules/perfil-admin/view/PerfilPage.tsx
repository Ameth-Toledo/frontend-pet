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

// ─── Nav icons ────────────────────────────────────────────────────────────────
const NAV_ICONS: Record<string, React.ReactNode> = {
  dashboard: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <rect x="3" y="3" width="8" height="8" rx="1" /><rect x="13" y="3" width="8" height="8" rx="1" />
      <rect x="3" y="13" width="8" height="8" rx="1" /><rect x="13" y="13" width="8" height="8" rx="1" />
    </svg>
  ),
  clients: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="9" cy="7" r="4" /><path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
    </svg>
  ),
  appointments: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M3 9h18M8 2v4M16 2v4" />
    </svg>
  ),
  patients: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <ellipse cx="12" cy="16" rx="5" ry="4" /><circle cx="6" cy="10" r="2" />
      <circle cx="18" cy="10" r="2" /><circle cx="9" cy="7" r="2" /><circle cx="15" cy="7" r="2" />
    </svg>
  ),
  staff: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="8" r="4" /><path d="M6 20v-1a6 6 0 0 1 12 0v1" />
    </svg>
  ),
  analytics: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  ),
  settings: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  ),
};

const NAV_ITEMS = [
  { label: "Panel principal",    key: "dashboard" },
  { label: "Clientes",           key: "clients" },
  { label: "Citas",              key: "appointments" },
  { label: "Pacientes",          key: "patients" },
  { label: "Personal",           key: "staff" },
  { label: "Análisis",           key: "analytics" },
  { label: "Configuración",      key: "settings", active: true },
];

function PawIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
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
    <aside style={{ width: "200px", minHeight: "100vh", backgroundColor: C.white, border: `1px solid ${C.border}`, borderRadius: "16px", padding: "20px 12px", display: "flex", flexDirection: "column", flexShrink: 0 }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "28px", padding: "0 8px" }}>
        <div style={{ width: "34px", height: "34px", borderRadius: "10px", backgroundColor: C.green, display: "flex", alignItems: "center", justifyContent: "center" }}>
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

function Navbar() {
  return (
    <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginBottom: "32px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", backgroundColor: C.white, border: `1px solid ${C.border}`, borderRadius: "10px", padding: "8px 14px", width: "220px" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
          </svg>
          <span style={{ fontSize: "13px", color: "#9CA3AF" }}>Buscar mascotas o servicios...</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ textAlign: "right" }}>
            <p style={{ fontSize: "13px", fontWeight: 700, color: C.textMain }}>Juan Pérez</p>
            <p style={{ fontSize: "11px", color: C.textSub }}>Premium Member</p>
          </div>
          <div style={{ width: "34px", height: "34px", borderRadius: "50%", backgroundColor: "#E6F4F1", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: 700, color: "#2F8F7A" }}>
            JP
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function PerfilPage() {
  const vm = usePerfilViewModel();

  if (vm.loading) return <Spinner />;

  return (
    <div style={{ backgroundColor: C.bg, minHeight: "100vh", padding: "20px", display: "flex", gap: "20px", fontFamily: "'Geist','DM Sans',system-ui,sans-serif" }}>
      <Sidebar />

      <div style={{ flex: 1, minWidth: 0, paddingTop: "4px" }}>
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
      </div>

      {/* Password modal */}
      {vm.isPasswordModalOpen && (
        <ChangePasswordModal onClose={vm.closePasswordModal} />
      )}
    </div>
  );
}