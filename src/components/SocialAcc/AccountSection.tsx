import { useState } from "react"
import {
  Box,
  Heading,
  // HStack,
  // Text,
  Button,
  // Menu,
  Portal,
  // Avatar,
  CloseButton,
  Dialog,
} from "@chakra-ui/react"
// import { IoEllipsisVertical } from "react-icons/io5"
import { MdDelete } from "react-icons/md"
import useDeleteConnAcc from "@/features/accounts/hooks/useDeleteAccount"
import { useAuthUtils } from "@/hooks/useAuthUtils"

type AccountType = string

type AccountSectionProps = {
  type: AccountType
  data: unknown[]
  Component: React.FC<any>
  label?: string
  pagesPath?: string
}

// const DeleteMenu = ({ data }: any) => {
//   const { userId } = useAuthUtils()

//   const [isDialogOpen, setIsDialogOpen] = useState(false)
//   console.log("delete menu", data)

//   const deleteMutation = useDeleteConnAcc(userId)

//   const handleDeleteClick = () => {
//     setIsDialogOpen(true)
//   }

//   const handleConfirmDelete = () => {
//     deleteMutation.mutate({ id: data.id, account_type: data.account_type })

//     // Add your delete logic here
//     console.log("Item deleted")
//     setIsDialogOpen(false)
//   }

//   const handleCancel = () => {
//     setIsDialogOpen(false)
//   }

//   return (
//     <>
//       <Menu.Root>
//         <Menu.Trigger asChild>
//           <Box
//             p={1}
//             borderRadius="md"
//             bg="white"
//             boxShadow="sm"
//             cursor="pointer"
//           >
//             <IoEllipsisVertical color="black" />
//           </Box>
//         </Menu.Trigger>
//         <Portal>
//           <Menu.Positioner>
//             <Menu.Content>
//               <Menu.Item value="cut" onClick={handleDeleteClick}>
//                 <MdDelete />
//                 <Box flex="1">Delete</Box>
//               </Menu.Item>
//             </Menu.Content>
//           </Menu.Positioner>
//         </Portal>
//       </Menu.Root>

//       <Dialog.Root
//         open={isDialogOpen}
//         onOpenChange={(details) => setIsDialogOpen(details.open)}
//       >
//         <Portal>
//           <Dialog.Backdrop />
//           <Dialog.Positioner>
//             <Dialog.Content>
//               <Dialog.Header>
//                 <Dialog.Title>Confirm Delete</Dialog.Title>
//               </Dialog.Header>
//               <Dialog.Body>
//                 <p>
//                   Are you sure you want to delete this account? This action
//                   cannot be undone.
//                 </p>
//               </Dialog.Body>
//               <Dialog.Footer>
//                 <Dialog.ActionTrigger asChild>
//                   <Button variant="outline" onClick={handleCancel}>
//                     Cancel
//                   </Button>
//                 </Dialog.ActionTrigger>
//                 <Button colorScheme="red" onClick={handleConfirmDelete}>
//                   Delete
//                 </Button>
//               </Dialog.Footer>
//               <Dialog.CloseTrigger asChild>
//                 <CloseButton size="sm" />
//               </Dialog.CloseTrigger>
//             </Dialog.Content>
//           </Dialog.Positioner>
//         </Portal>
//       </Dialog.Root>
//     </>
//   )
// }

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
      <MdDelete cursor={"pointer"} onClick={handleDeleteClick} />

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
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Box
      w={{ base: "100%", sm: "48%", md: "31%", lg: "83%" }}
      position="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Component {...data} pagesPath={pagesPath} />
      {isHovered && (
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          zIndex={10}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <DeleteMenu data={data} />
        </Box>
      )}
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

  if (!filtered.length) return null
  console.log("componetn ", Component, pagesPath)

  return (
    <Box>
      {label && (
        <Heading size="lg" mt={4}>
          {label.charAt(0) + label.slice(1).toLowerCase()} Accounts
        </Heading>
      )}
      {filtered.map((d: any) => (
        <AccountItem
          key={d.id}
          data={d}
          Component={Component}
          pagesPath={pagesPath}
        />
      ))}
    </Box>
  )
}
