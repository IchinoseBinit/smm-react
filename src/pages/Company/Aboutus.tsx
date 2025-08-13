// import React from "react"
import { Box, Container, Heading, Text, VStack, Link } from "@chakra-ui/react"

export default function Aboutus() {
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
              About Us – Socially
            </Heading>
            <Heading
              as="h2"
              size="xl"
              color="blue.600"
              textAlign="center"
              w="full"
              mb={4}
            >
              The All-in-One Social Media Management Tool
            </Heading>
            <Text color="gray.600" fontSize="md" lineHeight="1.6">
              Socially is your ultimate social media scheduling and publishing
              platform designed to save time, grow your audience, and simplify
              your online presence. With Socially, you can create, schedule, and
              publish posts to Facebook, Instagram, TikTok, and YouTube — all
              from one powerful dashboard.
            </Text>
            <Text color="gray.600" fontSize="md" lineHeight="1.6">
              We help creators, coaches, entrepreneurs, and businesses manage
              all their social media in one place without the stress of
              switching apps or repeating the same upload process.
            </Text>
          </VStack>

          <VStack gap={8} align="stretch">
            {/* Our Mission */}
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
                Our Mission
              </Heading>
              <Text color="gray.600" lineHeight="1.6">
                To empower every creator and business to build a consistent,
                impactful online presence by making social media posting faster,
                easier, and smarter. We believe you should spend less time
                uploading and more time creating.
              </Text>
            </Box>

            {/* Why Socially Stands Out */}
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
                Why Socially Stands Out
              </Heading>
              <VStack align="start" gap={3} ml={4}>
                <Text color="gray.600">
                  •{" "}
                  <Text as="span" fontWeight="bold">
                    One Dashboard, Multiple Platforms
                  </Text>{" "}
                  – Manage Facebook, Instagram, TikTok, and YouTube in one
                  place.
                </Text>
                <Text color="gray.600">
                  •{" "}
                  <Text as="span" fontWeight="bold">
                    Schedule in Advance
                  </Text>{" "}
                  – Plan weeks of content in just minutes.
                </Text>
                <Text color="gray.600">
                  •{" "}
                  <Text as="span" fontWeight="bold">
                    AI-Assisted Creativity
                  </Text>{" "}
                  – Get smart captions, hashtags, and post suggestions.
                </Text>
                <Text color="gray.600">
                  •{" "}
                  <Text as="span" fontWeight="bold">
                    Real-Time Analytics
                  </Text>{" "}
                  – Track likes, comments, reach, and growth.
                </Text>
                <Text color="gray.600">
                  •{" "}
                  <Text as="span" fontWeight="bold">
                    Time-Saving Automation
                  </Text>{" "}
                  – No more repeating the same uploads on different apps.
                </Text>
              </VStack>
            </Box>

            {/* Who Uses Socially? */}
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
                Who Uses Socially?
              </Heading>
              <VStack align="start" gap={3} ml={4}>
                <Text color="gray.600">
                  •{" "}
                  <Text as="span" fontWeight="bold">
                    Content Creators & Influencers
                  </Text>{" "}
                  – Maintain consistent posting without burnout.
                </Text>
                <Text color="gray.600">
                  •{" "}
                  <Text as="span" fontWeight="bold">
                    Coaches & Educators
                  </Text>{" "}
                  – Promote courses, live streams, and programs effortlessly.
                </Text>
                <Text color="gray.600">
                  •{" "}
                  <Text as="span" fontWeight="bold">
                    Small Businesses
                  </Text>{" "}
                  – Boost visibility and sales through social media marketing.
                </Text>
                <Text color="gray.600">
                  •{" "}
                  <Text as="span" fontWeight="bold">
                    Agencies & Social Media Managers
                  </Text>{" "}
                  – Manage multiple clients from a single dashboard.
                </Text>
              </VStack>
            </Box>

            {/* Our Story */}
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
                Our Story
              </Heading>
              <Text color="gray.600" lineHeight="1.6" mb={4}>
                The idea for Socially started with one simple question: "Why
                waste hours posting the same content over and over when it could
                be done in one click?" From this frustration, we built Socially
                — a fast, reliable, and smart social media management tool.
              </Text>
              <Text color="gray.600" lineHeight="1.6">
                Today, creators and businesses trust Socially to handle their
                multi-platform posting, engagement tracking, and content
                scheduling.
              </Text>
            </Box>

            {/* Join the Future */}
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
                Join the Future of Social Media Management
              </Heading>
              <Text color="gray.600" lineHeight="1.6" mb={4}>
                With Socially, you're not just posting — you're building a
                brand. Stop wasting hours juggling multiple apps. Let Socially
                handle it, so you can focus on creating content that matters.
              </Text>
            </Box>

            {/* Let's Connect */}
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
                Let's Connect
              </Heading>
              <VStack align="start" gap={3} ml={4}>
                <Text color="gray.600">
                  ■{" "}
                  <Text as="span" fontWeight="bold">
                    Website:
                  </Text>{" "}
                  <Link
                    href="https://www.sociallynp.com"
                    color="blue.500"
                    _hover={{ textDecoration: "underline" }}
                  >
                    www.sociallynp.com
                  </Link>
                </Text>
                <Text color="gray.600">
                  ■{" "}
                  <Text as="span" fontWeight="bold">
                    Instagram:
                  </Text>{" "}
                  <Link
                    href="https://instagram.com/socially_np"
                    color="blue.500"
                    _hover={{ textDecoration: "underline" }}
                  >
                    @socially_np
                  </Link>
                </Text>
                <Text color="gray.600">
                  ■{" "}
                  <Text as="span" fontWeight="bold">
                    LinkedIn:
                  </Text>{" "}
                  <Link
                    href="https://www.linkedin.com/company/socially1"
                    color="blue.500"
                    _hover={{ textDecoration: "underline" }}
                  >
                    Socially
                  </Link>
                </Text>
                <Text color="gray.600">
                  ■{" "}
                  <Text as="span" fontWeight="bold">
                    Facebook:
                  </Text>
                  <Link
                    href="https://www.facebook.com/profile.php?id=61578875882049"
                    color="blue.500"
                    _hover={{ textDecoration: "underline" }}
                  >
                    Socially
                  </Link>
                </Text>
                <Text color="gray.600">
                  ■{" "}
                  <Text as="span" fontWeight="bold">
                    TikTok:
                  </Text>{" "}
                  <Link
                    href="https://tiktok.com/@sociallyapp"
                    color="blue.500"
                    _hover={{ textDecoration: "underline" }}
                  >
                    @sociallyapp
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
