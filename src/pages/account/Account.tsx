import { Box, Button, Heading, Image, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import FacebookAccount from "./facebook/FacebookAccount";
import { useAuthContext } from "@/hooks/useAuthContext";
import TiktokAccount from "./titkok/TiktokAccount";
import { useAccounts } from "@/features/accounts/hooks/useAccounts";

export default function Account() {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const userId = user?.user_id ?? "";
  const { data, isLoading } = useAccounts(userId);

  if (isLoading) return <div>Loading...</div>;
  return (
    <Box>
      <Heading size="2xl">Account</Heading>
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
          {data?.map(
            (d: { account_type: string; social_name: string; id: number }) => {
              if (d.account_type === "FACEBOOK") {
                return (
                  <div key={d.id}>
                    <FacebookAccount social_name={d.social_name} />
                  </div>
                );
              } else if (d.account_type === "TIKTOK") {
                return (
                  <div key={d.id}>
                    <TiktokAccount social_name={d.social_name} />
                  </div>
                );
              }
            },
          )}

          {/* <TiktokAccount data={tiktokData} /> */}
          <Box>
            <Button
              variant="subtle"
              flex={1}
              borderColor="border.DEFAULT"
              borderRadius="xl"
              mt={5}
              onClick={() => navigate("/account/connect")}
            >
              Connect another account
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}
