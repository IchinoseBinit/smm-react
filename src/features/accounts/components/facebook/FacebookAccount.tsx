import { Box, Flex, Icon, Image, Text } from "@chakra-ui/react";
import { FaFacebook } from "react-icons/fa6";
import { useNavigate } from "react-router";

export default function FacebookAccount({
  social_name,
  thumbnail_url,
}: {
  social_name: string;
  thumbnail_url: string | null;
}) {
  const navigate = useNavigate();

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
        onClick={() => navigate("/account/facebook/pages")}
        boxShadow="md"
        w="20rem"
        position="relative"
      >
        <Flex gap={3}>
          <Icon as={FaFacebook} boxSize={6} color="blue.600" />
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
