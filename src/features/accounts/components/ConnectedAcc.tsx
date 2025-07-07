import { useAuthUtils } from "@/hooks/useAuthUtils";
import { Box, Button, Heading, Image, Text } from "@chakra-ui/react";
import FacebookAccount from "../../../components/SocialAcc/facebook/FacebookAccount";
import TiktokAccount from "../../../components/SocialAcc/tiktok/TiktokAccount";
import YoutubeAccount from "../../../components/SocialAcc/youtube/YoutubeAccount";
import { CircularLoading } from "@/lib/loadings";
import { AccountSection } from "@/components/SocialAcc/AccountSection";
import { useAllConnAccounts } from "@/hooks/useConnectedAccounts";

export const ConnectedAcc = () => {
  const { navigate, userId } = useAuthUtils();
  const { data, isLoading } = useAllConnAccounts(userId);
  const accountConfigs = [
    { type: "FACEBOOK" as AccountType, Component: FacebookAccount },
    { type: "TIKTOK" as AccountType, Component: TiktokAccount },
    { type: "YOUTUBE" as AccountType, Component: YoutubeAccount },
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
              borderColor="border.DEFAULT"
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
          {accountConfigs.map(({ type, Component }) => (
            <AccountSection
              key={type}
              type={type}
              label={type}
              data={data} // ← this is your fetched account list
              Component={Component}
            />
          ))}
        </>
      )}
    </>
  );
};
