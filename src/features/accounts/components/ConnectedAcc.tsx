import { useAuthUtils } from "@/hooks/useAuthUtils"
import {
  Box,
  Button,
  Heading,
  Image,
  SimpleGrid,
  Text,
  HStack,
  VStack,
  Icon,
} from "@chakra-ui/react"
import { FaArrowLeft, FaFacebook, FaTiktok, FaYoutube } from "react-icons/fa6"

import FacebookAccount from "../../../components/SocialAcc/facebook/FacebookAccount"
import TiktokAccount from "../../../components/SocialAcc/tiktok/TiktokAccount"
import YoutubeAccount from "../../../components/SocialAcc/youtube/YoutubeAccount"
import { CircularLoading } from "@/lib/loadings"
import { AccountSection } from "@/components/SocialAcc/AccountSection"
import { useAllConnAccounts } from "@/hooks/useConnectedAccounts"
import InstagramAccount from "@/components/SocialAcc/instagram/InstagramAccount"
import { IoLinkOutline } from "react-icons/io5"

import { getSocialUrl } from "@/features/accounts/lib/AccUrl"

export const ConnectedAcc = () => {
  const { navigate, userId } = useAuthUtils()
  const { data, isLoading } = useAllConnAccounts(userId)
  const accountConfigs = [
    {
      type: "FACEBOOK" as AccountType,
      Component: FacebookAccount,
      pagesPath: "/account/facebook/pages",
    },
    { type: "TIKTOK" as AccountType, Component: TiktokAccount },
    { type: "YOUTUBE" as AccountType, Component: YoutubeAccount },
    { type: "INSTAGRAM" as AccountType, Component: InstagramAccount },
  ]

  console.log("ConnectedAcc userId", userId)
  if (isLoading)
    return (
      <div>
        <CircularLoading />
      </div>
    )

  const facebookUrl = getSocialUrl("facebook", userId)
  const tiktokUrl = getSocialUrl("tiktok", userId)
  const youtubeUrl = getSocialUrl("youtube", userId)
  return (
    <>
      {data?.length === 0 ? (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          w="full"
          py={20}
        >
          <Box textAlign="center">
            <Heading size="xl" mb={4}>
              Connect your social media accounts
            </Heading>

            <Box mb={5}>
              <Icon as={IoLinkOutline} boxSize={12} color="gray.400" />
            </Box>

            <Text fontSize="lg" color="gray.600" mb={2}>
              No accounts connected
            </Text>

            <Text fontSize="sm" color="gray.600" mb={8}>
              Would you like to connect to the following accounts
            </Text>

            <HStack gap={4} justifyContent="center">
              <Button
                variant="outline"
                size="lg"
                onClick={() => (window.location.href = facebookUrl)}
              >
                <Icon as={FaFacebook} color="blue.500" />
                Facebook
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => (window.location.href = tiktokUrl)}
              >
                <Icon as={FaTiktok} color="black" />
                Tiktok
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => (window.location.href = youtubeUrl)}
              >
                <Icon as={FaYoutube} color="red.500" />
                Youtube
              </Button>
            </HStack>
          </Box>
        </Box>
      ) : (
        <>
          <SimpleGrid
            columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
            gap={3}
            mt={6}
            w="full"
          >
            {accountConfigs.map(({ type, Component, pagesPath }) => (
              <AccountSection
                key={type}
                type={type}
                label={type}
                data={data}
                Component={Component}
                pagesPath={pagesPath}
              />
            ))}
          </SimpleGrid>
        </>
      )}
    </>
  )
}
