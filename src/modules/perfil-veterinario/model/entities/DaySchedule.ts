export interface DaySchedule {
  enabled: boolean;
  start: string;
  end: string;
}

export type Schedule = Record<string, DaySchedule>;