import React from "react";
import { VetStatsCardProps } from "../model/dto/props/VetStatsCardProps";

export default function VetStatsCard({ title, value, subtext, icon, valueSize }: VetStatsCardProps) {
  const isTrend = typeof subtext === "string" && (subtext.startsWith("+") || subtext.startsWith("-"));
  return (
    <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "16px", padding: "20px 24px", flex: 1, display: "flex", alignItems: "flex-start", justifyContent: "space-between", minWidth: 0 }}>
      <div>
        <p style={{ color: "#6B7280", fontSize: "13px", marginBottom: "8px", fontWeight: 500 }}>{title}</p>
        <p style={{ color: "#1F2937", fontSize: valueSize ?? "28px", fontWeight: 700, lineHeight: 1, marginBottom: "8px" }}>{value}</p>
        <p style={{ color: isTrend ? "#4F8A7C" : "#6B7280", fontSize: "12px", margin: 0 }}>{subtext}</p>
      </div>
      <div style={{ width: "44px", height: "44px", borderRadius: "12px", backgroundColor: "#E6F4F1", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        {icon}
      </div>
    </div>
  );
}