import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { FaFacebook, FaTiktok, FaYoutube } from "react-icons/fa6";
import { format } from "date-fns";
import type { CalendarEvent } from "../types";

interface EventCardProps {
  event: CalendarEvent;
  style?: React.CSSProperties;
  clickEvent: (e: CalendarEvent) => void;
}

export const EventCard: React.FC<EventCardProps> = ({
  event,
  style,
  clickEvent,
}) => {
  // Group by accountType + time string
  const uniqueMap = new Map<
    string,
    { icon: React.ReactElement; time: string }
  >();

  event?.platform?.forEach((p) => {
    const time = format(new Date(event.start), "h:mm a");
    const key = `${p.accountType}-${time}`;

    if (!uniqueMap.has(key)) {
      let icon = null;
      if (p.accountType === "YOUTUBE") icon = <FaYoutube color="red" />;
      else if (p.accountType === "FACEBOOK") icon = <FaFacebook color="blue" />;
      else if (p.accountType === "TIKTOK") icon = <FaTiktok color="black" />;

      if (icon) uniqueMap.set(key, { icon, time });
    }
  });

  return (
    <Box
      style={style}
      bg={{ base: "white", _dark: "primary.800" }}
      color={{ base: "black", _dark: "white" }}
      borderRadius="sm"
      p={3}
      cursor="pointer"
      fontSize="sm"
      fontWeight="medium"
      minH="24px"
      display="flex"
      alignItems="center"
      zIndex={100}
      _hover={{
        transform: "scale(1.02)",
        boxShadow: "md",
      }}
      transition="all 0.2s"
      boxShadow="sm"
      onClick={() => clickEvent(event)}
    >
      <Flex direction="column" gap={2}>
        {[...uniqueMap.values()].map((item, i) => (
          <Box
            key={i}
            bg="gray.100"
            minW="8rem"
            p={1}
            shadow="sm"
            display="flex"
            alignItems="center"
            gap={2}
          >
            {item.icon}
            <Text fontSize="sm">{item.time}</Text>
          </Box>
        ))}
      </Flex>
    </Box>
  );
};
