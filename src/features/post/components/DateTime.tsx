import * as React from "react"
import {
  Box,
  Field,
  Flex,
  Input,
  Text,
  VStack,
  HStack,
  Badge,
  Image,
  Span,
} from "@chakra-ui/react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { format, addMinutes, isAfter, isSameDay } from "date-fns"
import { useScheduleStore } from "../lib/store/dateTime"
import { useState, useEffect, useCallback, useMemo } from "react"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { TimePicker } from "@mui/x-date-pickers/TimePicker"
import Test from "../../../assets/schedule.svg"
import { IoIosArrowDown } from "react-icons/io"

import { TiTick } from "react-icons/ti"

export default function DateTime({
  setvalue,
  scheduled,
}: {
  setvalue: any
  scheduled: any
}) {
  const { setIsScheduled, isScheduled } = useScheduleStore()
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    scheduled ? new Date(scheduled) : null
  )
  const [selectedTime, setSelectedTime] = useState<any>(null)

  // Get current time dynamically - not memoized to avoid stale closures
  const getCurrentTime = useCallback(() => new Date(), [])
  const getMinAllowedDateTime = useCallback(
    () => addMinutes(getCurrentTime(), 5),
    []
  )

  // Combine date and time when both are selected
  useEffect(() => {
    if (selectedDate && selectedTime) {
      const timeValue = selectedTime
      const hours = timeValue.hour()
      const minutes = timeValue.minute()

      // Create combined date-time
      const combinedDateTime = new Date(selectedDate)
      combinedDateTime.setHours(hours, minutes, 0, 0)

      const now = getCurrentTime()
      const minAllowed = getMinAllowedDateTime()

      console.log(
        "Combined DateTime:",
        format(combinedDateTime, "yyyy-MM-dd HH:mm:ss")
      )
      console.log("Current Time:", format(now, "yyyy-MM-dd HH:mm:ss"))
      console.log("Min Required:", format(minAllowed, "yyyy-MM-dd HH:mm:ss"))

      // Check if combined date-time is at least 5 minutes in future
      if (isAfter(combinedDateTime, minAllowed)) {
        console.log("✅ Valid: Date-time is at least 5 minutes in future")
        setvalue(
          "scheduled_time",
          format(combinedDateTime, "yyyy-MM-dd'T'HH:mm:ssxxx"),
          {
            shouldValidate: true,
          }
        )
        setIsScheduled(true)
      } else {
        console.log(
          "❌ Invalid: Date-time must be at least 5 minutes in future"
        )
        setvalue("scheduled_time", null, { shouldValidate: true })
        setIsScheduled(false)
      }
    } else {
      // Clear if either date or time is missing
      setvalue("scheduled_time", null, { shouldValidate: true })
      setIsScheduled(false)
    }
  }, [
    selectedDate,
    selectedTime,
    setvalue,
    setIsScheduled,
    getCurrentTime,
    getMinAllowedDateTime,
  ])

  // Set scheduling mode when date is selected
  useEffect(() => {
    if (selectedDate) {
      // Set scheduling mode as soon as date is selected
      setIsScheduled(true)

      if (selectedTime) {
        // Full validation only when both are selected
        const timeValue = selectedTime
        const hours = timeValue.hour()
        const minutes = timeValue.minute()
        const combinedDateTime = new Date(selectedDate)
        combinedDateTime.setHours(hours, minutes, 0, 0)

        const minAllowed = getMinAllowedDateTime()

        if (isAfter(combinedDateTime, minAllowed)) {
          setvalue(
            "scheduled_time",
            format(combinedDateTime, "yyyy-MM-dd'T'HH:mm:ssxxx"),
            {
              shouldValidate: true,
            }
          )
        } else {
          setvalue("scheduled_time", null, { shouldValidate: true })
        }
      } else {
        setvalue("scheduled_time", null, { shouldValidate: true })
      }
    } else {
      // Clear scheduling mode when no date
      setIsScheduled(false)
      setvalue("scheduled_time", null, { shouldValidate: true })
    }
  }, [
    selectedDate,
    selectedTime,
    setvalue,
    setIsScheduled,
    getMinAllowedDateTime,
  ])

  const handleDateChange = useCallback(
    (date: Date | null) => {
      console.log("Date selected:", date ? format(date, "yyyy-MM-dd") : "None")

      if (!date) {
        setSelectedDate(null)
        setSelectedTime(null)
        return
      }

      const now = getCurrentTime()
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

      // Don't allow past dates
      if (date < today) {
        console.log("❌ Past date not allowed")
        return
      }

      setSelectedDate(date)
      // Clear time when date changes
      setSelectedTime(null)
    },
    [getCurrentTime]
  )

  // Memoize the callback to prevent infinite loops
  const handleTimeFromDemo = useCallback((timeValue: any) => {
    console.log("Time received from Demo:", timeValue)
    setSelectedTime(timeValue)
  }, [])

  const inputStyles = useMemo(
    () => ({
      pr: "3rem",
      pl: "3rem",
      h: "58px", // Use exact pixel value to match the time picker
      bg: "bg.DEFAULT",
      selfAlign: "first",
      border: "1px solid", // Match the time picker border width
      borderColor: "gray.300",
      borderRadius: "5px", // Match the time picker border radius
      fontSize: "sm",
      fontWeight: "medium",
      transition: "all 0.2s ease",

      _hover: {
        borderColor: "secondary.300",
        boxShadow: "0 0 0 1px var(--chakra-colors-secondary-200)",
      },
      _focus: {
        borderColor: "secondary.500",
        boxShadow: "0 0 0 3px var(--chakra-colors-secondary-100)",
        outline: "none",
      },
      _placeholder: {
        color: "fg.MUTED",
        fontSize: "sm",
      },
    }),
    []
  )
  const now = getCurrentTime()
  // const minAllowedDateTime = getMinAllowedDateTime()

  return (
    <Box>
      <VStack spaceY={6} align="stretch" w="full">
        <Flex direction={{ base: "column", lg: "row" }} gap={4} align="stretch">
          {/* Date Picker */}
          <Field.Root flex="1">
            <Field.Label
              fontSize="sm"
              fontWeight="bold"
              color="#00325c"
              mb={2}
              display="flex"
              alignItems="center"
              gap={2}
            >
              Published Date
              <Span color={"red.600"}>*</Span>
            </Field.Label>
            <Box position="relative">
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="EEEE, MMM dd, yyyy"
                placeholderText="Select the date"
                showTimeInput={false}
                customInput={<Input {...inputStyles} />}
                minDate={now} // Prevent past dates
                filterDate={(date) => {
                  const today = new Date(
                    now.getFullYear(),
                    now.getMonth(),
                    now.getDate()
                  )
                  return date >= today
                }}
                popperProps={{
                  strategy: "fixed",
                }}
              />
              {/* <Icon
                as={FaCalendarAlt}
                position="absolute"
                left="3"
                top="50%"
                transform="translateY(-50%)"
                color="green.500"
                pointerEvents="none"
                boxSize="1rem"
              /> */}
              <IoIosArrowDown
                style={{
                  position: "absolute",
                  right: "13",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "gray",
                }}
              />

              {/* {selectedDate && (
                <Icon
                  as={FaCheckCircle}
                  position="absolute"
                  right="3"
                  top="50%"
                  transform="translateY(-50%)"
                  color="green.500"
                  boxSize="1rem"
                />
              )} */}
            </Box>
          </Field.Root>

          <Field.Root flex="1">
            <Field.Label
              fontSize="sm"
              fontWeight="bold"
              color="#00325c"
              mb={2}
              display="flex"
              alignItems="center"
              gap={2}
            >
              Publication Time
              <Span color={"red.600"}>*</Span>
            </Field.Label>
            <Box position="relative">
              {/* Enhanced Demo component that passes time back */}
              <EnhancedDemo
                selectedDate={selectedDate}
                onTimeChange={handleTimeFromDemo}
                getCurrentTime={getCurrentTime}
                getMinAllowedDateTime={getMinAllowedDateTime}
              />
            </Box>
          </Field.Root>
        </Flex>

        {/* UPDATED SCHEDULED CARD - MATCHING FIGMA DESIGN */}
        {selectedDate && selectedTime && isScheduled && (
          <Box
            p={4}
            bg="#f0f8ff"
            borderRadius="16px"
            border="1px solid"
            // borderColor="rgba(99, 102, 241, 0.15)"
            borderColor="#f0f8ff"
            position="relative"
            overflow="hidden"
            transition="all 0.2s ease"
            _hover={{
              bg: "#f0f8ff",
              borderColor: "#f0f8ff",
            }}
            _dark={{
              bg: "rgba(99, 102, 241, 0.1)",
              borderColor: "rgba(99, 102, 241, 0.2)",
            }}
          >
            {/* Top accent line - matching purple theme */}
            <Box
              position="absolute"
              top="0"
              left="0"
              right="0"
              height="2px"
              bgGradient="linear(to-r, purple.400, blue.400)"
            />

            <Flex align="center" gap={4}>
              {/* Calendar Icon/Image */}
              <Box
                flexShrink={0}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Image
                  src={Test}
                  alt="Schedule icon"
                  height={44}
                  width={44}
                  boxSize="40px"
                />
              </Box>

              {/* Content Section - Date and Time */}
              <Flex flex={1} direction="column" gap={1}>
                {/* Date - matching Figma format "7 Aug,2025" */}
                <Text
                  fontSize="md"
                  fontWeight="600"
                  color="gray.900"
                  lineHeight="1.2"
                  _dark={{ color: "gray.100" }}
                >
                  {format(selectedDate, "d MMM,yyyy")}
                </Text>

                {/* Time with clock icon */}
                <HStack gap={2} align="center">
                  {/* <Icon as={FaClock} color="gray.500" boxSize="12px" /> */}
                  <Text
                    fontSize="sm"
                    color="black"
                    fontWeight="500"
                    _dark={{ color: "gray.400" }}
                  >
                    {selectedTime.format("h:mm A")}
                  </Text>
                </HStack>
              </Flex>

              {/* Status Badge - Right aligned */}
              <Box flexShrink={0}>
                <Badge
                  bg="white"
                  border="1px solid"
                  borderColor="#005399"
                  borderRadius="full"
                  px={3}
                  py={1}
                  fontSize="xs"
                  fontWeight="600"
                  textTransform="none"
                  _dark={{
                    bg: "rgba(34, 197, 94, 0.15)",
                    color: "green.400",
                    borderColor: "rgba(34, 197, 94, 0.3)",
                  }}
                >
                  <Span color="#005399">Scheduled</Span>
                  <Box backgroundColor={"#005399"} borderRadius={"full"}>
                    <TiTick color="white" />
                  </Box>
                </Badge>
              </Box>
            </Flex>
          </Box>
        )}

        {/* <Box
          p={3}
          bg="blue.50"
          borderLeft="4px solid"
          borderLeftColor="blue.400"
          borderRadius="md"
        >
          <HStack>
            <Icon as={FaClock} color="blue.500" boxSize={4} />
            <Text fontSize="sm" color="blue.700" fontWeight="medium">
              <strong>Scheduling Rules:</strong> You can schedule for today if
              it's at least 5 minutes from now (
              {format(minAllowedDateTime, "h:mm a")}), or any time on future
              dates.
            </Text>
          </HStack>
        </Box> */}
      </VStack>
    </Box>
  )
}

