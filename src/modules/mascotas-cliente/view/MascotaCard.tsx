import React from "react";
import { MascotaCardProps } from "../model/dto/props/MascotaCardProps";
import { IconType } from "../model/ui.model";

const C = {
  green: "#4F8A7C", greenDark: "#3E6F63",
  greenLight: "#E6F2EF", white: "#FFFFFF",
  textMain: "#1F2937", border: "#E5E7EB",
};

function DogIcon() {
  return (
    <svg width="72" height="72" viewBox="0 0 100 100" fill="none">
      <path d="M27 42 Q18 18 32 22 Q42 27 36 44Z" fill="none" stroke="#4F8A7C" strokeWidth="2" strokeLinejoin="round" />
      <path d="M73 42 Q82 18 68 22 Q58 27 64 44Z" fill="none" stroke="#4F8A7C" strokeWidth="2" strokeLinejoin="round" />
      <ellipse cx="50" cy="50" rx="26" ry="24" fill="none" stroke="#4F8A7C" strokeWidth="2" />
      <ellipse cx="50" cy="63" rx="13" ry="9" fill="none" stroke="#4F8A7C" strokeWidth="2" />
      <ellipse cx="50" cy="59" rx="4.5" ry="3" fill="#4F8A7C" />
      <circle cx="41" cy="48" r="3" fill="#4F8A7C" />
      <circle cx="59" cy="48" r="3" fill="#4F8A7C" />
      <path d="M45 67 Q50 72 55 67" stroke="#4F8A7C" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M34 74 Q50 82 66 74" stroke="#4F8A7C" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function CatIcon() {
  return (
    <svg width="72" height="72" viewBox="0 0 100 100" fill="none">
      <polygon points="28,42 20,16 44,34" fill="none" stroke="#4F8A7C" strokeWidth="2" strokeLinejoin="round" />
      <polygon points="72,42 80,16 56,34" fill="none" stroke="#4F8A7C" strokeWidth="2" strokeLinejoin="round" />
      <ellipse cx="50" cy="52" rx="26" ry="24" fill="none" stroke="#4F8A7C" strokeWidth="2" />
      <ellipse cx="50" cy="62" rx="10" ry="7" fill="none" stroke="#4F8A7C" strokeWidth="1.5" />
      <polygon points="50,57 47,62 53,62" fill="#4F8A7C" />
      <ellipse cx="41" cy="49" rx="3.5" ry="4.5" fill="none" stroke="#4F8A7C" strokeWidth="2" />
      <ellipse cx="59" cy="49" rx="3.5" ry="4.5" fill="none" stroke="#4F8A7C" strokeWidth="2" />
      <ellipse cx="41" cy="49" rx="1.5" ry="3" fill="#4F8A7C" />
      <ellipse cx="59" cy="49" rx="1.5" ry="3" fill="#4F8A7C" />
      <line x1="28" y1="61" x2="42" y2="63" stroke="#4F8A7C" strokeWidth="1" opacity="0.6" />
      <line x1="28" y1="65" x2="42" y2="65" stroke="#4F8A7C" strokeWidth="1" opacity="0.6" />
      <line x1="58" y1="63" x2="72" y2="61" stroke="#4F8A7C" strokeWidth="1" opacity="0.6" />
      <line x1="58" y1="65" x2="72" y2="65" stroke="#4F8A7C" strokeWidth="1" opacity="0.6" />
      <path d="M46 67 Q50 71 54 67" stroke="#4F8A7C" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M34 76 Q50 84 66 76" stroke="#4F8A7C" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M66 76 Q82 65 76 54" stroke="#4F8A7C" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function PetIcon({ icon }: { icon: IconType }) {
  return icon === "gato" ? <CatIcon /> : <DogIcon />;
}

export default function MascotaCard({ mascota, onVer, onEditar }: MascotaCardProps) {
  const [verHover, setVerHover]   = React.useState(false);
  const [editHover, setEditHover] = React.useState(false);

  return (
    <div style={{ backgroundColor: C.white, border: `1px solid ${C.border}`, borderRadius: "20px", padding: "28px 20px 20px", display: "flex", flexDirection: "column", alignItems: "center", gap: "14px", boxShadow: "0 1px 6px rgba(0,0,0,0.05)" }}>
      <div style={{ marginBottom: "4px" }}><PetIcon icon={mascota.icon} /></div>

      <p style={{ fontSize: "16px", fontWeight: 700, color: C.textMain }}>{mascota.nombre}</p>

      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "8px" }}>
        <button onClick={() => onVer(mascota.id)} onMouseEnter={() => setVerHover(true)} onMouseLeave={() => setVerHover(false)}
          style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", backgroundColor: verHover ? C.greenDark : C.green, color: C.white, border: "none", borderRadius: "10px", padding: "9px 0", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
          </svg>
          Ver mascota
        </button>

        <button onClick={() => onEditar(mascota.id)} onMouseEnter={() => setEditHover(true)} onMouseLeave={() => setEditHover(false)}
          style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", backgroundColor: editHover ? C.greenLight : C.white, color: C.green, border: `1.5px solid ${C.border}`, borderRadius: "10px", padding: "8px 0", fontSize: "13px", fontWeight: 500, cursor: "pointer" }}>
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