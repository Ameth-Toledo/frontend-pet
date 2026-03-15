import React from "react";
import { Eye, Pencil } from "lucide-react";
import { MascotaCardProps } from "../model/dto/props/MascotaCardProps";

function PetIcon({ especie }: { especie: string }) {
  const isCat = especie.toLowerCase() === "gato";
  return isCat ? (
    <svg width="22" height="22" viewBox="0 0 64 64" fill="none" stroke="#4F8A7C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="32" cy="40" rx="16" ry="12" />
      <circle cx="32" cy="22" r="10" />
      <path d="M22 12 L18 4 L26 10" />
      <path d="M42 12 L46 4 L38 10" />
      <circle cx="28" cy="22" r="1.5" fill="#4F8A7C" stroke="none" />
      <circle cx="36" cy="22" r="1.5" fill="#4F8A7C" stroke="none" />
      <path d="M29 27 q3 2 6 0" />
    </svg>
  ) : (
    <svg width="22" height="22" viewBox="0 0 64 64" fill="none" stroke="#4F8A7C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
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

export default function MascotaCard({ mascota }: MascotaCardProps) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr 1.5fr 1fr 80px", alignItems: "center", padding: "16px 24px", fontSize: "13px", borderTop: "1px solid #F3F4F6" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div style={{ width: "38px", height: "38px", borderRadius: "10px", backgroundColor: "#E6F4F1", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <PetIcon especie={mascota.especie} />
        </div>
        <span style={{ fontWeight: 600, color: "#1F2937" }}>{mascota.nombre}</span>
      </div>

      <div>
        <p style={{ fontWeight: 600, color: "#1F2937", margin: 0 }}>{mascota.especie}</p>
        <p style={{ fontSize: "11px", color: "#6B7280", margin: "2px 0 0 0" }}>{mascota.raza}</p>
      </div>

      <div style={{ color: "#6B7280" }}>{mascota.propietario}</div>

      <div>
        <span style={{ padding: "4px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: 600, backgroundColor: mascota.estado === "ACTIVO" ? "#E6F4F1" : "#F3F4F6", color: mascota.estado === "ACTIVO" ? "#2F6B62" : "#6B7280" }}>
          {mascota.estado}
        </span>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", color: "#9CA3AF" }}>
        <button style={{ background: "none", border: "none", cursor: "pointer", color: "inherit" }}><Eye size={15} /></button>
        <button style={{ background: "none", border: "none", cursor: "pointer", color: "inherit" }}><Pencil size={15} /></button>
      </div>
    </div>
  );
}