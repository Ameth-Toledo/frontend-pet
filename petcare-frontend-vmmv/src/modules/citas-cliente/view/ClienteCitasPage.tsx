"use client";

import React from "react";
import { useClienteCitasViewModel } from "@/modules/citas-cliente/viewmodel/useClienteCitasViewModel";
import CitasHeader from "./CitasHeader";
import CitaCard from "./CitaCard";

const C = {
  green: "#4F8A7C",
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
  mascotas: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <ellipse cx="12" cy="16" rx="5" ry="4" />
      <circle cx="6" cy="10" r="2" /><circle cx="18" cy="10" r="2" />
      <circle cx="9" cy="7" r="2" /><circle cx="15" cy="7" r="2" />
    </svg>
  ),
  citas: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M3 9h18M8 2v4M16 2v4" strokeLinecap="round" />
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
  { label: "Mis Mascotas",    key: "mascotas" },
  { label: "Mis Citas",       key: "citas", active: true },
  { label: "Configuración",   key: "configuracion" },
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

// ─── Page ─────────────────────────────────────────────────────────────────────
export function ClienteCitasPage() {
  const { citas, isLoading } = useClienteCitasViewModel();

  if (isLoading) return <Spinner />;

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: C.bg, fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <Sidebar />

      <main style={{ flex: 1, minWidth: 0, padding: "32px" }}>
        <CitasHeader />

        {/* Citas list — centered, max width */}
        <div style={{ maxWidth: "640px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {citas.map((cita) => (
              <CitaCard key={cita.id} cita={cita} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}