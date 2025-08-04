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
import { format } from "date-fns"
import { useScheduleStore } from "../lib/store/dateTime"

export default function DateTime({
  setvalue,
  register,
  scheduled,
}: {
  setvalue: any
  register: any
  scheduled: any
}) {
  const setIsScheduled = useScheduleStore((s) => s.setIsScheduled)
  const selectedDate = scheduled ? new Date(scheduled) : null
  const now = new Date()

  const handleDateTimeChange = (date: Date | null) => {
    if (!date) {
      setvalue("scheduled_time", null, { shouldValidate: true })
      setIsScheduled(false)
    } else {
      // Prevent setting past date/time
      if (date <= now) {
        return // Don't allow past dates
      }

      setvalue("scheduled_time", format(date, "yyyy-MM-dd'T'HH:mm:ssxxx"), {
        shouldValidate: true,
      })
      setIsScheduled(true)
    }
  }

  // Filter function to disable past times
  const filterTime = (time: Date) => {
    const current = new Date()

    // If selected date is today, only show future times
    if (
      selectedDate &&
      selectedDate.toDateString() === current.toDateString()
    ) {
      return time.getTime() > current.getTime()
    }

    // For future dates, allow all times
    return true
  }

  const inputStyles = {
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
  }

  return (
    <Box>
      <VStack spaceY={6} align="stretch" w="full">
        {/* Header Section */}
        <Box>
          <HStack mb={2} align="center">
            {/* <Icon as={FaCalendarAlt} color="secondary.500" boxSize={5} /> */}
            <Text fontSize="lg" fontWeight="semibold" color="fg.DEFAULT">
              Schedule Settings
            </Text>
          </HStack>
          <Text fontSize="sm" color="fg.MUTED">
            Choose when you want your post to be published (future dates only)
          </Text>
        </Box>

        {/* Date & Time Inputs */}
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
              {/* <Icon as={FaCalendarAlt} color="secondary.400" boxSize={4} /> */}
              Publication Date
            </Field.Label>
            <Box position="relative">
              <DatePicker
                selected={selectedDate}
                onChange={handleDateTimeChange}
                dateFormat="EEEE, MMM dd, yyyy"
                placeholderText="Select publication date"
                showTimeInput={false}
                customInput={
                  <Input {...register("scheduled_time")} {...inputStyles} />
                }
                minDate={now} // Prevent past dates
                filterDate={(date) => date >= now}
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
                color="secondary.400"
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

          {/* Time Picker */}
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
              {/* <Icon as={FaClock} color="secondary.400" boxSize={4} /> */}
              Publication Time
            </Field.Label>
            <Box position="relative">
              <DatePicker
                selected={selectedDate}
                onChange={handleDateTimeChange}
                showTimeSelect
                showTimeSelectOnly
                filterTime={filterTime} // Filter past times
                timeIntervals={15}
                timeFormat="h:mm aa"
                dateFormat="h:mm aa"
                placeholderText="Select time"
                customInput={
                  <Input {...register("scheduled_time")} {...inputStyles} />
                }
                popperProps={{
                  strategy: "fixed",
                }}
              />
              {/* Left Icon */}
              <Icon
                as={FaClock}
                position="absolute"
                left="3"
                top="50%"
                transform="translateY(-50%)"
                color="secondary.400"
                pointerEvents="none"
                boxSize="1rem"
              />
              {/* Right Status Icon */}
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
        </Flex>

        {/* Preview Section */}
        {selectedDate && (
          <Box
            p={5}
            bg="secondary.50"
            borderRadius="xl"
            border="2px solid"
            borderColor="secondary.200"
            position="relative"
            overflow="hidden"
            transform="scale(1)"
            transition="all 0.2s ease"
            _hover={{
              transform: "scale(1.02)",
              boxShadow: "lg",
            }}
            _dark={{
              bg: "secondary.900",
              borderColor: "secondary.700",
            }}
          >
            {/* Top gradient line */}
            <Box
              position="absolute"
              top="0"
              left="0"
              right="0"
              height="3px"
              bgGradient="linear(to-r, secondary.400, secondary.600)"
            />

            <Flex align="center" justify="space-between">
              <HStack gap={4}>
                <Box
                  p={3}
                  bg="secondary.500"
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
                    <Icon as={FaClock} color="secondary.600" boxSize={3} />
                    <Text
                      fontSize="sm"
                      color="secondary.600"
                      fontWeight="medium"
                      _dark={{ color: "secondary.300" }}
                    >
                      {format(selectedDate, "h:mm aa")}
                    </Text>
                  </HStack>
                </VStack>
              </HStack>
            </Flex>
          </Box>
        )}
      </VStack>
    </Box>
  )
}
