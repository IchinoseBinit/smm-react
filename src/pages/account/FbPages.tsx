import { useFbAccPages } from "@/features/accounts/hooks/useAccounts";
import { useAuthUtils } from "@/hooks/useAuthUtils";
import { CircularLoading } from "@/lib/loadings";
import { Box, Button, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { Helmet } from "react-helmet-async";
import { FaArrowLeft } from "react-icons/fa6";

export default function FbPages() {
  const { navigate, userId } = useAuthUtils();

  const { data, isLoading } = useFbAccPages(userId);

  if (isLoading) return <CircularLoading />;
  return (
    <>
      <Helmet>
        <title>Facebook page</title>
      </Helmet>
      <Box p={6} maxW="lg" borderRadius="md">
        <Button
          variant="subtle"
          flex={1}
          borderColor="border.DEFAULT"
          size="xs"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft />
          Back
        </Button>
        <Heading
          mt={10}
          mb={4}
          size="lg"
          color={{ base: "dark", _dark: "white" }}
        >
          Your Facebook Pages
        </Heading>
        <VStack spaceY={4} align="stretch">
          {data?.pages?.length === 0 && (
            <Text color="gray.500" textAlign="center">
              No Facebook pages .
            </Text>
          )}
          {data?.pages?.map(
            ({
              page_id,
              name,
              category,
              created_at,
            }: {
              page_id: string;
              name: string;
              category: string;
              created_at: string;
            }) => (
              <Box
                key={page_id}
                p={4}
                bg={{ base: "blue.50", _dark: "primary.800" }}
                borderRadius="md"
                boxShadow="sm"
                _hover={{ boxShadow: "md" }}
              >
                <HStack justify="space-between" mb={1}>
                  <Text
                    fontWeight="bold"
                    color={{ base: "blue.600", _dark: "blue.500" }}
                    fontSize="lg"
                  >
                    {name}
                  </Text>
                  <Text
                    fontSize="sm"
                    color={{ base: "gray.400", _dark: "white" }}
                  >
                    {new Date(created_at).toLocaleDateString()}
                  </Text>
                </HStack>
                <Text
                  color={{ base: "gray.600", _dark: "white" }}
                  fontSize="sm"
                >
                  Category: {category}
                </Text>
              </Box>
            ),
          )}
        </VStack>
      </Box>
    </>
  );
}
