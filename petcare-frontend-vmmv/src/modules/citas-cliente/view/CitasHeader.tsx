import React from "react";

const C = {
  textMain: "#1F2937",
  textSub: "#6B7280",
};

export default function CitasHeader() {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" }}>
      <h1 style={{ fontSize: "24px", fontWeight: 800, color: C.textMain }}>Citas</h1>

      {/* User info */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{ textAlign: "right" }}>
          <p style={{ fontSize: "13px", fontWeight: 700, color: C.textMain }}>Juan Pérez</p>
          <p style={{ fontSize: "11px", color: C.textSub }}>Premium Member</p>
        </div>
        <div
          style={{
            width: "38px", height: "38px", borderRadius: "50%",
            backgroundColor: "#D4B896",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "13px", fontWeight: 700, color: "#fff", flexShrink: 0,
          }}
        >
          JP
        </div>
      </div>
    </div>
  );
}