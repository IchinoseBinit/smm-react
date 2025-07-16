import { Box, Flex, Icon, Image, Text } from "@chakra-ui/react";
import { FaTiktok } from "react-icons/fa6";
import { BsCheckCircleFill, BsCircle } from "react-icons/bs";

export default function TiktokAccount({
  social_name,
  thumbnail_url,
  selected,
}: {
  social_name: string;
  thumbnail_url: string | null;
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
        boxShadow="md"
        w="20rem"
        position="relative"
        border="2px solid"
        borderColor={selected ? "blue.400" : "transparent"}
        transition="all 0.2s"
      >
        {/* Tick */}
        <Box
          position="absolute"
          top="-8px"
          right="-8px"
          bg={{ base: "white", _dark: "primary.800" }}
          borderRadius="full"
        >
          {selected ? (
            <BsCheckCircleFill size={20} color="#4299e1" />
          ) : (
            <BsCircle size={20} color="#A0AEC0" />
          )}
        </Box>

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
    </Box>
  );
}
