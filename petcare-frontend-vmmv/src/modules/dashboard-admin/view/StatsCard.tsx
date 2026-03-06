import React from "react";

interface StatsCardProps {
  title: string;
  value: number;
  subtext: string;
  icon: React.ReactNode;
}

export default function StatsCard({ title, value, subtext, icon }: StatsCardProps) {
  const isTrend = subtext.startsWith("+") || subtext.startsWith("-");

  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        border: "1px solid #E5E7EB",
        borderRadius: "16px",
        padding: "28px 32px",
        flex: 1,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        minWidth: 0,
      }}
    >
      <div>
        <p style={{ color: "#6B7280", fontSize: "14px", marginBottom: "8px", fontWeight: 500 }}>
          {title}
        </p>
        <p
          style={{
            color: "#1F2937",
            fontSize: "40px",
            fontWeight: 700,
            lineHeight: 1,
            marginBottom: "12px",
          }}
        >
          {value}
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          {isTrend && (
            <span style={{ color: "#4F8A7C", fontSize: "12px" }}>▲</span>
          )}
          <p
            style={{
              color: isTrend ? "#4F8A7C" : "#6B7280",
              fontSize: "13px",
              fontWeight: isTrend ? 500 : 400,
            }}
          >
            {subtext}
          </p>
        </div>
      </div>
      <div
        style={{
          width: "52px",
          height: "52px",
          borderRadius: "12px",
          backgroundColor: "#E6F4F1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
    </div>
  );
}