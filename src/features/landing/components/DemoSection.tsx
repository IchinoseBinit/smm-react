import { Box, SimpleGrid, Heading, Text, Image } from "@chakra-ui/react"

export default function DemoSection() {
  return (
    <Box as="section" py={20} bg="gray.50">
      <Box maxW="container.xl" mx="auto" px={4}>
        <Box textAlign="center" mb={16}>
          <Heading
            as="h2"
            fontSize="4xl"
            fontWeight="bold"
            color="gray.900"
            mb={4}
          >
            Simple Steps to Get Started
          </Heading>
          <Text fontSize="xl" color="gray.600">
            Get up and running with Socially in minutes, not hours.
          </Text>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={8}>
          <Box textAlign="center">
            <Box
              bg="white"
              rounded="2xl"
              p={6}
              shadow="sm"
              border="1px"
              borderColor="gray.200"
              mb={6}
            >
              <Image
                src="https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-7965.jpg"
                alt="Sign Up Illustration"
                width="300px"
                height="200px"
                rounded="lg"
                objectFit="cover"
              />
            </Box>
            <Heading
              as="h3"
              fontSize="lg"
              fontWeight="semibold"
              color="gray.900"
              mb={2}
            >
              1. Sign Up
            </Heading>
            <Text color="gray.600">
              Create your account and set up your brand profile in under 2
              minutes.
            </Text>
          </Box>

          <Box textAlign="center">
            <Box
              bg="white"
              rounded="2xl"
              p={6}
              shadow="sm"
              border="1px"
              borderColor="gray.200"
              mb={6}
            >
              <Image
                src="https://img.freepik.com/free-vector/social-media-concept-illustration_114360-1106.jpg"
                alt="Connect Social Profiles"
                width="300px"
                height="200px"
                rounded="lg"
                objectFit="cover"
              />
            </Box>
            <Heading
              fontSize="lg"
              fontWeight="semibold"
              color="gray.900"
              mb={2}
            >
              2. Connect Your Profiles
            </Heading>
            So{" "}
            <Text color="gray.600">
              Link your social media accounts and digital platforms for
              comprehensive tracking.
            </Text>
          </Box>

          <Box textAlign="center">
            <Box
              bg="white"
              rounded="2xl"
              p={6}
              shadow="sm"
              border="1px"
              borderColor="gray.200"
              mb={6}
            >
              <Image
                src="https://img.freepik.com/free-vector/cloud-storage-concept-illustration_114360-1579.jpg"
                alt="Upload Brand Assets"
                width="300px"
                height="200px"
                rounded="lg"
                objectFit="cover"
              />
            </Box>
            <Heading
              as="h3"
              fontSize="lg"
              fontWeight="semibold"
              color="gray.900"
              mb={2}
            >
              3. Upload Assets
            </Heading>
            <Text color="gray.600">
              Upload your brand assets, guidelines, and content to centralize
              everything.
            </Text>
          </Box>

          <Box textAlign="center">
            <Box
              bg="white"
              rounded="2xl"
              p={6}
              shadow="sm"
              border="1px"
              borderColor="gray.200"
              mb={6}
            >
              <Image
                src="https://img.freepik.com/free-vector/data-analysis-concept-illustration_114360-1391.jpg"
                alt="Analytics and Optimization"
                width="300px"
                height="200px"
                rounded="lg"
                objectFit="cover"
              />
            </Box>
            <Heading
              as="h3"
              fontSize="lg"
              fontWeight="semibold"
              color="gray.900"
              mb={2}
            >
              4. Analyze & Optimize
            </Heading>
            <Text color="gray.600">
              Get insights and recommendations to improve your brand
              performance.
            </Text>
          </Box>
        </SimpleGrid>
      </Box>
    </Box>
  )
}
