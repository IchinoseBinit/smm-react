import React, { useState, useEffect } from "react";

import {
  Button,
  // CloseButton,
  Portal,
  Dialog,
  Fieldset,
  Input,
} from "@chakra-ui/react";
import { format } from "date-fns";
import type { CalendarEvent } from "../calendar.types";

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event?: CalendarEvent | null;
  onSave: (event: Omit<CalendarEvent, "id"> | CalendarEvent) => void;
  onDelete?: (eventId: string) => void;
}

export const EventModal: React.FC<EventModalProps> = ({
  isOpen,
  onClose,
  event,
  onSave,
  // onDelete,
}) => {
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setStartTime(format(event.start, "HH:mm"));
      setEndTime(format(event.end, "HH:mm"));
    } else {
      setTitle("");
      setStartTime("09:00");
      setEndTime("10:00");
    }
  }, [event]);

  const handleSave = () => {
    // use the incoming event.start (the cell’s date) or fallback to now
    const baseDate = event?.start ?? new Date();
    const [sh, sm] = startTime.split(":").map(Number);
    const [eh, em] = endTime.split(":").map(Number);

    const start = new Date(baseDate);
    start.setHours(sh, sm, 0, 0);

    const end = new Date(baseDate);
    end.setHours(eh, em, 0, 0);

    const eventData = { title, start, end };

    if (event?.id) {
      onSave({ ...event, ...eventData });
    } else {
      onSave(eventData);
    }

    onClose();
  };

  // const handleDelete = () => {
  //   if (event && onDelete) {
  //     onDelete(event.id);
  //     onClose();
  //   }
  // };

  return (
    <Dialog.Root open={isOpen} onOpenChange={(val) => !val && onClose()}>
      <Portal>
        <Dialog.Backdrop bg="blackAlpha.500" />
        <Dialog.Positioner>
          <Dialog.Content
            bg="bg.DEFAULT"
            borderRadius="2xl"
            boxShadow="lg"
            px={6}
            py={5}
            maxW="sm"
            w="full"
          >
            <Dialog.Header mb={3}>
              <Dialog.Title
                fontSize="lg"
                fontWeight="semibold"
                color="fg.DEFAULT"
              >
                {event ? "Edit Event" : "Create Event"}
              </Dialog.Title>
            </Dialog.Header>

            <Dialog.Body display="flex" flexDirection="column" gap={4}>
              <Fieldset.Root>
                <Fieldset.Legend
                  fontSize="sm"
                  fontWeight="medium"
                  color="fg.MUTED"
                >
                  Title
                </Fieldset.Legend>
                <Fieldset.Content>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Event title"
                    size="sm"
                  />
                </Fieldset.Content>
              </Fieldset.Root>

              <Fieldset.Root>
                <Fieldset.Legend
                  fontSize="sm"
                  fontWeight="medium"
                  color="fg.MUTED"
                >
                  Start Time
                </Fieldset.Legend>
                <Fieldset.Content>
                  <Input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    size="sm"
                  />
                </Fieldset.Content>
              </Fieldset.Root>

              <Fieldset.Root>
                <Fieldset.Legend
                  fontSize="sm"
                  fontWeight="medium"
                  color="fg.MUTED"
                >
                  End Time
                </Fieldset.Legend>
                <Fieldset.Content>
                  <Input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    size="sm"
                  />
                </Fieldset.Content>
              </Fieldset.Root>
            </Dialog.Body>

            <Dialog.Footer
              mt={5}
              display="flex"
              justifyContent="flex-end"
              gap={3}
            >
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
              <Button
                bg="secondary.500"
                color="white"
                _hover={{ bg: "secondary.600" }}
                onClick={handleSave}
                disabled={!title.trim()}
              >
                create
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
