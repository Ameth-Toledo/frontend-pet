import { apiClient } from "@/lib/axios";
import { VetAppointmentResponseDTO } from "../model/dto/response/VetAppointmentResponseDTO";
import { VetPatientResponseDTO } from "../model/dto/response/VetPatientResponseDTO";
import { VetDashboardStatsResponseDTO } from "../model/dto/response/VetDashboardStatsResponseDTO";

function getTodayStr(): string {
  return new Date().toISOString().split("T")[0];
}

async function safeFetch(url: string): Promise<any[]> {
  try {
    const res = await apiClient.get(url);
    return Array.isArray(res.data)
      ? res.data
      : Array.isArray(res.data?.data)
      ? res.data.data
      : [];
  } catch {
    console.warn(`⚠️ No se pudo cargar ${url}`);
    return [];
  }
}

export const veterinarioDashboardService = {

  getStats: async (): Promise<VetDashboardStatsResponseDTO> => {
    const [allCitas, allPets] = await Promise.all([
      safeFetch("/api/citas"),
      safeFetch("/api/pets"),
    ]);

    const today = getTodayStr();
    const citasHoy = allCitas.filter((c: any) =>
      c.fecha?.split("T")[0] === today
    );

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split("T")[0];
    const citasAyer = allCitas.filter((c: any) =>
      c.fecha?.split("T")[0] === yesterdayStr
    );

    const trend =
      citasAyer.length > 0
        ? `+${Math.round(((citasHoy.length - citasAyer.length) / citasAyer.length) * 100)}% respecto a ayer`
        : "Sin datos de ayer";

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const newThisWeek = allPets.filter((p: any) => {
      if (!p.created_at) return false;
      return new Date(p.created_at) >= oneWeekAgo;
    }).length;

    return {
      appointmentsToday:   citasHoy.length,
      appointmentsTrend:   trend,
      activePatients:      allPets.length,
      newPatientsThisWeek: newThisWeek,
    };
  },

  getUpcomingAppointments: async (): Promise<VetAppointmentResponseDTO[]> => {
    const [allCitas, allPets, allClients] = await Promise.all([
      safeFetch("/api/citas"),
      safeFetch("/api/pets"),
      safeFetch("/api/clients"),
    ]);

    const today = getTodayStr();
    const citasHoy = allCitas.filter((c: any) =>
      c.fecha?.split("T")[0] === today
    );

    return citasHoy.map((c: any): any => {
      const mascota = allPets.find((p: any) => p.id === c.id_mascota);
      const cliente = allClients.find((cl: any) => cl.id === c.id_user);

      let horaFormateada = "—";
      try {
        horaFormateada = new Date(c.fecha).toLocaleTimeString("es-MX", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });
      } catch {
        horaFormateada = c.fecha?.split("T")[1]?.substring(0, 5) ?? "—";
      }

      const especie = (mascota?.especie ?? "").toLowerCase();
      const nombreCliente = cliente
        ? `${cliente.nombre ?? ""} ${cliente.apellido ?? ""}`.trim()
        : `Cliente #${c.id_user}`;

      return {
        id:             String(c.id),
        patientName:    mascota?.nombre ?? `Mascota #${c.id_mascota}`,
        patientBreed:   `${mascota?.especie ?? "Animal"} · ${mascota?.sexo ?? ""} · ${mascota?.peso ?? ""}kg`.trim(),
        patientSpecies: especie === "gato" ? "cat" : "dog",
        ownerName:      nombreCliente,
        time:           horaFormateada,
        service:        "Consulta",
        type:           "checkup",
        _raw: {
          estado:          c.estado ?? "PENDIENTE",
          motivoDetalle:   c.observaciones_cliente ?? "",
          emailCliente:    cliente?.email ?? "",
          telefonoCliente: cliente?.telefono ?? "",
          fecha:           c.fecha?.split("T")[0] ?? today,
          especie:         mascota?.especie ?? "",
          sexo:            mascota?.sexo ?? "",
          peso:            mascota?.peso ? `${mascota.peso} kg` : "",
        },
      };
    });
  },

  getRecentPatients: async (): Promise<VetPatientResponseDTO[]> => {
    const allPets = await safeFetch("/api/pets");

    return allPets.slice(0, 5).map((p: any): VetPatientResponseDTO => ({
      id:    String(p.id),
      name:  p.nombre  ?? "Sin nombre",
      breed: p.especie ?? "Sin especie",
    }));
  },
};