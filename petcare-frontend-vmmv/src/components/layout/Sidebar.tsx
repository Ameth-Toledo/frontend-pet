"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const C = {
  green: "#6BAF9F",
  white: "#FFFFFF",
  textMain: "#1F2937",
  textSub: "#6B7280",
  border: "#E5E7EB",
};

const NAV_ICONS: Record<string, React.ReactNode> = {
  dashboard: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <rect x="3" y="3" width="8" height="8" rx="1" />
      <rect x="13" y="3" width="8" height="8" rx="1" />
      <rect x="3" y="13" width="8" height="8" rx="1" />
      <rect x="13" y="13" width="8" height="8" rx="1" />
    </svg>
  ),
  clients: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="9" cy="7" r="4" />
      <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
    </svg>
  ),
  appointments: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M3 9h18M8 2v4M16 2v4" />
    </svg>
  ),
  patients: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <ellipse cx="12" cy="16" rx="5" ry="4" />
      <circle cx="6" cy="10" r="2" />
      <circle cx="18" cy="10" r="2" />
      <circle cx="9" cy="7" r="2" />
      <circle cx="15" cy="7" r="2" />
    </svg>
  ),
  staff: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="8" r="4" />
      <path d="M6 20v-1a6 6 0 0 1 12 0v1" />
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
  { label: "Panel principal", key: "dashboard",    href: "/admin/dashboard" },
  { label: "Clientes",        key: "clients",      href: "/admin/clientes" },
  { label: "Citas",           key: "appointments", href: "/admin/citas" },
  { label: "Pacientes",       key: "patients",     href: "/admin/mascotas" },
  { label: "Personal",        key: "staff",        href: "/admin/personal" },
  { label: "Análisis",        key: "analytics",    href: "/admin/analisis" },
  { label: "Configuración",   key: "settings",     href: "/admin/configuracion" },
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

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      style={{
        width: "200px",
        minHeight: "100vh",
        backgroundColor: C.white,
        border: `1px solid ${C.border}`,
        borderRadius: "16px",
        padding: "20px 12px",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "28px",
          padding: "0 8px",
        }}
      >
        <div
          style={{
            width: "34px",
            height: "34px",
            borderRadius: "10px",
            backgroundColor: C.green,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <PawIcon />
        </div>
        <span style={{ fontSize: "17px", fontWeight: 700, color: C.textMain }}>
          PetCare
        </span>
      </div>

      <nav style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
        {NAV_ITEMS.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.key}
              href={item.href}
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "9px 12px",
                borderRadius: "10px",
                cursor: "pointer",
                backgroundColor: isActive ? C.green : "transparent",
                color: isActive ? C.white : C.textSub,
                fontSize: "13px",
                fontWeight: isActive ? 600 : 400,
              }}
            >
              {NAV_ICONS[item.key]}
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
