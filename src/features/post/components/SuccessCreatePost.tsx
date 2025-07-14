import React from "react";
import { Dialog, Portal, Text, VStack, Button, Icon } from "@chakra-ui/react";
import { FiCheckCircle } from "react-icons/fi";
import { useSuccessDialogStore } from "../lib/store/successDialog";

export const SuccessDialog: React.FC = () => {
  const { isOpen, status, closeDialog } = useSuccessDialogStore();

  return (
    <Dialog.Root open={isOpen} onOpenChange={(val) => !val}>
      <Portal>
        <Dialog.Backdrop bg="blackAlpha.600" />
        <Dialog.Positioner
          inset="0"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Dialog.Content
            bg="bg.DEFAULT"
            borderRadius="2xl"
            boxShadow="2xl"
            px={8}
            py={6}
            maxW="sm"
            w="full"
            textAlign="center"
          >
            <VStack spaceY={4}>
              <Icon as={FiCheckCircle} color="green.500" boxSize={10} />
              <Text fontSize="xl" fontWeight="bold">
                {status === "scheduled"
                  ? "Post Scheduled!"
                  : "Post Published!"}{" "}
              </Text>
              <Text fontSize="sm" color="fg.MUTED">
                successfully
              </Text>
              <Button onClick={closeDialog} colorScheme="primary" mt={4}>
                Done
              </Button>
            </VStack>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
