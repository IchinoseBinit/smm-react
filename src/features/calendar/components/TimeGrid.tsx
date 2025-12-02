import React, { useState, useRef, useEffect } from "react"
import {
  Grid,
  Box,
  Text,
  VStack,
  HStack,
  Badge,
  Image,
  Portal,
} from "@chakra-ui/react"
import { format } from "date-fns"

import CalendarIcon from "@/assets/Calendar.svg"
import TimeIcon from "@/assets/ClockIcon.svg"
import useGetPostsByDate from "../hooks/query/useGetPosts"
import { CircularLoading } from "@/lib/loadings"
import { useAuthUtils } from "@/hooks/useAuthUtils"
import { WeekHeader } from "./WeekHeader"
import Pencil from "@/assets/pencil.svg"
import Cross from "@/assets/cross.svg"
import type { TimeGridProps, PlatformStatus, Post } from "../types"
import { useEditPostStore } from "../lib/store/editPost.store"

// Card component with Portal for proper z-index
const Card = ({
  post,
  displayTime,
  position,
  isVisible,
}: {
  post?: Post
  displayTime?: string
  position: { top: number; left: number }
  isVisible: boolean
}) => {
  const { navigate } = useAuthUtils()

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

  const { setIsCreatePostEdit, setPostData } = useEditPostStore()

  const handlePencilClick = () => {
    if (post) {
      setIsCreatePostEdit(true)
      setPostData(post)
      navigate("/create")
    }
  }

  const handleCrossClick = () => {
    console.log("Delete clicked for post:", post)
  }

  if (!isVisible) return null

  return (
    <Portal>
      <VStack
        position="fixed"
        top={`${position.top}px`}
        left={`${position.left}px`}
        border="1px solid gray"
        borderRadius="md"
        p={{ base: 2, md: 4 }}
        bg="white"
        gap={{ base: 2, md: 3 }}
        zIndex={99999}
        minWidth={{ base: "200px", md: "250px" }}
        maxWidth={{ base: "250px", md: "300px" }}
        boxShadow="0 10px 25px rgba(0,0,0,0.15)"
        _before={{
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          border: "1px solid rgba(0,0,0,0.1)",
          borderRadius: "md",
          pointerEvents: "none",
        }}
      >
        <HStack justify="space-between" width="full">
          <Text fontWeight="medium" fontSize="sm">
            {cardData.title}
          </Text>
          <HStack gap={2}>
            <Image
              src={Pencil}
              w={4}
              h={4}
              cursor="pointer"
              onClick={handlePencilClick}
              _hover={{ opacity: 0.7 }}
            />
            <Image
              src={Cross}
              w={4}
              h={4}
              cursor="pointer"
              onClick={handleCrossClick}
              _hover={{ opacity: 0.7 }}
            />
          </HStack>
        </HStack>

        <HStack justify="space-between" width="full">
          <Text fontSize="xs" color="gray.600">
            Publishing to
          </Text>
          <Badge colorScheme="blue" size="sm">
            {cardData.accountCount} Accounts
          </Badge>
        </HStack>

        <HStack width="full" gap={2} flexWrap="wrap">
          {cardData.accounts.map((account, index) => (
            <Badge key={index} variant="outline" colorScheme="gray" size="sm">
              {account}
            </Badge>
          ))}
        </HStack>

        <Text fontSize="xs" color="gray.800" alignSelf="flex-start">
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
            <Image src={CalendarIcon} w={3} h={3} />
            <Text fontSize="xs" color="gray.600">
              {cardData.date}
            </Text>
          </HStack>
          <HStack>
            <Image src={TimeIcon} w={3} h={3} />
            <Text fontSize="xs" color="gray.600">
              {cardData.time}
            </Text>
          </HStack>
        </HStack>
      </VStack>
    </Portal>
  )
}

