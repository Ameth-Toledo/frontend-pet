import React from "react";

const C = {
  green: "#4F8A7C",
  greenDark: "#3E6F63",
  white: "#FFFFFF",
  textMain: "#1F2937",
  textSub: "#6B7280",
  border: "#E5E7EB",
  error: "#EF4444",
};

interface VetChangePasswordModalProps {
  onClose: () => void;
  newPassword: string;
  setNewPassword: (v: string) => void;
  confirmPassword: string;
  setConfirmPassword: (v: string) => void;
  passwordError: string | null;
  passwordSaving: boolean;
  onSubmit: () => void;
}

export default function VetChangePasswordModal({
  onClose, newPassword, setNewPassword, confirmPassword, setConfirmPassword,
  passwordError, passwordSaving, onSubmit,
}: VetChangePasswordModalProps) {
  const [showNew, setShowNew] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);

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

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        display: "flex", alignItems: "center", justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.42)",
        backdropFilter: "blur(3px)",
      }}
    >
      <div
        style={{
          backgroundColor: C.white,
          borderRadius: "18px",
          width: "100%", maxWidth: "440px",
          padding: "36px 36px 28px",
          boxShadow: "0 20px 48px rgba(0,0,0,0.18)",
          boxSizing: "border-box",
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: "24px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: 700, color: C.textMain, marginBottom: "6px" }}>
            Cambiar contraseña
          </h2>
          <p style={{ fontSize: "13px", color: C.textSub }}>
            Ingresa y confirma tu nueva contraseña.
          </p>
        </div>

        {/* Nueva contraseña */}
        <div style={{ marginBottom: "16px" }}>
          <label style={{ fontSize: "13px", fontWeight: 600, color: C.textSub, display: "block", marginBottom: "6px" }}>
            Nueva contraseña
          </label>
          <div style={{ position: "relative" }}>
            <input
              type={showNew ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              style={{
                width: "100%", boxSizing: "border-box",
                padding: "10px 40px 10px 14px",
                borderRadius: "8px", border: `1px solid ${C.border}`,
                fontSize: "14px", color: C.textMain, outline: "none",
              }}
            />
            <button
              type="button"
              onClick={() => setShowNew((v) => !v)}
              style={{
                position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)",
                background: "none", border: "none", cursor: "pointer", padding: "2px", display: "flex",
              }}
            >
              <EyeIcon open={showNew} />
            </button>
          </div>
        </div>

        {/* Confirmar contraseña */}
        <div style={{ marginBottom: "20px" }}>
          <label style={{ fontSize: "13px", fontWeight: 600, color: C.textSub, display: "block", marginBottom: "6px" }}>
            Confirmar contraseña
          </label>
          <div style={{ position: "relative" }}>
            <input
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{
                width: "100%", boxSizing: "border-box",
                padding: "10px 40px 10px 14px",
                borderRadius: "8px", border: `1px solid ${C.border}`,
                fontSize: "14px", color: C.textMain, outline: "none",
              }}
            />
            <button
              type="button"
              onClick={() => setShowConfirm((v) => !v)}
              style={{
                position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)",
                background: "none", border: "none", cursor: "pointer", padding: "2px", display: "flex",
              }}
            >
              <EyeIcon open={showConfirm} />
            </button>
          </div>
        </div>

        {/* Error */}
        {passwordError && (
          <div
            style={{
              backgroundColor: "#FEE2E2", border: `1px solid ${C.error}`,
              borderRadius: "8px", padding: "10px 14px",
              fontSize: "13px", color: C.error, marginBottom: "20px",
            }}
          >
            {passwordError}
          </div>
        )}

        {/* Actions */}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
          <button
            onClick={onClose}
            style={{
              background: "none", border: `1px solid ${C.border}`,
              borderRadius: "8px", padding: "9px 18px",
              fontSize: "14px", fontWeight: 500, color: C.textSub, cursor: "pointer",
            }}
            onMouseEnter={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor = C.textSub; }}
            onMouseLeave={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor = C.border; }}
          >
            Cancelar
          </button>
          <button
            onClick={onSubmit}
            disabled={passwordSaving}
            style={{
              backgroundColor: passwordSaving ? "#9ECEC6" : C.green, color: C.white,
              border: "none", borderRadius: "8px", padding: "9px 20px",
              fontSize: "14px", fontWeight: 700, cursor: passwordSaving ? "not-allowed" : "pointer",
            }}
            onMouseEnter={(e) => { if (!passwordSaving) (e.currentTarget as HTMLButtonElement).style.backgroundColor = C.greenDark; }}
            onMouseLeave={(e) => { if (!passwordSaving) (e.currentTarget as HTMLButtonElement).style.backgroundColor = C.green; }}
          >
            {passwordSaving ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </div>
    </div>
  );
}
