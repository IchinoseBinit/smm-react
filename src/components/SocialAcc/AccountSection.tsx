import { useState } from "react"
import {
  Box,
  Heading,
  Button,
  Portal,
  CloseButton,
  Text,
  Dialog,
  VStack,
  Icon,
  HStack,
  Image,
} from "@chakra-ui/react"
import { FaTiktok } from "react-icons/fa6"

import { FaInstagram } from "react-icons/fa6"

import useDeleteConnAcc from "@/features/accounts/hooks/useDeleteAccount"
import { useAuthUtils } from "@/hooks/useAuthUtils"
import { FaFacebook } from "react-icons/fa6"
import Delete from "@/assets/deletebtn.svg"
import { FaYoutube } from "react-icons/fa6"

type AccountType = string

type AccountSectionProps = {
  type: AccountType
  data: unknown[]
  Component: React.FC<any>
  label?: string
  pagesPath?: string
}

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

    // Add your delete logic here
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
        {/* <MdDelete color="#ff0000" size={14} /> */}
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

const AccountItem = ({ data, Component, pagesPath }: any) => {
  return (
    <Box w="100%" position="relative">
      <Component {...data} pagesPath={pagesPath} />
      <Box
        position="absolute"
        top="30%"
        right="12px"
        transform="translateY(-50%)"
        zIndex={10}
      >
        <DeleteMenu data={data} />
      </Box>
    </Box>
  )
}

export const AccountSection = ({
  type,
  data,
  Component,
  label,
  pagesPath,
}: AccountSectionProps & { pagesPath?: string }) => {
  const filtered = data.filter((d: any) => d.account_type === type)
  console.log("Account Section data", type, data)
  console.log("filte ", type, data)
  console.log("label", label)

  if (!filtered.length) return null

  return (
    <Box
      border="1px solid"
      borderColor="blue.100"
      borderRadius="12px"
      p={6}
      bg="white"
      _hover={{
        borderColor: "blue.300",
      }}
      transition="all 0.2s"
    >
      {label && (
        <Box
          mb={4}
          border="1px solid"
          borderColor="blue.100"
          padding={2}
          borderRadius={9}
        >
          <HStack gap={4} align="center">
            {label === "FACEBOOK" && (
              <Icon as={FaFacebook} boxSize={8} color="blue.600" />
            )}
            {label === "INSTAGRAM" && (
              <Icon as={FaInstagram} boxSize={6} color="pink.500" />
            )}
            {label === "YOUTUBE" && (
              <Icon as={FaYoutube} boxSize={6} color="red.600" />
            )}
            {label === "TIKTOK" && (
              <Icon
                as={FaTiktok}
                boxSize={6}
                color={{ base: "black", _dark: "white" }}
              />
            )}
            <VStack align="start" flex={1} gap={0}>
              <Heading size="lg" color="gray.800" fontWeight="600">
                {label.charAt(0) + label.slice(1).toLowerCase()}
              </Heading>
              <Text
                color="gray.700"
                fontSize="sm"
                cursor="pointer"
                _hover={{ color: "gray.900" }}
                mt={-1} // Negative top margin to pull it closer
              >
                {filtered.length} connected accounts
              </Text>
            </VStack>
          </HStack>
        </Box>
      )}

      <VStack gap={3} align="stretch">
        {filtered.map((d: any) => (
          <AccountItem
            key={d.id}
            data={d}
            Component={Component}
            pagesPath={pagesPath}
          />
        ))}
      </VStack>
    </Box>
  )
}
