"use client";

import React from "react";
import { PacienteHistorialModalProps } from "../model/dto/props/PacienteHistorialModalProps";

interface CitaHistorial {
  fecha: string;
  titulo: string;
  observaciones: string;
  doctor: string;
}

interface Vacuna {
  nombre: string;
  fechaAplicacion: string;
}

const mockHistorial: Record<string, { citas: CitaHistorial[]; vacunas: Vacuna[] }> = {
  "PAC-001": {
    citas: [
      { fecha: "15 DIC 2023", titulo: "Chequeo General Preventivo",    observaciones: "Se realiza examen físico completo. El paciente presenta excelente condición corporal (3/5). Se observa dentadura limpia y encías sanas. El pelaje está brillante sin presencia de ectoparásitos. Frecuencia cardíaca y respiratoria dentro de los rangos normales.", doctor: "Dr. Alejandro Ruiz"   },
      { fecha: "22 OCT 2023", titulo: "Tratamiento Dermatológico",     observaciones: "Consulta por prurito intenso en zona abdominal y patas. Se diagnostica dermatitis alérgica estacional. Se receta shampoo medicado y dieta hipoalergénica por 15 días. Se recomienda evitar paseos en zonas con pasto recién cortado.",                              doctor: "Dra. Elena Martínez" },
      { fecha: "10 AGO 2023", titulo: "Vacunación Anual",              observaciones: "Se aplican refuerzos del esquema anual. Paciente tranquilo durante el procedimiento. Sin reacciones adversas al momento de la consulta. Se recomienda observar durante 24 horas.",                                                                                      doctor: "Dr. Alejandro Ruiz"   },
    ],
    vacunas: [
      { nombre: "Antirrábica",                fechaAplicacion: "15 Ene 2024" },
      { nombre: "Séxtuple Canina (DHPPI+L)", fechaAplicacion: "12 Dic 2023" },
      { nombre: "Bordetella",                 fechaAplicacion: "10 Oct 2023" },
      { nombre: "Giardia",                    fechaAplicacion: "15 Ago 2023" },
      { nombre: "Refuerzo Anual Polivalente", fechaAplicacion: "20 Jun 2023" },
    ],
  },
  "PAC-002": {
    citas: [
      { fecha: "05 ENE 2024", titulo: "Consulta Dermatológica",  observaciones: "Lesiones eritematosas en región dorsal. Se toman muestras para cultivo micológico. Se inicia tratamiento con itraconazol oral. Control programado en 3 semanas.",                                                   doctor: "Dra. Elena Martínez" },
      { fecha: "15 NOV 2023", titulo: "Chequeo Anual Felino",    observaciones: "Control de rutina. Peso estable en 4.1 kg. Cavidad oral en buen estado. Se actualiza esquema vacunal. Comportamiento tranquilo durante la consulta.",                                                               doctor: "Dr. Alejandro Ruiz"   },
      { fecha: "20 SEP 2023", titulo: "Desparasitación Interna", observaciones: "Administración de antiparasitario de amplio espectro. Propietario reporta pérdida leve de apetito previa. Se recomienda dieta blanda por 48 horas y control en 30 días.",                                         doctor: "Dra. Elena Martínez" },
    ],
    vacunas: [
      { nombre: "Triple Felina (HHC)",    fechaAplicacion: "15 Nov 2023" },
      { nombre: "Leucemia Felina (FeLV)", fechaAplicacion: "10 Sep 2023" },
      { nombre: "Rabia Felina",           fechaAplicacion: "15 Nov 2023" },
    ],
  },
  "PAC-003": {
    citas: [
      { fecha: "02 FEB 2024", titulo: "Revisión Post-Operatoria", observaciones: "Control tras esterilización. Herida cicatrizando correctamente. Puntos en buen estado. Se retiran las suturas y se recomienda reposo durante 72 horas adicionales.",                         doctor: "Dr. Alejandro Ruiz"   },
      { fecha: "08 DIC 2023", titulo: "Consulta Oftalmológica",   observaciones: "Secreción ocular bilateral. Se diagnostica conjuntivitis bacteriana. Se prescribe colirio antibiótico 3 veces al día por 7 días. Seguimiento en 2 semanas.",                               doctor: "Dra. Elena Martínez" },
      { fecha: "05 OCT 2023", titulo: "Chequeo General",          observaciones: "Examen de rutina. Ligero sobrepeso detectado (condición corporal 4/5). Se recomienda ajuste en dieta y ejercicio moderado diario.",                                                        doctor: "Dr. Alejandro Ruiz"   },
    ],
    vacunas: [
      { nombre: "Séxtuple Canina (DHPPI+L)", fechaAplicacion: "08 Dic 2023" },
      { nombre: "Antirrábica",               fechaAplicacion: "05 Oct 2023" },
      { nombre: "Refuerzo Anual Polivalente", fechaAplicacion: "12 Jul 2023" },
    ],
  },
  "PAC-004": {
    citas: [
      { fecha: "20 ENE 2024", titulo: "Tratamiento Ortopédico", observaciones: "Cojera en extremidad anterior izquierda. Radiografías sin fracturas visibles. Diagnóstico: esguince leve. Reposo relativo por 10 días y antiinflamatorios durante 5 días.",                   doctor: "Dr. Alejandro Ruiz"   },
      { fecha: "12 DIC 2023", titulo: "Control Nutricional",    observaciones: "Evaluación de composición corporal. Peso: 32 kg. Plan nutricional ajustado con reducción calórica del 15%. Se recomienda ejercicio cardiovascular suave.",                                     doctor: "Dra. Elena Martínez" },
      { fecha: "18 OCT 2023", titulo: "Desparasitación y Chequeo", observaciones: "Aplicación de antiparasitario externo y pautas de desparasitación interna. Examen físico general sin hallazgos patológicos. Programar control semestral.",                                 doctor: "Dr. Alejandro Ruiz"   },
    ],
    vacunas: [
      { nombre: "Antirrábica",               fechaAplicacion: "20 Ene 2024" },
      { nombre: "Séxtuple Canina (DHPPI+L)", fechaAplicacion: "12 Dic 2023" },
      { nombre: "Bordetella",                fechaAplicacion: "18 Oct 2023" },
      { nombre: "Leptospirosis",             fechaAplicacion: "05 Ago 2023" },
    ],
  },
  "PAC-005": {
    citas: [
      { fecha: "10 FEB 2024", titulo: "Consulta Digestiva",          observaciones: "Vómitos intermitentes durante 3 días. Ecografía abdominal sin alteraciones significativas. Se prescribe dieta digestiva y protector gástrico. Mejoría esperada en 48-72 horas.",         doctor: "Dra. Elena Martínez" },
      { fecha: "05 ENE 2024", titulo: "Control de Peso y Nutrición", observaciones: "Paciente con tendencia al sobrepeso. Peso actual: 5.2 kg. Se ajusta ración diaria y se sugiere alimentación de bajo contenido calórico. Revisión mensual.",                              doctor: "Dr. Alejandro Ruiz"   },
      { fecha: "20 NOV 2023", titulo: "Chequeo Gerontológico",       observaciones: "Examen anual en paciente mayor. Función renal y hepática dentro de parámetros normales. Ligero desgaste dental. Se programa limpieza dental para próximo trimestre.",                   doctor: "Dra. Elena Martínez" },
    ],
    vacunas: [
      { nombre: "Triple Felina (HHC)",    fechaAplicacion: "05 Ene 2024" },
      { nombre: "Leucemia Felina (FeLV)", fechaAplicacion: "20 Nov 2023" },
      { nombre: "Rabia Felina",           fechaAplicacion: "05 Ene 2024" },
      { nombre: "Panleucopenia Felina",   fechaAplicacion: "10 Sep 2023" },
    ],
  },
  "PAC-006": {
    citas: [
      { fecha: "28 ENE 2024", titulo: "Revisión Respiratoria",        observaciones: "Consulta por dificultad respiratoria leve. Auscultación con ligero estridor. Se solicita radiografía torácica. Diagnóstico preliminar: braquicefalia con compromiso leve. Manejo conservador.", doctor: "Dr. Alejandro Ruiz"   },
      { fecha: "10 DIC 2023", titulo: "Cirugía Hernia Umbilical",     observaciones: "Corrección quirúrgica de hernia umbilical pequeña. Procedimiento sin complicaciones. Alta el mismo día. Antibioticoterapia profiláctica por 5 días. Control en 10 días.",               doctor: "Dra. Elena Martínez" },
      { fecha: "15 OCT 2023", titulo: "Chequeo General Preventivo",   observaciones: "Evaluación de rutina semestral. Sin hallazgos relevantes. Piel y pelaje en buen estado. Se recomienda limpieza facial regular debido a pliegues cutáneos faciales.",                    doctor: "Dr. Alejandro Ruiz"   },
    ],
    vacunas: [
      { nombre: "Antirrábica",               fechaAplicacion: "15 Oct 2023" },
      { nombre: "Séxtuple Canina (DHPPI+L)", fechaAplicacion: "10 Dic 2023" },
      { nombre: "Bordetella",                fechaAplicacion: "15 Oct 2023" },
    ],
  },
};

