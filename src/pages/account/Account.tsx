import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import FacebookAccount from "../../features/accounts/components/facebook/FacebookAccount";
import TiktokAccount from "../../features/accounts/components/titkok/TiktokAccount";
import { useAccounts } from "@/features/accounts/hooks/useAccounts";
import { useAuthUtils } from "@/hooks/useAuthUtils";
import YoutubeAccount from "@/features/accounts/components/youtube/YoutubeAccount";

export default function Account() {
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
  console.log(data);

  if (isLoading)
    return (
      <div>
        <Skeleton height="50px" width="180px" borderRadius="md" />
      </div>
    );
  return (
    <Box mt={10}>
      <Flex justify="space-between">
        <Heading size="2xl">Account</Heading>
        <Button
          variant="subtle"
          flex={1}
          borderColor="border.DEFAULT"
          borderRadius="xl"
          maxW={52}
          onClick={() => navigate("/account/connect")}
        >
          Connect another account
        </Button>
      </Flex>
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
                  .filter((d) => d.account_type === "FACEBOOK")
                  .map((d) => (
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
                  .filter((d) => d.account_type === "TIKTOK")
                  .map((d) => (
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
                  .filter((d) => d.account_type === "YOUTUBE")
                  .map((d) => (
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
    </Box>
  );
}
