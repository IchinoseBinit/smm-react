import { Box, Field, Flex, Icon, Input } from "@chakra-ui/react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { FaCalendarAlt } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
import "./DateTime.css";

export default function DateTime({ register }: { register: any }) {
  const [date, setDate] = useState();
  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      w="80%"
      gap={{ base: "4", md: "0" }}
    >
      <Field.Root required w="full">
        <Field.Label fontSize="sm" color="fg.DEFAULT" mb={1}>
          Select Date
        </Field.Label>
        <Box position="relative" w="240px">
          <DatePicker
            selected={date}
            onChange={(d: any) => setDate(d)}
            calendarClassName="customDatepicker"
            dateFormat="MM/dd/yyyy"
            placeholderText="Select Start Date"
            showTimeInput={false}
            customInput={<Input {...register("date")} pr="2.5rem" />}
          />
          <Icon
            as={FaCalendarAlt}
            position="absolute"
            right="1.5rem"
            top="50%"
            transform="translateY(-50%)"
            color="fg.MUTED"
            pointerEvents="none"
            boxSize="1rem"
          />
        </Box>
      </Field.Root>
      <Field.Root required w="240px">
        <Field.Label fontSize="sm" color="fg.DEFAULT" mb={1}>
          Select Time
        </Field.Label>

        <Box position="relative" w="240px">
          <DatePicker
            selected={date}
            onChange={(d: any) => setDate(d)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeFormat="HH:mm"
            dateFormat="HH:mm"
            placeholderText="Select Time"
            calendarClassName="customTimepicker"
            customInput={<Input {...register("time")} pr="2.5rem" />}
          />
        </Box>
      </Field.Root>
    </Flex>
  );
}
