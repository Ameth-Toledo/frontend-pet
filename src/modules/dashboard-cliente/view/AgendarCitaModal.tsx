'use client';
import React, { useState, useEffect } from 'react';
import { apiClient } from '@/lib/axios';
import { MascotaUI } from '@/modules/mascotas-cliente/model/ui.model';

interface AgendarCitaModalProps {
  onClose: () => void;
  onAgendarSuccess: () => void;
  mascotas: MascotaUI[];
}

const C = {
  green: '#5BAA9C', greenDark: '#4A9488', greenLight: '#E6F4F1',
  white: '#FFFFFF', textMain: '#1F2937', textSub: '#6B7280',
  border: '#E5E7EB', error: '#EF4444',
};

const HORARIOS = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '15:00', '15:30', '16:00', '16:30'];

interface Servicio { id: number; nombre: string; }

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <label style={{ fontSize: '13px', fontWeight: 600, color: C.textMain }}>{label}</label>
      {children}
    </div>
  );
}

export default function AgendarCitaModal({ onClose, onAgendarSuccess, mascotas }: AgendarCitaModalProps) {
  const [mascotaId,   setMascotaId]   = useState('');
  const [servicioId,  setServicioId]  = useState('');
  const [fecha,       setFecha]       = useState('');
  const [hora,        setHora]        = useState(HORARIOS[0]);
  const [motivo,      setMotivo]      = useState('');
  const [servicios,   setServicios]   = useState<Servicio[]>([]);
  const [submitting,  setSubmitting]  = useState(false);
  const [errors,      setErrors]      = useState<Record<string, string>>({});
  const [apiError,    setApiError]    = useState<string | null>(null);

  useEffect(() => {
    if (mascotas.length > 0 && !mascotaId) {
      setMascotaId(String(mascotas[0].id));
    }
  }, [mascotas]);

  useEffect(() => {
    // Servicios hardcoded por ahora — no hay endpoint de servicios
    setServicios([
      { id: 1, nombre: 'Consulta General' },
      { id: 2, nombre: 'Vacunación' },
      { id: 3, nombre: 'Desparasitación' },
      { id: 4, nombre: 'Cirugía' },
    ]);
    setServicioId('1');
  }, []);

  const getUserId = (): number | null => {
    try {
      const stored = localStorage.getItem('user');
      return stored ? JSON.parse(stored).id : null;
    } catch { return null; }
  };

  const inputStyle = (hasError?: boolean) => ({
    padding: '10px 13px', borderRadius: '10px',
    border: `1px solid ${hasError ? C.error : C.border}`,
    fontSize: '13px', color: C.textMain, outline: 'none',
    width: '100%', boxSizing: 'border-box' as const,
    backgroundColor: C.white,
  });

  const validate = () => {
    const e: Record<string, string> = {};
    if (!mascotaId)     e.mascota  = 'Selecciona una mascota';
    if (!servicioId)    e.servicio = 'Selecciona un servicio';
    if (!fecha)         e.fecha    = 'Selecciona una fecha';
    if (!motivo.trim()) e.motivo   = 'El motivo es obligatorio';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleConfirmar = async () => {
    if (!validate()) return;
    const userId = getUserId();
    if (!userId) { setApiError('No se pudo identificar al usuario'); return; }

    setSubmitting(true);
    setApiError(null);
    try {
      await apiClient.post('/citas', {
        id_user:               userId,
        id_mascota:            parseInt(mascotaId),
        id_servicio:           parseInt(servicioId),
        id_agenda:             null, 
        fecha:                 `${fecha}T${hora}:00`,
        observaciones_cliente: motivo,
      });
      onAgendarSuccess();
      onClose();
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { error?: string } } })?.response?.data?.error;
      setApiError(msg ?? 'Error al crear la cita');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '16px' }}>
      <div style={{ backgroundColor: C.white, borderRadius: '20px', boxShadow: '0 20px 60px rgba(0,0,0,0.15)', padding: '32px', width: '100%', maxWidth: '480px' }}>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: C.textMain, margin: 0 }}>Agendar cita</h2>
            <p style={{ fontSize: '13px', color: C.textSub, margin: '4px 0 0 0' }}>Programa una cita para tu mascota</p>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '20px', color: C.textSub, cursor: 'pointer' }}>✕</button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {/* Mascota */}
          <Field label="Mascota">
            {mascotas.length === 0 ? (
              <p style={{ fontSize: '13px', color: C.textSub }}>No tienes mascotas registradas.</p>
            ) : (
              <select value={mascotaId} onChange={(e) => setMascotaId(e.target.value)} style={inputStyle(!!errors.mascota)}>
                {mascotas.map((m) => (
                  <option key={m.id} value={String(m.id)}>{m.nombre}</option>
                ))}
              </select>
            )}
            {errors.mascota && <p style={{ fontSize: '11px', color: C.error, margin: 0 }}>{errors.mascota}</p>}
          </Field>

          {/* Servicio */}
          <Field label="Servicio">
            <select value={servicioId} onChange={(e) => setServicioId(e.target.value)} style={inputStyle(!!errors.servicio)}>
              {servicios.map((s) => (
                <option key={s.id} value={String(s.id)}>{s.nombre}</option>
              ))}
            </select>
            {errors.servicio && <p style={{ fontSize: '11px', color: C.error, margin: 0 }}>{errors.servicio}</p>}
          </Field>

          {/* Fecha y Hora */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <Field label="Fecha">
              <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} style={inputStyle(!!errors.fecha)} />
              {errors.fecha && <p style={{ fontSize: '11px', color: C.error, margin: 0 }}>{errors.fecha}</p>}
            </Field>
            <Field label="Hora">
              <select value={hora} onChange={(e) => setHora(e.target.value)} style={inputStyle()}>
                {HORARIOS.map((h) => <option key={h} value={h}>{h}</option>)}
              </select>
            </Field>
          </div>

          {/* Motivo */}
          <Field label="Motivo de la consulta">
            <textarea value={motivo} onChange={(e) => setMotivo(e.target.value)}
              placeholder="Ej. Vacunación anual, revisión general..." rows={3}
              style={{ ...inputStyle(!!errors.motivo), resize: 'none', fontFamily: 'inherit' }} />
            {errors.motivo && <p style={{ fontSize: '11px', color: C.error, margin: 0 }}>{errors.motivo}</p>}
          </Field>

          {/* API Error */}
          {apiError && (
            <div style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '10px', padding: '10px 14px', fontSize: '13px', color: C.error }}>
              {apiError}
            </div>
          )}

          <div style={{ backgroundColor: C.greenLight, borderRadius: '10px', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="2">
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <p style={{ fontSize: '12px', color: C.green, margin: 0 }}>
              Un veterinario disponible será asignado automáticamente.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', marginTop: '24px' }}>
          <button onClick={onClose}
            style={{ flex: 1, padding: '11px', borderRadius: '10px', border: `1px solid ${C.border}`, backgroundColor: C.white, fontSize: '14px', color: C.textSub, cursor: 'pointer' }}>
            Cancelar
          </button>
          <button
            onClick={handleConfirmar}
            disabled={mascotas.length === 0 || submitting}
            style={{ flex: 2, padding: '11px', borderRadius: '10px', border: 'none', backgroundColor: C.green, color: C.white, fontSize: '14px', fontWeight: 600, cursor: (mascotas.length === 0 || submitting) ? 'not-allowed' : 'pointer', opacity: (mascotas.length === 0 || submitting) ? 0.6 : 1 }}
            onMouseEnter={(e) => { if (mascotas.length > 0 && !submitting) (e.currentTarget as HTMLButtonElement).style.backgroundColor = C.greenDark; }}
            onMouseLeave={(e) => { if (mascotas.length > 0 && !submitting) (e.currentTarget as HTMLButtonElement).style.backgroundColor = C.green; }}>
            {submitting ? 'Agendando...' : 'Confirmar cita'}
          </button>
        </div>
      </div>
    </div>
  );
}