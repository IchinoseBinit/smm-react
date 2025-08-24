import React, { useState } from "react"
import { Grid, Box, Text, VStack, HStack, Badge, Image } from "@chakra-ui/react"
// import { EventCard } from "./EventCard"
import { format } from "date-fns"
import type {
  CalendarEvent,
  PlatformCalendarGroup,
  TimeSlot,
  WeekDay,
} from "../types"
import CalendarIcon from "@/assets/Calendar.svg"
import TimeIcon from "@/assets/ClockIcon.svg"
import useGetPostsByDate from "../hooks/query/useGetPosts"
import { CircularLoading } from "@/lib/loadings"
import { useAuthUtils } from "@/hooks/useAuthUtils"
import { WeekHeader } from "./WeekHeader"
import Pencil from "@/assets/pencil.svg"
import Cross from "@/assets/cross.svg"

interface TimeGridProps {
  timeSlots: TimeSlot[]
  weekDays: WeekDay[]
  events: CalendarEvent[]
  onOpen: (e: PlatformCalendarGroup) => void
}

type Media = {
  s3_url: string
  order: number
}

type PlatformStatus = {
  id: number
  accountType: "FACEBOOK" | "INSTAGRAM" | "TWITTER" | string
  status: "posted" | "scheduled" | "failed" | string
  scheduled_time: string | null
  posted_time: string | null
  facebook_page_id?: number
}

type Post = {
  id: number
  title: string | null
  description: string
  is_photo: boolean
  medias: Media[]
  platform_statuses: PlatformStatus[]
  scheduled_time: string | null
  status: "posted" | "scheduled" | "failed" | string
  surface: "POST" | "STORY" | string
}

// Card component with data mapping
const Card = ({ post, displayTime }: { post?: Post; displayTime?: string }) => {
  // Default values when no data is available
  const defaultData = {
    title: "Scheduled Post",
    description: "Description Description",
    accountCount: 2,
    accounts: ["@brandname", "@brandname"],
    image:
      "https://plus.unsplash.com/premium_photo-1755624280572-3924895eddea?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    date: "Wednesday July 12",
    time: "13:12",
  }

  // Map actual data or use defaults
  const cardData = {
    title: post?.title || defaultData.title,
    description: post?.description || defaultData.description,
    accountCount: post?.platform_statuses?.length || defaultData.accountCount,
    accounts:
      post?.platform_statuses?.map(
        (status) => `@${status.accountType.toLowerCase()}`
      ) || defaultData.accounts,
    image: post?.medias?.[0]?.s3_url || defaultData.image,
    date: displayTime
      ? format(new Date(displayTime), "EEEE MMMM dd")
      : defaultData.date,
    time: displayTime
      ? format(new Date(displayTime), "HH:mm")
      : defaultData.time,
  }

  return (
    <VStack
      border="1px solid gray"
      borderRadius="md"
      p={4}
      bg="white"
      gap={3}
      position="absolute"
      top="100%"
      left="0"
      zIndex={10}
      minWidth="250px"
      boxShadow="lg"
    >
      <HStack justify="space-between" width="full">
        <Text fontWeight="medium">{cardData.title}</Text>
        <HStack gap={2}>
          <Image src={Pencil} w={4} h={4} cursor="pointer" />
          <Image src={Cross} w={4} h={4} cursor="pointer" />
        </HStack>
      </HStack>

      <HStack justify="space-between" width="full">
        <Text fontSize="sm" color="gray.600">
          Publishing to
        </Text>
        <Badge colorScheme="blue">{cardData.accountCount} Accounts</Badge>
      </HStack>

      <HStack width="full" gap={2} flexWrap="wrap">
        {cardData.accounts.map((account, index) => (
          <Badge key={index} variant="outline" colorScheme="gray">
            {account}
          </Badge>
        ))}
      </HStack>

      <Text fontSize="sm" color="gray.800" alignSelf="flex-start">
        {cardData.description}
      </Text>

      {cardData.image && (
        <Image
          borderRadius="md"
          src={cardData.image}
          alt="Post image"
          maxH="120px"
          objectFit="cover"
          width="full"
        />
      )}

      <HStack justify="space-between" width="full">
        <HStack>
          <Image src={CalendarIcon} />
          <Text fontSize="sm" color="gray.600">
            {cardData.date}
          </Text>
        </HStack>
        <HStack>
          <Image src={TimeIcon} />
          <Text fontSize="sm" color="gray.600">
            {cardData.time}
          </Text>
        </HStack>
      </HStack>
    </VStack>
  )
}

