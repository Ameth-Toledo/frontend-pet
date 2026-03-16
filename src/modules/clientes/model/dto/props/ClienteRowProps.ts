import { ClienteUI } from "../../ui.model";

export interface ClienteRowProps {
  cliente: ClienteUI;
  onVer: () => void;
}