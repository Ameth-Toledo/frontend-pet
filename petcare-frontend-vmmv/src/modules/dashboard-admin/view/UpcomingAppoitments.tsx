import React from "react";
import { AppointmentUI } from "../model/ui.model";

interface Props {
  appointments: AppointmentUI[];
}

function Badge({ label, variant }: { label: string; variant: AppointmentUI["badgeVariant"] }) {
  const styles =
    variant === "checkup"
      ? { background: "#E6F4F1", color: "#4F8A7C" }
      : { background: "#FFF4E5", color: "#D97706" };

  return (
    <span
      style={{
        ...styles,
        padding: "4px 12px",
        borderRadius: "20px",
        fontSize: "11px",
        fontWeight: 600,
        whiteSpace: "nowrap" as const,
        letterSpacing: "0.03em",
      }}
    >
      {label}
    </span>
  );
}

function PetIcon({ breed }: { breed: string }) {
  const isDog = !breed.toLowerCase().includes("cat");
  return (
    <div
      style={{
        width: "32px",
        height: "32px",
        borderRadius: "50%",
        backgroundColor: "#E6F4F1",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "16px",
        flexShrink: 0,
      }}
    >
      {isDog ? "🐕" : "🐈"}
    </div>
  );
}

export default function UpcomingAppointments({ appointments }: Props) {
  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        border: "1px solid #E5E7EB",
        borderRadius: "16px",
        padding: "28px 32px",
        flex: 1,
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <h2 style={{ fontSize: "17px", fontWeight: 700, color: "#1F2937" }}>Próximas citas</h2>
        <button
          style={{
            background: "none",
            border: "none",
            color: "#4F8A7C",
            fontSize: "14px",
            fontWeight: 500,
            cursor: "pointer",
            padding: 0,
          }}
        >
          Ver todas
        </button>
      </div>

      {/* Table header */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 2fr 1.2fr 2.5fr 1.5fr",
          gap: "8px",
          paddingBottom: "12px",
          borderBottom: "1px solid #E5E7EB",
          marginBottom: "8px",
        }}
      >
        {["PACIENTES", "PROPIETARIO", "HORA", "TIPO", "ACCIÓN"].map((col) => (
          <span key={col} style={{ fontSize: "11px", fontWeight: 600, color: "#6B7280", letterSpacing: "0.05em" }}>
            {col}
          </span>
        ))}
      </div>

      {/* Rows */}
      {appointments.map((apt) => (
        <div
          key={apt.id}
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 2fr 1.2fr 2.5fr 1.5fr",
            gap: "8px",
            alignItems: "center",
            padding: "14px 0",
            borderBottom: "1px solid #F3F4F6",
          }}
        >
          {/* Patient */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <PetIcon breed={apt.patientBreed} />
            <div>
              <p style={{ fontSize: "14px", fontWeight: 600, color: "#1F2937", marginBottom: "2px" }}>
                {apt.patientName}
              </p>
              <p style={{ fontSize: "12px", color: "#6B7280" }}>{apt.patientBreed}</p>
            </div>
          </div>

          {/* Owner */}
          <p style={{ fontSize: "14px", color: "#1F2937" }}>{apt.ownerName}</p>

          {/* Time */}
          <p style={{ fontSize: "14px", color: "#1F2937", fontWeight: 500 }}>{apt.time}</p>

          {/* Badge */}
          <div>
            <Badge label={apt.badgeLabel} variant={apt.badgeVariant} />
          </div>

          {/* Action */}
          <button
            style={{
              backgroundColor: "#4F8A7C",
              color: "#FFFFFF",
              border: "none",
              borderRadius: "8px",
              padding: "8px 18px",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
              width: "fit-content",
            }}
          >
            Details
          </button>
        </div>
      ))}
    </div>
  );
}