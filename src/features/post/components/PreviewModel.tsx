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
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content
            bg={{ base: "gray.50", _dark: "gray.900" }}
            maxW="3xl"
            borderRadius="lg"
            overflow="hidden"
          >
            <Box position="relative" p={4} borderColor="gray.700">
              <Dialog.Title
                color={{ base: "black", _dark: "white" }}
                fontSize="md"
                fontWeight="semibold"
              >
                Video Preview
              </Dialog.Title>
              <Dialog.CloseTrigger
                asChild
                color={{ base: "black", _dark: "white" }}
                _hover={{
                  base: { bg: "primary.100" },
                  _dark: { bg: "primary.800" },
                }}
              >
                <CloseButton
                  position="absolute"
                  right="1rem"
                  size="sm"
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
