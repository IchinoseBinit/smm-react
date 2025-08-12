import {
  Box,
  SimpleGrid,
  Card,
  Heading,
  Text,
  Flex,
  Image,
} from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";

export default function Testimonials() {
  return (
    <Box as="section" py={20} bg="white">
      <Box maxW="container.xl" mx="auto" px={4}>
        <Box textAlign="center" mb={16}>
          <Heading
            as="h2"
            fontSize="4xl"
            fontWeight="bold"
            color="gray.900"
            mb={4}
          >
            Trusted by Thousands
            <br />
            of Businesses Worldwide
          </Heading>
          <Text fontSize="xl" color="gray.600">
            See what our customers have to say about Socially.
          </Text>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 3 }} gap={8}>
          <Card.Root border="1px" borderColor="gray.200">
            <Card.Body>
              <Flex align="center" mb={4}>
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} size={20} color="yellow.400" />
                ))}
              </Flex>

              <Text color="gray.600" mb={6}>
                &quot;Socially has revolutionized how we manage our brand
                assets. The analytics insights are incredible and hepp us make
                better.
              </Text>

              <Flex align="center">
                <Image
                  src="https://img.freepik.com/free-vector/businesswoman-character-avatar-isolated_24877-60111.jpg"
                  alt="Sarah Chen"
                  boxSize="40px"
                  rounded="full"
                  objectFit="cover"
                />
                <Box ml={3}>
                  <Text fontWeight="semibold" color="gray.900">
                    Sarah Chen
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    Marketing Director, TechCorp
                  </Text>
                </Box>
              </Flex>
            </Card.Body>
          </Card.Root>

          <Card.Root border="1px" borderColor="gray.200">
            <Card.Body p={6}>
              <Flex align="center" mb={4}>
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} size={20} color="yellow.400" />
                ))}
              </Flex>

              <Text color="gray.600" mb={6}>
                &quot;The collaboration features are outstanding. Our team can
                now work together seamlessly on brand projects from anywhere in
                the world.&quot;
              </Text>

              <Flex align="center">
                <Image
                  src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60395.jpg"
                  alt="Michael Rodriguez"
                  boxSize="40px"
                  rounded="full"
                  objectFit="cover"
                />
                <Box ml={3}>
                  <Text fontWeight="semibold" color="gray.900">
                    Michael Rodriguez
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    Creative Director, DesignStudio
                  </Text>
                </Box>
              </Flex>
            </Card.Body>
          </Card.Root>

          <Card.Root border="1px" borderColor="gray.200">
            <Card.Body p={6}>
              <Flex align="center" mb={4}>
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} size={20} color="yellow.400" />
                ))}
              </Flex>

              <Text color="gray.600" mb={6}>
                &quot;Socially&apos;s asset management system has saved us
                countless hours. Everything is organized, accessible, and
                version-controlled perfectly.&quot;
              </Text>

              <Flex align="center">
                <Image
                  src="https://img.freepik.com/free-vector/businesswoman-character-avatar-isolated_24877-60112.jpg"
                  alt="Emily Johnson"
                  boxSize="40px"
                  rounded="full"
                  objectFit="cover"
                />
                <Box ml={3}>
                  <Text fontWeight="semibold" color="gray.900">
                    Emily Johnson
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    Brand Manager, RetailPlus
                  </Text>
                </Box>
              </Flex>
            </Card.Body>
          </Card.Root>
        </SimpleGrid>
      </Box>
    </Box>
  )
}
