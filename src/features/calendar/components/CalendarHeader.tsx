import React from "react";
import { Box, Flex, Text, HStack, IconButton } from "@chakra-ui/react";
import { format } from "date-fns";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

interface CalendarHeaderProps {
  currentDate: Date;
  onPrevWeek: () => void;
  onNextWeek: () => void;
  onAddEvent: () => void;
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentDate,
  onPrevWeek,
  onNextWeek,
}) => {
  return (
    <Flex p={4} borderColor="border.DEFAULT" bg="bg.DEFAULT">
      <HStack spaceX={2}>
        <IconButton
          size="sm"
          variant="ghost"
          onClick={onPrevWeek}
          _hover={{ bg: "bg.MUTED" }}
          transition="all 0.2s"
        >
          <FaChevronLeft size={16} />
        </IconButton>

        <Text
          fontSize="lg"
          fontWeight="medium"
          color="fg.DEFAULT"
          minW="200px"
          textAlign="center"
        >
          {format(currentDate, "MMMM yyyy")}
        </Text>

        <IconButton
          size="sm"
          variant="ghost"
          onClick={onNextWeek}
          _hover={{ bg: "bg.MUTED" }}
          transition="all 0.2s"
        >
          <FaChevronRight size={16} />
        </IconButton>
      </HStack>
      <Box w="120px" /> {/* Spacer for balance */}
    </Flex>
  );
};
