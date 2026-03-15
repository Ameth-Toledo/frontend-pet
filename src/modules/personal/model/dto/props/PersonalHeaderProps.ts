export interface PersonalHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onNuevoClick: () => void;
  userName: string;
}