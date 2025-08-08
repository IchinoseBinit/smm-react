import * as React from "react"
import {
  Box,
  Field,
  Flex,
  Icon,
  Input,
  Text,
  VStack,
  HStack,
  Badge,
} from "@chakra-ui/react"
import DatePicker from "react-datepicker"
import { FaCalendarAlt, FaClock, FaCheckCircle } from "react-icons/fa"
import "react-datepicker/dist/react-datepicker.css"
import { format, addHours, isAfter } from "date-fns"
import { useScheduleStore } from "../lib/store/dateTime"
import { useState, useEffect, useCallback, useMemo } from "react"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { TimePicker } from "@mui/x-date-pickers/TimePicker"

export default function DateTime({ setvalue, scheduled }: { setvalue: any; scheduled: any }) {
  const { setIsScheduled, isScheduled } = useScheduleStore()
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    scheduled ? new Date(scheduled) : null
  )
  const [selectedTime, setSelectedTime] = useState<any>(null)

  // Memoize the current time and minimum allowed time to prevent infinite re-renders
  const now = useMemo(() => new Date(), [])
  const minAllowedDateTime = useMemo(() => addHours(now, 1), [now])

  // Combine date and time when both are selected
  useEffect(() => {
    if (selectedDate && selectedTime) {
      // Get the dayjs time value and extract hours/minutes
      const timeValue = selectedTime
      const hours = timeValue.hour()
      const minutes = timeValue.minute()

      // Create combined date-time
      const combinedDateTime = new Date(selectedDate)
      combinedDateTime.setHours(hours, minutes, 0, 0)

      console.log(
        "Combined DateTime:",
        format(combinedDateTime, "yyyy-MM-dd HH:mm:ss")
      )
      console.log("Current Time:", format(now, "yyyy-MM-dd HH:mm:ss"))
      console.log(
        "Min Required:",
        format(minAllowedDateTime, "yyyy-MM-dd HH:mm:ss")
      )

      // Check if combined date-time is at least 1 hour in future
      if (isAfter(combinedDateTime, minAllowedDateTime)) {
        console.log("✅ Valid: Date-time is at least 1 hour in future")
        setvalue(
          "scheduled_time",
          format(combinedDateTime, "yyyy-MM-dd'T'HH:mm:ssxxx"),
          {
            shouldValidate: true,
          }
        )
        setIsScheduled(true)
      } else {
        console.log("❌ Invalid: Date-time must be at least 1 hour in future")
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
    minAllowedDateTime,
    now,
  ])

  // In DateTime.tsx, modify the useEffect to set scheduling mode when date is selected:
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

        if (isAfter(combinedDateTime, minAllowedDateTime)) {
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
    minAllowedDateTime,
    now,
  ])

  const handleDateChange = useCallback(
    (date: Date | null) => {
      console.log("Date selected:", date ? format(date, "yyyy-MM-dd") : "None")

      if (!date) {
        setSelectedDate(null)
        setSelectedTime(null)
        return
      }

      // Don't allow past dates
      if (date < new Date(now.getFullYear(), now.getMonth(), now.getDate())) {
        console.log("❌ Past date not allowed")
        return
      }

      setSelectedDate(date)
      // Clear time when date changes
      setSelectedTime(null)
    },
    [now]
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
      h: "12",
      bg: "bg.DEFAULT",
      border: "2px solid",
      borderColor: "border.DEFAULT",
      borderRadius: "xl",
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

  return (
    <Box>
      <VStack spaceY={6} align="stretch" w="full">
        <Box>
          <HStack mb={2} align="center">
            <Text fontSize="lg" fontWeight="semibold" color="fg.DEFAULT">
              Schedule Settings
            </Text>
          </HStack>
          <Text fontSize="sm" color="fg.MUTED">
            Choose when you want your post to be published (must be at least 1
            hour in the future)
          </Text>
        </Box>

        <Flex direction={{ base: "column", lg: "row" }} gap={4} align="stretch">
          {/* Date Picker */}
          <Field.Root flex="1">
            <Field.Label
              fontSize="sm"
              fontWeight="bold"
              color="fg.DEFAULT"
              mb={2}
              display="flex"
              alignItems="center"
              gap={2}
            >
              Publication Date
            </Field.Label>
            <Box position="relative">
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="EEEE, MMM dd, yyyy"
                placeholderText="Select publication date"
                showTimeInput={false}
                customInput={<Input {...inputStyles} />}
                minDate={now} // Prevent past dates
                filterDate={(date) =>
                  date >=
                  new Date(now.getFullYear(), now.getMonth(), now.getDate())
                }
                popperProps={{
                  strategy: "fixed",
                }}
              />
              <Icon
                as={FaCalendarAlt}
                position="absolute"
                left="3"
                top="50%"
                transform="translateY(-50%)"
                color="green.500"
                pointerEvents="none"
                boxSize="1rem"
              />
              {selectedDate && (
                <Icon
                  as={FaCheckCircle}
                  position="absolute"
                  right="3"
                  top="50%"
                  transform="translateY(-50%)"
                  color="green.500"
                  boxSize="1rem"
                />
              )}
            </Box>
          </Field.Root>

          <Field.Root flex="1">
            <Field.Label
              fontSize="sm"
              fontWeight="bold"
              color="fg.DEFAULT"
              mb={2}
              display="flex"
              alignItems="center"
              gap={2}
            >
              Publication Time
            </Field.Label>
            <Box position="relative">
              {/* Enhanced Demo component that passes time back */}
              <EnhancedDemo
                selectedDate={selectedDate}
                onTimeChange={handleTimeFromDemo}
                minAllowedDateTime={minAllowedDateTime}
              />
            </Box>
          </Field.Root>
        </Flex>

        {selectedDate && selectedTime && isScheduled && (
          <Box
            p={5}
            bg="green.50"
            borderRadius="xl"
            border="2px solid"
            borderColor="green.200"
            position="relative"
            overflow="hidden"
            transform="scale(1)"
            transition="all 0.2s ease"
            _hover={{
              transform: "scale(1.02)",
              boxShadow: "lg",
            }}
            _dark={{
              bg: "green.900",
              borderColor: "green.700",
            }}
          >
            <Box
              position="absolute"
              top="0"
              left="0"
              right="0"
              height="3px"
              bgGradient="linear(to-r, green.400, green.600)"
            />

            <Flex align="center" justify="space-between">
              <HStack gap={4}>
                <Box
                  p={3}
                  bg="green.500"
                  borderRadius="lg"
                  color="white"
                  boxShadow="md"
                >
                  <Icon as={FaCalendarAlt} boxSize="1.25rem" />
                </Box>
                <VStack align="start" gap={2}>
                  <HStack>
                    <Badge
                      colorScheme="green"
                      size="sm"
                      borderRadius="full"
                      px={3}
                      py={1}
                      fontWeight="semibold"
                    >
                      ✓ Scheduled
                    </Badge>
                  </HStack>
                  <Text
                    fontSize="lg"
                    fontWeight="bold"
                    color="fg.DEFAULT"
                    lineHeight="short"
                  >
                    {format(selectedDate, "EEEE, MMMM do, yyyy")}
                  </Text>
                  <HStack gap={2}>
                    <Icon as={FaClock} color="green.600" boxSize={3} />
                    <Text
                      fontSize="sm"
                      color="green.600"
                      fontWeight="medium"
                      _dark={{ color: "green.300" }}
                    >
                      {selectedTime.format("h:mm A")}
                    </Text>
                  </HStack>
                </VStack>
              </HStack>
            </Flex>
          </Box>
        )}

        <Box
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
              it's at least 1 hour from now (
              {format(minAllowedDateTime, "h:mm a")}), or any time on future
              dates.
            </Text>
          </HStack>
        </Box>
      </VStack>
    </Box>
  )
}

