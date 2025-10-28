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
import { useSubscriptionPlans } from "@/features/Subscription/hooks/useSubsciption";
import { FaCheck } from "react-icons/fa";
import type { SubscriptionPlan } from "@/features/Subscription/types";

export default function Pricing() {

  const { data: subscriptionPlans } = useSubscriptionPlans();
  console.log("Subscription Plans:", subscriptionPlans);

  // Get first 2 plans from API
  const apiPlans = subscriptionPlans?.slice(0, 2) || [];

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

        <SimpleGrid columns={{ base: 1, md: 3 }} gap={8} maxW="6xl" mx="auto">
          {/* Free Plan - Hardcoded */}
          <Card.Root border="1px" borderColor="gray.200" position="relative">
            <Card.Body p={8}>
              <Heading
                as="h3"
                fontSize="2xl"
                fontWeight="bold"
                color="gray.900"
                mb={2}
              >
                Free
              </Heading>

              <Box mb={6}>
                <Text
                  as="span"
                  fontSize="4xl"
                  fontWeight="bold"
                  color="gray.900"
                >
                  $0
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
                  <Text color="gray.600">Up to 1 user</Text>
                </List.Item>
                <List.Item display="flex" alignItems="center">
                  <FaCheck
                    size={20}
                    color="green.500"
                    style={{ marginRight: "12px" }}
                  />
                  <Text color="gray.600">10 posts/month</Text>
                </List.Item>
                <List.Item display="flex" alignItems="center">
                  <FaCheck
                    size={20}
                    color="green.500"
                    style={{ marginRight: "12px" }}
                  />
                  <Text color="gray.600">Basic features</Text>
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

          {/* API Plans - Dynamic */}
          {apiPlans.map((plan: SubscriptionPlan, index: number) => (
            <Card.Root
              key={plan.id}
              border="1px"
              borderColor={index === 0 ? "green.500" : "gray.200"}
              position="relative"
              shadow={index === 0 ? "lg" : "none"}
              transform={index === 0 ? "scale(1.05)" : "none"}
              zIndex={index === 0 ? 1 : 0}
            >
              {index === 0 && (
                <Box
                  position="absolute"
                  top={-3}
                  left="50%"
                  transform="translateX(-50%)"
                >
                  <Badge bg="blue.500" color="white">
                    Most Popular
                  </Badge>
                </Box>
              )}

              <Card.Body p={8}>
                <Heading
                  as="h3"
                  fontSize="2xl"
                  fontWeight="bold"
                  color="gray.900"
                  mb={2}
                >
                  {plan.name.charAt(0).toUpperCase() + plan.name.slice(1)}
                </Heading>

                <Box mb={6}>
                  <Text
                    as="span"
                    fontSize="4xl"
                    fontWeight="bold"
                    color="gray.900"
                  >
                    ${plan.price}
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
                    <Text color="gray.600">
                      Up to {plan.max_users} users
                    </Text>
                  </List.Item>
                  <List.Item display="flex" alignItems="center">
                    <FaCheck
                      size={20}
                      color="green.500"
                      style={{ marginRight: "12px" }}
                    />
                    <Text color="gray.600">
                      {plan.max_posts_per_month} posts/month
                    </Text>
                  </List.Item>
                  <List.Item display="flex" alignItems="center">
                    <FaCheck
                      size={20}
                      color="green.500"
                      style={{ marginRight: "12px" }}
                    />
                    <Text color="gray.600">
                      Advanced analytics
                    </Text>
                  </List.Item>
                  <List.Item display="flex" alignItems="center">
                    <FaCheck
                      size={20}
                      color="green.500"
                      style={{ marginRight: "12px" }}
                    />
                    <Text color="gray.600">
                      Priority support
                    </Text>
                  </List.Item>
                </List.Root>

                <Button
                  bg={index === 0 ? "blue.500" : "transparent"}
                  color={index === 0 ? "white" : "gray.900"}
                  variant={index === 0 ? "solid" : "outline"}
                  borderColor={index === 0 ? "transparent" : "gray.300"}
                  _hover={{ bg: index === 0 ? "blue.600" : "gray.100" }}
                  w="full"
                >
                  {index === 1 ? "Contact Sales" : "Get Started"}
                </Button>
              </Card.Body>
            </Card.Root>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  )
}
