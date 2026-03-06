import React from "react";
import { PatientUI } from "../model/ui.model";

interface Props {
  patients: PatientUI[];
}

function SpeciesAvatar({ species }: { species: PatientUI["species"] }) {
  const emoji = species === "cat" ? "🐈" : species === "bird" ? "🦜" : "🐕";
  return (
    <div
      style={{
        width: "44px",
        height: "44px",
        borderRadius: "50%",
        backgroundColor: "#E6F4F1",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "20px",
        flexShrink: 0,
      }}
    >
      {emoji}
    </div>
  );
}

export default function RecentPatients({ patients }: Props) {
  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        border: "1px solid #E5E7EB",
        borderRadius: "16px",
        padding: "28px 24px",
        width: "280px",
        flexShrink: 0,
      }}
    >
      <h2 style={{ fontSize: "17px", fontWeight: 700, color: "#1F2937", marginBottom: "20px" }}>
        Pacientes recientes
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        {patients.map((patient) => (
          <div
            key={patient.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "10px 8px",
              borderRadius: "10px",
              cursor: "pointer",
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.backgroundColor = "#F7F9FB";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.backgroundColor = "transparent";
            }}
          >
            <SpeciesAvatar species={patient.species} />
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: "14px", fontWeight: 600, color: "#1F2937", marginBottom: "2px" }}>
                {patient.name}
              </p>
              <p style={{ fontSize: "12px", color: "#6B7280" }}>
                {patient.breed} · {patient.lastSeen}
              </p>
            </div>
            <span style={{ color: "#6B7280", fontSize: "16px" }}>›</span>
          </div>
        ))}
      </div>
    </div>
  );
}