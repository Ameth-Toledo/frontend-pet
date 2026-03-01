import { CitaDTO } from "./dto";
import { CitaUI } from "./ui.model";

const DIAS: Record<number, string> = {
  0: "DOMINGO",
  1: "LUNES",
  2: "MARTES",
  3: "MIÉRCOLES",
  4: "JUEVES",
  5: "VIERNES",
  6: "SÁBADO",
};

const MESES: Record<number, string> = {
  0:  "ENE", 1:  "FEB", 2:  "MAR", 3:  "ABR",
  4:  "MAY", 5:  "JUN", 6:  "JUL", 7:  "AGO",
  8:  "SEP", 9:  "OCT", 10: "NOV", 11: "DIC",
};

function formatFecha(isoDate: string): string {
  // Parse as local date to avoid UTC offset shifting the day
  const [year, month, day] = isoDate.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  const diaNombre = DIAS[date.getDay()];
  const mesNombre = MESES[date.getMonth()];
  return `${diaNombre} ${day} DE ${mesNombre}`;
}

export function mapCitaDTOtoUI(dto: CitaDTO): CitaUI {
  return {
    id:             dto.id,
    fechaFormateada: formatFecha(dto.fecha),
    hora:           dto.hora,
    titulo:         `${dto.motivo} para ${dto.mascotaNombre}`,
    estado:         dto.estado,
  };
}