// Enhanced Demo component that communicates with parent
const EnhancedDemo = React.memo(function EnhancedDemo({
  selectedDate,
  onTimeChange,
  getCurrentTime,
  getMinAllowedDateTime,
}: {
  selectedDate: Date | null
  onTimeChange: (time: any) => void
  getCurrentTime: () => Date
  getMinAllowedDateTime: () => Date
}) {
  const [value, setValue] = useState<any>(null)
  const [isInvalidTime, setIsInvalidTime] = useState(false)
  // const [isFocused, setIsFocused] = useState(false)

  // Clear time when date changes
  useEffect(() => {
    setValue(null)
    setIsInvalidTime(false)
    if (onTimeChange) {
      onTimeChange(null)
    }
  }, [selectedDate, onTimeChange])

  const validateTime = useCallback(
    (timeValue: any) => {
      if (!timeValue || !selectedDate) return true

      const now = getCurrentTime()

      // For today, validate the 5-minute gap
      if (isSameDay(selectedDate, now)) {
        const combinedDateTime = new Date(selectedDate)
        combinedDateTime.setHours(timeValue.hour(), timeValue.minute(), 0, 0)
        const minAllowedDateTime = getMinAllowedDateTime()

        return isAfter(combinedDateTime, minAllowedDateTime)
      }

      // For future dates, any time is allowed
      return true
    },
    [selectedDate, getCurrentTime, getMinAllowedDateTime]
  )

  const handleTimeChange = useCallback(
    (newValue: any) => {
      console.log("Time change in EnhancedDemo:", newValue?.format("HH:mm"))

      if (!newValue) {
        setValue(null)
        setIsInvalidTime(false)
        onTimeChange(null)
        return
      }

      // Always update the display value to allow smooth editing
      setValue(newValue)

      // Validate the time
      const isValid = validateTime(newValue)
      setIsInvalidTime(!isValid)

      if (isValid) {
        console.log("✅ Valid time selected")
        onTimeChange(newValue)
      } else {
        console.log("❌ Invalid time - too close to current time")
        onTimeChange(null) // Clear the parent's time value but keep the display
      }
    },
    [onTimeChange, validateTime]
  )

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div style={{ position: "relative" }}>
        <TimePicker
          label="Select the Time "
          value={value}
          onChange={handleTimeChange}
          disabled={!selectedDate}
          format="HH:mm"
          sx={{
            width: "100%",
            "& .MuiInputBase-root": {
              height: "48px",
              borderRadius: "12px",
              backgroundColor: "#ffffff",
              border: isInvalidTime ? "2px solid #e53e3e" : "2px solid #000000",
              fontSize: "14px",
              fontWeight: 500,
              transition: "all 0.2s ease",
              "&:hover": {
                borderColor: isInvalidTime ? "#e53e3e" : "#48bb78",
              },
            },
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "& .MuiInputBase-input": {
              padding: "0 48px !important",
              textAlign: "left",
              color: value ? "#2d3748" : "transparent", // hides hh mm aa until value exists
              caretColor: value ? "auto" : "transparent", // hides cursor when empty
            },
          }}
          slotProps={{
            textField: {
              placeholder: "", // remove MUI's placeholder
            },
          }}
        />
      </div>
      {isInvalidTime &&
        selectedDate &&
        isSameDay(selectedDate, getCurrentTime()) && (
          <Text fontSize="xs" color="red.500" mt={1} fontWeight="medium">
            Time must be at least 5 minutes from now
          </Text>
        )}
    </LocalizationProvider>
  )
})