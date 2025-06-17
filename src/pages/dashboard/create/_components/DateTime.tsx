import { Box, Field, HStack, Icon, Input } from "@chakra-ui/react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { FaCalendarAlt } from "react-icons/fa";
import styles from "./DateTime.module.css";
import "react-time-picker/dist/TimePicker.css";
import TimePicker from "react-time-picker";

export default function DateTime({ setValue }: { setValue: any }) {
  const [date, setDate] = useState(null);
  return (
    <HStack spaceX={4}>
      <Field.Root required w="full">
        <Field.Label fontSize="sm" color="fg.DEFAULT" mb={1}>
          Select Date
        </Field.Label>
        <Box position="relative" w="240px">
          <DatePicker
            wrapperClassName={styles.wrapper}
            calendarClassName={styles.customDatepicker}
            selected={date}
            onChange={(d) => {
              if (d) return;
              setDate(d);
              setValue("date", d);
            }}
            dateFormat="yyyy-MM-dd"
            customInput={
              <Input
                pr="2.5rem"
                borderWidth="thin"
                rounded="md"
                fontSize="sm"
                px={3}
                py={2}
                _hover={{ bg: "bg.SURFACE" }}
                _focusVisible={{
                  boxShadow: "0 0 0 2px var(--chakra-colors-border-FOCUS)",
                }}
              />
            }
          />
          <Icon
            as={FaCalendarAlt}
            position="absolute"
            right="0.75rem"
            top="50%"
            transform="translateY(-50%)"
            color="fg.MUTED"
            pointerEvents="none"
            boxSize="1rem"
          />
        </Box>
      </Field.Root>
      <Field.Root required w="full">
        <Field.Label fontSize="sm" color="fg.DEFAULT" mb={1}>
          Select Time
        </Field.Label>
        <Box position="relative" w="full">
          <TimePicker
            onChange={(t) => {
              setValue("time", t);
            }}
            format="HH:mm"
          />
        </Box>
      </Field.Root>
    </HStack>
  );
}
