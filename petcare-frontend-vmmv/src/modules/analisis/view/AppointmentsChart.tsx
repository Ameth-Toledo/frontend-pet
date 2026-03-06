import React from "react";
import { AppointmentsByMonthUI } from "../model/metrics.ui.model";

interface AppointmentsChartProps {
  data: AppointmentsByMonthUI[];
}

export default function AppointmentsChart({ data }: AppointmentsChartProps) {
  const maxVal = Math.max(...data.map((d) => d.count));
  const chartH = 160;
  const barW = 48;
  const gap = 20;
  const totalW = data.length * (barW + gap) - gap;

  return (
    <div
      style={{
        flex: 1,
        backgroundColor: "#FFFFFF",
        border: "1px solid #E5E7EB",
        borderRadius: "16px",
        padding: "24px 28px",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" }}>
        <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#1F2937" }}>Citas por Mes</h3>
        <div
          style={{
            display: "flex", alignItems: "center", gap: "6px",
            border: "1px solid #E5E7EB", borderRadius: "8px",
            padding: "5px 12px", fontSize: "12px", color: "#6B7280",
            cursor: "pointer", userSelect: "none",
          }}
        >
          Últimos 6 meses
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>

      {/* SVG chart */}
      <div style={{ overflowX: "auto" }}>
        <svg
          width={totalW + 8}
          height={chartH + 32}
          viewBox={`0 0 ${totalW + 8} ${chartH + 32}`}
          style={{ display: "block", margin: "0 auto" }}
        >
          {data.map((d, i) => {
            const x = i * (barW + gap);
            const barH = (d.count / maxVal) * chartH;
            const y = chartH - barH;

            const isMax = d.count === maxVal;

            return (
              <g key={d.month}>
                {/* Background bar (light) */}
                <rect
                  x={x}
                  y={0}
                  width={barW}
                  height={chartH}
                  rx={8}
                  fill="#F3F4F6"
                />
                {/* Foreground bar */}
                <rect
                  x={x}
                  y={y}
                  width={barW}
                  height={barH}
                  rx={8}
                  fill={isMax ? "#4F8A7C" : "#A8D5CB"}
                />
                {/* Month label */}
                <text
                  x={x + barW / 2}
                  y={chartH + 22}
                  textAnchor="middle"
                  fontSize="11"
                  fill="#9CA3AF"
                  fontFamily="inherit"
                >
                  {d.month}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}