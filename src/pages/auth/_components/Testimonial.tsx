import { Box, Text, VStack } from "@chakra-ui/react";

export default function TestimonialCard() {
  return (
    <Box
      bg="purple.500"
      color="white"
      textAlign="center"
      px={6}
      py={12}
      borderRadius="xl"
      maxW="md"
      mx="auto"
    >
      <Text fontSize="xl" fontWeight="bold" mb={6}>
        “Brandly helps me connect with my audience in real-time and build
        meaningful conversations across platforms effortlessly.”
      </Text>
      <VStack>
        <Text fontWeight="semibold">Alex Johnson</Text>
        <Text fontSize="sm">Product Strategist</Text>
        <Text fontSize="sm">GlowTech Inc.</Text>
      </VStack>
    </Box>
  );
}
