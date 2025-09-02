import { Box, Flex, Icon, Image, Text } from "@chakra-ui/react"
import { useState } from "react"
import { Button, Portal, CloseButton, Dialog } from "@chakra-ui/react"
import useDeleteConnAcc from "@/features/accounts/hooks/useDeleteAccount"
import { useAuthUtils } from "@/hooks/useAuthUtils"
import Delete from "@/assets/deletebtn.svg"
import { FaYoutube } from "react-icons/fa6"
import { Tooltip } from "@/components/ui/tooltip"
import useIsTextTruncated from "@/hooks/useTextTruncate"
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
    console.log("pagepath", pagesPath)

    const { isTruncated, textRef } = useIsTextTruncated(social_name, 200)

    const textElement = (
      <Text
        ref={textRef}
        fontWeight="semibold"
        color={{ base: "black", _dark: "white" }}
        fontSize="14px"
      >
        {social_name}
      </Text>
    )

    const content = (
      <Box
        p={3}
        borderRadius="12px"
        border={"1px solid"}
        borderColor={"#ccdeea"}
        bg={{ base: "#fbfcff", _dark: "primary.800" }}
        _hover={{
          bg: { base: "white", _dark: "primary.700" },
          cursor: "pointer",
          "& .delete-button": {
            opacity: 1,
            visibility: "visible",
          },
        }}
        w="100%"
        position="relative"
        transition="all 0.2s"
        className="group"
      >
        <Flex gap={3} align="center">
          <Icon as={FaYoutube} boxSize={5} color="red.600" flexShrink={0} />
          <Box flex={1} minW={0}>
            {isTruncated ? (
              <Tooltip content={social_name}>{textElement}</Tooltip>
            ) : (
              textElement
            )}
          </Box>
          {thumbnail_url && (
            <Image
              src={thumbnail_url}
              width="24px"
              height="24px"
              borderRadius="full"
              flexShrink={0}
            />
          )}
          <Box
            position={"absolute"}
            top={-1}
            right={-1}
            className="delete-button"
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

    return <Box w="100%">{content}</Box>
  }