import React from "react";
import { VetChangePasswordModalProps } from "../model/dto/props/VetChangePasswordModalProps";

const C = {
  green: "#4F8A7C", greenDark: "#3E6F63", white: "#FFFFFF",
  textMain: "#1F2937", textSub: "#6B7280", border: "#E5E7EB", error: "#EF4444",
};

const EyeIcon = ({ open }: { open: boolean }) => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke={C.textSub} strokeWidth="2">
    {open ? (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </>
    ) : (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
      </>
    )}
  </svg>
);

const PasswordField = ({ label, value, onChange, show, onToggle }: {
  label: string; value: string; onChange: (v: string) => void;
  show: boolean; onToggle: () => void;
}) => (
  <div style={{ marginBottom: "16px" }}>
    <label style={{ fontSize: "13px", fontWeight: 600, color: C.textSub, display: "block", marginBottom: "6px" }}>{label}</label>
    <div style={{ position: "relative" }}>
      <input type={show ? "text" : "password"} value={value} onChange={(e) => onChange(e.target.value)}
        style={{ width: "100%", boxSizing: "border-box", padding: "10px 40px 10px 14px", borderRadius: "8px", border: `1px solid ${C.border}`, fontSize: "14px", color: C.textMain, outline: "none" }} />
      <button type="button" onClick={onToggle}
        style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", padding: "2px", display: "flex" }}>
        <EyeIcon open={show} />
      </button>
    </div>
  </div>
);

export default function VetChangePasswordModal({
  onClose, currentPassword, setCurrentPassword,
  newPassword, setNewPassword, confirmPassword, setConfirmPassword,
  passwordError, passwordSaving, onSubmit,
}: VetChangePasswordModalProps) {
  const [showCurrent, setShowCurrent] = React.useState(false);
  const [showNew,     setShowNew]     = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "rgba(0,0,0,0.42)", backdropFilter: "blur(3px)" }}>
      <div style={{ backgroundColor: C.white, borderRadius: "18px", width: "100%", maxWidth: "440px", padding: "36px 36px 28px", boxShadow: "0 20px 48px rgba(0,0,0,0.18)", boxSizing: "border-box" }}>

        <div style={{ marginBottom: "24px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: 700, color: C.textMain, marginBottom: "6px" }}>Cambiar contraseña</h2>
          <p style={{ fontSize: "13px", color: C.textSub }}>Ingresa tu contraseña actual y la nueva contraseña.</p>
        </div>

        <PasswordField label="Contraseña actual"    value={currentPassword} onChange={setCurrentPassword} show={showCurrent} onToggle={() => setShowCurrent(v => !v)} />
        <PasswordField label="Nueva contraseña"     value={newPassword}     onChange={setNewPassword}     show={showNew}     onToggle={() => setShowNew(v => !v)} />
        <PasswordField label="Confirmar contraseña" value={confirmPassword} onChange={setConfirmPassword} show={showConfirm} onToggle={() => setShowConfirm(v => !v)} />

        {passwordError && (
          <div style={{ backgroundColor: "#FEE2E2", border: `1px solid ${C.error}`, borderRadius: "8px", padding: "10px 14px", fontSize: "13px", color: C.error, marginBottom: "20px" }}>
            {passwordError}
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
          <button onClick={onClose}
            style={{ background: "none", border: `1px solid ${C.border}`, borderRadius: "8px", padding: "9px 18px", fontSize: "14px", fontWeight: 500, color: C.textSub, cursor: "pointer" }}>
            Cancelar
          </button>
          <button onClick={onSubmit} disabled={passwordSaving}
            style={{ backgroundColor: passwordSaving ? "#9ECEC6" : C.green, color: C.white, border: "none", borderRadius: "8px", padding: "9px 20px", fontSize: "14px", fontWeight: 700, cursor: passwordSaving ? "not-allowed" : "pointer" }}
            onMouseEnter={(e) => { if (!passwordSaving) (e.currentTarget as HTMLButtonElement).style.backgroundColor = C.greenDark; }}
            onMouseLeave={(e) => { if (!passwordSaving) (e.currentTarget as HTMLButtonElement).style.backgroundColor = C.green; }}>
            {passwordSaving ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </div>
    </div>
  );
}