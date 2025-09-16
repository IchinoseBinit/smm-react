import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react"

import { useAuthUtils } from "@/hooks/useAuthUtils"
import { ConnectedAcc } from "@/features/accounts/components/ConnectedAcc"
import { Helmet } from "react-helmet-async"
import { FaPlus } from "react-icons/fa6"
import { CircularLoading } from "@/lib/loadings"

import { useAllConnAccounts } from "@/hooks/useConnectedAccounts"

export default function Account() {
  const { navigate, userId } = useAuthUtils()
  const { data, isLoading } = useAllConnAccounts(userId)

  if (isLoading)
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        minH="50vh"
        w="full"
      >
        <CircularLoading />
      </Box>
    )
  return (
    <>
      <Helmet>
        <title>Account </title>
      </Helmet>
      <Box>
        <Flex justify="space-between" marginTop={1}>
          <Heading size="2xl">{}</Heading>
          {/* <Heading size="2xl">Connected Accounts</Heading> */}

          {data.length == 0 ? (
            <Text></Text>
          ) : (
            <Button
              variant="subtle"
              flex={1}
              backgroundColor={"#003a6b"}
              borderColor="border.DEFAULT"
              borderRadius="xl"
              maxW={40}
              color={"white"}
              onClick={() => navigate("/account/connect")}
            >
              <FaPlus style={{ height: "14px" }} />
              Add Account
            </Button>
          )}
        </Flex>
        <div>
          <ConnectedAcc />
        </div>
      </Box>
    </>
  )
}
