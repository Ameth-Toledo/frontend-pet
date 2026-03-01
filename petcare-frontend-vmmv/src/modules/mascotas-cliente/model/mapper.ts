import { MascotaDTO, EspecieDTO } from "./dto";
import { MascotaUI, IconType } from "./ui.model";

const iconMap: Record<EspecieDTO, IconType> = {
  PERRO: "perro",
  GATO:  "gato",
  AVE:   "ave",
  OTRO:  "otro",
};

export function mapMascotaDTOtoUI(dto: MascotaDTO): MascotaUI {
  return {
    id:     dto.id,
    nombre: dto.nombre,
    icon:   iconMap[dto.especie],
  };
}