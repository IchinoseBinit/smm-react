import {
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isToday,
  isSameMonth,
  addWeeks,
  subWeeks,
  startOfDay,
  addHours,
  getHours,
  getMinutes,
} from "date-fns";
import type { TimeSlot, WeekDay } from "../types";

export const getWeekDays = (date: Date): WeekDay[] => {
  const start = startOfWeek(date, { weekStartsOn: 0 }); // Sunday
  const end = endOfWeek(date, { weekStartsOn: 0 });

  const days = eachDayOfInterval({ start, end });

  return days.map((day) => ({
    date: day,
    dayName: format(day, "EEE").toUpperCase(),
    dayNumber: parseInt(format(day, "d")),
    isToday: isToday(day),
    isCurrentMonth: isSameMonth(day, date),
  }));
};

export const getTimeSlots = (): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const dayStart = startOfDay(new Date());

  // 0 through 23 inclusive
  for (let hour = 0; hour <= 23; hour++) {
    const dt = addHours(dayStart, hour);
    slots.push({
      hour,
      label: format(dt, "h a").toLowerCase(), // “12 am”, “1 pm”, etc.
    });
  }

  return slots;
};

export const getNextWeek = (date: Date): Date => addWeeks(date, 1);
export const getPrevWeek = (date: Date): Date => subWeeks(date, 1);

export const formatTime = (date: Date): string => {
  return format(date, "h:mm a");
};

const ROW_HEIGHT = 54; // must match autoRows="54px"

export const getEventPosition = (start: Date, end: Date) => {
  const startPos = getHours(start) + getMinutes(start) / 60;
  const endPos = getHours(end) + getMinutes(end) / 60;
  const duration = endPos - startPos;

  return {
    top: `${startPos * ROW_HEIGHT}px`,
    height: `${duration * ROW_HEIGHT}px`,
  };
};

export const getCurrentTimezone = (): string => {
  // const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const offset = new Date().getTimezoneOffset();
  const sign = offset > 0 ? "-" : "+";
  const hours = Math.abs(Math.floor(offset / 60));
  const minutes = Math.abs(offset % 60);

  return `GMT${sign}${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
};
