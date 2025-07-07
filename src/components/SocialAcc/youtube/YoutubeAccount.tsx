import { Box, Flex, Icon, Image, Text } from "@chakra-ui/react";
import { FaYoutube } from "react-icons/fa6";

export default function YoutubeAccount({
  social_name,
  thumbnail_url,
}: {
  social_name: string;
  thumbnail_url: string | null;
}) {
  return (
    <Box>
      <Box
        p={4}
        borderRadius="2xl"
        bg={{ base: "blue.50", _dark: "primary.800" }}
        _hover={{
          bg: { base: "gray.100", _dark: "primary.700" },
          cursor: "pointer",
        }}
        boxShadow="md"
        w="full"
        position="relative"
      >
        <Flex gap={3}>
          <Icon as={FaYoutube} boxSize={6} color="red.600" />
          <Text
            fontWeight="semibold"
            color={{ base: "primary.800", _dark: "white" }}
          >
            <Box as="span" fontWeight="semibold">
              {social_name}
            </Box>
          </Text>

          {thumbnail_url && (
            <Image
              position="absolute"
              right={2}
              src={thumbnail_url}
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
