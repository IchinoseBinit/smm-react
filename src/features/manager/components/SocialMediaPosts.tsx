import { useState } from "react";
import {
  Badge,
  Box,
  Flex,
  Heading,
  HStack,
  IconButton,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FiMoreHorizontal } from "react-icons/fi";
import useGetPostsByDate from "../hooks/query/useGetPosts";
import type { Post } from "../types";
import { FaFacebook, FaTiktok, FaYoutube } from "react-icons/fa6";
import { CircularLoading } from "@/lib/loadings";

export default function SocialMediaPosts() {
  const [from, setFrom] = useState(
    new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
  );
  const [to, setTo] = useState(new Date().toISOString().split("T")[0]);

  const { data, isLoading } = useGetPostsByDate({
    from: from as string,
    to,
    userId: 4,
  });

  if (isLoading) return <CircularLoading />;

  return (
    <VStack align="stretch" spaceY={6}>
      {/* FILTER BAR */}
      <Flex justify="end" mb={4}>
        <HStack spaceX={3} align="end">
          <Box>
            <Text fontSize="sm" mb={1} color="fg.MUTED">
              From
            </Text>
            <Input
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              size="sm"
              maxW="40"
            />
          </Box>
          <Box>
            <Text fontSize="sm" mb={1} color="fg.MUTED">
              To
            </Text>
            <Input
              type="date"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              size="sm"
              maxW="40"
            />
          </Box>
        </HStack>
      </Flex>

      {/* POSTS */}

      {data.length === 0 ? (
        <Text textAlign="center" color="fg.MUTED" mt={6}>
          No posts found for the selected date range.
        </Text>
      ) : (
        data.map((post: Post) => {
          const postDate = new Date(post.scheduled_time);
          return (
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
                  <Heading size="md">{post.title}</Heading>
                  <Text color="fg.DEFAULT" mb={2}>
                    {post.description}
                  </Text>
                  <HStack spaceX={2} mb={3}>
                    {post.platform_statuses.map((p, i) => {
                      if (p.accountType === "YOUTUBE")
                        return <FaYoutube key={i} color="red" />;
                      if (p.accountType === "FACEBOOK")
                        return <FaFacebook key={i} color="blue" />;
                      if (p.accountType === "TIKTOK")
                        return <FaTiktok key={i} />;
                      return null;
                    })}
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
                <Text fontSize="sm" color="fg.MUTED">
                  {postDate.toLocaleDateString()}
                </Text>
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
          );
        })
      )}
    </VStack>
  );
}
