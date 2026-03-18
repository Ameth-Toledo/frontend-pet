import React, { useState } from "react";
import { AppointmentsChartProps } from "../model/dto/props/AppointmentsChartProps";

type Periodo = 3 | 6 | 12;

export default function AppointmentsChart({ data }: AppointmentsChartProps) {
  const [periodo,     setPeriodo]     = useState<Periodo>(6);
  const [showOptions, setShowOptions] = useState(false);

  const opciones: { label: string; value: Periodo }[] = [
    { label: 'Últimos 3 meses',  value: 3  },
    { label: 'Últimos 6 meses',  value: 6  },
    { label: 'Últimos 12 meses', value: 12 },
  ];

  const dataFiltrada = data.slice(-periodo);
  const maxVal = Math.max(...dataFiltrada.map((d) => d.count), 1);
  const chartH = 160;
  const barW   = 48;
  const gap    = 20;
  const totalW = dataFiltrada.length * (barW + gap) - gap;

  return (
    <div style={{ flex: 1, backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "16px", padding: "24px 28px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" }}>
        <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#1F2937" }}>Citas por Mes</h3>
        <div style={{ position: "relative" }}>
          <div onClick={() => setShowOptions(!showOptions)}
            style={{ display: "flex", alignItems: "center", gap: "6px", border: "1px solid #E5E7EB", borderRadius: "8px", padding: "5px 12px", fontSize: "12px", color: "#6B7280", cursor: "pointer", userSelect: "none" }}>
            {opciones.find(o => o.value === periodo)?.label}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
          {showOptions && (
            <div style={{ position: "absolute", top: "36px", right: 0, backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "10px", boxShadow: "0 4px 20px rgba(0,0,0,0.1)", zIndex: 10, overflow: "hidden", minWidth: "160px" }}>
              {opciones.map((o) => (
                <div key={o.value} onClick={() => { setPeriodo(o.value); setShowOptions(false); }}
                  style={{ padding: "10px 16px", fontSize: "13px", color: o.value === periodo ? "#4F8A7C" : "#1F2937", fontWeight: o.value === periodo ? 600 : 400, cursor: "pointer", backgroundColor: o.value === periodo ? "#E6F4F1" : "transparent" }}
                  onMouseEnter={(e) => { if (o.value !== periodo) (e.currentTarget as HTMLDivElement).style.backgroundColor = "#F9FAFB"; }}
                  onMouseLeave={(e) => { if (o.value !== periodo) (e.currentTarget as HTMLDivElement).style.backgroundColor = "transparent"; }}>
                  {o.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div style={{ overflowX: "auto" }}>
        <svg width={totalW + 8} height={chartH + 32} viewBox={`0 0 ${totalW + 8} ${chartH + 32}`} style={{ display: "block", margin: "0 auto" }}>
          {dataFiltrada.map((d, i) => {
            const x     = i * (barW + gap);
            const barH  = maxVal > 0 ? (d.count / maxVal) * chartH : 0;
            const y     = chartH - barH;
            const isMax = d.count === maxVal;
            return (
              <g key={d.month}>
                <rect x={x} y={0} width={barW} height={chartH} rx={8} fill="#F3F4F6" />
                <rect x={x} y={y} width={barW} height={barH}   rx={8} fill={isMax ? "#4F8A7C" : "#A8D5CB"} />
                <text x={x + barW / 2} y={chartH + 22} textAnchor="middle" fontSize="11" fill="#9CA3AF" fontFamily="inherit">{d.month}</text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}