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
import Demo from "./Demo"

export default function DateTime({
  setvalue,
  register,
  scheduled,
}: {
  setvalue: any
  register: any
  scheduled: any
}) {
  const { setIsScheduled, isScheduled } = useScheduleStore()
  const selectedDate = scheduled ? new Date(scheduled) : null
  const now = new Date()

  const handleDateTimeChange = (date: Date | null) => {
    if (!date) {
      setvalue("scheduled_time", null, { shouldValidate: true })
      setIsScheduled(false)
    } else {
      if (date <= now) {
        return // Don't allow past dates
      }

      setvalue("scheduled_time", format(date, "yyyy-MM-dd'T'HH:mm:ssxxx"), {
        shouldValidate: true,
      })
      setIsScheduled(true)
    }
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
        <Box>
          <HStack mb={2} align="center">
            <Text fontSize="lg" fontWeight="semibold" color="fg.DEFAULT">
              Schedule Settings
            </Text>
          </HStack>
          <Text fontSize="sm" color="fg.MUTED">
            Choose when you want your post to be published (future dates and
            times only)
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
                color="green.500" // Changed to green
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
              {/* Hidden input for form registration */}
              <Input
                {...register("scheduled_time")}
                placeholder="Select time"
                readOnly
                style={{
                  opacity: 0,
                  position: "absolute",
                  zIndex: -1,
                  pointerEvents: "none",
                }}
              />

              <Demo />

              <Icon
                as={FaClock}
                position="absolute"
                left="3"
                top="50%"
                transform="translateY(-50%)"
                color="green.500" // Changed to green
                pointerEvents="none"
                boxSize="1rem"
                zIndex="2"
              />
            </Box>
          </Field.Root>
        </Flex>

        {selectedDate && isScheduled && (
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
            {/* Top gradient line */}
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
                      {format(selectedDate, "h:mm aa")}
                    </Text>
                  </HStack>
                </VStack>
              </HStack>
            </Flex>
          </Box>
        )}

        <Box
          p={3}
          bg="orange.50"
          borderLeft="4px solid"
          borderLeftColor="orange.400"
          borderRadius="md"
        >
          <HStack>
            <Icon as={FaClock} color="orange.500" boxSize={4} />
            <Text fontSize="sm" color="orange.700" fontWeight="medium">
              <strong>Reminder:</strong> Scheduling is only allowed for future
              dates and times. You won't be able to select any time that's
              already passed today.
            </Text>
          </HStack>
        </Box>
      </VStack>
    </Box>
  )
}
