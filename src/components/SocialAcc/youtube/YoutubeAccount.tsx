import { Box, Flex, Icon, Image, Text } from "@chakra-ui/react"
import { useState } from "react"
import { Button, Portal, CloseButton, Dialog } from "@chakra-ui/react"
import useDeleteConnAcc from "@/features/accounts/hooks/useDeleteAccount"
import { useAuthUtils } from "@/hooks/useAuthUtils"
import Delete from "@/assets/deletebtn.svg"
import { FaYoutube } from "react-icons/fa6"

const DeleteMenu = ({ data }: any) => {
  const { userId } = useAuthUtils()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  console.log("delete menu", data)

  const deleteMutation = useDeleteConnAcc(userId)

  const handleDeleteClick = () => {
    setIsDialogOpen(true)
  }

  const handleConfirmDelete = () => {
    deleteMutation.mutate({ id: data.id, account_type: data.account_type })
    console.log("Item deleted")
    setIsDialogOpen(false)
  }

  const handleCancel = () => {
    setIsDialogOpen(false)
  }

  return (
    <>
      <Box
        w={6}
        h={6}
        display="flex"
        alignItems="center"
        justifyContent="center"
        cursor="pointer"
        onClick={handleDeleteClick}
      >
        <Image src={Delete} />
      </Box>

      <Dialog.Root
        open={isDialogOpen}
        onOpenChange={(details) => setIsDialogOpen(details.open)}
      >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Confirm Delete</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <p>
                  Are you sure you want to delete this account? This action
                  cannot be undone.
                </p>
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button variant="outline" onClick={handleCancel}>
                    Cancel
                  </Button>
                </Dialog.ActionTrigger>
                <Button colorScheme="red" onClick={handleConfirmDelete}>
                  Delete
                </Button>
              </Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  )
}

export default function YoutubeAccount({
  social_name,
  thumbnail_url,
  pagesPath,
  data,
}: {
  social_name: string
  thumbnail_url: string | null
  pagesPath?: string
  data: any
}) {
  const content = (
    <Box
      p={4}
      mt={5}
      borderRadius="12px 12px 12px 0"
      border={"1px solid"}
      borderColor={"#ccdeea"}
      bg={{ base: "#fbfcff", _dark: "primary.800" }}
      opacity={1.8}
      _hover={{
        bg: { base: "white", _dark: "primary.700" },
        cursor: "pointer",
        // Show delete button on hover for ALL screen sizes
        "& .delete-button": {
          opacity: 1,
          visibility: "visible",
        },
      }}
      w="18rem"
      position="relative"
      transition="all 0.2s"
      className="group"
    >
      <Flex gap={3}>
        <Icon as={FaYoutube} boxSize={6} color="red.600" />
        <Text
          fontWeight="semibold"
          color={{ base: "primary.800", _dark: "white" }}
        >
          <Box as="span">{social_name}</Box>
        </Text>
        {thumbnail_url && (
          <Image
            position="absolute"
            right={2}
            src={thumbnail_url}
            width="30px"
            height="30px"
            marginRight={"10px"}
            borderRadius="full"
          />
        )}
        <Box
          position={"absolute"}
          top={-2}
          right={-2}
          className="delete-button"
          // Hidden by default on ALL screen sizes
          opacity={0}
          visibility="hidden"
          transition="all 0.2s ease-in-out"
        >
          <DeleteMenu
            data={{
              id: data.id,
              account_type: data.account_type,
            }}
          />
        </Box>
      </Flex>
    </Box>
  )

  return <Box>{pagesPath ? content : content}</Box>
}
