import { useAuthUtils } from "@/hooks/useAuthUtils";
import {
  Box,
  Button,
  Heading,
  Image,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import FacebookAccount from "../../../components/SocialAcc/facebook/FacebookAccount";
import TiktokAccount from "../../../components/SocialAcc/tiktok/TiktokAccount";
import YoutubeAccount from "../../../components/SocialAcc/youtube/YoutubeAccount";
import { CircularLoading } from "@/lib/loadings";
import { AccountSection } from "@/components/SocialAcc/AccountSection";
import { useAllConnAccounts } from "@/hooks/useConnectedAccounts";
import InstagramAccount from "@/components/SocialAcc/instagram/InstagramAccount";

export const ConnectedAcc = () => {
  const { navigate, userId } = useAuthUtils();
  const { data, isLoading } = useAllConnAccounts(userId);
  const accountConfigs = [
    {
      type: "FACEBOOK" as AccountType,
      Component: FacebookAccount,
      pagesPath: "/account/facebook/pages",
    },
    { type: "TIKTOK" as AccountType, Component: TiktokAccount },
    { type: "YOUTUBE" as AccountType, Component: YoutubeAccount },
    { type: "INSTAGRAM" as AccountType, Component: InstagramAccount },
  ];
  if (isLoading)
    return (
      <div>
        <CircularLoading />
      </div>
    );
  return (
    <>
      {data?.length === 0 ? (
        <Box
          boxSize={40}
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          w="full"
          mt={20}
        >
          <Image
            src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTMIqiMHpK1y1uDtxqyxQwLbb_fAhM9XQ99rh6SNzYP54Jcr2Uu"
            alt="placeholder"
            height="auto"
            width="18rem"
            borderRadius="30px"
          />
          <Box textAlign="center" mt={5}>
            <Heading>No connected accounts</Heading>
            <Text fontSize="sm" color="primary.500">
              Connect your account to manage your content
            </Text>
            <Button
              variant="subtle"
              flex={1}
              borderRadius="xl"
              mt={5}
              onClick={() => navigate("/account/connect")}
            >
              Connect account
            </Button>
          </Box>
        </Box>
      ) : (
        <>
          <SimpleGrid columns={{ base: 1, lg: 2, xl: 3 }} gridGap={2} mt={2}>
            {accountConfigs.map(({ type, Component, pagesPath }) => (
              <AccountSection
                key={type}
                type={type}
                label={type}
                data={data}
                Component={Component}
                pagesPath={pagesPath} // ← pass it here
              />
            ))}
          </SimpleGrid>
        </>
      )}
    </>
  );
};
