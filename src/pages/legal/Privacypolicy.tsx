import { Box, Container, Heading, Text, VStack, Link } from "@chakra-ui/react"

export default function Privacypolicy() {
  return (
    <Box bg="gray.50" minH="100vh" py={8}>
      <Container maxW="4xl">
        <Box bg="white" p={8} borderRadius="lg" shadow="lg">
          {/* Header */}
          <VStack gap={4} align="start" mb={8}>
            <Heading
              as="h1"
              size="2xl"
              color="gray.800"
              textAlign="center"
              w="full"
            >
              Privacy Policy – Socially
            </Heading>
            <Text fontSize="lg" color="gray.600" fontWeight="medium">
              <Text as="span" fontWeight="bold">
                Effective Date:
              </Text>{" "}
              10-Jun-2025
            </Text>
            <Text color="gray.600" fontSize="md" lineHeight="1.6">
              This Privacy Policy explains how Socially Nepal Pvt. Ltd.
              ("Socially", "we", "us", or "our") collects, uses, and protects
              your personal information.
            </Text>
          </VStack>

          <VStack gap={8} align="stretch">
            {/* Section 1 */}
            <Box>
              <Heading
                as="h2"
                size="lg"
                color="gray.800"
                mb={4}
                borderLeft="4px solid"
                borderColor="blue.400"
                pl={4}
              >
                1. Information We Collect
              </Heading>
              <VStack align="start" gap={3} ml={4}>
                <Text color="gray.600">
                  •{" "}
                  <Text as="span" fontWeight="bold">
                    Account Information:
                  </Text>{" "}
                  Name, email address, phone number, password.
                </Text>
                <Text color="gray.600">
                  •{" "}
                  <Text as="span" fontWeight="bold">
                    Social Platform Data:
                  </Text>{" "}
                  Tokens, account IDs, pages, videos, and content metadata from
                  TikTok, Facebook, Instagram, etc.
                </Text>
                <Text color="gray.600">
                  •{" "}
                  <Text as="span" fontWeight="bold">
                    Usage Data:
                  </Text>{" "}
                  Device type, IP address, browser type, interaction logs.
                </Text>
                <Text color="gray.600">
                  •{" "}
                  <Text as="span" fontWeight="bold">
                    Payment Information:
                  </Text>{" "}
                  Managed via secure third-party payment processors (we do not
                  store card details).
                </Text>
              </VStack>
            </Box>

            {/* Section 2 */}
            <Box>
              <Heading
                as="h2"
                size="lg"
                color="gray.800"
                mb={4}
                borderLeft="4px solid"
                borderColor="blue.400"
                pl={4}
              >
                2. How We Use Your Information
              </Heading>
              <VStack align="start" gap={3} ml={4}>
                <Text color="gray.600">
                  • To provide and improve services like scheduling, publishing,
                  analytics, and team collaboration.
                </Text>
                <Text color="gray.600">
                  • To authenticate users and maintain account security.
                </Text>
                <Text color="gray.600">
                  • To comply with legal obligations.
                </Text>
                <Text color="gray.600">
                  • To communicate updates, billing, or platform-related
                  messages.
                </Text>
              </VStack>
            </Box>

            {/* Section 3 */}
            <Box>
              <Heading
                as="h2"
                size="lg"
                color="gray.800"
                mb={4}
                borderLeft="4px solid"
                borderColor="blue.400"
                pl={4}
              >
                3. TikTok API Data
              </Heading>
              <Text color="gray.600" mb={3}>
                When you connect your TikTok account:
              </Text>
              <VStack align="start" gap={3} ml={4}>
                <Text color="gray.600">
                  • We collect access tokens, profile info, and video
                  permissions to post content on your behalf.
                </Text>
                <Text color="gray.600">
                  • We comply with TikTok's API terms and only use your data to
                  offer core platform features.
                </Text>
                <Text color="gray.600">
                  • You may revoke access at any time via TikTok or the Socially
                  dashboard.
                </Text>
              </VStack>
            </Box>

            {/* Section 4 */}
            <Box>
              <Heading
                as="h2"
                size="lg"
                color="gray.800"
                mb={4}
                borderLeft="4px solid"
                borderColor="blue.400"
                pl={4}
              >
                4. Facebook & Instagram Data
              </Heading>
              <Text color="gray.600" mb={3}>
                When you connect your Facebook or Instagram accounts:
              </Text>
              <VStack align="start" gap={3} ml={4}>
                <Text color="gray.600">
                  • We use access tokens to manage your pages, pull insights,
                  and schedule posts.
                </Text>
                <Text color="gray.600">
                  • All data access complies with Facebook Platform Policies.
                </Text>
                <Text color="gray.600">
                  • You may revoke permissions from your Facebook account
                  settings or from within Socially.
                </Text>
              </VStack>
            </Box>

            {/* Section 5 */}
            <Box>
              <Heading
                as="h2"
                size="lg"
                color="gray.800"
                mb={4}
                borderLeft="4px solid"
                borderColor="blue.400"
                pl={4}
              >
                5. Data Sharing
              </Heading>
              <Text color="gray.600" mb={3}>
                We do not sell or rent your personal data. We may share it only
                in the following cases:
              </Text>
              <VStack align="start" gap={3} ml={4}>
                <Text color="gray.600">
                  • With trusted third-party service providers (e.g., payment
                  processors, cloud providers).
                </Text>
                <Text color="gray.600">
                  • To comply with legal obligations or law enforcement
                  requests.
                </Text>
                <Text color="gray.600">
                  • In connection with a merger, sale, or acquisition (with
                  prior notice).
                </Text>
              </VStack>
            </Box>

            {/* Section 6 */}
            <Box>
              <Heading
                as="h2"
                size="lg"
                color="gray.800"
                mb={4}
                borderLeft="4px solid"
                borderColor="blue.400"
                pl={4}
              >
                6. Data Retention
              </Heading>
              <Text color="gray.600">
                We retain your data as long as your account is active or as
                needed to provide services. You can request deletion at any
                time.
              </Text>
            </Box>

            {/* Section 7 */}
            <Box>
              <Heading
                as="h2"
                size="lg"
                color="gray.800"
                mb={4}
                borderLeft="4px solid"
                borderColor="blue.400"
                pl={4}
              >
                7. Your Rights
              </Heading>
              <VStack align="start" gap={3} ml={4}>
                <Text color="gray.600">
                  • Access or export your data upon request.
                </Text>
                <Text color="gray.600">
                  • Correct or update your information.
                </Text>
                <Text color="gray.600">
                  • Delete your account and all associated data.
                </Text>
              </VStack>
            </Box>

            {/* Section 8 */}
            <Box>
              <Heading
                as="h2"
                size="lg"
                color="gray.800"
                mb={4}
                borderLeft="4px solid"
                borderColor="blue.400"
                pl={4}
              >
                8. Security
              </Heading>
              <Text color="gray.600">
                We use modern security standards including HTTPS, encryption,
                access control, and secure storage practices to protect your
                data.
              </Text>
            </Box>

            {/* Section 9 */}
            <Box>
              <Heading
                as="h2"
                size="lg"
                color="gray.800"
                mb={4}
                borderLeft="4px solid"
                borderColor="blue.400"
                pl={4}
              >
                9. Children's Privacy
              </Heading>
              <Text color="gray.600">
                Socially is not intended for children under 13. If you're under
                18, parental or guardian consent is required to use our
                services.
              </Text>
            </Box>

            {/* Section 10 */}
            <Box>
              <Heading
                as="h2"
                size="lg"
                color="gray.800"
                mb={4}
                borderLeft="4px solid"
                borderColor="blue.400"
                pl={4}
              >
                10. Changes to This Policy
              </Heading>
              <Text color="gray.600">
                We may update this Privacy Policy from time to time. We'll
                notify you of significant changes via email or within the
                platform.
              </Text>
            </Box>

            {/* Section 11 */}
            <Box>
              <Heading
                as="h2"
                size="lg"
                color="gray.800"
                mb={4}
                borderLeft="4px solid"
                borderColor="blue.400"
                pl={4}
              >
                11. Contact Us
              </Heading>
              <VStack align="start" gap={2}>
                <Text color="gray.600">
                  <Text as="span" fontWeight="bold">
                    Email:
                  </Text>{" "}
                  <Link
                    href="mailto:sociallynp@gmail.com"
                    color="blue.500"
                    _hover={{ textDecoration: "underline" }}
                  >
                    sociallynp@gmail.com
                  </Link>
                </Text>
                <Text color="gray.600">
                  <Text as="span" fontWeight="bold">
                    Phone:
                  </Text>{" "}
                  <Link
                    href="tel:+977-9807056616"
                    color="blue.500"
                    _hover={{ textDecoration: "underline" }}
                  >
                    +977-9807056616
                  </Link>
                </Text>
                <Text color="gray.600">
                  <Text as="span" fontWeight="bold">
                    Website:
                  </Text>{" "}
                  <Link
                    href="https://sociallynp.com"
                    color="blue.500"
                    _hover={{ textDecoration: "underline" }}
                  >
                    https://sociallynp.com
                  </Link>
                </Text>
              </VStack>
            </Box>
          </VStack>
        </Box>
      </Container>
    </Box>
  )
}
