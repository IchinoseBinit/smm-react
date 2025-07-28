import {
  Badge,
  Box,
  Heading,
  HStack,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { FiMoreHorizontal } from "react-icons/fi";
import type { Post } from "../types";
import { FaFacebook, FaTiktok, FaYoutube, FaInstagram } from "react-icons/fa6";
import { formatToLocalTime } from "@/lib/helper/formateDateTime";

export default function RenderPosts({ posts }: { posts: Post[] }) {
  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "failed":
        return "red.600";
      case "posted":
        return "green.600";
      case "scheduled":
        return "brown";
      case "null":
        return "white";
      default:
        return "gray";
    }
  };

  console.log(posts);
  return (
    <>
      {posts?.map((post) => {
        const uniquePlatforms = [
          ...new Set(post?.platform_statuses?.map((p) => p.accountType)),
        ];

        return (
          <Box
            key={post?.id}
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
            mt={7}
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
                  {post?.title}
                </Heading>
                <Text
                  color="gray.800"
                  _dark={{ color: "gray.300" }}
                  fontSize={{ base: "xs", md: "sm" }}
                  mb={4}
                  lineHeight="tall"
                >
                  {post.description}
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
                      {[...post.medias].reverse().map((media, index) => (
                        <Box
                          key={index}
                          flexShrink={0}
                          w={{ base: "150px", md: "200px" }}
                          h={{ base: "90px", md: "100px" }}
                          borderRadius="md"
                          overflow="hidden"
                          borderWidth={1}
                          borderColor="gray.200"
                        >
                          {post.is_photo ? (
                            <img
                              src={media.s3_url}
                              alt={`Post media ${index + 1}`}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "contain",
                              }}
                            />
                          ) : (
                            <video
                              src={media.s3_url}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "contain",
                              }}
                            />
                          )}
                        </Box>
                      ))}
                    </HStack>
                  </Box>
                )}

                <HStack spaceX={3} mb={4}>
                  {uniquePlatforms.map((type, i) => {
                    if (type === "YOUTUBE")
                      return <FaYoutube key={i} color="#FF0000" size={20} />;
                    if (type === "FACEBOOK")
                      return <FaFacebook key={i} color="#1877F2" size={20} />;
                    if (type === "TIKTOK")
                      return <FaTiktok key={i} color="#000000" size={20} />;
                    if (type === "INSTAGRAM")
                      return <FaInstagram key={i} color="#E1306C" size={20} />;
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
                {post.status == "posted"
                  ? formatToLocalTime(
                      post?.platform_statuses[0]?.posted_time?.toString(),
                    )
                  : formatToLocalTime(post.scheduled_time)}
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
      })}
    </>
  );
}
