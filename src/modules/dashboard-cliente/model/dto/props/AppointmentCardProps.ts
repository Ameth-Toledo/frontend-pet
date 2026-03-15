import { AppointmentUI } from "../../ui.model";

export interface AppointmentCardProps {
  appointment: AppointmentUI;
  isLast?: boolean;
}