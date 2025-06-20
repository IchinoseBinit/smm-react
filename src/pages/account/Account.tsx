import { useAuth } from "@/hooks/useAuth";
import { useFbAcc } from "@/hooks/useUser";
import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Icon,
  Image,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { FaFacebook } from "react-icons/fa6";
import { useNavigate } from "react-router";

export default function Account() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const userId = user?.user_id ?? "";
  const { data, isLoading } = useFbAcc(userId);

  if (isLoading) return <div>Loading...</div>;
  return (
    <Box>
      <Heading size="2xl">Account</Heading>
      {!data ? (
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
          <Text
            mt={5}
            fontWeight="bold"
            fontSize="md"
            color={{ base: "primary.700", _dark: "white" }}
          >
            Connected facebook accounts
          </Text>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
            {data?.map((acc: any) => {
              return (
                <Grid
                  key={acc.social_id}
                  p={4}
                  mt={5}
                  borderRadius="2xl"
                  bg={{ base: "blue.50", _dark: "primary.800" }}
                  _hover={{
                    bg: { base: "gray.100", _dark: "primary.700" },
                    cursor: "pointer",
                  }}
                  onClick={() => navigate("/account/facebook/pages")}
                  boxShadow="md"
                  w="15rem"
                >
                  <Flex gap={3}>
                    <Icon as={FaFacebook} boxSize={6} color="blue.600" />
                    <Text
                      fontWeight="semibold"
                      color={{ base: "primary.800", _dark: "white" }}
                    >
                      <Box as="span" fontWeight="semibold">
                        {acc.social_name}
                      </Box>
                    </Text>
                  </Flex>
                </Grid>
              );
            })}
          </SimpleGrid>
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
