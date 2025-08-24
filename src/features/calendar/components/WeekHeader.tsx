import React from "react";
import { Grid, Box, Text, Circle } from "@chakra-ui/react";
import type { WeekDay } from "../types";

interface WeekHeaderProps {
  weekDays: WeekDay[];
}

export const WeekHeader: React.FC<WeekHeaderProps> = ({ weekDays }) => {
  return (
    <Grid
      templateColumns="60px repeat(7, 1fr)"
      borderColor="border.DEFAULT"
      bg="bg.DEFAULT"
    >
      {/* Empty cell for time column */}
      <Box />

      {weekDays.map((day) => (
        <Box
          key={day.date.toISOString()}
          p={3}
          textAlign="center"
          borderLeft="1px solid"
          borderRight="1px solid"
          borderBottom="1px solid"
          borderColor={{ base: "primary.50", _dark: "primary.700" }}
        >
          <Text fontSize="md" color="fg.MUTED" fontWeight="medium" mb={1}>
            {day.dayName}
          </Text>

          {day.isToday ? (
            <Circle size="30px" bg="#003a6b" color="white" mx="auto">
              <Text fontSize="md">{day.dayNumber}</Text>
            </Circle>
          ) : (
            <Text fontSize="md" color="fg.DEFAULT" fontWeight="medium">
              {day.dayNumber}
            </Text>
          )}
        </Box>
      ))}
    </Grid>
  )
};
