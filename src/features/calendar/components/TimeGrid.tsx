import React, { useState } from "react";
import { Grid, Box, Text } from "@chakra-ui/react";
import { EventCard } from "./EventCard";
import { addHours, isSameDay, setHours } from "date-fns";
import type { CalendarEvent, TimeSlot, WeekDay } from "../calendar.types";
import { getEventPosition } from "../lib/dateUtils";

interface TimeGridProps {
  timeSlots: TimeSlot[];
  weekDays: WeekDay[];
  events: CalendarEvent[];
  eventData: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
  onOpen: (e: CalendarEvent) => void;
}

export const TimeGrid: React.FC<TimeGridProps> = ({
  timeSlots,
  weekDays,
  // events,
  onEventClick,
  onOpen,
  eventData,
}) => {
  const [selectedSlot, setSelectedSlot] = useState<{
    date: Date;
    hour: number;
  } | null>(null);
  const getEventsForDay = (day: Date) => {
    const x = eventData.filter((event) => isSameDay(event.start, day));
    return x;
  };
  console.log(selectedSlot);
  const handleClick = (day: Date, hour: number) => {
    setSelectedSlot({ date: day, hour });

    const eventData = {
      id: "",
      title: "",
      start: setHours(day, hour),
      end: addHours(setHours(day, hour), 1),
    };

    onOpen(eventData);
  };

  return (
    <Box flex={1} mt={5}>
      <Grid
        templateColumns="60px repeat(7, 1fr)"
        autoRows="54px"
        position="sticky"
        top="0"
        zIndex="1000"
        p={1}
      >
        {/* Time labels */}
        {timeSlots.map((slot, i) => (
          <Box
            key={slot.hour}
            gridColumn={1}
            gridRow={i + 1}
            display="flex"
            alignItems="flex-start"
            justifyContent="center"
            pt={2}
            borderBottom="1px solid"
            borderColor="border.SOFT"
          >
            <Text fontSize="xs" color="fg.MUTED" fontWeight="medium">
              {slot.label}
            </Text>
          </Box>
        ))}

        {/* Empty grid cells + events */}

        {weekDays.map((day, d) =>
          timeSlots.map((_, i) => {
            // const isSelected =
            //   selectedSlot &&
            //   isSameDay(day.date, selectedSlot.date) &&
            //   selectedSlot.hour === timeSlots[i].hour;

            return (
              <Box
                key={`${d}-${i}`}
                gridColumn={d + 2}
                gridRow={i + 1}
                onClick={() => handleClick(day.date, timeSlots[i].hour)}
                position="relative"
                border="1px solid"
                borderColor={{ base: "primary.50", _dark: "primary.700" }}
                _hover={{ bg: "primary.50", _dark: { bg: "primary.800" } }}
                transition="background-color 0.2s"
                cursor="pointer"
              >
                {/* Highlight on click */}
                {/* {isSelected && (
                  <Box
                    position="absolute"
                    inset="2px"
                    bg="primary.800"
                    borderRadius="md"
                    zIndex={2}
                  />
                )} */}
                {/* Your EventCard rendering stays as-is */}
                {getEventsForDay(day.date)
                  .filter(
                    (ev) =>
                      Math.floor(ev.start.getHours()) === timeSlots[i].hour,
                  )
                  .map((ev) => {
                    console.log("getEventsForDay:", getEventsForDay(day.date));
                    const pos = getEventPosition(ev.start, ev.end);
                    return (
                      <EventCard
                        key={ev.id}
                        event={ev}
                        style={{
                          position: "absolute",
                          top: pos.top,
                          height: pos.height,
                          left: "4px",
                          right: "4px",
                          zIndex: 5,
                        }}
                        onClick={() => onEventClick(ev)}
                      />
                    );
                  })}
              </Box>
            );
          }),
        )}
      </Grid>
    </Box>
  );
};
