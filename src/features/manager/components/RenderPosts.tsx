import { Badge, Box, Heading, HStack, Text } from "@chakra-ui/react"
import type { Post } from "../types"
import { FaFacebook, FaTiktok, FaYoutube, FaInstagram } from "react-icons/fa6"
import { formatToLocalTime } from "@/lib/helper/formateDateTime"

export default function RenderPosts({ posts }: { posts: Post[] }) {
  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "failed":
        return "red.600"
      case "posted":
        return "green.600"
      case "scheduled":
        return "yellow.500"
      case "null":
        return "white"
      default:
        return "gray"
    }
  }

  return (
    <>
      {posts?.map((post) => {
        const uniquePlatforms = [
          ...new Set(post?.platform_statuses?.map((p) => p.accountType)),
        ]
        return (
          <Box
            key={post?.id}
            p={{ base: 4, md: 6 }}
            bg="gray.50"
            _dark={{ bg: "gray.900", borderColor: "gray.700" }}
            borderWidth={1}
            borderColor="gray.200"
            borderRadius="xl"
            boxShadow="md"
            transition="all 0.3s ease-in-out"
            _hover={{ boxShadow: "lg", transform: "translateY(-4px)" }}
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
                  size={{ base: "md", md: "lg" }}
                  fontWeight="bold"
                  color="gray.900"
                  _dark={{ color: "gray.100" }}
                  mb={3}
                >
                  {post?.title}
                </Heading>
                <Text
                  color="gray.700"
                  _dark={{ color: "gray.300" }}
                  fontSize={{ base: "sm", md: "lg" }}
                  fontWeight="medium"
                  mb={4}
                  lineHeight="taller"
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
                          borderRadius="lg"
                          overflow="hidden"
                          borderWidth={1}
                          borderColor="gray.200"
                          ml={5}
                          _hover={{
                            transform: "scale(1.05)",
                            transition: "0.2s",
                          }}
                        >
                          {post.is_photo ? (
                            <img
                              src={media.s3_url}
                              alt={`Post media ${index + 1}`}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                          ) : (
                            <video
                              src={media.s3_url}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
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
                    const iconProps = {
                      size: 24,
                      p: 1,
                      borderradius: "full",
                      bg: "gray.100",
                      _dark: { bg: "gray.700" },
                    }
                    if (type === "YOUTUBE")
                      return (
                        <FaYoutube key={i} color="#FF0000" {...iconProps} />
                      )
                    if (type === "FACEBOOK")
                      return (
                        <FaFacebook key={i} color="#1877F2" {...iconProps} />
                      )
                    if (type === "TIKTOK")
                      return <FaTiktok key={i} color="#000000" {...iconProps} />
                    if (type === "INSTAGRAM")
                      return (
                        <FaInstagram key={i} color="#E1306C" {...iconProps} />
                      )
                    return null
                  })}
                </HStack>
              </Box>
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
                      post?.platform_statuses[0]?.posted_time?.toString()
                    )
                  : formatToLocalTime(post.scheduled_time)}
              </Text>
              <Badge
                variant="solid"
                bg={getStatusColor(post.status)}
                textTransform="capitalize"
                fontSize={{ base: "xs", md: "sm" }}
                color="white"
                borderRadius="full"
                boxShadow="sm"
                px={3}
                py={2}
              >
                {post.status || "Unknown"}
              </Badge>
            </HStack>
          </Box>
        )
      })}
    </>
  )
}
