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

  const reversedData = Array.isArray(data) ? [...data].reverse() : [];
  console.log(reversedData);

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

      {reversedData.length === 0 ? (
        <Text textAlign="center" color="fg.MUTED" mt={6}>
          No posts found for the selected date range.
        </Text>
      ) : (
        reversedData.map((post: Post) => {
          const postDate = post?.scheduled_time
            ? new Date(post.scheduled_time)
            : null;
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
              p={{ base: 4, md: 6 }}
              bg="white"
              _dark={{ bg: "gray.800", borderColor: "gray.700" }}
              borderWidth={1}
              borderColor="gray.200"
              borderRadius="lg"
              boxShadow="sm"
              transition="all 0.3s ease-in-out"
              _hover={{ boxShadow: "md", transform: "translateY(-2px)" }}
              w="full"
            >
              <HStack
                justify="space-between"
                align="start"
                spaceX={{ base: 2, md: 4 }}
              >
                <Box
                  flex="1"
                  overflow="scroll"
                  css={{
                    "&::-webkit-scrollbar": { height: "8px" },
                    "&::-webkit-scrollbar-thumb": {
                      background: "gray.300",
                      borderRadius: "4px",
                      "&:hover": { background: "gray.400" },
                    },
                    _dark: {
                      "&::-webkit-scrollbar-thumb": {
                        background: "gray.600",
                        "&:hover": { background: "gray.500" },
                      },
                    },
                  }}
                >
                  <Heading
                    size={{ base: "sm", md: "md" }}
                    fontWeight="semibold"
                    color="gray.800"
                    _dark={{ color: "gray.100" }}
                    mb={2}
                  >
                    {post.title}
                  </Heading>
                  <Text
                    color="gray.800"
                    _dark={{ color: "gray.300" }}
                    fontSize={{ base: "xs", md: "sm" }}
                    mb={4}
                    lineHeight="tall"
                  >
                    {post.description || "No description available"}
                  </Text>

                  {/* Media Scrollable Section */}
                  {post.medias && post.medias.length > 0 && (
                    <Box
                      mb={4}
                      overflowX="auto"
                      css={{
                        "&::-webkit-scrollbar": { height: "8px" },
                        "&::-webkit-scrollbar-thumb": {
                          background: "gray.300",
                          borderRadius: "4px",
                          "&:hover": { background: "gray.400" },
                        },
                        _dark: {
                          "&::-webkit-scrollbar-thumb": {
                            background: "gray.600",
                            "&:hover": { background: "gray.500" },
                          },
                        },
                      }}
                    >
                      <HStack spaceX={3} minW="max-content" py={2}>
                        {post.medias.map((media, index) => (
                          <Box
                            key={index}
                            flexShrink={0}
                            w={{ base: "200px", md: "250px" }}
                            h={{ base: "120px", md: "150px" }}
                            borderRadius="md"
                            overflow="hidden"
                            borderWidth={1}
                            borderColor="gray.200"
                            _dark={{ borderColor: "gray.600" }}
                          >
                            <img
                              src={media.s3_url}
                              alt={`Post media ${index + 1}`}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                          </Box>
                        ))}
                      </HStack>
                    </Box>
                  )}

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
                  size={{ base: "sm", md: "md" }}
                  color="gray.500"
                  _dark={{ color: "gray.400" }}
                  _hover={{
                    bg: "gray.100",
                    color: "gray.700",
                    _dark: { bg: "gray.700", color: "gray.200" },
                  }}
                  borderRadius="full"
                >
                  <FiMoreHorizontal />
                </IconButton>
              </HStack>
              <HStack justify="end" mt={4} spaceX={3}>
                <Text
                  fontSize={{ base: "xs", md: "sm" }}
                  color="gray.500"
                  _dark={{ color: "gray.400" }}
                  fontWeight="medium"
                >
                  {postDate ? postDate.toLocaleDateString("en-US") : ""}
                </Text>
                <Badge
                  variant="subtle"
                  bg={getStatusColor(post.status)}
                  textTransform="capitalize"
                  fontSize={{ base: "xs", md: "sm" }}
                  color="white"
                  px={3}
                  py={1}
                  borderRadius="full"
                >
                  {post.status || "Unknown"}
                </Badge>
              </HStack>
            </Box>
          );
        })
      )}
    </VStack>
  );
}
