export interface ClientesHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onNuevoClick: () => void;
  userName?: string;
}