import { Box, Container, Heading, Text, VStack, Link } from "@chakra-ui/react"

export default function Termsofservices() {
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
              Terms and Conditions – Socially
            </Heading>
            <Text fontSize="lg" color="gray.600" fontWeight="medium">
              <Text as="span" fontWeight="bold">
                Effective Date:
              </Text>{" "}
              10-Jun-2025
            </Text>
            <Text color="gray.600" fontSize="md" lineHeight="1.6">
              By using Socially Nepal Pvt. Ltd. ("Socially") on web or mobile,
              you agree to these terms. If you do not agree, please do not use
              the platform.
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
                1. Services Offered
              </Heading>
              <Text color="gray.600">
                Socially provides scheduling, publishing, analytics, and
                collaboration tools for social media.
              </Text>
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
                2. Eligibility
              </Heading>
              <Text color="gray.600">
                You must be 13+ to register. If under 18, parental consent is
                required.
              </Text>
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
                3. Account Registration
              </Heading>
              <Text color="gray.600">
                Users must register with accurate info and keep credentials
                secure.
              </Text>
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
                4. Plans & Payments
              </Heading>
              <Text color="gray.600">
                We offer free and premium plans. Subscriptions renew
                automatically and may be canceled any time.
              </Text>
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
                5. Content Ownership
              </Heading>
              <Text color="gray.600">
                You retain rights to your content but grant us a limited license
                to display and process it as needed for service delivery.
              </Text>
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
                6. Platform Integrations
              </Heading>
              <Text color="gray.600" mb={4}>
                By connecting your social accounts such as Facebook, Instagram,
                or TikTok, you agree to the respective platform's terms of
                service. You grant Socially permission to access authorized data
                (e.g., profile information, pages, content, tokens) as needed
                for features like publishing, analytics, and scheduling.
              </Text>

              <Text color="gray.700" fontWeight="bold" mb={3}>
                When you link your Facebook account:
              </Text>
              <VStack align="start" gap={3} ml={4} mb={4}>
                <Text color="gray.600">
                  • You allow Socially to access your public profile, pages you
                  manage, and post content on your behalf.
                </Text>
                <Text color="gray.600">
                  • You agree to Facebook's Terms of Service and Platform
                  Policy.
                </Text>
                <Text color="gray.600">
                  • We use Facebook APIs in accordance with their usage limits
                  and permissions.
                </Text>
                <Text color="gray.600">
                  • You may disconnect Facebook access at any time via your
                  Facebook settings or the Socially dashboard.
                </Text>
              </VStack>

              <Text color="gray.700" fontWeight="bold" mb={3}>
                When you link your TikTok account:
              </Text>
              <VStack align="start" gap={3} ml={4}>
                <Text color="gray.600">
                  • You allow Socially to upload and publish videos on your
                  behalf.
                </Text>
                <Text color="gray.600">
                  • You agree to TikTok's Terms of Service and API usage
                  guidelines.
                </Text>
                <Text color="gray.600">
                  • You may disconnect TikTok access at any time via your TikTok
                  settings or the Socially dashboard.
                </Text>
              </VStack>

              <Text color="gray.700" fontWeight="bold" mb={3}>
                When you link your YouTube account:
              </Text>
              <VStack align="start" gap={3} ml={4}>
                <Text color="gray.600">
                  • You allow Socially to upload and manage videos on your
                  behalf.
                </Text>
                <Text color="gray.600">
                  • You agree to YouTube's Terms of Service, the YouTube API
                  Services Terms of Service, and Google’s Privacy Policy
                  (https://policies.google.com/privacy).
                </Text>
                <Text color="gray.600">
                  • We use YouTube APIs in compliance with Google’s API Services
                  User Data Policy.
                </Text>
                <Text color="gray.600">
                  • You may disconnect YouTube access at any time via your
                  Google Account permissions page
                  (https://myaccount.google.com/permissions) or the Socially
                  dashboard.
                </Text>
              </VStack>
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
                7. Appropriate Use
              </Heading>
              <Text color="gray.600">
                Do not misuse our tools to post harmful, misleading, or
                infringing content. Accounts violating guidelines may be
                suspended.
              </Text>
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
                8. Intellectual Property
              </Heading>
              <Text color="gray.600">
                Socially owns its design, software, and branding. Do not reuse
                assets without permission.
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
                9. Disclaimers
              </Heading>
              <Text color="gray.600">
                We offer no guarantee of uninterrupted service. Use is at your
                own risk.
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
                10. Jurisdiction
              </Heading>
              <Text color="gray.600">
                These terms are governed by Nepali law. Disputes will be handled
                in Nepal's legal system.
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
                11. Contact
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
