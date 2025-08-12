import {
  Box,
  SimpleGrid,
  Flex,
  Text,
  Heading,
  Link,
  List,
} from "@chakra-ui/react";

export default function Footer() {
  return (
    <Box as="footer" bg="gray.900" color="white" py={12}>
      <Box maxW="container.xl" mx="auto" px={4}>
        <SimpleGrid columns={{ base: 1, md: 5 }} gap={8}>
          <Box>
            <Flex align="center" gap={2} mb={4}>
              <Box
                w={8}
                h={8}
                bg="green.500"
                rounded="lg"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Text fontWeight="bold" fontSize="lg" color="white">
                  S
                </Text>
              </Box>
              <Text fontSize="xl" fontWeight="bold">
                Socially
              </Text>
            </Flex>
            <Text color="gray.400" mb={4}>
              Simplifying brand management for businesses worldwide.
            </Text>
          </Box>

          <Box>
            <Heading as="h4" fontSize="lg" fontWeight="semibold" mb={4}>
              Product
            </Heading>
            <List.Root gap={2}>
              <List.Item>
                <Link href="#" color="gray.400" _hover={{ color: "white" }}>
                  Features
                </Link>
              </List.Item>
              <List.Item>
                <Link href="#" color="gray.400" _hover={{ color: "white" }}>
                  Pricing
                </Link>
              </List.Item>
              <List.Item>
                <Link href="#" color="gray.400" _hover={{ color: "white" }}>
                  Security
                </Link>
              </List.Item>
              <List.Item>
                <Link href="#" color="gray.400" _hover={{ color: "white" }}>
                  Integrations
                </Link>
              </List.Item>
            </List.Root>
          </Box>

          <Box>
            <Heading as="h4" fontSize="lg" fontWeight="semibold" mb={4}>
              Company
            </Heading>
            <List.Root gap={2} color="gray.400">
              <List.Item>
                <Link href="#" color="gray.400" _hover={{ color: "white" }}>
                  About
                </Link>
              </List.Item>
              <List.Item>
                <Link href="#" color="gray.400" _hover={{ color: "white" }}>
                  Blog
                </Link>
              </List.Item>
              <List.Item>
                <Link href="#" color="gray.400" _hover={{ color: "white" }}>
                  Careers
                </Link>
              </List.Item>
              <List.Item>
                <Link href="#" color="gray.400" _hover={{ color: "white" }}>
                  Contact
                </Link>
              </List.Item>
            </List.Root>
          </Box>

          <Box>
            <Heading as="h4" fontSize="lg" fontWeight="semibold" mb={4}>
              Support
            </Heading>
            <List.Root gap={2} color="gray.400">
              <List.Item>
                <Link href="#" color="gray.400" _hover={{ color: "white" }}>
                  Help Center
                </Link>
              </List.Item>
              <List.Item>
                <Link href="#" color="gray.400" _hover={{ color: "white" }}>
                  Documentation
                </Link>
              </List.Item>
              <List.Item>
                <Link href="#" color="gray.400" _hover={{ color: "white" }}>
                  API Reference
                </Link>
              </List.Item>
              <List.Item>
                <Link href="#" color="gray.400" _hover={{ color: "white" }}>
                  Status
                </Link>
              </List.Item>
            </List.Root>
          </Box>

          <Box>
            <Heading as="h4" fontSize="lg" fontWeight="semibold" mb={4}>
              Legal
            </Heading>
            <List.Root gap={2} color="gray.400">
              <List.Item>
                <Link
                  href="/privacypolicy"
                  color="gray.400"
                  _hover={{ color: "white" }}
                >
                  Privacy Policy
                </Link>
              </List.Item>
              <List.Item>
                <Link
                  href="/termsofservices"
                  color="gray.400"
                  _hover={{ color: "white" }}
                >
                  Terms of Service
                </Link>
              </List.Item>
            </List.Root>
          </Box>
        </SimpleGrid>

        <Box
          borderTop="1px"
          borderColor="gray.800"
          mt={8}
          pt={8}
          textAlign="center"
        >
          <Text color="gray.400">
            &copy; 2024 Brandly. All rights reserved.
          </Text>
        </Box>
      </Box>
    </Box>
  )
}
