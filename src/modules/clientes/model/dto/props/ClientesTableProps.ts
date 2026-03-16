import { ClienteUI } from "../../ui.model";

export interface ClientesTableProps {
  clientes: ClienteUI[];
  onVerCliente: (cliente: ClienteUI) => void;
}