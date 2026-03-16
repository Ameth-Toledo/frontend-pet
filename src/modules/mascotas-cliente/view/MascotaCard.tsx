import React from "react";
import { MascotaUI, IconType } from "../model/ui.model";

const C = {
  green: "#4F8A7C",
  greenDark: "#3E6F63",
  greenLight: "#E6F2EF",
  white: "#FFFFFF",
  textMain: "#1F2937",
  border: "#E5E7EB",
};

function PetIcon({ icon }: { icon: IconType }) {
  return icon === "gato" ? (
    <svg width="48" height="48" viewBox="0 0 64 64" fill="none" stroke="#4F8A7C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="32" cy="40" rx="16" ry="12" />
      <circle cx="32" cy="22" r="10" />
      <path d="M22 12 L18 4 L26 10" />
      <path d="M42 12 L46 4 L38 10" />
      <circle cx="28" cy="22" r="1.5" fill="#4F8A7C" stroke="none" />
      <circle cx="36" cy="22" r="1.5" fill="#4F8A7C" stroke="none" />
      <path d="M29 27 q3 2 6 0" />
    </svg>
  ) : (
    <svg width="48" height="48" viewBox="0 0 64 64" fill="none" stroke="#4F8A7C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="32" cy="38" rx="18" ry="14" />
      <circle cx="32" cy="20" r="10" />
      <ellipse cx="20" cy="14" rx="5" ry="8" />
      <ellipse cx="44" cy="14" rx="5" ry="8" />
      <circle cx="28" cy="20" r="1.5" fill="#4F8A7C" stroke="none" />
      <circle cx="36" cy="20" r="1.5" fill="#4F8A7C" stroke="none" />
      <path d="M29 25 q3 3 6 0" />
    </svg>
  );
}

interface MascotaCardProps {
  mascota: MascotaUI;
  onVer: (id: string) => void;
  onEditar: (id: string) => void;
}

export default function MascotaCard({ mascota, onVer, onEditar }: MascotaCardProps) {
  const [verHover, setVerHover] = React.useState(false);
  const [editHover, setEditHover] = React.useState(false);

  return (
    <div
      style={{
        backgroundColor: C.white,
        border: `1px solid ${C.border}`,
        borderRadius: "20px",
        padding: "28px 20px 20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "14px",
        boxShadow: "0 1px 6px rgba(0,0,0,0.05)",
        transition: "box-shadow 0.2s",
      }}
    >
      {/* Illustration */}
      <div style={{
        width: "96px", height: "96px",
        borderRadius: "50%",
        backgroundColor: C.greenLight,
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: "4px",
      }}>
        <PetIcon icon={mascota.icon} />
      </div>

      {/* Name */}
      <p style={{ fontSize: "16px", fontWeight: 700, color: C.textMain }}>{mascota.nombre}</p>

      {/* Buttons */}
      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "8px" }}>
        {/* Ver mascota — solid */}
        <button
          onClick={() => onVer(mascota.id)}
          onMouseEnter={() => setVerHover(true)}
          onMouseLeave={() => setVerHover(false)}
          style={{
            width: "100%",
            display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
            backgroundColor: verHover ? C.greenDark : C.green,
            color: C.white,
            border: "none",
            borderRadius: "10px",
            padding: "9px 0",
            fontSize: "13px", fontWeight: 600,
            cursor: "pointer",
            transition: "background-color 0.15s",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          Ver mascota
        </button>

        {/* Editar mascota — outline */}
        <button
          onClick={() => onEditar(mascota.id)}
          onMouseEnter={() => setEditHover(true)}
          onMouseLeave={() => setEditHover(false)}
          style={{
            width: "100%",
            display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
            backgroundColor: editHover ? C.greenLight : C.white,
            color: C.green,
            border: `1.5px solid ${C.border}`,
            borderRadius: "10px",
            padding: "8px 0",
            fontSize: "13px", fontWeight: 500,
            cursor: "pointer",
            transition: "background-color 0.15s",
          }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
          Editar mascota
        </button>
      </div>
    </div>
  );
}