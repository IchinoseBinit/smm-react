import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { formatTime } from "../lib/dateUtils";
import type { CalendarEvent } from "../calendar.types";

interface EventCardProps {
  event: CalendarEvent;
  style?: React.CSSProperties;
  onClick: () => void;
}

export const EventCard: React.FC<EventCardProps> = ({
  event,
  style,
  onClick,
}) => {
  return (
    <Box
      style={style}
      bg="black"
      color="white"
      borderRadius="sm"
      p={2}
      cursor="pointer"
      fontSize="xs"
      fontWeight="medium"
      minH="24px"
      display="flex"
      alignItems="center"
      onClick={onClick}
      _hover={{
        transform: "scale(1.02)",
        boxShadow: "md",
      }}
      transition="all 0.2s"
      boxShadow="sm"
    >
      <Box>
        <Text fontSize="xs" fontWeight="bold">
          {event.title}
        </Text>
        <Text fontSize="xs" opacity={0.9}>
          {formatTime(event.start)}
        </Text>
      </Box>
    </Box>
  );
};
