import React from "react";
import { RecentPatientsProps } from "../model/dto/props/RecentPatientsProps";
import { PatientUI } from "../model/ui.model";

function SpeciesAvatar({ species }: { species: PatientUI["species"] }) {
  const isDog = species !== "cat";
  return (
    <div style={{ width: "44px", height: "44px", borderRadius: "50%", backgroundColor: "#E6F4F1", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      {isDog ? (
        <svg width="24" height="24" viewBox="0 0 64 64" fill="none" stroke="#4F8A7C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="32" cy="38" rx="18" ry="14" /><circle cx="32" cy="20" r="10" />
          <ellipse cx="20" cy="14" rx="5" ry="8" /><ellipse cx="44" cy="14" rx="5" ry="8" />
          <circle cx="28" cy="20" r="1.5" fill="#4F8A7C" stroke="none" /><circle cx="36" cy="20" r="1.5" fill="#4F8A7C" stroke="none" />
          <path d="M29 25 q3 3 6 0" />
        </svg>
      ) : (
        <svg width="24" height="24" viewBox="0 0 64 64" fill="none" stroke="#4F8A7C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="32" cy="40" rx="16" ry="12" /><circle cx="32" cy="22" r="10" />
          <path d="M22 12 L18 4 L26 10" /><path d="M42 12 L46 4 L38 10" />
          <circle cx="28" cy="22" r="1.5" fill="#4F8A7C" stroke="none" /><circle cx="36" cy="22" r="1.5" fill="#4F8A7C" stroke="none" />
          <path d="M29 27 q3 2 6 0" />
        </svg>
      )}
    </div>
  );
}

export default function RecentPatients({ patients }: RecentPatientsProps) {
  return (
    <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "16px", padding: "28px 24px", width: "280px", flexShrink: 0 }}>
      <h2 style={{ fontSize: "17px", fontWeight: 700, color: "#1F2937", marginBottom: "20px" }}>Pacientes recientes</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        {patients.map((patient) => (
          <div key={patient.id} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 8px", borderRadius: "10px", cursor: "pointer" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.backgroundColor = "#F7F9FB"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.backgroundColor = "transparent"; }}>
            <SpeciesAvatar species={patient.species} />
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: "14px", fontWeight: 600, color: "#1F2937", marginBottom: "2px" }}>{patient.name}</p>
              <p style={{ fontSize: "12px", color: "#6B7280" }}>{patient.breed}</p>
            </div>
            <span style={{ color: "#6B7280", fontSize: "16px" }}>›</span>
          </div>
        ))}
      </div>
    </div>
  );
}