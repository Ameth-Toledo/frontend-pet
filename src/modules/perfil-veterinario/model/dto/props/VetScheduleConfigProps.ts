import { ScheduleUI } from "../../ui.model";

export interface VetScheduleConfigProps {
  schedule: ScheduleUI;
  onScheduleChange: (day: string, field: "enabled" | "start" | "end", value: string | boolean) => void;
  duration: string;
  setDuration: (v: string) => void;
  onSave: () => void;
  saving: boolean;
  saved: boolean;
  error: string | null;
}