const defaultHistorial = {
  citas: [
    { fecha: "15 DIC 2023", titulo: "Chequeo General Preventivo", observaciones: "Examen físico completo sin hallazgos patológicos. Paciente en buen estado general. Se programan controles de rutina.",                    doctor: "Dr. Alejandro Ruiz"   },
    { fecha: "22 OCT 2023", titulo: "Consulta de Rutina",         observaciones: "Control periódico. Sin novedades clínicas. Se actualiza historial y se recomienda mantener hábitos actuales.",                             doctor: "Dra. Elena Martínez" },
    { fecha: "10 AGO 2023", titulo: "Vacunación Anual",           observaciones: "Esquema vacunal actualizado. Sin reacciones adversas durante la consulta.",                                                                 doctor: "Dr. Alejandro Ruiz"   },
  ],
  vacunas: [
    { nombre: "Vacuna Polivalente", fechaAplicacion: "15 Dic 2023" },
    { nombre: "Antirrábica",        fechaAplicacion: "22 Oct 2023" },
  ],
};

export default function PacienteHistorialModal({ paciente, onClose }: PacienteHistorialModalProps) {
  const data = mockHistorial[paciente.id] ?? defaultHistorial;

  return (
    <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.4)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }} onClick={onClose}>
      <div style={{ backgroundColor: "#FFFFFF", borderRadius: "16px", width: "100%", maxWidth: "640px", maxHeight: "88vh", overflowY: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.18)" }} onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div style={{ padding: "24px 28px 16px", borderBottom: "1px solid #F3F4F6", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, backgroundColor: "#FFFFFF", zIndex: 1, borderRadius: "16px 16px 0 0" }}>
          <div>
            <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#1F2937", marginBottom: "2px" }}>{paciente.nombre}</h2>
            <p style={{ fontSize: "13px", color: "#6B7280" }}>{paciente.especieLabel} · {paciente.raza} · {paciente.propietario}</p>
          </div>
          <button onClick={onClose} style={{ width: "32px", height: "32px", borderRadius: "8px", border: "none", backgroundColor: "#F3F4F6", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#6B7280" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: "24px 28px" }}>
          <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#1F2937", marginBottom: "20px" }}>Historial Clínico</h3>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {data.citas.map((cita, i) => (
              <div key={i} style={{ display: "flex", gap: "16px", paddingBottom: i < data.citas.length - 1 ? "20px" : "0" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                  <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#4F8A7C", marginTop: "6px" }} />
                  {i < data.citas.length - 1 && (
                    <div style={{ width: "2px", flex: 1, backgroundColor: "#E6F4F1", marginTop: "6px" }} />
                  )}
                </div>
                <div style={{ flex: 1, border: "1px solid #F3F4F6", borderRadius: "12px", padding: "16px 20px" }}>
                  <p style={{ fontSize: "11px", fontWeight: 700, color: "#4F8A7C", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: "4px" }}>{cita.fecha}</p>
                  <h4 style={{ fontSize: "15px", fontWeight: 700, color: "#1F2937", marginBottom: "14px" }}>{cita.titulo}</h4>
                  <p style={{ fontSize: "11px", fontWeight: 700, color: "#4F8A7C", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: "6px" }}>Observaciones</p>
                  <p style={{ fontSize: "13px", color: "#4B5563", lineHeight: "1.65", marginBottom: "14px" }}>{cita.observaciones}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
                      <rect x="9" y="2" width="6" height="4" rx="1" /><path d="M4 6h16v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6z" />
                    </svg>
                    <span style={{ fontSize: "12px", color: "#6B7280" }}>{cita.doctor}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Vacunas */}
          <div style={{ marginTop: "32px" }}>
            <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#1F2937", marginBottom: "16px" }}>Vacunas Aplicadas</h3>
            <div style={{ border: "1px solid #E5E7EB", borderRadius: "12px", overflow: "hidden" }}>
              <div style={{ display: "flex", padding: "10px 20px", borderBottom: "1px solid #E5E7EB", backgroundColor: "#FAFAFA" }}>
                <span style={{ flex: 1, fontSize: "11px", fontWeight: 700, color: "#9CA3AF", letterSpacing: "0.07em", textTransform: "uppercase" }}>Nombre de la Vacuna</span>
                <span style={{ fontSize: "11px", fontWeight: 700, color: "#9CA3AF", letterSpacing: "0.07em", textTransform: "uppercase" }}>Fecha de Aplicación</span>
              </div>
              {data.vacunas.map((v, i) => (
                <div key={i} style={{ display: "flex", padding: "14px 20px", borderBottom: i < data.vacunas.length - 1 ? "1px solid #F3F4F6" : "none", alignItems: "center" }}>
                  <span style={{ flex: 1, fontSize: "14px", fontWeight: 500, color: "#1F2937" }}>{v.nombre}</span>
                  <span style={{ fontSize: "14px", color: "#6B7280" }}>{v.fechaAplicacion}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: "16px 28px 24px", display: "flex", justifyContent: "flex-end" }}>
          <button onClick={onClose} style={{ backgroundColor: "#4F8A7C", color: "#FFFFFF", border: "none", borderRadius: "10px", padding: "10px 28px", fontSize: "14px", fontWeight: 600, cursor: "pointer" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#3E6F63"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#4F8A7C"; }}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}