import React, { useEffect, useState } from "react";
import { Grid, Box, Text } from "@chakra-ui/react";
import { EventCard } from "./EventCard";
import { addHours, isSameDay } from "date-fns";
import type {
  CalendarEvent,
  PlatformCalendarGroup,
  TimeSlot,
  WeekDay,
} from "../types";
import useGetPostsByDate from "../hooks/query/useGetPosts";
import { CircularLoading } from "@/lib/loadings";
import { useAuthUtils } from "@/hooks/useAuthUtils";

interface TimeGridProps {
  timeSlots: TimeSlot[];
  weekDays: WeekDay[];
  event: CalendarEvent[];
  onOpen: (e: PlatformCalendarGroup) => void;
}

type MergedPost = {
  scheduled_time: string;
  platforms: {
    accountType: string;
    social_account_id?: number;
    facebook_page_id?: number;
    posts: {
      id: number;
      title: string;
      description: string;
      medias: any[];
      status: string;
    }[];
  }[];
};

export const TimeGrid: React.FC<TimeGridProps> = ({
  timeSlots,
  weekDays,
  event,
}) => {
  const { userId } = useAuthUtils();
  const { data, isLoading } = useGetPostsByDate({
    from: "2025-07-7",
    to: "2025-07-9",
    userId: userId,
  });
  const [mergedPosts, setMergedPosts] = useState<MergedPost[]>([]);
  useEffect(() => {
    if (Array.isArray(data) && data.length > 0) {
      mergeScheduledPosts(data);
    }
  }, [data]);

  function mergeScheduledPosts(posts: any[]) {
    const map = new Map();

    for (const post of posts) {
      const { scheduled_time, platform_statuses } = post;

      for (const platform of platform_statuses) {
        const key = `${scheduled_time}-${platform.accountType}-${platform.social_account_id || platform.facebook_page_id || ""}`;

        if (!map.has(key)) {
          map.set(key, {
            scheduled_time,
            accountType: platform.accountType,
            social_account_id: platform.social_account_id,
            facebook_page_id: platform.facebook_page_id,
            posts: [],
          });
        }

        map.get(key).posts.push({
          id: post.id,
          title: post.title,
          description: post.description,
          medias: post.medias,
          status: post.status,
        });
      }
    }

    const groupedMap = new Map();

    for (const value of map.values()) {
      const timeKey = value.scheduled_time;
      if (!groupedMap.has(timeKey)) {
        groupedMap.set(timeKey, []);
      }
      groupedMap.get(timeKey).push({
        accountType: value.accountType,
        social_account_id: value.social_account_id,
        facebook_page_id: value.facebook_page_id,
        posts: value.posts,
      });
    }

    const mergedResult: MergedPost[] = [];

    for (const [scheduled_time, platforms] of groupedMap.entries()) {
      mergedResult.push({ scheduled_time, platforms });
    }

    setMergedPosts(mergedResult);
  }

  if (isLoading) return <CircularLoading />;
  // right after you build calendarEvents …

  const calendarEvents: CalendarEvent[] = mergedPosts.map((post, index) => {
    const start = new Date(post.scheduled_time);

    return {
      id: String(index),
      start,
      end: addHours(start, 1),
      scheduled_time: post.scheduled_time,
      platform: post.platforms,
    };
  });

  // merge your incoming `event` prop and the API events:
  const allEvents = [...event, ...calendarEvents];

  // then just filter against that in getEventsForDay:
  const getEventsForDay = (day: Date) =>
    allEvents.filter((e) => isSameDay(e.start, day));

  return (
    <Box flex={1} mt={5}>
      <Grid
        templateColumns="60px repeat(7, 1fr)"
        autoRows="94px"
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
                // onClick={
                //   eventsInCell.length > 0
                //     ? undefined
                //     : () => handleClick(day.date, timeSlots[i].hour)
                // }
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
                {eventsInCell.map((ev: any) => (
                  <EventCard key={ev.id} event={ev} />
                ))}
              </Box>
            );
          }),
        )}
      </Grid>
    </Box>
  );
};
