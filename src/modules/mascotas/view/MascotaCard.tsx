import React from "react";
import { MascotaCardProps } from "../model/dto/props/MascotaCardProps";

function PetIcon({ especie }: { especie: string }) {
  const isCat = especie.toLowerCase() === "gato";
  return isCat ? (
    <svg width="22" height="22" viewBox="0 0 64 64" fill="none" stroke="#4F8A7C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="32" cy="40" rx="16" ry="12" /><circle cx="32" cy="22" r="10" />
      <path d="M22 12 L18 4 L26 10" /><path d="M42 12 L46 4 L38 10" />
      <circle cx="28" cy="22" r="1.5" fill="#4F8A7C" stroke="none" /><circle cx="36" cy="22" r="1.5" fill="#4F8A7C" stroke="none" />
      <path d="M29 27 q3 2 6 0" />
    </svg>
  ) : (
    <svg width="22" height="22" viewBox="0 0 64 64" fill="none" stroke="#4F8A7C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="32" cy="38" rx="18" ry="14" /><circle cx="32" cy="20" r="10" />
      <ellipse cx="20" cy="14" rx="5" ry="8" /><ellipse cx="44" cy="14" rx="5" ry="8" />
      <circle cx="28" cy="20" r="1.5" fill="#4F8A7C" stroke="none" /><circle cx="36" cy="20" r="1.5" fill="#4F8A7C" stroke="none" />
      <path d="M29 25 q3 3 6 0" />
    </svg>
  );
}

function ActionBtn({ title, onClick, children }: { title: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button title={title} onClick={onClick}
      style={{ background: "none", border: "none", cursor: "pointer", color: "#9CA3AF", width: "28px", height: "28px", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center" }}
      onMouseEnter={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.backgroundColor = "#E6F4F1"; b.style.color = "#4F8A7C"; }}
      onMouseLeave={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.backgroundColor = "transparent"; b.style.color = "#9CA3AF"; }}>
      {children}
    </button>
  );
}

export default function MascotaCard({ mascota, onVer, onEditar }: MascotaCardProps) {
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
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "4px" }}>
        <ActionBtn title="Ver historial" onClick={onVer}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
        </ActionBtn>
        {onEditar && (
          <ActionBtn title="Editar paciente" onClick={onEditar}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
          </ActionBtn>
        )}
      </div>
    </div>
  );
}