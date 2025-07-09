import {
  Badge,
  Box,
  Heading,
  HStack,
  IconButton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FiMoreHorizontal } from "react-icons/fi";
import useGetPostsByDate from "../hooks/query/useGetPosts";
import type { Post } from "../types";
import { FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa6";
import { CircularLoading } from "@/lib/loadings";

export default function SocialMediaPosts() {
  const { data, isLoading } = useGetPostsByDate({
    from: "2025-07-7",
    to: "2025-07-9",
    userId: 4,
  });
  if (isLoading) return <CircularLoading />;

  return (
    <VStack spaceY={4} align="stretch">
      {data.map((post: Post) => {
        const postDate = new Date(post?.scheduled_time);
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
                <Heading>{post.title}</Heading>
                <Text color="fg.DEFAULT" mb={2}>
                  {post.description}
                </Text>
                <HStack spaceX={2} mb={3}>
                  {/* corrected spaceX -> spacing */}
                  {post.platform_statuses.map((p, idx) => {
                    if (p.accountType === "YOUTUBE")
                      return <FaYoutube key={idx} color="red" />;
                    if (p.accountType === "FACEBOOK")
                      return <FaFacebook key={idx} color="blue" />;
                    if (p.accountType === "TWITTER")
                      return <FaTwitter key={idx} color="black" />;
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
              {/* corrected spaceX -> spacing */}
              {post.scheduled_time && (
                <Text fontSize="sm" color="fg.MUTED">
                  {postDate.toLocaleDateString()}
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
        );
      })}
    </VStack>
  );
}
