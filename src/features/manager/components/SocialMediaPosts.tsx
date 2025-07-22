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
import { useAuthUtils } from "@/hooks/useAuthUtils";

export default function SocialMediaPosts() {
  const [from, setFrom] = useState(
    new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
  );
  const [to, setTo] = useState(new Date().toISOString().split("T")[0]);

  const { userId } = useAuthUtils();
  const { data, isLoading } = useGetPostsByDate({
    from: from as string,
    to,
    userId,
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
          // Define badge colors based on status
          const getStatusColor = (status: string) => {
            switch (status?.toLowerCase()) {
              case "failed":
                return "red.600";
              case "posted":
                return "green.600";
              case "scheduled":
                return "yellow";
              case "null":
                return "white";
              default:
                return "gray";
            }
          };
          return (
            <Box
              key={post.id}
              p={6}
              bg="white"
              borderWidth={1}
              borderColor="gray.200"
              borderRadius="xl"
              boxShadow="sm"
              transition="all 0.3s ease-in-out"
              _hover={{ boxShadow: "lg", transform: "translateY(-4px)" }}
            >
              <HStack justify="space-between" align="start" spaceX={4}>
                <Box flex="1">
                  <Heading
                    size="md"
                    fontWeight="semibold"
                    color="gray.800"
                    mb={2}
                  >
                    {post.title}
                  </Heading>
                  <Text color="gray.600" fontSize="sm" mb={4} lineHeight="tall">
                    {post.description}
                  </Text>
                  <HStack spaceX={3} mb={4}>
                    {post.platform_statuses.map((p, i) => {
                      if (p.accountType === "YOUTUBE")
                        return <FaYoutube key={i} color="#FF0000" size={20} />;
                      if (p.accountType === "FACEBOOK")
                        return <FaFacebook key={i} color="#1877F2" size={20} />;
                      if (p.accountType === "TIKTOK")
                        return <FaTiktok key={i} color="#000000" size={20} />;
                      return null;
                    })}
                  </HStack>
                </Box>
                <IconButton
                  aria-label="Options"
                  variant="ghost"
                  size="md"
                  color="gray.500"
                  _hover={{ bg: "gray.100", color: "gray.700" }}
                  borderRadius="full"
                >
                  <FiMoreHorizontal />
                </IconButton>
              </HStack>
              <HStack justify="end" mt={4} spaceX={3}>
                <Text fontSize="xs" color="gray.500" fontWeight="medium">
                  {postDate.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </Text>
                <Badge
                  variant="subtle"
                  bg={getStatusColor(post.status)}
                  textTransform="capitalize"
                  fontSize="xs"
                  color="white"
                  px={3}
                  py={1}
                  borderRadius="full"
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
