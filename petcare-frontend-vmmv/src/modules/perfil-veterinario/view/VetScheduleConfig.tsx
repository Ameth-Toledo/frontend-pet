import React from "react";
import { ScheduleUI } from "../model/ui.model";

const C = {
  green: "#4F8A7C",
  greenDark: "#3E6F63",
  white: "#FFFFFF",
  textMain: "#1F2937",
  textSub: "#6B7280",
  border: "#E5E7EB",
  bgLight: "#F9FAFB",
  error: "#EF4444",
};

const DAY_LABELS: Record<string, string> = {
  lunes: "Lunes", martes: "Martes", miercoles: "Miércoles",
  jueves: "Jueves", viernes: "Viernes", sabado: "Sábado", domingo: "Domingo",
};
const DAYS = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"];

interface VetScheduleConfigProps {
  schedule: ScheduleUI;
  onScheduleChange: (day: string, field: "enabled" | "start" | "end", value: string | boolean) => void;
  duration: string;
  setDuration: (v: string) => void;
  onSave: () => void;
  saving: boolean;
  saved: boolean;
  error: string | null;
}

export default function VetScheduleConfig({
  schedule, onScheduleChange, duration, setDuration, onSave, saving, saved, error,
}: VetScheduleConfigProps) {
  return (
    <div
      style={{
        backgroundColor: C.white,
        borderRadius: "16px",
        border: `1px solid ${C.border}`,
        padding: "32px 36px",
        width: "100%",
        boxSizing: "border-box",
        marginTop: "24px",
      }}
    >
      <h3 style={{ fontSize: "18px", fontWeight: 700, color: C.textMain, marginBottom: "20px" }}>
        Días de Atención y Horarios
      </h3>
      <div style={{ height: "1px", backgroundColor: C.border, marginBottom: "0" }} />

      {/* Days */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        {DAYS.map((day) => {
          const item = schedule[day] || { enabled: false, start: "09:00", end: "18:00" };
          return (
            <div
              key={day}
              style={{
                display: "flex", alignItems: "center", gap: "20px",
                padding: "18px 0",
                borderBottom: `1px solid ${C.border}`,
              }}
            >
              {/* Custom checkbox */}
              <div
                onClick={() => onScheduleChange(day, "enabled", !item.enabled)}
                style={{
                  width: "22px", height: "22px", borderRadius: "50%", flexShrink: 0,
                  border: item.enabled ? "none" : `2px solid ${C.border}`,
                  backgroundColor: item.enabled ? C.green : "transparent",
                  cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "background 0.15s",
                }}
              >
                {item.enabled && (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>

              {/* Day name */}
              <span style={{ width: "90px", fontSize: "14px", fontWeight: 500, color: item.enabled ? C.textMain : C.textSub, flexShrink: 0 }}>
                {DAY_LABELS[day]}
              </span>

              {/* Time inputs or disabled label */}
              {item.enabled ? (
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <input
                    type="time"
                    value={item.start}
                    onChange={(e) => onScheduleChange(day, "start", e.target.value)}
                    style={{
                      padding: "6px 10px", borderRadius: "8px", fontSize: "13px",
                      border: `1px solid ${C.border}`, outline: "none", color: C.textMain,
                      backgroundColor: C.white,
                    }}
                  />
                  <span style={{ fontSize: "13px", color: C.textSub }}>a</span>
                  <input
                    type="time"
                    value={item.end}
                    onChange={(e) => onScheduleChange(day, "end", e.target.value)}
                    style={{
                      padding: "6px 10px", borderRadius: "8px", fontSize: "13px",
                      border: `1px solid ${C.border}`, outline: "none", color: C.textMain,
                      backgroundColor: C.white,
                    }}
                  />
                </div>
              ) : (
                <span style={{ fontSize: "13px", color: "#9CA3AF", fontStyle: "italic" }}>
                  No disponible para citas
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Duration */}
      <div style={{ display: "flex", alignItems: "center", gap: "14px", marginTop: "24px", marginBottom: "28px" }}>
        <label style={{ fontSize: "14px", fontWeight: 600, color: C.textMain, flexShrink: 0 }}>
          Duración de cita:
        </label>
        <select
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          style={{
            padding: "8px 14px", borderRadius: "8px", fontSize: "14px",
            border: `1px solid ${C.border}`, color: C.textMain, outline: "none",
            backgroundColor: C.white, cursor: "pointer",
          }}
        >
          <option value="15">15 minutos</option>
          <option value="30">30 minutos</option>
          <option value="45">45 minutos</option>
          <option value="60">60 minutos</option>
        </select>
      </div>

      {/* Error */}
      {error && (
        <div
          style={{
            backgroundColor: "#FEE2E2", border: `1px solid ${C.error}`,
            borderRadius: "8px", padding: "10px 16px",
            fontSize: "13px", color: C.error, marginBottom: "16px",
          }}
        >
          {error}
        </div>
      )}

      {/* Success */}
      {saved && (
        <div
          style={{
            backgroundColor: "#E6F4F1", border: `1px solid ${C.green}`,
            borderRadius: "8px", padding: "10px 16px",
            fontSize: "13px", color: C.green, fontWeight: 600, marginBottom: "16px",
          }}
        >
          ✓ Horario guardado correctamente.
        </div>
      )}

      {/* Save button */}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          onClick={onSave}
          disabled={saving}
          style={{
            backgroundColor: saving ? "#9ECEC6" : C.green, color: C.white,
            border: "none", borderRadius: "10px", padding: "10px 22px",
            fontSize: "14px", fontWeight: 700, cursor: saving ? "not-allowed" : "pointer",
          }}
          onMouseEnter={(e) => { if (!saving) (e.currentTarget as HTMLButtonElement).style.backgroundColor = C.greenDark; }}
          onMouseLeave={(e) => { if (!saving) (e.currentTarget as HTMLButtonElement).style.backgroundColor = C.green; }}
        >
          {saving ? "Guardando..." : "Guardar horarios"}
        </button>
      </div>
    </div>
  );
}
