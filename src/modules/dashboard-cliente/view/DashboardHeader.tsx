import React from "react";

const C = { green: "#5BAA9C", greenDark: "#4A9488", greenLight: "#E6F4F1", white: "#FFFFFF", border: "#E5E7EB", textGray: "#4B5563" };

export default function DashboardHeader() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px", flexWrap: "wrap" }}>
      <button style={{ display: "flex", alignItems: "center", gap: "7px", backgroundColor: C.green, color: C.white, border: "none", borderRadius: "50px", padding: "10px 22px", fontSize: "14px", fontWeight: 600, cursor: "pointer" }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = C.greenDark; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = C.green; }}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" />
        </svg>
        Agendar cita
      </button>

      <button style={{ display: "flex", alignItems: "center", gap: "7px", backgroundColor: C.white, color: C.green, border: `1.5px solid ${C.green}`, borderRadius: "50px", padding: "9px 22px", fontSize: "14px", fontWeight: 600, cursor: "pointer" }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = C.greenLight; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = C.white; }}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <ellipse cx="12" cy="16" rx="5" ry="4" /><circle cx="6" cy="10" r="2" /><circle cx="18" cy="10" r="2" /><circle cx="9" cy="7" r="2" /><circle cx="15" cy="7" r="2" />
        </svg>
        Agregar mascota
      </button>

      <button style={{ display: "flex", alignItems: "center", gap: "7px", backgroundColor: C.white, color: C.textGray, border: `1.5px solid ${C.border}`, borderRadius: "50px", padding: "9px 22px", fontSize: "14px", fontWeight: 500, cursor: "pointer" }}
        onMouseEnter={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor = C.green; b.style.color = C.green; }}
        onMouseLeave={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor = C.border; b.style.color = C.textGray; }}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" /><line x1="9" y1="13" x2="15" y2="13" /><line x1="9" y1="17" x2="12" y2="17" />
        </svg>
        Ver cartilla de vacunación
      </button>
    </div>
  );
}