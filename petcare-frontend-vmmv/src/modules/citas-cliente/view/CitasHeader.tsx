import React from "react";

const C = {
  textMain: "#1F2937",
};

export default function CitasHeader() {
  return (
    <div style={{ marginBottom: "28px" }}>
      <h1
        style={{
          fontSize: "24px",
          fontWeight: 800,
          color: C.textMain,
        }}
      >
        Citas
      </h1>
    </div>
  );
}