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

interface Veterinario { id: number; nombre: string; apellido: string; especialidad?: string; }
interface Slot { id: number; fecha: string; hora_inicio: string; hora_fin: string; dia_nombre: string; }
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
  const [mascotaId,    setMascotaId]    = useState('');
  const [vetId,        setVetId]        = useState('');
  const [slotId,       setSlotId]       = useState('');
  const [servicioId,   setServicioId]   = useState('1');
  const [motivo,       setMotivo]       = useState('');
  const [veterinarios, setVeterinarios] = useState<Veterinario[]>([]);
  const [slots,        setSlots]        = useState<Slot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting,   setSubmitting]   = useState(false);
  const [errors,       setErrors]       = useState<Record<string, string>>({});
  const [apiError,     setApiError]     = useState<string | null>(null);

  const servicios: Servicio[] = [
    { id: 1, nombre: 'Consulta general' },
    { id: 2, nombre: 'Vacunación' },
    { id: 3, nombre: 'Baño y corte' },
    { id: 4, nombre: 'Desparasitación' },
    { id: 5, nombre: 'Cirugía menor' },
  ];

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

  // Cargar mascotas y veterinarios al montar
  useEffect(() => {
    if (mascotas.length > 0 && !mascotaId) setMascotaId(String(mascotas[0].id));
    const loadVets = async () => {
      try {
        const res  = await apiClient.get('/veterinarios/listar');
        const data = Array.isArray(res.data?.data) ? res.data.data : [];
        setVeterinarios(data);
        if (data.length > 0) setVetId(String(data[0].id));
      } catch { /* silencioso */ }
    };
    loadVets();
  }, [mascotas]);

  // Cargar slots cuando cambia el veterinario
  useEffect(() => {
    if (!vetId) return;
    const loadSlots = async () => {
      setLoadingSlots(true);
      setSlots([]);
      setSlotId('');
      try {
        const res  = await apiClient.get(`/agenda/veterinario/${vetId}`);
        const data = Array.isArray(res.data?.data) ? res.data.data : [];
        const disponibles = data.filter((s: Slot & { estado: string }) => s.estado === 'disponible');
        setSlots(disponibles);
        if (disponibles.length > 0) setSlotId(String(disponibles[0].id));
      } catch { /* silencioso */ }
      finally { setLoadingSlots(false); }
    };
    loadSlots();
  }, [vetId]);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!mascotaId)    e.mascota  = 'Selecciona una mascota';
    if (!vetId)        e.vet      = 'Selecciona un veterinario';
    if (!slotId)       e.slot     = 'Selecciona un horario';
    if (!motivo.trim()) e.motivo  = 'El motivo es obligatorio';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleConfirmar = async () => {
    if (!validate()) return;
    const userId = getUserId();
    if (!userId) { setApiError('No se pudo identificar al usuario'); return; }

    const slot = slots.find(s => String(s.id) === slotId);
    if (!slot) { setApiError('Slot no encontrado'); return; }

    setSubmitting(true);
    setApiError(null);
    try {
      await apiClient.post('/citas', {
        id_user:               userId,
        id_mascota:            parseInt(mascotaId),
        id_servicio:           parseInt(servicioId),
        id_veterinario:        parseInt(vetId),
        id_agenda:             parseInt(slotId),
        fecha:                 `${slot.fecha.split('T')[0]}T${slot.hora_inicio}`,
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
      <div style={{ backgroundColor: C.white, borderRadius: '20px', boxShadow: '0 20px 60px rgba(0,0,0,0.15)', padding: '32px', width: '100%', maxWidth: '520px', maxHeight: '90vh', overflowY: 'auto' }}>

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
                {mascotas.map((m) => <option key={m.id} value={String(m.id)}>{m.nombre}</option>)}
              </select>
            )}
            {errors.mascota && <p style={{ fontSize: '11px', color: C.error, margin: 0 }}>{errors.mascota}</p>}
          </Field>

          {/* Veterinario */}
          <Field label="Veterinario">
            {veterinarios.length === 0 ? (
              <p style={{ fontSize: '13px', color: C.textSub }}>Cargando veterinarios...</p>
            ) : (
              <select value={vetId} onChange={(e) => setVetId(e.target.value)} style={inputStyle(!!errors.vet)}>
                {veterinarios.map((v) => (
                  <option key={v.id} value={String(v.id)}>
                    {v.nombre} {v.apellido} {v.especialidad ? `- ${v.especialidad}` : ''}
                  </option>
                ))}
              </select>
            )}
            {errors.vet && <p style={{ fontSize: '11px', color: C.error, margin: 0 }}>{errors.vet}</p>}
          </Field>

          {/* Horario disponible */}
          <Field label="Horario disponible">
            {loadingSlots ? (
              <p style={{ fontSize: '13px', color: C.textSub }}>Cargando horarios...</p>
            ) : slots.length === 0 ? (
              <p style={{ fontSize: '13px', color: C.textSub }}>No hay horarios disponibles para este veterinario.</p>
            ) : (
              <select value={slotId} onChange={(e) => setSlotId(e.target.value)} style={inputStyle(!!errors.slot)}>
                {slots.map((s) => (
                  <option key={s.id} value={String(s.id)}>
                    {s.dia_nombre} {new Date(s.fecha).toLocaleDateString('es-MX')} — {s.hora_inicio.slice(0, 5)} a {s.hora_fin.slice(0, 5)}
                  </option>
                ))}
              </select>
            )}
            {errors.slot && <p style={{ fontSize: '11px', color: C.error, margin: 0 }}>{errors.slot}</p>}
          </Field>

          {/* Servicio */}
          <Field label="Servicio">
            <select value={servicioId} onChange={(e) => setServicioId(e.target.value)} style={inputStyle()}>
              {servicios.map((s) => <option key={s.id} value={String(s.id)}>{s.nombre}</option>)}
            </select>
          </Field>

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
        </div>

        <div style={{ display: 'flex', gap: '10px', marginTop: '24px' }}>
          <button onClick={onClose}
            style={{ flex: 1, padding: '11px', borderRadius: '10px', border: `1px solid ${C.border}`, backgroundColor: C.white, fontSize: '14px', color: C.textSub, cursor: 'pointer' }}>
            Cancelar
          </button>
          <button onClick={handleConfirmar}
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