// Enhanced Demo component that communicates with parent
const EnhancedDemo = React.memo(function EnhancedDemo({
  selectedDate,
  onTimeChange,
  minAllowedDateTime,
}: {
  selectedDate: Date | null
  onTimeChange: (time: any) => void
  minAllowedDateTime: Date
}) {
  const [value, setValue] = useState<any>(null)

  // Clear time when date changes
  useEffect(() => {
    setValue(null)
    if (onTimeChange) {
      onTimeChange(null)
    }
  }, [selectedDate]) // Only depend on selectedDate

  const shouldDisableTime = useCallback(
    (timeValue: any) => {
      if (!timeValue || !selectedDate) return false

      // Create combined date-time for validation
      const combinedDateTime = new Date(selectedDate)
      combinedDateTime.setHours(timeValue.hour(), timeValue.minute(), 0, 0)

      // Check if combined date-time is at least 1 hour in future
      const isValid = isAfter(combinedDateTime, minAllowedDateTime)

      console.log("Time validation:", {
        selectedTime: timeValue.format("HH:mm"),
        selectedDate: format(selectedDate, "yyyy-MM-dd"),
        combinedDateTime: format(combinedDateTime, "yyyy-MM-dd HH:mm"),
        minRequired: format(minAllowedDateTime, "yyyy-MM-dd HH:mm"),
        isValid,
      })

      return !isValid
    },
    [selectedDate, minAllowedDateTime]
  )

  const handleTimeChange = useCallback(
    (newValue: any) => {
      console.log("Time change in EnhancedDemo:", newValue?.format("HH:mm"))

      if (!newValue) {
        setValue(null)
        onTimeChange(null)
        return
      }

      if (shouldDisableTime(newValue)) {
        console.log("Time blocked - not enough gap")
        return
      }

      setValue(newValue)
      onTimeChange(newValue)
    },
    [onTimeChange, shouldDisableTime]
  )

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        value={value}
        onChange={handleTimeChange}
        shouldDisableTime={shouldDisableTime}
        disabled={!selectedDate} // Disable if no date selected
        sx={{
          width: "100%",
          "& .MuiInputBase-root": {
            height: "48px",
            borderRadius: "12px",
            backgroundColor: "#ffffff",
            border: "2px solid #000000",
            fontSize: "14px",
            fontWeight: 500,
            transition: "all 0.2s ease",
            position: "relative",
            "&:hover": {
              borderColor: "#48bb78",
              boxShadow: "0 0 0 1px rgba(72, 187, 120, 0.3)",
            },
            "&.Mui-focused": {
              borderColor: "#48bb78",
              boxShadow: "0 0 0 3px rgba(72, 187, 120, 0.1)",
            },
            "&::before": {
              content: '"🕐"',
              position: "absolute",
              left: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: "16px",
              zIndex: 1,
              pointerEvents: "none",
            },
            "&::after": value
              ? {
                  content: '"✅"',
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: "16px",
                  zIndex: 1,
                  pointerEvents: "none",
                }
              : {},
          },
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
          "& .MuiInputBase-input": {
            padding: "0 48px !important",
            textAlign: "left",
            color: value ? "#2d3748" : "#a0aec0",
            "&::placeholder": {
              color: "#a0aec0",
              opacity: 1,
            },
          },
        }}
        slotProps={{
          textField: {
            placeholder: selectedDate
              ? "Select publication time"
              : "Select date first",
            InputProps: {
              style: {
                paddingLeft: "48px",
                paddingRight: "48px",
              },
            },
          },
          openPickerButton: {
            sx: {
              color: "#48bb78",
              position: "absolute",
              right: "8px",
              "&:hover": {
                backgroundColor: "rgba(72, 187, 120, 0.08)",
              },
            },
          },
        }}
      />
    </LocalizationProvider>
  )
})
