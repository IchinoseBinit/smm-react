import { Box } from "@chakra-ui/react"
import SocialMediaPosts from "@/features/manager/components/SocialMediaPosts"
import { Helmet } from "react-helmet-async"
import useRetryPost from "@/features/manager/hooks/useRetryPost"

export default function Manager() {
  const retryMutation = useRetryPost()
  // const [from, setFrom] = useState(
  //   new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
  // )
  // const [to, setTo] = useState(new Date().toISOString().split("T")[0])
  // console.log("from to test", from, "and to test", to)

  return (
    <>
      <Helmet>
        <title>Posts</title>
      </Helmet>
      <Box p={{ base: 4, md: 8 }} pb={{ base: "100px", md: 8 }} bg="bg.DEFAULT" minH="100vh">
        {/* <Flex justify="space-between" align="end" mb={6}>
          <Text
            fontSize={{ base: "2xl", md: "3xl" }}
            fontWeight="bold"
            color="fg.DEFAULT"
          >
            Posts
          </Text>

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
        </Flex> */}

        {/* <SocialMediaPosts from={from} to={to} /> */}
        <SocialMediaPosts retryMutation={retryMutation} />
      </Box>
    </>
  )
}
