import React from "react";
import { CitaDetailModalProps } from "../model/dto/props/CitaDetailModalProps";

const C = {
  green: "#4F8A7C", greenDark: "#3E6F63", white: "#FFFFFF",
  textMain: "#1F2937", textSub: "#6B7280", border: "#E5E7EB",
  bg: "#F9FAFB", tealBg: "#E6F4F1",
};

function IconWrap({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ width: "36px", height: "36px", borderRadius: "50%", backgroundColor: C.tealBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      {children}
    </div>
  );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 0", borderBottom: `1px solid ${C.border}` }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <IconWrap>{icon}</IconWrap>
        <span style={{ fontSize: "11px", fontWeight: 600, color: C.textSub, letterSpacing: "0.05em", textTransform: "uppercase" }}>{label}</span>
      </div>
      <span style={{ fontSize: "14px", fontWeight: 600, color: C.textMain }}>{value}</span>
    </div>
  );
}

export default function CitaDetailModal({ data, onClose }: CitaDetailModalProps) {
  const profesional = data.profesional ?? "Dr. Smith";

  return (
    <div onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.40)", backdropFilter: "blur(3px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "16px" }}>
      <div style={{ backgroundColor: C.white, borderRadius: "16px", boxShadow: "0 20px 60px rgba(0,0,0,0.18)", padding: "32px 36px", width: "100%", maxWidth: "540px" }}>

        <h2 style={{ fontSize: "18px", fontWeight: 800, color: C.textMain, marginBottom: "4px" }}>Detalle de cita</h2>
        <p style={{ fontSize: "13px", color: C.textSub, marginBottom: "20px" }}>Información completa de la cita programada.</p>

        <InfoRow label="Servicio" value={data.servicio}
          icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" /><line x1="12" y1="12" x2="12" y2="16" /><line x1="10" y1="14" x2="14" y2="14" /></svg>}
        />

        <InfoRow label="Propietario" value={data.propietario}
          icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>}
        />

        <div style={{ display: "flex", alignItems: "center", gap: "16px", padding: "18px 0", borderBottom: `1px solid ${C.border}` }}>
          <IconWrap>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="2"><ellipse cx="12" cy="16" rx="5" ry="4" /><circle cx="6" cy="10" r="2" /><circle cx="18" cy="10" r="2" /><circle cx="9" cy="7" r="2" /><circle cx="15" cy="7" r="2" /></svg>
          </IconWrap>
          <div style={{ display: "flex", gap: "32px" }}>
            {[["Especie", data.especie], ["Raza", data.raza], ["Nombre", data.nombre]].map(([lbl, val]) => (
              <div key={lbl}>
                <p style={{ fontSize: "11px", fontWeight: 600, color: C.textSub, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "4px" }}>{lbl}</p>
                <p style={{ fontSize: "14px", fontWeight: 600, color: C.green }}>{val}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 0", borderBottom: `1px solid ${C.border}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <IconWrap>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2" /><circle cx="8" cy="12" r="2" /><path d="M14 10h4M14 14h4" /></svg>
            </IconWrap>
            <span style={{ fontSize: "11px", fontWeight: 600, color: C.textSub, letterSpacing: "0.05em", textTransform: "uppercase" }}>Profesional</span>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ fontSize: "14px", fontWeight: 600, color: C.textMain, marginBottom: "2px" }}>{profesional}</p>
            <p style={{ fontSize: "12px", color: C.textSub }}>Veterinario/a</p>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", backgroundColor: C.bg, borderRadius: "12px", border: `1px solid ${C.border}`, padding: "16px 20px", marginTop: "18px", marginBottom: "28px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div style={{ width: "44px", height: "44px", borderRadius: "12px", backgroundColor: C.green, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="16" y1="2" x2="16" y2="6" /></svg>
            </div>
            <div>
              <p style={{ fontSize: "11px", fontWeight: 600, color: C.textSub, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "4px" }}>Fecha y hora</p>
              {data.fecha && <p style={{ fontSize: "15px", fontWeight: 700, color: C.textMain }}>{data.fecha}</p>}
            </div>
          </div>
          <p style={{ fontSize: "18px", fontWeight: 700, color: C.green }}>{data.hora}</p>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button onClick={onClose} style={{ backgroundColor: C.green, color: C.white, border: "none", borderRadius: "10px", padding: "10px 24px", fontSize: "14px", fontWeight: 700, cursor: "pointer" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = C.greenDark; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = C.green; }}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}