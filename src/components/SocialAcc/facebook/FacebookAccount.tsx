import { Box, Flex, Icon, Image, Link, Text } from "@chakra-ui/react";
import { FaFacebook } from "react-icons/fa6";

export default function FacebookAccount({
  social_name,
  thumbnail_url,
  pagesPath,
}: {
  social_name: string;
  thumbnail_url: string | null;
  pagesPath?: string;
}) {
  const content = (
    <Box
      p={4}
      mt={5}
      borderRadius="2xl"
      bg={{ base: "blue.50", _dark: "primary.800" }}
      _hover={{
        bg: { base: "gray.100", _dark: "primary.700" },
        cursor: "pointer",
      }}
      boxShadow="md"
      w="20rem"
      position="relative"
      transition="all 0.2s"
    >
      <Flex gap={3}>
        <Icon as={FaFacebook} boxSize={6} color="blue.600" />
        <Text
          fontWeight="semibold"
          color={{ base: "primary.800", _dark: "white" }}
        >
          <Box as="span">{social_name}</Box>
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
  );

  return (
    <Box>
      {pagesPath ? (
        <Link
          href={pagesPath}
          textDecoration="none"
          _focus={{ boxShadow: "none" }}
          _focusVisible={{ boxShadow: "none" }}
          outline="none"
        >
          {content}
        </Link>
      ) : (
        content
      )}
    </Box>
  );
}
