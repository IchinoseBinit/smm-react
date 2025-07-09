import React, { useState, useMemo } from "react";
import { Box } from "@chakra-ui/react";
import { CalendarHeader } from "./CalendarHeader";
import { WeekHeader } from "./WeekHeader";
import { TimeGrid } from "./TimeGrid";
import type { CalendarEvent } from "../types";
import {
  getNextWeek,
  getPrevWeek,
  getTimeSlots,
  getWeekDays,
} from "../lib/dateUtils";
import { EventModal } from "./EventModel";

interface WeekViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  onDateChange: (date: Date) => void;
  onEventCreate: (event: Omit<CalendarEvent, "id">) => void;
  onEventUpdate: (event: CalendarEvent) => void;
  onEventDelete: (eventId: string) => void;
}

export const WeekView: React.FC<WeekViewProps> = ({
  currentDate,
  events,
  onDateChange,
  onEventCreate,
  onEventUpdate,
  onEventDelete,
}) => {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const weekDays = useMemo(() => getWeekDays(currentDate), [currentDate]);
  const timeSlots = useMemo(() => getTimeSlots(), []);

  const handlePrevWeek = () => {
    onDateChange(getPrevWeek(currentDate));
  };

  const handleNextWeek = () => {
    onDateChange(getNextWeek(currentDate));
  };

  const handleAddEvent = () => {
    setSelectedEvent(null);
    setIsModalOpen(true);
  };

  const handleEventSave = (
    eventData: Omit<CalendarEvent, "id"> | CalendarEvent,
  ) => {
    onEventCreate(eventData);
  };

  const handleModalOpen = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    <Box spaceY={0} h="83vh" bg="bg.DEFAULT" overflow="hidden">
      <CalendarHeader
        currentDate={currentDate}
        onPrevWeek={handlePrevWeek}
        onNextWeek={handleNextWeek}
        onAddEvent={handleAddEvent}
      />

      <WeekHeader weekDays={weekDays} />

      <Box h="23rem" overflowY="scroll">
        <TimeGrid
          timeSlots={timeSlots}
          weekDays={weekDays}
          event={events}
          onOpen={handleModalOpen}
        />
      </Box>

      <EventModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        event={selectedEvent}
        onSave={handleEventSave}
        onUpdate={onEventUpdate}
        onDelete={onEventDelete}
      />
    </Box>
  );
};
