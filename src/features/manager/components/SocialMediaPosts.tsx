// import { Box, Flex, HStack, Input, Tabs, Text, VStack } from "@chakra-ui/react"
import { Tabs, VStack, Text } from "@chakra-ui/react"
import useGetPostsByDate from "../hooks/query/useGetPosts"
import type { Post } from "../types"
import { CircularLoading } from "@/lib/loadings"
import { useAuthUtils } from "@/hooks/useAuthUtils"
import { LuFolder, LuSquareCheck, LuUser } from "react-icons/lu"
// import RenderPosts from "./RenderPosts"
import { FailedCardDemo, SocialPostCard } from "./PostcardDemo"

export default function SocialMediaPosts({
  from,
  to,
}: {
  from: string
  to: string
}) {
  // const [from, setFrom] = useState(
  //   new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
  // )
  // const [to, setTo] = useState(new Date().toISOString().split("T")[0])

  const { userId } = useAuthUtils()
  // const { data, isLoading } = useGetPostsByDate({
  //   from: from as string,
  //   to,
  //   userId,
  // })
  const { data, isLoading } = useGetPostsByDate({
    from: from,
    to: to,
    userId,
  })

  const postedData = () => {
    return data?.filter((p: Post) => p.platform_statuses[0].status === "posted")
  }

  const scheduledData = () => {
    return data?.filter(
      (p: Post) => p.platform_statuses[0].status === "scheduled"
    )
  }

  const failedData = () => {
    return data?.filter((p: Post) => p.platform_statuses[0].status === "failed")
  }
  console.log("postedData", postedData())
  console.log("scheduledData", scheduledData())
  console.log("failedData", failedData())
  console.log("data", data)
  if (isLoading) return <CircularLoading />

  return (
    // <VStack align="stretch" spaceY={6}>
    //   {/* FILTER BAR */}
    //   <Flex justify="end" mb={4}>
    //     <HStack spaceX={3} align="end">
    //       <Box>
    //         <Text fontSize="sm" mb={1} color="fg.MUTED">
    //           From
    //         </Text>
    //         <Input
    //           type="date"
    //           value={from}
    //           onChange={(e) => setFrom(e.target.value)}
    //           size="sm"
    //           maxW="40"
    //         />
    //       </Box>
    //       <Box>
    //         <Text fontSize="sm" mb={1} color="fg.MUTED">
    //           To
    //         </Text>
    //         <Input
    //           type="date"
    //           value={to}
    //           onChange={(e) => setTo(e.target.value)}
    //           size="sm"
    //           maxW="40"
    //         />
    //       </Box>
    //     </HStack>
    //   </Flex>

    //   {/* POSTS */}

    //   {data?.length === 0 ? (
    //     <Text textAlign="center" color="fg.MUTED" mt={6}>
    //       No posts found for the selected date range.
    //     </Text>
    //   ) : (
    //     <Tabs.Root defaultValue="posted" variant="plain">
    //       <Tabs.List bg="bg.muted" rounded="l3" p="1">
    //         <Tabs.Trigger value="posted">
    //           <LuFolder />
    //           Posted
    //         </Tabs.Trigger>
    //         <Tabs.Trigger value="scheduled">
    //           <LuUser />
    //           Scheduled
    //         </Tabs.Trigger>

    //         <Tabs.Trigger value="failed">
    //           <LuSquareCheck />
    //           Failed
    //         </Tabs.Trigger>
    //         <Tabs.Indicator rounded="l2" />
    //       </Tabs.List>
    //       <Tabs.Content value="posted">
    //         <RenderPosts
    //           posts={data.filter(
    //             (p: Post) => p.platform_statuses[0].status === "posted"
    //           )}
    //         />
    //       </Tabs.Content>
    //       <Tabs.Content value="scheduled">
    //         <RenderPosts
    //           posts={data.filter(
    //             (p: Post) => p.platform_statuses[0].status === "scheduled"
    //           )}
    //         />
    //       </Tabs.Content>

    //       <Tabs.Content value="failed">
    //         <RenderPosts
    //           posts={data.filter(
    //             (p: Post) => p.platform_statuses[0].status === "failed"
    //           )}
    //         />
    //       </Tabs.Content>
    //     </Tabs.Root>
    //   )}
    // </VStack>

    <VStack align="stretch" spaceY={6}>
      {data.length === 0 ? (
        <Text textAlign="center" color="fg.MUTED" mt={6}>
          No posts found for the selected date range.
        </Text>
      ) : (
        <Tabs.Root defaultValue="posted" variant="plain">
          <Tabs.List bg="bg.muted" rounded="l3" p="1">
            <Tabs.Trigger value="posted">
              <LuFolder />
              Posted
            </Tabs.Trigger>
            <Tabs.Trigger value="scheduled">
              <LuUser />
              Scheduled
            </Tabs.Trigger>
            <Tabs.Trigger value="failed">
              <LuSquareCheck />
              Failed
            </Tabs.Trigger>
            <Tabs.Indicator rounded="l2" />
          </Tabs.List>

          <Tabs.Content value="posted">
            <VStack gap={4} align="stretch">
              {postedData().length == 0 ? (
                <Text>No Posted data found.</Text>
              ) : (
                postedData().map((post: Post) => {
                  return <SocialPostCard post={post} />
                })
              )}
            </VStack>
          </Tabs.Content>

          <Tabs.Content value="scheduled">
            <VStack gap={4} align="stretch">
              {/* <ScheduleCardDemo /> */}
              {scheduledData().length == 0 ? (
                <Text>No scheduled posts found.</Text>
              ) : (
                scheduledData().map((post: Post) => {
                  return <SocialPostCard post={post} />
                })
              )}
            </VStack>
          </Tabs.Content>

          <Tabs.Content value="failed">
            <VStack gap={4} align="stretch">
              {failedData().map((post: Post) => {
                return <FailedCardDemo data={post} />
              })}
            </VStack>
          </Tabs.Content>
        </Tabs.Root>
      )}
    </VStack>
  )
}
