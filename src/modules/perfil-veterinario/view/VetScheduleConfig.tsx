import React, { useState } from "react";
import { VetScheduleConfigProps } from "../model/dto/props/VetScheduleConfigProps";

const C = {
  green: "#4F8A7C",
  greenDark: "#3E6F63",
  greenLight: "#E6F4F1",
  white: "#FFFFFF",
  textMain: "#1F2937",
  textSub: "#6B7280",
  border: "#E5E7EB",
  error: "#EF4444",
};

const DAY_LABELS: Record<string, string> = {
  lunes: "Lunes", martes: "Martes", miercoles: "Miércoles",
  jueves: "Jueves", viernes: "Viernes", sabado: "Sábado", domingo: "Domingo",
};
const DAYS_LEFT  = ["lunes", "martes", "miercoles", "jueves"];
const DAYS_RIGHT = ["viernes", "sabado", "domingo"];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: "11px", fontWeight: 700, color: C.textSub, textTransform: "uppercase" as const, letterSpacing: "0.7px", margin: "0 0 20px 0" }}>
      {children}
    </p>
  );
}

function Divider() {
  return <div style={{ height: "1px", backgroundColor: C.border, margin: "36px 0" }} />;
}

export default function VetScheduleConfig({
  schedule, onScheduleChange,
  duration, setDuration,
  onSave, saving, saved, error,
}: VetScheduleConfigProps) {
  const [isDirty, setIsDirty] = useState(false);

  type ScheduleField = "enabled" | "start" | "end";

  const handleScheduleChange = (day: string, field: ScheduleField, value: string | boolean) => {
    onScheduleChange(day, field, value);
    setIsDirty(true);
  };

  const handleDurationChange = (v: string) => {
    setDuration(v);
    setIsDirty(true);
  };

  const handleSave = () => {
    onSave();
    setIsDirty(false);
  };

  return (
    <>
      <Divider />

      {/* ── Días de atención ── */}
      <SectionLabel>Días de atención y horarios</SectionLabel>

      {/* Duración + Guardar — misma fila */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "28px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <label style={{ fontSize: "13px", fontWeight: 700, color: C.textSub, textTransform: "uppercase" as const, letterSpacing: "0.6px", flexShrink: 0 }}>
            Duración de cita
          </label>
          <select
            value={duration}
            onChange={(e) => handleDurationChange(e.target.value)}
            style={{ padding: "8px 14px", borderRadius: "8px", fontSize: "14px", border: `1.5px solid ${C.border}`, color: C.textMain, outline: "none", backgroundColor: C.white, cursor: "pointer" }}
          >
            <option value="15">15 minutos</option>
            <option value="30">30 minutos</option>
            <option value="45">45 minutos</option>
            <option value="60">60 minutos</option>
          </select>
        </div>

        {isDirty && (
          <button
            onClick={handleSave}
            disabled={saving}
            style={{
              backgroundColor: saving ? C.greenDark : C.green,
              color: C.white, border: "none", borderRadius: "8px",
              padding: "9px 24px", fontSize: "14px", fontWeight: 600,
              cursor: saving ? "not-allowed" : "pointer",
              opacity: saving ? 0.8 : 1,
              transition: "background-color 0.15s",
              display: "flex", alignItems: "center", gap: "8px",
            }}
            onMouseEnter={e => { if (!saving) e.currentTarget.style.backgroundColor = C.greenDark; }}
            onMouseLeave={e => { if (!saving) e.currentTarget.style.backgroundColor = C.green; }}
          >
            {saving && (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" style={{ animation: "spin 0.7s linear infinite" }}>
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
              </svg>
            )}
            {saving ? "Guardando..." : "Guardar horarios"}
          </button>
        )}
      </div>

      {/* Dos columnas de días */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 40px" }}>
        {[DAYS_LEFT, DAYS_RIGHT].map((col, ci) => (
          <div key={ci} style={{ display: "flex", flexDirection: "column" }}>
            {col.map((day) => {
              const item = schedule[day] || { enabled: false, start: "09:00", end: "18:00" };
              return (
                <div key={day} style={{ display: "flex", alignItems: "center", gap: "16px", padding: "16px 0", borderBottom: `1px solid ${C.border}` }}>

                  {/* Toggle */}
                  <div
                    onClick={() => handleScheduleChange(day, "enabled" as ScheduleField, !item.enabled)}
                    style={{
                      width: "22px", height: "22px", borderRadius: "50%", flexShrink: 0,
                      border: item.enabled ? "none" : `2px solid ${C.border}`,
                      backgroundColor: item.enabled ? C.green : "transparent",
                      cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                      transition: "background-color 0.15s",
                    }}
                  >
                    {item.enabled && (
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>

                  {/* Día */}
                  <span style={{ width: "80px", fontSize: "14px", fontWeight: 500, color: item.enabled ? C.textMain : C.textSub, flexShrink: 0 }}>
                    {DAY_LABELS[day]}
                  </span>

                  {/* Horas */}
                  {item.enabled ? (
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <input
                        type="time" value={item.start}
                        onChange={(e) => handleScheduleChange(day, "start" as ScheduleField, e.target.value)}
                        style={{ padding: "6px 8px", borderRadius: "8px", fontSize: "13px", border: `1px solid ${C.border}`, outline: "none", color: C.textMain, backgroundColor: C.white }}
                      />
                      <span style={{ fontSize: "13px", color: C.textSub }}>a</span>
                      <input
                        type="time" value={item.end}
                        onChange={(e) => handleScheduleChange(day, "end" as ScheduleField, e.target.value)}
                        style={{ padding: "6px 8px", borderRadius: "8px", fontSize: "13px", border: `1px solid ${C.border}`, outline: "none", color: C.textMain, backgroundColor: C.white }}
                      />
                    </div>
                  ) : (
                    <span style={{ fontSize: "13px", color: "#9CA3AF", fontStyle: "italic" }}>No disponible</span>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Feedback */}
      {error && (
        <div style={{ backgroundColor: "#FEE2E2", border: `1px solid ${C.error}`, borderRadius: "8px", padding: "10px 16px", fontSize: "13px", color: C.error, marginTop: "24px" }}>
          {error}
        </div>
      )}
      {saved && (
        <div style={{ backgroundColor: "#E6F4F1", border: `1px solid ${C.green}`, borderRadius: "8px", padding: "10px 16px", fontSize: "13px", color: "#2F8F7A", marginTop: "24px" }}>
          ✓ Horario guardado correctamente.
        </div>
      )}



      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </>
  );
}