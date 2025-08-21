import { Box, Button, Flex, Heading } from "@chakra-ui/react";

import { useAuthUtils } from "@/hooks/useAuthUtils";
import { ConnectedAcc } from "@/features/accounts/components/ConnectedAcc";
import { Helmet } from "react-helmet-async";
import { FaPlus } from "react-icons/fa6"

export default function Account() {
  const { navigate } = useAuthUtils()

  let backendurl = import.meta.env.VITE_BACKEND_API_URL
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
  console.log("API_BASE_URL", API_BASE_URL)

  console.log("backend url", backendurl)
  console.log("backend url 1")

  return (
    <>
      <Helmet>
        <title>Account </title>
      </Helmet>
      <Box>
        <Flex justify="space-between">
          <Heading size="2xl">{}</Heading>
          {/* <Heading size="2xl">Connected Accounts</Heading> */}
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
        </Flex>
        <div>
          <ConnectedAcc />
        </div>
      </Box>
    </>
  )
}
