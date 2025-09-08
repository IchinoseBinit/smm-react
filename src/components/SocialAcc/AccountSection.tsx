import { Box, Heading, Text, VStack, Icon, HStack } from "@chakra-ui/react"
import { FaTiktok } from "react-icons/fa6"
import { FaInstagram } from "react-icons/fa6"
import { FaFacebook } from "react-icons/fa6"
import { FaYoutube } from "react-icons/fa6"
import { useSelectedStore } from "@/features/post/lib/store/selectedAcc"
import { useEffect } from "react"
import { BsCheckCircleFill, BsCircle } from "react-icons/bs"

type AccountType = string

type AccountSectionProps = {
  type: AccountType
  data: unknown[]
  Component: React.FC<any>
  label?: string
  pagesPath?: string
  setValue?: any
  setItemArr?: any
}

const AccountItem = ({
  data,
  Component,
  pagesPath,
  setValue,
  setItemArr,
  allData,
}: any) => {
  const { selectedIds } = useSelectedStore()

  useEffect(() => {
    if (!setValue || !setItemArr || !allData) return

    // Update itemArr when selectedIds changes for all accounts
    setItemArr((_prev: any[]) => {
      const newItems: any[] = []

      allData.forEach((d: any) => {
        if (selectedIds.includes(d.id)) {
          newItems.push({
            accountType: d.account_type,
            social_account_id: d.id,
          })
        }
      })

      return newItems
    })
  }, [selectedIds, allData, setValue, setItemArr])

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
  setValue,
  setItemArr,
}: AccountSectionProps & { pagesPath?: string }) => {
  const { selectedIds, toggleId } = useSelectedStore()
  const filtered = data.filter((d: any) => d.account_type === type)

  // Check if all accounts of this type are selected
  const isAllAccountsSelected =
    filtered.length > 0 &&
    filtered.every((account: any) => selectedIds.includes(account.id))

  // Handle section-level toggle (select/deselect all accounts in this section)
  const handleSectionToggle = (e: React.MouseEvent) => {
    e.stopPropagation()

    if (isAllAccountsSelected) {
      // Deselect all accounts in this section
      filtered.forEach((account: any) => {
        if (selectedIds.includes(account.id)) {
          toggleId(account.id)
        }
      })
    } else {
      // Select all accounts in this section
      filtered.forEach((account: any) => {
        if (!selectedIds.includes(account.id)) {
          toggleId(account.id)
        }
      })
    }
  }

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
        <Box mb={3} borderRadius={9} position={"relative"}>
          <Box
            position="absolute"
            top="8px"
            right="-8px"
            bg={{ base: "white", _dark: "primary.800" }}
            borderRadius="full"
            zIndex="1"
            cursor="pointer"
            onClick={handleSectionToggle}
          >
            {isAllAccountsSelected ? (
              <BsCheckCircleFill size={20} color="#005399" />
            ) : (
              <BsCircle size={20} color="#A0AEC0" />
            )}
          </Box>
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
            setValue={setValue}
            setItemArr={setItemArr}
            allData={data}
          />
        ))}
      </VStack>
    </Box>
  )
}
