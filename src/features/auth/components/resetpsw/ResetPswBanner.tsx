import { useIsMobile } from "@/hooks/useIsMobile";
import { Box, Image, Text } from "@chakra-ui/react";

export const ResetPswBanner = () => {
  const isMobile = useIsMobile();
  return (
    <>
      {!isMobile && (
        <Box flex="1" bg="gray.700" position="relative" overflow="hidden">
          <Box
            position="absolute"
            inset={0}
            bgGradient="linear(to-br, blue.600, blue.800)"
            opacity={0.9}
            zIndex={1}
          />

          <Box
            position="relative"
            zIndex={2}
            p={12}
            color="white"
            maxW="xl"
            mx="auto"
            h="full"
            display="flex"
            flexDirection="column"
            justifyContent="center"
          >
            <Text
              fontSize={{ base: "3xl", md: "4xl" }}
              fontWeight="bold"
              mb={6}
              lineHeight="tight"
            >
              Empower your brand with AI-driven social media insights
            </Text>
            <Text fontSize="lg" color="blue.100" mb={8}>
              Unlock the potential of your social presence with intelligent
              analytics and content strategies.
            </Text>
          </Box>

          <Image
            src="https://img.freepik.com/free-vector/gradient-network-connection-background_23-2148865392.jpg"
            alt="Digital marketing illustration"
            position="absolute"
            inset={0}
            objectFit="cover"
            w="full"
            h="full"
            opacity={0.4}
          />
        </Box>
      )}
    </>
  );
};
