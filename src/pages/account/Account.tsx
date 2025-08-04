import { Box, Button, Flex, Heading } from "@chakra-ui/react";

import { useAuthUtils } from "@/hooks/useAuthUtils";
import { ConnectedAcc } from "@/features/accounts/components/ConnectedAcc";
import { Helmet } from "react-helmet-async";

export default function Account() {
  const { navigate } = useAuthUtils();

  return (
    <>
      <Helmet>
        <title>Account </title>
      </Helmet>
      <Box mt={10}>
        <Flex justify="space-between">
          <Heading size="2xl">Connected Accounts</Heading>
          <Button
            variant="subtle"
            flex={1}
            borderColor="border.DEFAULT"
            borderRadius="xl"
            maxW={52}
            onClick={() => navigate("/account/connect")}
          >
            {/* Connect to another account */}
            Add Another Account
          </Button>
        </Flex>
        <div>
          <ConnectedAcc />
        </div>
      </Box>
    </>
  )
}
