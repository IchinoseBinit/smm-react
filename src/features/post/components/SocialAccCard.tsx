import { Box, Flex, Icon, Image, Text } from "@chakra-ui/react";
import { BsCheckCircleFill, BsCircle } from "react-icons/bs";
import type { IconType } from "react-icons";

type Props = {
  id: number;
  account_type: string;
  social_name: string;
  thumbnail_url: string | null;
  selected?: boolean;
  setvalue?: any;
  setItemArr?: React.Dispatch<React.SetStateAction<any[]>>;
  icon: IconType;
  iconColor: string | { base: string; _dark: string };
};

export default function SocialAccountCard({
  id,
  social_name,
  thumbnail_url,
  selected,
  icon,
  iconColor,
}: Props) {
  return (
    <Box
      key={id}
      p={4}
      mt={2}
      mr={4}
      borderRadius="10px"
      bg={{ base: "#fbfcff", _dark: "primary.800" }}
      _hover={{
        bg: { base: "gray.100", _dark: "primary.700" },
        cursor: "pointer",
      }}
      boxShadow="md"
      w="20rem"
      position="relative"
      border="1px solid"
      borderColor={selected ? "#005399" : "transparent"}
      transition="all 0.2s"
    >
      <Box
        position="absolute"
        top="-8px"
        right="-8px"
        bg={{ base: "white", _dark: "primary.800" }}
        borderRadius="full"
        zIndex="1"
      >
        {selected ? (
          <BsCheckCircleFill size={20} color="#005399" />
        ) : (
          <BsCircle size={20} color="#A0AEC0" />
        )}
      </Box>
      <Flex gap={3}>
        <Icon as={icon} boxSize={6} color={iconColor} />
        <Text
          fontWeight="semibold"
          color={{ base: "primary.800", _dark: "white" }}
        >
          {social_name}
        </Text>

        {thumbnail_url && (
          <Image
            position="absolute"
            right={2}
            src={thumbnail_url}
            boxSize="30px"
            borderRadius="full"
          />
        )}
      </Flex>
    </Box>
  )
}
