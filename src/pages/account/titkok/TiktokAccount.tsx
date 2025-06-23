import { Box, Flex, Grid, Icon, SimpleGrid, Text } from "@chakra-ui/react";
import { FaTiktok } from "react-icons/fa6";

export default function TiktokAccount({
  social_name,
}: {
  social_name: string;
}) {
  return (
    <Box>
      <Text
        mt={5}
        fontWeight="bold"
        fontSize="md"
        color={{ base: "primary.700", _dark: "white" }}
      >
        Connected tiktok accounts
      </Text>
      <SimpleGrid columns={{ base: 1, md: 3 }}>
        <Grid
          p={4}
          mt={5}
          borderRadius="2xl"
          bg={{ base: "blue.50", _dark: "primary.800" }}
          _hover={{
            bg: { base: "gray.100", _dark: "primary.700" },
            cursor: "pointer",
          }}
          // onClick={() => navigate("/account/facebook/pages")}
          boxShadow="md"
          w="20rem"
        >
          <Flex gap={3}>
            <Icon as={FaTiktok} boxSize={6} color="white" />
            <Text
              fontWeight="semibold"
              color={{ base: "primary.800", _dark: "white" }}
            >
              <Box as="span" fontWeight="semibold">
                {social_name}
              </Box>
            </Text>
          </Flex>
        </Grid>
      </SimpleGrid>
    </Box>
  );
}
