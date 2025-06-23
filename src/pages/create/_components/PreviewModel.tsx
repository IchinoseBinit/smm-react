import { Dialog, Portal, CloseButton, Box } from "@chakra-ui/react";

export function VideoPreviewDialog({
  isOpen,
  onClose,
  src,
}: {
  isOpen: boolean;
  onClose: () => void;
  src: string | null;
}) {
  if (!src) return null;

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open}>
      <Portal>
        <Dialog.Positioner>
          <Dialog.Content
            bg="gray.900"
            maxW="2xl"
            borderRadius="md"
            overflow="hidden"
          >
            <Box
              position="relative"
              p={4}
              borderBottomWidth="1px"
              borderColor="gray.700"
            >
              <Dialog.Title color="white" fontSize="md" fontWeight="semibold">
                Video Preview
              </Dialog.Title>
              <Dialog.CloseTrigger asChild>
                <CloseButton
                  position="absolute"
                  top="1rem"
                  right="1rem"
                  color="white"
                  onClick={onClose}
                />
              </Dialog.CloseTrigger>
            </Box>

            <Box p={4} pt={0}>
              <video
                src={src}
                controls
                autoPlay
                style={{
                  width: "100%",
                  maxHeight: "400px",
                  borderRadius: 8,
                }}
              />
            </Box>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
