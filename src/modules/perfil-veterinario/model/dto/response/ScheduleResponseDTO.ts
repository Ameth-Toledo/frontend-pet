export interface DayScheduleDTO {
  enabled: boolean;
  start: string;
  end: string;
}

export type ScheduleResponseDTO = Record<string, DayScheduleDTO>;