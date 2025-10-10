import { Tabs, VStack, Text, Flex, HStack, Input, Box } from "@chakra-ui/react"
import useGetPostsByDate from "../hooks/query/useGetPosts"
import type { Post } from "../types"
import { CircularLoading } from "@/lib/loadings"
import { useAuthUtils } from "@/hooks/useAuthUtils"
import { LuFolder, LuSquareCheck, LuUser } from "react-icons/lu"
import { useState } from "react"
import { FailedCardDemo, SocialPostCard } from "./PostcardDemo"
import type { UseMutationResult } from "@tanstack/react-query"

export default function SocialMediaPosts({
  retryMutation
}: {
  retryMutation: UseMutationResult<any, any, number, unknown>
}) {
  const { userId } = useAuthUtils()

  const [from, setFrom] = useState(
    new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
  )
  const [to, setTo] = useState(new Date().toISOString().split("T")[0])
  const [status, setStatus] = useState("posted")

  // Single API call to fetch all posts
  const { data: allPosts, isLoading } = useGetPostsByDate({
    from,
    to,
    userId,
    status
  })

  // Filter posts by status on the client side
  const postedPosts = allPosts?.filter((post: Post) => post.status === "posted") || []
  const pendingPosts = allPosts?.filter((post: Post) => post.status === "scheduled") || []
  const failedPosts = allPosts?.filter((post: Post) => post.status === "failed") || []

  // Get current posts based on selected status
  const getCurrentPosts = () => {
    switch (status) {
      case "posted": return postedPosts
      case "scheduled": return pendingPosts
      case "failed": return failedPosts
      default: return []
    }
  }
  const currentPosts = getCurrentPosts()

if (isLoading) return <CircularLoading />

  return (
    <VStack align="stretch" gap={6} w="full">
      {/* Header with Tabs and Date Filters */}
      <Flex
        justify="space-between"
        align="flex-start"
        mb={4}
        flexWrap={{ base: "wrap", lg: "nowrap" }}
        gap={4}
      >
        {/* Tabs Section */}
        <Box flex={1} minW="300px">
          <Tabs.Root
            value={status}
            variant="plain"
            onValueChange={(details) => setStatus(details.value)}
          >
            <Tabs.List
              bg="gray.100"
              rounded="lg"
              p={1}
              w="fit-content"
              _dark={{ bg: "gray.700" }}
            >
              <Tabs.Trigger
                value="posted"
                display="flex"
                alignItems="center"
                gap={2}
                px={4}
                py={2}
                rounded="md"
                _selected={{
                  bg: "#ffffff",
                  shadow: "sm",
                  _dark: { bg: "gray.600" },
                }}
              >
                <LuFolder size={16} />
                Posted
              </Tabs.Trigger>

              <Tabs.Trigger
                value="scheduled"
                display="flex"
                alignItems="center"
                gap={2}
                px={4}
                py={2}
                rounded="md"
                _selected={{
                  bg: "#ffffff",
                  shadow: "sm",
                  _dark: { bg: "gray.600" },
                }}
              >
                <LuUser size={16} />
                Scheduled
              </Tabs.Trigger>

              <Tabs.Trigger
                value="failed"
                display="flex"
                alignItems="center"
                gap={2}
                px={4}
                py={2}
                rounded="md"
                _selected={{
                  bg: "#ffffff",
                  shadow: "sm",
                  _dark: { bg: "gray.600" },
                }}
              >
                <LuSquareCheck size={16} />
                Failed
              </Tabs.Trigger>
            </Tabs.List>

            {/* Tab Content */}
            <Box mt={6}>
              <Tabs.Content value="posted">
                <VStack gap={4} align="stretch">
                  {(!currentPosts || currentPosts.length === 0) ? (
                    <Text textAlign="center" color="gray.500" py={8}>
                      No posted data found.
                    </Text>
                  ) : (
                    currentPosts.map((post: Post, index: number) => (
                      <SocialPostCard key={post.id || index} post={post} />
                    ))
                  )}
                </VStack>
              </Tabs.Content>

              <Tabs.Content value="scheduled">
                <VStack gap={4} align="stretch">
                  {(!pendingPosts || pendingPosts.length === 0) ? (
                    <Text textAlign="center" color="gray.500" py={8}>
                      No scheduled posts found.
                    </Text>
                  ) : (
                    pendingPosts.map((post: Post, index: number) => (
                      <SocialPostCard key={post.id || index} post={post} />
                    ))
                  )}
                </VStack>
              </Tabs.Content>

              <Tabs.Content value="failed">
                <VStack gap={4} align="stretch">
                  {(!failedPosts|| failedPosts.length === 0) ? (
                    <Text textAlign="center" color="gray.500" py={8}>
                      No failed posts found.
                    </Text>
                  ) : (
                    failedPosts.map((post: Post, index: number) => (
                      <FailedCardDemo key={post.id || index} data={post} retryMutation={retryMutation} />
                    ))
                  )}
                </VStack>
              </Tabs.Content>
            </Box>
          </Tabs.Root>
        </Box>

        {/* Date Filter Section */}
        <Box flexShrink={0} w={{ base: "full", lg: "auto" }}>
          <HStack gap={4} align="end">
            <Box>
              <Text fontSize="sm" color="gray.600" fontWeight="medium">
                From
              </Text>
              <Input
                type="date"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                size="sm"
                w="150px"
                bg="white"
                border="1px solid"
                borderColor="gray.200"
                _focus={{
                  borderColor: "blue.400",
                  shadow: "0 0 0 1px rgba(66, 153, 225, 0.6)",
                }}
                _dark={{
                  bg: "gray.700",
                  borderColor: "gray.600",
                }}
              />
            </Box>

            <Box>
              <Text fontSize="sm" color="gray.600" fontWeight="medium">
                To
              </Text>
              <Input
                type="date"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                size="sm"
                w="150px"
                bg="white"
                border="1px solid"
                borderColor="gray.200"
                _focus={{
                  borderColor: "blue.400",
                  shadow: "0 0 0 1px rgba(66, 153, 225, 0.6)",
                }}
                _dark={{
                  bg: "gray.700",
                  borderColor: "gray.600",
                }}
              />
            </Box>
          </HStack>
        </Box>
      </Flex>

      {/* Empty State for No Data */}
    
      {(!currentPosts || currentPosts.length === 0) && (
        <Box textAlign="center" py={12}>
          {/* <Text color="gray.500" fontSize="lg" mb={2}>
            No posts found
            </Text>
            <Text color="gray.400" fontSize="sm">
            Try adjusting your date range to see posts.
            </Text> */}
        </Box>
      )}
    
    </VStack>
  )
}
