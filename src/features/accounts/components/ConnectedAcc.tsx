import { useAuthUtils } from "@/hooks/useAuthUtils";
import { useAccounts } from "../hooks/useAccounts";
import {
  Box,
  Button,
  Heading,
  Image,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import FacebookAccount from "./facebook/FacebookAccount";
import TiktokAccount from "./titkok/TiktokAccount";
import YoutubeAccount from "./youtube/YoutubeAccount";
import { CircularLoading } from "@/lib/loadings";

export const ConnectedAcc = () => {
  const { navigate, userId } = useAuthUtils();
  const { data, isLoading } = useAccounts(userId);

  type AccountType = "FACEBOOK" | "TIKTOK" | "YOUTUBE";

  const types: Record<AccountType, boolean> = {
    FACEBOOK: false,
    TIKTOK: false,
    YOUTUBE: false,
  };

  data?.forEach((d: { account_type: AccountType }) => {
    types[d.account_type] = true;
  });

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
          {types.FACEBOOK && (
            <>
              <Text
                mt={5}
                fontWeight="bold"
                fontSize="md"
                color={{ base: "primary.700", _dark: "white" }}
              >
                Connected facebook accounts
              </Text>
              <SimpleGrid columns={{ base: 1, md: 3 }} gridGap={10} mt={5}>
                {data
                  .filter((d: any) => d.account_type === "FACEBOOK")
                  .map((d: any) => (
                    <FacebookAccount
                      key={d.id}
                      social_name={d.social_name}
                      thumbnail_url={d.thumbnail_url}
                    />
                  ))}
              </SimpleGrid>
            </>
          )}

          {types.TIKTOK && (
            <>
              <Text
                mt={5}
                fontWeight="bold"
                fontSize="md"
                color={{ base: "primary.700", _dark: "white" }}
              >
                Connected tiktok accounts
              </Text>
              <SimpleGrid columns={{ base: 1, md: 3 }} gridGap={10} mt={5}>
                {data
                  .filter((d: any) => d.account_type === "TIKTOK")
                  .map((d: any) => (
                    <TiktokAccount
                      key={d.id}
                      social_name={d.social_name}
                      thumnail_url={d.thumbnail_url}
                    />
                  ))}
              </SimpleGrid>
            </>
          )}

          {types.YOUTUBE && (
            <>
              <Text
                mt={5}
                fontWeight="bold"
                fontSize="md"
                color={{ base: "primary.700", _dark: "white" }}
              >
                Connected youtube accounts
              </Text>
              <SimpleGrid columns={{ base: 1, md: 3 }} gridGap={10} mt={5}>
                {data
                  .filter((d: any) => d.account_type === "YOUTUBE")
                  .map((d: any) => (
                    <YoutubeAccount
                      key={d.id}
                      social_name={d.social_name}
                      thumbnail_url={d.thumbnail_url}
                    />
                  ))}
              </SimpleGrid>
            </>
          )}

          {/* <TiktokAccount data={tiktokData} /> */}
        </>
      )}
    </>
  );
};
