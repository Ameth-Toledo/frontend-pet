"use client";

import React, { useState } from "react";
import { AppointmentUI } from "../model/ui.model";
import { CitaDetailData } from "@/modules/citas-admin/model/dto/props/CitaDetailModalProps";
import CitaDetailModal from "@/modules/citas-admin/view/CitaDetailModal";

const especieMap: Record<string, string> = { dog: "Perro", cat: "Gato", bird: "Ave", other: "Otro" };

function mapAptToDetail(apt: AppointmentUI): CitaDetailData {
  return {
    nombre: apt.patientName,
    raza: apt.patientBreed,
    especie: especieMap[apt.patientSpecies] ?? apt.patientSpecies,
    propietario: apt.ownerName,
    servicio: apt.badgeLabel,
    hora: apt.time,
  };
}

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

function PetIcon({ species }: { species: AppointmentUI["patientSpecies"] }) {
  const isDog = species !== "cat";
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
        flexShrink: 0,
      }}
    >
      {isDog ? (
        <svg width="18" height="18" viewBox="0 0 64 64" fill="none" stroke="#4F8A7C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="32" cy="38" rx="18" ry="14" />
          <circle cx="32" cy="20" r="10" />
          <ellipse cx="20" cy="14" rx="5" ry="8" />
          <ellipse cx="44" cy="14" rx="5" ry="8" />
          <circle cx="28" cy="20" r="1.5" fill="#4F8A7C" stroke="none" />
          <circle cx="36" cy="20" r="1.5" fill="#4F8A7C" stroke="none" />
          <path d="M29 25 q3 3 6 0" />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 64 64" fill="none" stroke="#4F8A7C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="32" cy="40" rx="16" ry="12" />
          <circle cx="32" cy="22" r="10" />
          <path d="M22 12 L18 4 L26 10" />
          <path d="M42 12 L46 4 L38 10" />
          <circle cx="28" cy="22" r="1.5" fill="#4F8A7C" stroke="none" />
          <circle cx="36" cy="22" r="1.5" fill="#4F8A7C" stroke="none" />
          <path d="M29 27 q3 2 6 0" />
        </svg>
      )}
    </div>
  );
}

export default function UpcomingAppointments({ appointments }: Props) {
  const [selected, setSelected] = useState<AppointmentUI | null>(null);
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
            <PetIcon species={apt.patientSpecies} />
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
            onClick={() => setSelected(apt)}
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
            Detalles
          </button>
        </div>
      ))}

      {selected && (
        <CitaDetailModal
          data={mapAptToDetail(selected)}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}