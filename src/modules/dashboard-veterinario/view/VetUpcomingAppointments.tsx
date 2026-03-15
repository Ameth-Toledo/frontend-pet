import React from "react";
import { VetUpcomingAppointmentsProps } from "../model/dto/props/VetUpcomingAppointmentsProps";
import { VetAppointmentUI } from "../model/ui.model";

function PetIcon({ species }: { species: VetAppointmentUI["patientSpecies"] }) {
  const isDog = species !== "cat";
  return (
    <div style={{ width: "32px", height: "32px", borderRadius: "50%", backgroundColor: "#E6F4F1", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      {isDog ? (
        <svg width="16" height="16" viewBox="0 0 64 64" fill="none" stroke="#4F8A7C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="32" cy="38" rx="18" ry="14" /><circle cx="32" cy="20" r="10" />
          <ellipse cx="20" cy="14" rx="5" ry="8" /><ellipse cx="44" cy="14" rx="5" ry="8" />
          <circle cx="28" cy="20" r="1.5" fill="#4F8A7C" stroke="none" /><circle cx="36" cy="20" r="1.5" fill="#4F8A7C" stroke="none" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 64 64" fill="none" stroke="#4F8A7C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="32" cy="40" rx="16" ry="12" /><circle cx="32" cy="22" r="10" />
          <path d="M22 12 L18 4 L26 10" /><path d="M42 12 L46 4 L38 10" />
          <circle cx="28" cy="22" r="1.5" fill="#4F8A7C" stroke="none" /><circle cx="36" cy="22" r="1.5" fill="#4F8A7C" stroke="none" />
        </svg>
      )}
    </div>
  );
}

function Badge({ label, variant }: { label: string; variant: VetAppointmentUI["badgeVariant"] }) {
  const styles = variant === "checkup"
    ? { background: "#E6F4F1", color: "#4F8A7C" }
    : { background: "#FFF4E5", color: "#D97706" };
  return (
    <span style={{ ...styles, padding: "4px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: 600, whiteSpace: "nowrap" as const, letterSpacing: "0.03em" }}>
      {label}
    </span>
  );
}

export default function VetUpcomingAppointments({ appointments }: VetUpcomingAppointmentsProps) {
  return (
    <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "16px", padding: "24px 28px", flex: 1 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#1F2937", margin: 0 }}>Próximas citas</h3>
        <button style={{ fontSize: "13px", color: "#4F8A7C", fontWeight: 500, background: "none", border: "none", cursor: "pointer" }}>Ver todas</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1.5fr 1fr 1.5fr 100px", padding: "10px 12px", fontSize: "11px", fontWeight: 600, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.05em", borderBottom: "1px solid #F3F4F6" }}>
        <div>Pacientes</div><div>Propietario</div><div>Hora</div><div>Tipo</div>
        <div style={{ textAlign: "right" }}>Acción</div>
      </div>

      {appointments.map((cita) => (
        <div key={cita.id} style={{ display: "grid", gridTemplateColumns: "2fr 1.5fr 1fr 1.5fr 100px", alignItems: "center", padding: "14px 12px", borderBottom: "1px solid #F9FAFB" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <PetIcon species={cita.patientSpecies} />
            <div>
              <p style={{ fontWeight: 600, color: "#1F2937", margin: 0, fontSize: "13px" }}>{cita.patientName}</p>
              <p style={{ fontSize: "11px", color: "#6B7280", margin: "2px 0 0 0" }}>{cita.patientBreed}</p>
            </div>
          </div>
          <div style={{ fontSize: "13px", color: "#6B7280" }}>{cita.ownerName}</div>
          <div style={{ fontSize: "13px", color: "#374151", fontWeight: 500 }}>{cita.time}</div>
          <div><Badge label={cita.badgeLabel} variant={cita.badgeVariant} /></div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button style={{ backgroundColor: "#4F8A7C", color: "#FFFFFF", border: "none", borderRadius: "8px", padding: "7px 16px", fontSize: "12px", fontWeight: 500, cursor: "pointer" }}>
              Detalles
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}