import { Box, Heading, Text, VStack, Icon, HStack } from "@chakra-ui/react"
import { FaTiktok } from "react-icons/fa6"
import { FaInstagram } from "react-icons/fa6"
import { FaFacebook } from "react-icons/fa6"
import { FaYoutube } from "react-icons/fa6"

type AccountType = string

type AccountSectionProps = {
  type: AccountType
  data: unknown[]
  Component: React.FC<any>
  label?: string
  pagesPath?: string
}

const AccountItem = ({ data, Component, pagesPath }: any) => {
  console.log("Account item", data)
  return (
    <Box w="100%" position="relative">
      <Component data={data} {...data} pagesPath={pagesPath} />
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
  console.log("filter ", type, data)
  console.log("label", label)

  if (!filtered.length) return null

  return (
    <Box
      border="1px solid"
      borderColor="#ccdeea"
      borderRadius="12px"
      bg="#ffffff"
      p={4}
      display="flex"
      flexDirection="column"
      height="fit-content" // Key change: use fit-content instead of auto
      minHeight="auto" // Ensure no minimum height constraints
      flexShrink={1}
    >
      {label && (
        <Box mb={3} borderRadius={9}>
          <HStack gap={4} align="center">
            {label === "FACEBOOK" && (
              <Icon
                as={FaFacebook}
                boxSize={8}
                color="blue.600"
                flexShrink={0}
              />
            )}
            {label === "INSTAGRAM" && (
              <Icon
                as={FaInstagram}
                boxSize={6}
                color="pink.500"
                flexShrink={0}
              />
            )}
            {label === "YOUTUBE" && (
              <Icon as={FaYoutube} boxSize={6} color="red.600" flexShrink={0} />
            )}
            {label === "TIKTOK" && (
              <Icon
                as={FaTiktok}
                boxSize={6}
                color={{ base: "black", _dark: "white" }}
                flexShrink={0}
              />
            )}
            <VStack align="start" flex={1} gap={0} minW={0}>
              <Heading size="lg" color="gray.800" fontWeight="600">
                {label.charAt(0) + label.slice(1).toLowerCase()}
              </Heading>
              <Text color="#5c5c5c" fontSize={"12px"} cursor="pointer">
                {filtered.length} connected accounts
              </Text>
            </VStack>
          </HStack>
        </Box>
      )}

      <VStack
        gap={2}
        align="stretch"
        flex={1}
        minHeight={0} // Important: allows VStack to shrink
        height="fit-content"
      >
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
