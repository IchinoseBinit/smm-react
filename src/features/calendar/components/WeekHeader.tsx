import React from "react";
import { Grid, Box, Text, Circle } from "@chakra-ui/react";
import type { WeekDay } from "../types";

interface WeekHeaderProps {
  weekDays: WeekDay[];
}

export const WeekHeader: React.FC<WeekHeaderProps> = ({ weekDays }) => {
  return (
    <Grid
      templateColumns={{
        base: `40px repeat(${weekDays.length}, 1fr)`,
        md: "60px repeat(7, 1fr)"
      }}
      borderColor="border.DEFAULT"
      bg="bg.DEFAULT"
      minWidth={{ base: "auto", md: "auto" }}
    >
      {/* Empty cell for time column */}
      <Box
        borderTop="1px solid"
        borderBottom="1px solid"
        borderRight="1px solid"
        borderColor={{ base: "primary.50", _dark: "primary.700" }}
      />

      {weekDays.map((day, index) => (
        <Box
          key={day.date.toISOString()}
          p={{ base: 1.5, md: 3 }}
          textAlign="center"
          borderLeft={index === 0 ? "1px solid" : "none"}
          borderRight="1px solid"
          borderBottom="1px solid"
          borderTop="1px solid"
          borderColor={{ base: "primary.50", _dark: "primary.700" }}
        >
          <Text fontSize={{ base: "xs", md: "md" }} color="fg.MUTED" fontWeight="medium" mb={{ base: 0.5, md: 1 }}>
            {day.dayName}
          </Text>

          {day.isToday ? (
            <Circle size={{ base: "24px", md: "30px" }} bg="#003a6b" color="white" mx="auto">
              <Text fontSize={{ base: "sm", md: "md" }}>{day.dayNumber}</Text>
            </Circle>
          ) : (
            <Text fontSize={{ base: "sm", md: "md" }} color="fg.DEFAULT" fontWeight="medium">
              {day.dayNumber}
            </Text>
          )}
        </Box>
      ))}
    </Grid>
  )
};
