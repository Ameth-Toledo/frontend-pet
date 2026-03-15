import { TabActivo } from "../../ui.model";

export interface MascotaTabsProps {
  tabActivo: TabActivo;
  onTabChange: (tab: TabActivo) => void;
}