export const TimeGrid: React.FC<TimeGridProps> = ({ timeSlots, weekDays }) => {
  const { userId } = useAuthUtils()
  const [hoveredEvent, setHoveredEvent] = useState<string | null>(null)
  const [cardPosition, setCardPosition] = useState({ top: 0, left: 0 })
  const gridRef = useRef<HTMLDivElement>(null)
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const from = format(weekDays[0].date, "yyyy-MM-dd")
  const to = format(weekDays[weekDays.length - 1].date, "yyyy-MM-dd")

  const { data, isLoading } = useGetPostsByDate({
    from,
    to,
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

  const hasEventLaterInWeek = (
    currentDayIndex: number,
    timeSlotHour: number
  ) => {
    if (!data || !Array.isArray(data)) return null

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

  const getFirstTimelineDay = (timeSlotHour: number) => {
    if (!data || !Array.isArray(data)) return -1

    for (let dayIndex = 0; dayIndex < weekDays.length; dayIndex++) {
      const dayDate = weekDays[dayIndex].date
      const currentEvent = getEventInCell(dayDate, timeSlotHour)
      const laterEvent = hasEventLaterInWeek(dayIndex, timeSlotHour)

      if (currentEvent || laterEvent) {
        return dayIndex
      }
    }
    return -1
  }

  const handleMouseEnter = (eventId: string, event: React.MouseEvent) => {
    // Clear any existing timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
      hoverTimeoutRef.current = null
    }

    const rect = event.currentTarget.getBoundingClientRect()
    setCardPosition({
      top: rect.bottom + window.scrollY + 5,
      left: rect.left + window.scrollX,
    })
    setHoveredEvent(eventId)
  }

  const handleMouseLeave = () => {
    // Set timeout to hide card after 1 second
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredEvent(null)
    }, 1000)
  }

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
      }
    }
  }, [])

  if (isLoading) return <CircularLoading />

  const hoveredEventData = hoveredEvent
    ? (() => {
        const [dayIndex, timeIndex] = hoveredEvent.split("-").map(Number)
        const day = weekDays[dayIndex]
        const slot = timeSlots[timeIndex]
        return getEventInCell(day.date, slot.hour)
      })()
    : null

  return (
    <Box flex={1} mt={{ base: 2, md: 5 }} overflowY="hidden" overflowX={{ base: "auto", md: "hidden" }}>
      <WeekHeader weekDays={weekDays} />
      <Grid
        ref={gridRef}
        templateColumns={{ base: "40px repeat(7, 1fr)", md: "60px repeat(7, 1fr)" }}
        autoRows={{ base: "70px", md: "94px" }}
        position="sticky"
        top="0"
        zIndex="80"
        minWidth={{ base: "600px", md: "auto" }}
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
            pt={{ base: 1, md: 2 }}
            borderRight="1px solid"
            borderBottom="1px solid"
            borderColor={{ base: "primary.50", _dark: "primary.700" }}
          >
            <Text fontSize={{ base: "2xs", md: "xs" }} color="fg.MUTED" fontWeight="medium">
              {slot.label}
            </Text>
          </Box>
        ))}

        {/* Grid cells */}
        {weekDays.map((day, dayIndex) =>
          timeSlots.map((slot, timeIndex) => {
            const currentEvent = getEventInCell(day.date, slot.hour)
            const laterEvent = hasEventLaterInWeek(dayIndex, slot.hour)
            const firstTimelineDay = getFirstTimelineDay(slot.hour)
            const eventId = `${dayIndex}-${timeIndex}`

            return (
              <Box
                key={eventId}
                gridColumn={dayIndex + 2}
                gridRow={timeIndex + 1}
                position="relative"
                borderLeft={dayIndex === 0 ? "1px solid" : "none"}
                borderRight="1px solid"
                borderBottom="1px solid"
                backgroundColor={"white"}
                borderColor={{ base: "primary.50", _dark: "primary.700" }}
                _hover={{
                  bg: "primary.50",
                  _dark: { bg: "primary.800" },
                }}
                transition="background-color 0.2s"
                cursor="pointer"
              >
                {/* Timeline logic remains the same */}
                {!currentEvent && laterEvent && (
                  <Box
                    position="absolute"
                    top="0"
                    left="-1px"
                    right="-1px"
                    bottom="0"
                    zIndex="2"
                  >
                    <Box
                      position="absolute"
                      left="0"
                      right="0"
                      top="50%"
                      transform="translateY(-50%)"
                      height="4px"
                      backgroundColor="#003a6b"
                    />

                    {dayIndex === firstTimelineDay && (
                      <>
                        <Box
                          position="absolute"
                          left="-1px"
                          top="50%"
                          transform="translateY(-50%)"
                          width={{ base: "8px", md: "10px" }}
                          height={{ base: "8px", md: "10px" }}
                          backgroundColor="white"
                          borderRadius="50%"
                          border={{ base: "1.5px solid black", md: "2px solid black" }}
                          zIndex="5"
                        />
                        <Box
                          position="absolute"
                          left="8px"
                          top="8px"
                          backgroundColor="#003a6b"
                          color="white"
                          px={{ base: 1, md: 2 }}
                          py={{ base: 0.5, md: 1 }}
                          borderRadius="4px"
                          fontSize={{ base: "2xs", md: "xs" }}
                          fontWeight="medium"
                          minWidth={{ base: "30px", md: "35px" }}
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

                {currentEvent && (
                  <Box
                    position="absolute"
                    top="0"
                    left="-1px"
                    right="-1px"
                    bottom="0"
                    display="flex"
                    alignItems="center"
                    px={{ base: 1, md: 2 }}
                    backgroundColor="white"
                    zIndex="2"
                    onMouseEnter={(e) => handleMouseEnter(eventId, e)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {dayIndex === firstTimelineDay && (
                      <Box
                        position="absolute"
                        left="-1px"
                        top="50%"
                        transform="translateY(-50%)"
                        width={{ base: "8px", md: "10px" }}
                        height={{ base: "8px", md: "10px" }}
                        backgroundColor="white"
                        borderRadius="50%"
                        border={{ base: "1.5px solid gray", md: "2px solid gray" }}
                        zIndex="5"
                      />
                    )}

                    <Box
                      backgroundColor="white"
                      color="#003a6b"
                      px={{ base: 1, md: 2 }}
                      py={{ base: 0.5, md: 1 }}
                      borderRadius="12px 12px 12px 0"
                      fontSize={{ base: "2xs", md: "xs" }}
                      fontWeight="medium"
                      border="1px solid gray"
                      position={"relative"}
                      whiteSpace="nowrap"
                      boxShadowColor={"gray.100"}
                      flex={1}
                      boxShadow="0 2px 4px rgba(0,0,0,0.1)"
                      overflow="hidden"
                      textOverflow="ellipsis"
                    >
                      {currentEvent.title}
                      <Box
                        width={{ base: "6px", md: "10px" }}
                        height={{ base: "6px", md: "10px" }}
                        borderRadius="50%"
                        position={"absolute"}
                        top={-0.5}
                        right={-1}
                        backgroundColor="#003a6b"
                        ml={2}
                      />
                    </Box>
                  </Box>
                )}
              </Box>
            )
          })
        )}
      </Grid>

      {/* Portal Card outside of grid context */}
      {hoveredEventData && (
        <Card
          post={hoveredEventData.post}
          displayTime={hoveredEventData.displayTime}
          position={cardPosition}
          isVisible={hoveredEvent !== null}
        />
      )}
    </Box>
  )
}
