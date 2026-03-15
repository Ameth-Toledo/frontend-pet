"use client";

import React from "react";
import { useChangePasswordViewModel } from "@/modules/perfil-admin/viewmodel/useChangePasswordViewModel";
import { ChangePasswordModalProps } from "../model/dto/props/ChangePasswordModalProps";

const C = {
  green: "#4F8A7C", greenDark: "#3E6F63", white: "#FFFFFF",
  textMain: "#1F2937", textSub: "#6B7280", border: "#E5E7EB",
  error: "#EF4444", errorBg: "#FEF2F2",
};

function EyeIcon({ open }: { open: boolean }) {
  return open ? (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

function PasswordInput({ label, placeholder, value, onChange, show, onToggleShow, error }: {
  label: string; placeholder: string; value: string;
  onChange: (v: string) => void; show: boolean;
  onToggleShow: () => void; error?: boolean;
}) {
  const [focused, setFocused] = React.useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <label style={{ fontSize: "13px", fontWeight: 600, color: C.textMain }}>{label}</label>
      <div style={{ position: "relative" }}>
        <input
          type={show ? "text" : "password"} placeholder={placeholder} value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          style={{ width: "100%", padding: "10px 42px 10px 13px", borderRadius: "10px", border: `1px solid ${error ? C.error : focused ? C.green : C.border}`, fontSize: "14px", color: C.textMain, backgroundColor: C.white, outline: "none", boxSizing: "border-box" }}
        />
        <button onClick={onToggleShow} type="button" style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: C.textSub, display: "flex", padding: 0 }}>
          <EyeIcon open={show} />
        </button>
      </div>
    </div>
  );
}

export default function ChangePasswordModal({ onClose }: ChangePasswordModalProps) {
  const vm = useChangePasswordViewModel({ onSuccess: onClose });
  const hasError = !!vm.error && (vm.newPassword.length > 0 || vm.confirmPassword.length > 0);

  return (
    <div onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.40)", backdropFilter: "blur(3px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "16px" }}>
      <div style={{ backgroundColor: C.white, borderRadius: "16px", boxShadow: "0 20px 60px rgba(0,0,0,0.18)", padding: "32px 36px", width: "100%", maxWidth: "440px" }}>

        <h2 style={{ fontSize: "20px", fontWeight: 800, color: C.textMain, marginBottom: "8px" }}>Cambiar contraseña</h2>
        <p style={{ fontSize: "13px", color: C.textSub, marginBottom: "28px", lineHeight: 1.6 }}>
          Ingresa tu nueva contraseña para actualizar el acceso a tu cuenta.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "18px", marginBottom: "24px" }}>
          <PasswordInput label="Nueva contraseña" placeholder="Escribe tu nueva contraseña" value={vm.newPassword} onChange={vm.setNewPassword} show={vm.showNew} onToggleShow={() => vm.setShowNew(!vm.showNew)} error={hasError} />
          <PasswordInput label="Confirmar nueva contraseña" placeholder="Repite la contraseña" value={vm.confirmPassword} onChange={vm.setConfirmPassword} show={vm.showConfirm} onToggleShow={() => vm.setShowConfirm(!vm.showConfirm)} error={hasError} />
        </div>

        {hasError && (
          <div style={{ backgroundColor: C.errorBg, border: "1px solid #FECACA", borderRadius: "8px", padding: "10px 14px", fontSize: "13px", color: C.error, marginBottom: "20px" }}>
            {vm.error}
          </div>
        )}

        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "12px" }}>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: "14px", color: C.textSub, fontWeight: 500, cursor: "pointer", padding: "10px 16px" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = C.textMain; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = C.textSub; }}>
            Cancelar
          </button>
          <button onClick={vm.submit} disabled={vm.loading || (!vm.isValid && (vm.newPassword.length > 0 || vm.confirmPassword.length > 0))}
            style={{ backgroundColor: vm.loading ? "#9ECEC6" : C.green, color: C.white, border: "none", borderRadius: "10px", padding: "10px 22px", fontSize: "14px", fontWeight: 700, cursor: vm.loading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", gap: "8px" }}
            onMouseEnter={(e) => { if (!vm.loading) (e.currentTarget as HTMLButtonElement).style.backgroundColor = C.greenDark; }}
            onMouseLeave={(e) => { if (!vm.loading) (e.currentTarget as HTMLButtonElement).style.backgroundColor = C.green; }}>
            {vm.loading && (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" style={{ animation: "spin 0.7s linear infinite" }}>
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
              </svg>
            )}
            {vm.loading ? "Guardando..." : "Guardar cambios"}
          </button>
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}