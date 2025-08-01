import {
  Box,
  SimpleGrid,
  Card,
  Heading,
  Text,
  Button,
  Badge,
  List,
} from "@chakra-ui/react";
import { FaCheck } from "react-icons/fa";

export default function Pricing() {
  return (
    <Box as="section" id="pricing" py={20} bg="gray.50">
      <Box maxW="container.xl" mx="auto" px={4}>
        <Box textAlign="center" mb={16}>
          <Heading
            as="h2"
            fontSize="4xl"
            fontWeight="bold"
            color="gray.900"
            mb={4}
          >
            Plans That Fit Your Needs
          </Heading>
          <Text fontSize="xl" color="gray.600">
            Choose the perfect plan for your business size and requirements.
          </Text>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 3 }} gap={8} maxW="5xl" mx="auto">
          <Card.Root border="1px" borderColor="gray.200" position="relative">
            <Card.Body p={8}>
              <Heading
                as="h3"
                fontSize="2xl"
                fontWeight="bold"
                color="gray.900"
                mb={2}
              >
                Starter
              </Heading>

              <Box mb={6}>
                <Text
                  as="span"
                  fontSize="4xl"
                  fontWeight="bold"
                  color="gray.900"
                >
                  $15
                </Text>
                <Text as="span" color="gray.600">
                  /month
                </Text>
              </Box>

              <List.Root gap={3} mb={8}>
                <List.Item display="flex" alignItems="center">
                  <FaCheck
                    size={20}
                    color="green.500"
                    style={{ marginRight: "12px" }}
                  />
                  <Text color="gray.600">Basic analytics</Text>
                </List.Item>
                <List.Item display="flex" alignItems="center">
                  <FaCheck
                    size={20}
                    color="green.500"
                    style={{ marginRight: "12px" }}
                  />
                  <Text color="gray.600">5GB storage</Text>
                </List.Item>
                <List.Item display="flex" alignItems="center">
                  <FaCheck
                    size={20}
                    color="green.500"
                    style={{ marginRight: "12px" }}
                  />
                  <Text color="gray.600">Up to 3 team members</Text>
                </List.Item>
              </List.Root>

              <Button
                variant="outline"
                borderColor="gray.300"
                w="full"
                borderRadius={8}
              >
                Get Started
              </Button>
            </Card.Body>
          </Card.Root>

          <Card.Root
            border="1px"
            borderColor="green.500"
            position="relative"
            shadow="lg"
          >
            <Box
              position="absolute"
              top={-3}
              left="50%"
              transform="translateX(-50%)"
            >
              <Badge bg="green.500" color="white">
                Most Popular
              </Badge>
            </Box>

            <Card.Body p={8}>
              <Heading
                as="h3"
                fontSize="2xl"
                fontWeight="bold"
                color="gray.900"
                mb={2}
              >
                Professional
              </Heading>

              <Box mb={6}>
                <Text
                  as="span"
                  fontSize="4xl"
                  fontWeight="bold"
                  color="gray.900"
                >
                  $29
                </Text>
                <Text as="span" color="gray.600">
                  /month
                </Text>
              </Box>

              <List.Root gap={3} mb={8}>
                {[
                  "Advanced analytics",
                  "50GB storage",
                  "Up to 10 team members",
                  "Priority support",
                ].map((feature, idx) => (
                  <List.Item key={idx} display="flex" alignItems="center">
                    <FaCheck
                      size={20}
                      color="green.500"
                      style={{ marginRight: "12px" }}
                    />
                    <Text color="gray.600">{feature}</Text>
                  </List.Item>
                ))}
              </List.Root>

              <Button
                bg="green.500"
                color="white"
                _hover={{ bg: "green.600" }}
                w="full"
              >
                Get Started
              </Button>
            </Card.Body>
          </Card.Root>

          <Card.Root border="1px" borderColor="gray.200" position="relative">
            <Card.Body p={8}>
              <Heading
                as="h3"
                fontSize="2xl"
                fontWeight="bold"
                color="gray.900"
                mb={2}
              >
                Enterprise
              </Heading>

              <Box mb={6}>
                <Text
                  as="span"
                  fontSize="4xl"
                  fontWeight="bold"
                  color="gray.900"
                >
                  $99
                </Text>
                <Text as="span" color="gray.600">
                  /month
                </Text>
              </Box>

              <List.Root gap={3} mb={8}>
                {[
                  "Full analytics suite",
                  "Unlimited storage",
                  "Unlimited team members",
                  "24/7 dedicated support",
                ].map((feature, idx) => (
                  <List.Item key={idx} display="flex" alignItems="center">
                    <FaCheck
                      size={20}
                      color="green.500"
                      style={{ marginRight: "12px" }}
                    />
                    <Text color="gray.600">{feature}</Text>
                  </List.Item>
                ))}
              </List.Root>

              <Button variant="outline" borderColor="gray.300" w="full">
                Contact Sales
              </Button>
            </Card.Body>
          </Card.Root>
        </SimpleGrid>
      </Box>
    </Box>
  );
}
