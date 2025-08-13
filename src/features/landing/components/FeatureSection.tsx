import {
  Box,
  SimpleGrid,
  Card,
  Heading,
  Text,
  Flex,
  Stack,
} from "@chakra-ui/react"
import {
  FaCalendar,
  FaChartBar,
  FaUsers,
  FaHashtag,
  FaComment,
  FaGlobe,
} from "react-icons/fa"

export default function FeatureSection() {
  return (
    <Box as="section" id="features" py={20} bg="white">
      <Box maxW="container.xl" mx="auto" px={4}>
        <Box textAlign="center" mb={16}>
          <Stack spaceY={2} mb={6}>
            <Heading
              as="h1"
              fontSize={{ base: "xl", md: "lg" }}
              fontWeight="semiibold"
              color="gray.600"
              lineHeight="tight"
            >
              Everything You Need to Master
            </Heading>
            <Heading
              as="h1"
              fontSize={{ base: "xl", md: "4xl" }}
              fontWeight="bold"
              color="gray.900"
              lineHeight="tight"
            >
              Social Media Management
            </Heading>
          </Stack>

          <Text fontSize="xl" color="gray.600" maxW="2xl" mx="auto">
            Powerful tools and insights to help you schedule, analyze, and grow
            your social media presence effectively.
          </Text>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 3 }} gridGap={8}>
          <Card.Root
            border="1px"
            borderColor="gray.200"
            _hover={{ shadow: "lg" }}
            transition="box-shadow 0.2s"
          >
            <Card.Body p={8} textAlign="center">
              <Flex
                w={16}
                h={16}
                bg="blue.100"
                rounded="2xl"
                align="center"
                justify="center"
                mx="auto"
                mb={6}
              >
                <FaCalendar size={32} color="blue.600" />
              </Flex>

              <Card.Title asChild>
                <Heading
                  as="h3"
                  fontSize="xl"
                  fontWeight="semibold"
                  color="gray.900"
                  mb={4}
                >
                  Smart Scheduling
                </Heading>
              </Card.Title>

              <Card.Description>
                <Text color="gray.600">
                  Schedule posts across all platforms with optimal timing
                  suggestions and bulk upload capabilities.
                </Text>
              </Card.Description>
            </Card.Body>
          </Card.Root>
          <Card.Root
            border="1px"
            borderColor="gray.200"
            _hover={{ shadow: "lg" }}
            transition="box-shadow 0.2s"
          >
            <Card.Body p={8} textAlign="center">
              <Flex
                w={16}
                h={16}
                bg="blue.100"
                rounded="2xl"
                align="center"
                justify="center"
                mx="auto"
                mb={6}
              >
                <FaChartBar size={32} color="blue.600" />
              </Flex>

              <Card.Title asChild>
                <Heading
                  as="h3"
                  fontSize="xl"
                  fontWeight="semibold"
                  color="gray.900"
                  mb={4}
                >
                  Advanced Analytics
                </Heading>
              </Card.Title>

              <Card.Description>
                <Text color="gray.600">
                  Track engagement, reach, and performance metrics with detailed
                  reports and insights across all platforms.
                </Text>
              </Card.Description>
            </Card.Body>
          </Card.Root>
          <Card.Root
            border="1px"
            borderColor="gray.200"
            _hover={{ shadow: "lg" }}
            transition="box-shadow 0.2s"
          >
            <Card.Body p={8} textAlign="center">
              <Flex
                w={16}
                h={16}
                bg="blue.100"
                rounded="2xl"
                align="center"
                justify="center"
                mx="auto"
                mb={6}
              >
                <FaUsers size={32} color="blue.600" />
              </Flex>

              <Card.Title asChild>
                <Heading
                  as="h3"
                  fontSize="xl"
                  fontWeight="semibold"
                  color="gray.900"
                  mb={4}
                >
                  Team Collaboration
                </Heading>
              </Card.Title>

              <Card.Description>
                <Text color="gray.600">
                  Collaborate with your team on content creation, approval
                  workflows, and campaign management.
                </Text>
              </Card.Description>
            </Card.Body>
          </Card.Root>
          <Card.Root
            border="1px"
            borderColor="gray.200"
            _hover={{ shadow: "lg" }}
            transition="box-shadow 0.2s"
          >
            <Card.Body p={8} textAlign="center">
              <Flex
                w={16}
                h={16}
                bg="blue.100"
                rounded="2xl"
                align="center"
                justify="center"
                mx="auto"
                mb={6}
              >
                <FaHashtag size={32} color="blue.600" />
              </Flex>

              <Card.Title asChild>
                <Heading
                  as="h3"
                  fontSize="xl"
                  fontWeight="semibold"
                  color="gray.900"
                  mb={4}
                >
                  Hashtag Research
                </Heading>
              </Card.Title>

              <Card.Description>
                <Text color="gray.600">
                  Discover trending hashtags and optimize your content reach
                  with AI-powered hashtag suggestions.
                </Text>
              </Card.Description>
            </Card.Body>
          </Card.Root>
          <Card.Root
            border="1px"
            borderColor="gray.200"
            _hover={{ shadow: "lg" }}
            transition="box-shadow 0.2s"
          >
            <Card.Body p={8} textAlign="center">
              <Flex
                w={16}
                h={16}
                bg="blue.100"
                rounded="2xl"
                align="center"
                justify="center"
                mx="auto"
                mb={6}
              >
                <FaComment size={32} color="blue.600" />
              </Flex>

              <Card.Title asChild>
                <Heading
                  as="h3"
                  fontSize="xl"
                  fontWeight="semibold"
                  color="gray.900"
                  mb={4}
                >
                  Engagement Management
                </Heading>
              </Card.Title>

              <Card.Description>
                <Text color="gray.600">
                  Monitor and respond to comments, messages, and mentions from a
                  unified inbox across all platforms.
                </Text>
              </Card.Description>
            </Card.Body>
          </Card.Root>
          <Card.Root
            border="1px"
            borderColor="gray.200"
            _hover={{ shadow: "lg" }}
            transition="box-shadow 0.2s"
          >
            <Card.Body p={8} textAlign="center">
              <Flex
                w={16}
                h={16}
                bg="blue.100"
                rounded="2xl"
                align="center"
                justify="center"
                mx="auto"
                mb={6}
              >
                <FaGlobe size={32} color="blue.600" />
              </Flex>

              <Card.Title asChild>
                <Heading
                  as="h3"
                  fontSize="xl"
                  fontWeight="semibold"
                  color="gray.900"
                  mb={4}
                >
                  Multi-Platform Support
                </Heading>
              </Card.Title>

              <Card.Description>
                <Text color="gray.600">
                  Manage Facebook, Instagram, Twitter, LinkedIn, TikTok, and
                  more from one centralized dashboard.
                </Text>
              </Card.Description>
            </Card.Body>
          </Card.Root>
        </SimpleGrid>
      </Box>
    </Box>
  )
}
