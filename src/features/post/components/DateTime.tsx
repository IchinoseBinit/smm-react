import { Box, Field, Flex, Icon, Input } from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import { FaCalendarAlt } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
import "../css/DateTime.css";
import { format } from "date-fns";
import { useScheduleStore } from "../lib/store/dateTime";

export default function DateTime({
  setvalue,
  register,
  scheduled,
}: {
  setvalue: any;
  register: any;
  scheduled: any;
}) {
  const setIsScheduled = useScheduleStore((s) => s.setIsScheduled);
  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      w="80%"
      gap={{ base: "4", md: "0" }}
    >
      <Field.Root w="full">
        <Field.Label fontSize="sm" color="fg.DEFAULT" mb={1}>
          Select Date
        </Field.Label>
        <Box position="relative">
          <DatePicker
            selected={scheduled ? new Date(scheduled) : null}
            onChange={(d: any) => {
              if (!d) {
                setvalue("scheduled_time", null, { shouldValidate: true });
                setIsScheduled(false);
              } else {
                setvalue(
                  "scheduled_time",
                  format(d, "yyyy-MM-dd'T'HH:mm:ssxxx"),
                  {
                    shouldValidate: true,
                  },
                );
                setIsScheduled(true);
              }
            }}
            calendarClassName="customDatepicker"
            dateFormat="MM/dd/yyyy"
            placeholderText="Select Start Date"
            showTimeInput={false}
            customInput={<Input {...register("scheduled_time")} pr="2.5rem" />}
            minDate={new Date()}
          />
          <Icon
            as={FaCalendarAlt}
            position="absolute"
            top="50%"
            transform="translateY(-50%)"
            color="fg.MUTED"
            pointerEvents="none"
            boxSize="1rem"
            right={2.5}
          />
        </Box>
      </Field.Root>
      <Field.Root w="240px">
        <Field.Label fontSize="sm" color="fg.DEFAULT" mb={1}>
          Select Time
        </Field.Label>

        <Box position="relative" w="240px">
          <DatePicker
            selected={scheduled ? new Date(scheduled) : null}
            onChange={(d: any) => {
              if (!d) {
                setvalue("scheduled_time", null, { shouldValidate: true });
                setIsScheduled(false);
              } else {
                setvalue(
                  "scheduled_time",
                  format(d, "yyyy-MM-dd'T'HH:mm:ssxxx"),
                  {
                    shouldValidate: true,
                  },
                );
                setIsScheduled(true);
              }
            }}
            showTimeSelect
            showTimeSelectOnly
            filterTime={(time) => time.getTime() > Date.now()}
            timeIntervals={15}
            timeFormat="HH:mm"
            dateFormat="HH:mm"
            placeholderText="Select Time"
            calendarClassName="customTimepicker"
            customInput={<Input {...register("scheduled_time")} pr="2.5rem" />}
          />
        </Box>
      </Field.Root>
    </Flex>
  );
}
