import React, { useRef, useState } from "react";

const C = {
  green: "#4F8A7C",
  greenDark: "#3E6F63",
  greenLight: "#E6F4F1",
  textMain: "#1F2937",
  textSub: "#6B7280",
};

export interface PerfilAvatarProps {
  nombreCompleto: string;
  correoElectronico: string;
  onAvatarChange?: (preview: string) => void;
  onDirty?: () => void;
}

export default function PerfilAvatar({ nombreCompleto, correoElectronico, onAvatarChange, onDirty }: PerfilAvatarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const initials = nombreCompleto
    ? nombreCompleto.trim().split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase()
    : "U";

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result as string;
      setAvatarPreview(result);
      onAvatarChange?.(result);
      onDirty?.();
    };
    reader.readAsDataURL(file);
  };

  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: "28px" }}>

      {/* Avatar */}
      <div style={{ position: "relative", flexShrink: 0 }}>
        <div style={{
          width: "120px", height: "120px", borderRadius: "50%",
          backgroundColor: C.greenLight,
          border: `3px solid ${C.green}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          overflow: "hidden",
          boxShadow: "0 4px 20px rgba(79,138,124,0.15)",
        }}>
          {avatarPreview
            ? <img src={avatarPreview} alt="avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            : <span style={{ fontSize: "44px", fontWeight: 700, color: C.green }}>{initials}</span>
          }
        </div>

        <button
          onClick={() => fileInputRef.current?.click()}
          title="Cambiar foto"
          style={{
            position: "absolute", bottom: 2, right: 2,
            width: "30px", height: "30px", borderRadius: "50%",
            backgroundColor: C.green, border: "2.5px solid white",
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
            transition: "background-color 0.15s",
          }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = C.greenDark)}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = C.green)}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
            <circle cx="12" cy="13" r="4" />
          </svg>
        </button>
        <input ref={fileInputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleFileChange} />
      </div>

      {/* Identidad */}
      <div style={{ paddingBottom: "6px" }}>
        <h2 style={{ fontSize: "22px", fontWeight: 700, color: C.textMain, margin: "0 0 4px 0" }}>
          {nombreCompleto || "Sin nombre"}
        </h2>
        <p style={{ fontSize: "13px", color: C.textSub, margin: "0 0 12px 0" }}>
          {correoElectronico || "Sin correo"}
        </p>
        <span style={{
          display: "inline-flex", alignItems: "center", gap: "6px",
          padding: "3px 12px", borderRadius: "20px",
          fontSize: "11px", fontWeight: 600,
          backgroundColor: C.greenLight, color: C.green,
        }}>
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: C.green }} />
          Activo
        </span>
      </div>
    </div>
  );
}