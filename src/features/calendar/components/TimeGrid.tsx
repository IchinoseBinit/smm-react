import React from "react";
import { Grid, Box, Text } from "@chakra-ui/react";
import { EventCard } from "./EventCard";
import { addHours, isSameDay, setHours } from "date-fns";
import type { CalendarEvent, TimeSlot, WeekDay } from "../calendar.types";

interface TimeGridProps {
  timeSlots: TimeSlot[];
  weekDays: WeekDay[];
  event: CalendarEvent[];
  onOpen: (e: CalendarEvent) => void;
}

export const TimeGrid: React.FC<TimeGridProps> = ({
  timeSlots,
  weekDays,
  onOpen,
  event,
}) => {
  const getEventsForDay = (day: Date) => {
    const x = event.filter((event) => isSameDay(event.start, day));
    return x;
  };
  const handleClick = (day: Date, hour: number) => {
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
            const cellStart = new Date(day.date);
            cellStart.setHours(timeSlots[i].hour, 0, 0, 0);
            const cellEnd = new Date(cellStart);
            cellEnd.setHours(cellEnd.getHours() + 1);

            const eventsInCell = getEventsForDay(day.date).filter(
              (ev) => ev.start >= cellStart && ev.start < cellEnd,
            );
            return (
              <Box
                key={`${d}-${i}`}
                gridColumn={d + 2}
                gridRow={i + 1}
                onClick={
                  eventsInCell.length > 0
                    ? undefined
                    : () => handleClick(day.date, timeSlots[i].hour)
                }
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
                {eventsInCell.map((ev) => (
                  <EventCard
                    key={ev.id}
                    event={ev}
                    clickEvent={() => onOpen(ev)}
                  />
                ))}
              </Box>
            );
          }),
        )}
      </Grid>
    </Box>
  );
};