export const TimeGrid: React.FC<TimeGridProps> = ({ timeSlots, weekDays }) => {
  const { userId } = useAuthUtils()
  const [hoveredEvent, setHoveredEvent] = useState<string | null>(null)

  const { data, isLoading } = useGetPostsByDate({
    from: "2025-08-11",
    to: "2026-12-10",
    userId,
  }) as {
    data: Post[]
    isLoading: boolean
  }

  const getDisplayTime = (
    platformStatus: PlatformStatus,
    fallbackScheduledTime: string | null
  ): string | null => {
    if (platformStatus.status === "posted" && platformStatus.posted_time) {
      return platformStatus.posted_time
    } else if (
      platformStatus.status === "scheduled" &&
      platformStatus.scheduled_time
    ) {
      return platformStatus.scheduled_time
    } else if (
      platformStatus.status === "failed" &&
      platformStatus.posted_time
    ) {
      return platformStatus.posted_time
    } else if (fallbackScheduledTime) {
      return fallbackScheduledTime
    }
    return null
  }

  // Check if current cell has an event
  const getEventInCell = (dayDate: Date, timeSlotHour: number) => {
    if (!data || !Array.isArray(data)) return null

    for (const post of data) {
      for (const platformStatus of post.platform_statuses) {
        const displayTime = getDisplayTime(platformStatus, post.scheduled_time)
        if (!displayTime) continue

        const eventDate = new Date(displayTime)
        const eventHour = eventDate.getUTCHours()
        const eventDay = eventDate.getUTCDate()
        const eventMonth = eventDate.getUTCMonth()
        const eventYear = eventDate.getUTCFullYear()

        const dayDay = dayDate.getDate()
        const dayMonth = dayDate.getMonth()
        const dayYear = dayDate.getFullYear()

        if (
          eventYear === dayYear &&
          eventMonth === dayMonth &&
          eventDay === dayDay &&
          eventHour === timeSlotHour
        ) {
          const hours = eventDate.getUTCHours()
          const minutes = eventDate.getUTCMinutes()
          const timeString = `${hours}:${minutes.toString().padStart(2, "0")}`

          return {
            title: post.title || "Event",
            timeString: timeString,
            post: post,
            displayTime: displayTime,
          }
        }
      }
    }
    return null
  }

  // Check if there's an event later in the week at this time
  const hasEventLaterInWeek = (
    currentDayIndex: number,
    timeSlotHour: number
  ) => {
    if (!data || !Array.isArray(data)) return null

    // Check all days after current day
    for (
      let dayIndex = currentDayIndex + 1;
      dayIndex < weekDays.length;
      dayIndex++
    ) {
      const dayDate = weekDays[dayIndex].date
      const event = getEventInCell(dayDate, timeSlotHour)
      if (event) {
        return event
      }
    }
    return null
  }

  // Find the first day that has a timeline for each time slot
  const getFirstTimelineDay = (timeSlotHour: number) => {
    if (!data || !Array.isArray(data)) return -1

    // Check each day from left to right
    for (let dayIndex = 0; dayIndex < weekDays.length; dayIndex++) {
      const dayDate = weekDays[dayIndex].date
      const currentEvent = getEventInCell(dayDate, timeSlotHour)
      const laterEvent = hasEventLaterInWeek(dayIndex, timeSlotHour)

      // If this cell has event or line, this is the first day
      if (currentEvent || laterEvent) {
        return dayIndex
      }
    }
    return -1
  }

  if (isLoading) return <CircularLoading />

  return (
    <Box flex={1} mt={5} overflowY="hidden">
      <WeekHeader weekDays={weekDays} />
      <Grid
        templateColumns="60px repeat(7, 1fr)"
        autoRows="94px"
        position="sticky"
        top="0"
        zIndex="80"
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
            borderTop="1px solid"
            borderBottom="1px solid"
            borderColor={{ base: "primary.50", _dark: "primary.700" }}
          >
            <Text fontSize="xs" color="fg.MUTED" fontWeight="medium">
              {slot.label}
            </Text>
          </Box>
        ))}

        {/* Grid cells */}
        {weekDays.map((day, dayIndex) =>
          timeSlots.map((slot, timeIndex) => {
            // Check if this cell has an event
            const currentEvent = getEventInCell(day.date, slot.hour)

            // Check if there's an event later in the week at this time
            const laterEvent = hasEventLaterInWeek(dayIndex, slot.hour)

            // Check if this is the first day of this timeline
            const firstTimelineDay = getFirstTimelineDay(slot.hour)

            // Create unique event ID for hover state
            const eventId = `${dayIndex}-${timeIndex}`
            const isHovered = hoveredEvent === eventId

            return (
              <Box
                key={eventId}
                gridColumn={dayIndex + 2}
                gridRow={timeIndex + 1}
                position="relative"
                border="1px solid"
                backgroundColor={"white"}
                borderColor={{ base: "primary.50", _dark: "primary.700" }}
                _hover={{
                  bg: "primary.50",
                  _dark: { bg: "primary.800" },
                }}
                transition="background-color 0.2s"
                cursor="pointer"
              >
                {/* If there's an event LATER this week - show line */}
                {!currentEvent && laterEvent && (
                  <Box
                    position="absolute"
                    top="0"
                    left="-1px"
                    right="-1px"
                    bottom="0"
                    zIndex="2"
                  >
                    {/* The continuous line across the cell */}
                    <Box
                      position="absolute"
                      left="0"
                      right="0"
                      top="50%"
                      transform="translateY(-50%)"
                      height="4px"
                      backgroundColor="#003a6b"
                    />

                    {/* Show time badge and start circle ONLY on the very first cell of the timeline */}
                    {dayIndex === firstTimelineDay && (
                      <>
                        {/* Small white circle at the very start - connected to line */}
                        <Box
                          position="absolute"
                          left="-1px"
                          top="50%"
                          transform="translateY(-50%)"
                          width="10px"
                          height="10px"
                          backgroundColor="white"
                          borderRadius="50%"
                          border="2px solid black"
                          zIndex="5"
                        />
                        {/* Time badge positioned ABOVE the line */}
                        <Box
                          position="absolute"
                          left="8px"
                          top="8px"
                          backgroundColor="#003a6b"
                          color="white"
                          px={2}
                          py={1}
                          borderRadius="4px"
                          fontSize="xs"
                          fontWeight="medium"
                          minWidth="35px"
                          textAlign="center"
                          boxShadow="0 2px 4px rgba(0,0,0,0.1)"
                          zIndex="4"
                        >
                          {laterEvent.timeString}
                        </Box>
                      </>
                    )}
                  </Box>
                )}

                {/* If this cell HAS the event - show event title and circle if it's first cell */}
                {currentEvent && (
                  <Box
                    position="absolute"
                    top="0"
                    left="-1px"
                    right="-1px"
                    bottom="0"
                    display="flex"
                    alignItems="center"
                    px={2}
                    backgroundColor="white"
                    zIndex="2"
                    onMouseEnter={() => setHoveredEvent(eventId)}
                    onMouseLeave={() => setHoveredEvent(null)}
                  >
                    {/* Show start circle only if this is the first cell of timeline */}
                    {dayIndex === firstTimelineDay && (
                      <Box
                        position="absolute"
                        left="-1px"
                        top="50%"
                        transform="translateY(-50%)"
                        width="10px"
                        height="10px"
                        backgroundColor="white"
                        borderRadius="50%"
                        border="2px solid gray"
                        zIndex="5"
                      />
                    )}

                    <Box
                      backgroundColor="white"
                      color="#003a6b"
                      px={2}
                      py={1}
                      borderRadius="12px 12px 12px 0"
                      fontSize="xs"
                      fontWeight="medium"
                      border="1px solid gray"
                      position={"relative"}
                      whiteSpace="nowrap"
                      boxShadowColor={"gray.100"}
                      flex={1}
                      boxShadow="0 2px 4px rgba(0,0,0,0.1)"
                    >
                      {currentEvent.title}
                      <Box
                        width="10px"
                        height="10px"
                        borderRadius="50%"
                        position={"absolute"}
                        top={-0.5}
                        right={-1}
                        backgroundColor="#003a6b"
                        ml={2}
                      />
                    </Box>

                    {/* Show Card only when hovered */}
                    {isHovered && (
                      <Card
                        post={currentEvent.post}
                        displayTime={currentEvent.displayTime}
                      />
                    )}
                  </Box>
                )}
              </Box>
            )
          })
        )}
      </Grid>
    </Box>
  )
}
