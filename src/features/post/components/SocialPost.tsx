// import {
//   Box,
//   Avatar,
//   Text,
//   HStack,
//   VStack,
//   Button,
//   IconButton,
//   Flex,
//   Badge,
// } from "@chakra-ui/react"
// import { AiOutlineHeart, AiOutlineMessage, AiOutlineMore } from "react-icons/ai"

// const SocialPostComponent = () => {
//   return (
//     <Box
//       maxW="600px"
//       mx="auto"
//       bg="white"
//       borderRadius="xl"
//       border="1px"
//       borderColor="gray.200"
//       p={6}
//       boxShadow="sm"
//       position="relative"
//     >
//       {/* Close button */}
//       <IconButton
//         icon={<Text fontSize="20px">×</Text>}
//         position="absolute"
//         top={4}
//         right={4}
//         variant="ghost"
//         size="sm"
//         aria-label="Close"
//         color="gray.500"
//       />

//       {/* Header */}
//       <HStack gap={4} mb={4}>
//         <Avatar
//           size="md"
//           src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
//           name="Aarati Ghimire"
//         />
//         <VStack align="start" gap={0} flex={1}>
//           <HStack gap={2}>
//             <Text fontWeight="bold" color="gray.800" fontSize="md">
//               Aarati Ghimire
//             </Text>
//             <Badge colorScheme="blue" fontSize="xs" px={2} py={1}>
//               Admin
//             </Badge>
//           </HStack>
//           <Text fontSize="sm" color="gray.500">
//             aaratighimere@gmail.com
//           </Text>
//           <Text fontSize="sm" color="gray.500">
//             1 days ago
//           </Text>
//         </VStack>
//       </HStack>

//       {/* Content */}
//       <VStack align="start" gap={3}>
//         <Text fontWeight="semibold" color="gray.800" fontSize="lg">
//           Indra Jatra Special
//         </Text>

//         <Text color="gray.800" fontSize="md" lineHeight="1.6">
//           Good Morning!
//         </Text>

//         <Text color="gray.800" fontSize="md" lineHeight="1.6">
//           We hope this message finds you well. We wanted to bring to your
//           attention a matter regarding noise levels in the canteen area,
//           particularly during gaming activity. While we fully support and
//           encourage team bonding and relaxation during{" "}
//           <Button
//             variant="link"
//             color="blue.500"
//             fontSize="md"
//             p={0}
//             h="auto"
//             minW="auto"
//           >
//             see more...
//           </Button>
//         </Text>
//       </VStack>

//       {/* Engagement Stats and Actions */}
//       <Flex
//         justify="space-between"
//         align="center"
//         mt={6}
//         pt={4}
//         borderTop="1px"
//         borderColor="gray.200"
//       >
//         <HStack gap={6}>
//           <HStack gap={2}>
//             <IconButton
//               icon={<AiOutlineHeart size={18} />}
//               variant="ghost"
//               size="sm"
//               aria-label="Like"
//               color="gray.500"
//               _hover={{ color: "red.500" }}
//             />
//             <Text fontSize="sm" color="gray.500">
//               173
//             </Text>
//           </HStack>

//           <HStack gap={2}>
//             <IconButton
//               icon={<AiOutlineMessage size={18} />}
//               variant="ghost"
//               size="sm"
//               aria-label="Comment"
//               color="gray.500"
//               _hover={{ color: "blue.500" }}
//             />
//             <Text fontSize="sm" color="gray.500">
//               20
//             </Text>
//           </HStack>
//         </HStack>

//         <IconButton
//           icon={<AiOutlineMore size={18} />}
//           variant="ghost"
//           size="sm"
//           aria-label="More options"
//           color="gray.500"
//         />
//       </Flex>
//     </Box>
//   )
// }

// export default SocialPostComponent
