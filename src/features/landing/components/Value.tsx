import { Box, SimpleGrid, Heading, Image } from "@chakra-ui/react";

export default function Value() {
  return (
    <Box as="section" py={20} bg="white">
      <Box maxW="container.xl" mx="auto" px={4}>
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={8} alignItems="center">
          <Box textAlign="center">
            <Image
              src="https://img.freepik.com/free-vector/growth-analytics-concept-illustration_114360-1434.jpg"
              alt="Business Growth"
              width="300px"
              height="250px"
              rounded="lg"
              mb={4}
              objectFit="cover"
            />
            <Heading
              as="h3"
              fontSize="xl"
              fontWeight="semibold"
              color="gray.900"
            >
              Accelerate Growth
            </Heading>
          </Box>
          <Box textAlign="center">
            <Image
              src="https://img.freepik.com/free-vector/brand-loyalty-concept-illustration_114360-2845.jpg"
              alt="Brand Loyalty"
              width="300px"
              height="250px"
              rounded="lg"
              mb={4}
              objectFit="cover"
            />
            <Heading
              as="h3"
              fontSize="xl"
              fontWeight="semibold"
              color="gray.900"
            >
              Build Brand Loyalty
            </Heading>
          </Box>
          <Box textAlign="center">
            <Image
              src="https://img.freepik.com/free-vector/marketing-strategy-concept-illustration_114360-1405.jpg"
              alt="Marketing Strategy"
              width="300px"
              height="250px"
              rounded="lg"
              mb={4}
              objectFit="cover"
            />
            <Heading
              as="h3"
              fontSize="xl"
              fontWeight="semibold"
              color="gray.900"
            >
              Strategic Marketing
            </Heading>
          </Box>
        </SimpleGrid>
      </Box>
    </Box>
  );
}
