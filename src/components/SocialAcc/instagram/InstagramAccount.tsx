import { Box, Flex, Icon, Image, Link, Text } from "@chakra-ui/react";
import { FaInstagram } from "react-icons/fa6";

export default function InstagramAccount({
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
      borderRadius="12px 12px 12px 0"
      border={"1px solid"}
      borderColor={"blue.100"}
      bg={{ base: "#fbfcff", _dark: "primary.800" }}
      opacity={1.8}
      _hover={{
        bg: { base: "white", _dark: "primary.700" },
        cursor: "pointer",
      }}
      w="20rem"
      position="relative"
      transition="all 0.2s"
    >
      <Flex gap={3}>
        <Icon as={FaInstagram} boxSize={6} color="pink.500" />
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
            marginRight={"10px"}
          />
        )}
      </Flex>
    </Box>
  )

  return (
    <Box>{pagesPath ? <Link href={pagesPath}>{content}</Link> : content}</Box>
  );
}
