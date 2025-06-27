import React from "react";
import { Box, VStack, HStack, Text, IconButton, Badge } from "@chakra-ui/react";
import { FiMoreHorizontal } from "react-icons/fi";
import { FaFacebook, FaTiktok, FaYoutube } from "react-icons/fa6";

interface Post {
  id: number;
  text: string;
  platforms: { icon: React.ReactNode }[];
  likes: number;
  comments: number;
  shares: number;
  status: "published" | "scheduled" | "draft";
  scheduledAt?: string;
}

const posts: Post[] = [
  {
    id: 1,
    text: "Excited to share our latest product update! 🚀 What do you think about the new features?",
    platforms: [
      {
        icon: (
          <Text as="span" fontSize="lg" color="blue.600">
            <FaFacebook />
          </Text>
        ),
      },
      {
        icon: (
          <Text as="span" fontSize="lg" color="red.600">
            <FaYoutube />
          </Text>
        ),
      },
    ],
    likes: 42,
    comments: 8,
    shares: 5,
    status: "published",
  },
  {
    id: 2,
    text: "Behind the scenes of our creative process. Coming soon on all platforms!",
    platforms: [
      {
        icon: (
          <Text as="span" fontSize="lg">
            <FaTiktok />
          </Text>
        ),
      },
      {
        icon: (
          <Text as="span" fontSize="lg" color="red.600">
            <FaYoutube />
          </Text>
        ),
      },
    ],
    likes: 0,
    comments: 0,
    shares: 0,
    status: "scheduled",
    scheduledAt: "Jan 15, 2024",
  },
  {
    id: 3,
    text: "Thank you for all the amazing feedback! We're listening and improving every day.",
    platforms: [
      {
        icon: (
          <Text as="span" fontSize="lg" color="blue.600">
            <FaFacebook />
          </Text>
        ),
      },
    ],
    likes: 28,
    comments: 12,
    shares: 3,
    status: "published",
  },
  {
    id: 4,
    text: "Weekly tip: How to increase engagement on social media...",
    platforms: [
      {
        icon: (
          <Text as="span" fontSize="lg" color="blue.600">
            <FaFacebook />
          </Text>
        ),
      },
      {
        icon: (
          <Text as="span" fontSize="lg" color="red.600">
            <FaYoutube />
          </Text>
        ),
      },
      {
        icon: (
          <Text as="span" fontSize="lg">
            <FaTiktok />
          </Text>
        ),
      },
    ],
    likes: 0,
    comments: 0,
    shares: 0,
    status: "draft",
  },
];

export default function Manager() {
  return (
    <Box p={{ base: 4, md: 8 }} bg="bg.DEFAULT" minH="100vh">
      <Text
        fontSize={{ base: "2xl", md: "3xl" }}
        fontWeight="bold"
        mb={6}
        color="fg.DEFAULT"
      >
        Social Media Manager
      </Text>
      <VStack spaceY={4} align="stretch">
        {" "}
        {/* corrected spaceY -> spacing */}
        {posts.map((post) => (
          <Box
            key={post.id}
            p={4}
            bg="bg.card"
            borderWidth={1}
            borderColor="border.DEFAULT"
            borderRadius="2xl"
            shadow="sm"
            _hover={{ shadow: "md", transition: "all 0.2s ease-in-out" }}
          >
            <HStack justify="space-between" align="start">
              <Box flex="1">
                <Text color="fg.DEFAULT" mb={2}>
                  {post.text}
                </Text>
                <HStack spaceX={2} mb={3}>
                  {" "}
                  {/* corrected spaceX -> spacing */}
                  {post.platforms.map((p, idx) => (
                    <Box key={idx}>{p.icon}</Box>
                  ))}
                </HStack>
                <HStack spaceX={6} color="fg.MUTED">
                  <Text>{post.likes} likes</Text>
                  <Text>{post.comments} comments</Text>
                  <Text>{post.shares} shares</Text>
                </HStack>
              </Box>
              <IconButton
                aria-label="Options"
                variant="ghost"
                size="sm"
                color="fg.MUTED"
                _hover={{ bg: "bg.hover", color: "fg.DEFAULT" }}
              >
                <FiMoreHorizontal />
              </IconButton>
            </HStack>
            <HStack justify="end" mt={3} spaceX={2}>
              {" "}
              {/* corrected spaceX -> spacing */}
              {post.scheduledAt && (
                <Text fontSize="sm" color="fg.MUTED">
                  {post.scheduledAt}
                </Text>
              )}
              <Badge
                variant="subtle"
                colorScheme={
                  post.status === "published"
                    ? "green"
                    : post.status === "scheduled"
                      ? "blue"
                      : "gray"
                }
                textTransform="capitalize"
              >
                {post.status}
              </Badge>
            </HStack>
          </Box>
        ))}
      </VStack>
    </Box>
  );
}
