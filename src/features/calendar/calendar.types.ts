export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
}

export interface TimeSlot {
  hour: number;
  label: string;
}

export interface WeekDay {
  date: Date;
  dayName: string;
  dayNumber: number;
  isToday: boolean;
  isCurrentMonth: boolean;
}

export interface CalendarViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  onDateChange: (date: Date) => void;
  onEventCreate: (event: Omit<CalendarEvent, "id">) => void;
  onEventUpdate: (event: CalendarEvent) => void;
  onEventDelete: (eventId: string) => void;
}
