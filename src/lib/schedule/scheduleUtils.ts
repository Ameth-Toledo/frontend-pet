import { TimeSlot, Appointment } from './types';
import { timeToMinutes, minutesToTime } from './timeUtils';

export function generateTimeSlots(start: string, end: string, duration: number): TimeSlot[] {
  const slots: TimeSlot[] = [];
  const startMinutes = timeToMinutes(start);
  const endMinutes = timeToMinutes(end);
  let current = startMinutes;

  while (current + duration <= endMinutes) {
    slots.push({
      start: minutesToTime(current),
      end: minutesToTime(current + duration),
    });
    current += duration;
  }

  return slots;
}

export function filterAvailableSlots(slots: TimeSlot[], appointments: Appointment[]): TimeSlot[] {
  return slots.filter((slot) => {
    return !appointments.some((appointment) => {
      const slotStart = timeToMinutes(slot.start);
      const slotEnd = timeToMinutes(slot.end);
      const appointmentStart = timeToMinutes(appointment.start);
      const appointmentEnd = timeToMinutes(appointment.end);
      return slotStart < appointmentEnd && slotEnd > appointmentStart;
    });
  });
}