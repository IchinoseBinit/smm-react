import { Box, Flex, Icon, Image, Text } from "@chakra-ui/react";
import { FaTiktok } from "react-icons/fa6";

export default function TiktokAccount({
  social_name,
  thumnail_url,
  selected,
}: {
  social_name: string;
  thumnail_url: string | null;
  selected?: boolean;
}) {
  return (
    <Box>
      <Box
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
        position="relative"
        border="2px solid"
        borderColor={selected ? "blue.400" : "transparent"}
        transition="all 0.2s"
      >
        <Flex gap={3}>
          <Icon
            as={FaTiktok}
            boxSize={6}
            color={{ base: "black", _dark: "white" }}
          />
          <Text
            fontWeight="semibold"
            color={{ base: "primary.800", _dark: "white" }}
          >
            <Box as="span" fontWeight="semibold">
              {social_name}
            </Box>
          </Text>
          {thumnail_url && (
            <Image
              position="absolute"
              right={2}
              src={thumnail_url}
              width="30px"
              height="30px"
              borderRadius="full"
            />
          )}
        </Flex>
      </Box>
    </Box>
  );
}
