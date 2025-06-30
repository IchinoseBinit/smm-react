import { useState, useCallback } from "react";
import type { CalendarEvent } from "../calendar.types";

export const useCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  const handleDateChange = useCallback((date: Date) => {
    setCurrentDate(date);
  }, []);

  const handleEventCreate = useCallback(
    (eventData: Omit<CalendarEvent, "id">) => {
      const newEvent: CalendarEvent = {
        ...eventData,
        id: Date.now().toString(),
      };
      setEvents((prev) => [...prev, newEvent]);
    },
    [],
  );

  const handleEventUpdate = useCallback((updatedEvent: CalendarEvent) => {
    setEvents((prev) =>
      prev.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event,
      ),
    );
  }, []);

  const handleEventDelete = useCallback((eventId: string) => {
    setEvents((prev) => prev.filter((event) => event.id !== eventId));
  }, []);

  return {
    currentDate,
    events,
    handleDateChange,
    handleEventCreate,
    handleEventUpdate,
    handleEventDelete,
  };
};
