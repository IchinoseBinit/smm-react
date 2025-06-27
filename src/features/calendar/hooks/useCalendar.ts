import { useState, useCallback } from "react";
import type { CalendarEvent } from "../calendar.types";

export const useCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: "1",
      title: "ok, 1pm",
      start: new Date(2025, 0, 25, 13, 0), // January 25, 2025 at 1:00 PM
      end: new Date(2025, 0, 25, 14, 0), // January 25, 2025 at 2:00 PM
      color: "#3b82f6",
    },
  ]);

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
