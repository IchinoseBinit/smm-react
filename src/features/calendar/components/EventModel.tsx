import React from "react";

import {
  Button,
  // CloseButton,
  Portal,
  Dialog,
  Text,
  Box,
  Flex,
  VStack,
  HStack,
} from "@chakra-ui/react";
import type { CalendarEvent, PlatformCalendarGroup } from "../types";
import { usePostModalStore } from "../lib/store/postModel.store";

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event?: PlatformCalendarGroup | null;
  onSave: (event: Omit<CalendarEvent, "id"> | CalendarEvent) => void;
  onUpdate: (event: CalendarEvent) => void;
  onDelete?: (eventId: string) => void;
}

export const EventModal: React.FC<EventModalProps> = () => {
  const { isOpen, selectedPlatform, closeModal } = usePostModalStore();

  return (
    <Dialog.Root open={isOpen} onOpenChange={(val) => !val}>
      <Portal>
        <Dialog.Backdrop bg="blackAlpha.500" />
        <Dialog.Positioner>
          <Dialog.Content
            bg="bg.DEFAULT"
            borderRadius="md"
            boxShadow="lg"
            px={6}
            py={5}
            maxW="md"
            w="full"
          >
            {/* Header */}
            <Flex justify="space-between" mb={4}>
              <Text fontSize="lg" fontWeight="semibold">
                {selectedPlatform?.platform ?? "No Platform"}
              </Text>
              <Text fontSize="sm" color="fg.MUTED">
                {selectedPlatform?.time ?? "--"}
              </Text>
            </Flex>

            {/* Posts */}
            <VStack align="stretch" spaceY={4}>
              {selectedPlatform?.posts.map((post) => (
                <Box
                  key={post.id}
                  p={3}
                  border="1px solid"
                  borderColor="border.SUBTLE"
                  borderRadius="sm"
                >
                  <Text fontWeight="medium">{post.title}</Text>
                  <Text fontSize="sm" color="fg.MUTED" mb={2}>
                    {post.description}
                  </Text>

                  {post.medias?.length > 0 && (
                    <HStack spaceX={2} overflowX="auto">
                      {post.medias.map((m, i) => (
                        <Box
                          key={i}
                          w="50px"
                          h="50px"
                          borderRadius="sm"
                          overflow="hidden"
                          bg="gray.100"
                        >
                          <img
                            src={m.s3_url}
                            alt=""
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </Box>
                      ))}
                    </HStack>
                  )}
                </Box>
              ))}
            </VStack>

            {/* Footer */}
            <Flex justify="flex-end" mt={5}>
              <Button variant="ghost" onClick={closeModal}>
                Close
              </Button>
            </Flex>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
