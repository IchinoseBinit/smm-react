import {
  Box,
  Flex,
  Grid,
  Text,
  Progress,
  Badge,
  Button,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { CircularLoading } from "@/lib/loadings"

const MetricCard = ({
  title,
  value,
  percentage,
}: {
  title: string
  value: string | number
  percentage: number
}) => (
  <Box
    bg="white"
    _dark={{ bg: "gray.800" }}
    p={6}
    borderRadius="lg"
    shadow="sm"
    border="1px"
    borderColor="gray.100"
  >
    <Flex justify="space-between" align="center" mb={2}>
      <Text
        fontSize="3xl"
        fontWeight="bold"
        color="gray.900"
        _dark={{ color: "white" }}
      >
        {value}
      </Text>
      <Text fontSize="sm" color="gray.500" _dark={{ color: "gray.400" }}>
        {percentage}%
      </Text>
    </Flex>
    <Text fontSize="sm" color="gray.600" _dark={{ color: "gray.400" }} mb={2}>
      {title}
    </Text>
    <Progress.Root value={percentage} size="sm">
      <Progress.Track>
        <Progress.Range bg="blue.500" />
      </Progress.Track>
    </Progress.Root>
  </Box>
)

const PlatformChart = () => (
  <Box
    bg="white"
    _dark={{ bg: "gray.800" }}
    p={6}
    borderRadius="lg"
    shadow="sm"
    border="1px"
    borderColor="gray.100"
  >
    <Text
      fontSize="lg"
      fontWeight="semibold"
      mb={4}
      color="gray.900"
      _dark={{ color: "white" }}
    >
      Platform Allocation
    </Text>
    <Box position="relative" display="flex" justifyContent="center" mb={6}>
      <Box
        width="200px"
        height="200px"
        borderRadius="50%"
        bg="linear-gradient(45deg, #3182CE 0%, #E53E3E 35%, #805AD5 70%)"
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="relative"
      >
        <Box
          width="120px"
          height="120px"
          borderRadius="50%"
          bg="white"
          _dark={{ bg: "gray.800" }}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Text
            fontSize="3xl"
            fontWeight="bold"
            color="gray.900"
            _dark={{ color: "white" }}
          >
            99%
          </Text>
        </Box>
      </Box>
    </Box>
    <Flex justify="center" gap={4}>
      <Flex align="center" gap={2}>
        <Box w={3} h={3} borderRadius="full" bg="blue.500" />
        <Text fontSize="sm" color="gray.600" _dark={{ color: "gray.400" }}>
          Facebook
        </Text>
      </Flex>
      <Flex align="center" gap={2}>
        <Box w={3} h={3} borderRadius="full" bg="red.500" />
        <Text fontSize="sm" color="gray.600" _dark={{ color: "gray.400" }}>
          Youtube
        </Text>
      </Flex>
      <Flex align="center" gap={2}>
        <Box w={3} h={3} borderRadius="full" bg="purple.500" />
        <Text fontSize="sm" color="gray.600" _dark={{ color: "gray.400" }}>
          Instagram
        </Text>
      </Flex>
    </Flex>
  </Box>
)

const ActivityItem = ({
  name,
  action,
  time,
  hasComment = false,
}: {
  name: string
  action: string
  time: string
  hasComment?: boolean
}) => (
  <Flex align="center" gap={3} py={2}>
    <Box
      w={8}
      h={8}
      borderRadius="full"
      bg={hasComment ? "transparent" : "blue.500"}
      border={hasComment ? "2px solid" : "none"}
      borderColor="gray.300"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      {hasComment ? "💬" : "❤️"}
    </Box>
    <Box flex={1}>
      <Text fontSize="sm" color="gray.900" _dark={{ color: "white" }}>
        <Text as="span" fontWeight="medium">
          {name}
        </Text>{" "}
        {action}
      </Text>
      <Text fontSize="xs" color="gray.500" _dark={{ color: "gray.400" }}>
        {time}
      </Text>
    </Box>
  </Flex>
)

const OverviewItem = ({
  label,
  value,
  badge,
}: {
  label: string
  value: string | number
  badge?: string
}) => (
  <Flex justify="space-between" align="center" py={2}>
    <Text fontSize="sm" color="gray.600" _dark={{ color: "gray.400" }}>
      {label}
    </Text>
    <Flex align="center" gap={2}>
      <Text
        fontSize="sm"
        fontWeight="medium"
        color="gray.900"
        _dark={{ color: "white" }}
      >
        {value}
      </Text>
      {badge && (
        <Badge size="sm" colorScheme="gray" variant="subtle">
          {badge}
        </Badge>
      )}
    </Flex>
  </Flex>
)

const UpcomingPost = ({
  title,
  platform,
  date,
}: {
  title: string
  platform: string
  date: string
}) => (
  <Box
    p={4}
    borderRadius="md"
    border="1px"
    borderColor="gray.100"
    _dark={{ borderColor: "gray.700" }}
  >
    <Flex justify="space-between" align="start" mb={2}>
      <Text
        fontSize="sm"
        fontWeight="medium"
        color="gray.900"
        _dark={{ color: "white" }}
      >
        {title}
      </Text>
      <Text fontSize="xs" color="gray.500" _dark={{ color: "gray.400" }}>
        ⋯
      </Text>
    </Flex>
    <Text fontSize="xs" color="gray.500" _dark={{ color: "gray.400" }} mb={2}>
      post on {platform}
    </Text>
    <Flex justify="space-between" align="center">
      <Button size="xs" variant="outline" colorScheme="blue">
        Edit Post
      </Button>
      <Text fontSize="xs" color="gray.500" _dark={{ color: "gray.400" }}>
        {date}
      </Text>
    </Flex>
  </Box>
)
export function MainContent() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(t)
  }, [])

  if (loading) return <CircularLoading />

  return (
    <Box _dark={{ bg: "gray.900" }} minH="100vh">
      <Text
        fontSize="lg"
        fontWeight="medium"
        color="gray.900"
        _dark={{ color: "white" }}
        mb={6}
      >
        Overview of your social media performance
      </Text>

      <Grid
        templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }}
        gap={6}
        mb={8}
      >
        <MetricCard title="Scheduled Posts" value={15} percentage={45} />
        <MetricCard title="Content Shared" value={7} percentage={45} />
        <MetricCard title="Scheduled Posts" value={15} percentage={45} />
        <MetricCard title="Content Shared" value={7} percentage={45} />
      </Grid>

      <Grid
        templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }}
        gap={6}
        mb={8}
      >
        <MetricCard title="Scheduled Posts" value={15} percentage={45} />
        <MetricCard title="Content Shared" value={7} percentage={45} />
        <MetricCard title="Scheduled Posts" value={15} percentage={45} />
        <MetricCard title="Content Shared" value={7} percentage={45} />
      </Grid>

      <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={6} mb={6}>
        <Box
          bg="white"
          _dark={{ bg: "gray.800" }}
          p={6}
          borderRadius="lg"
          shadow="sm"
          border="1px"
          borderColor="gray.100"
        >
          <Text
            fontSize="lg"
            fontWeight="semibold"
            mb={4}
            color="gray.900"
            _dark={{ color: "white" }}
          >
            Recent Activity
          </Text>
          <Text
            fontSize="sm"
            color="gray.500"
            _dark={{ color: "gray.400" }}
            mb={4}
          >
            Latest interaction with your content
          </Text>
          <Box>
            <ActivityItem
              name="Sara John"
              action="commented on your post"
              time="2 mins ago"
              hasComment
            />
            <ActivityItem
              name="Sara John"
              action="commented on your post"
              time="2 mins ago"
            />
            <ActivityItem
              name="Sara John"
              action="commented on your post"
              time="2 mins ago"
              hasComment
            />
            <ActivityItem
              name="Sara John"
              action="commented on your post"
              time="2 mins ago"
              hasComment
            />
          </Box>
        </Box>

        <Box
          bg="white"
          _dark={{ bg: "gray.800" }}
          p={6}
          borderRadius="lg"
          shadow="sm"
          border="1px"
          borderColor="gray.100"
        >
          <Text
            fontSize="lg"
            fontWeight="semibold"
            mb={4}
            color="gray.900"
            _dark={{ color: "white" }}
          >
            Overview
          </Text>
          <Text
            fontSize="sm"
            color="gray.500"
            _dark={{ color: "gray.400" }}
            mb={4}
          >
            Key performance insights
          </Text>
          <Box>
            <OverviewItem label="Post this month" value="24" badge="45%" />
            <OverviewItem label="Average engagement" value="7%" badge="45%" />
            <OverviewItem
              label="Best Performing hour"
              value="12 PM"
              badge="Peak time"
            />
            <OverviewItem label="Response Rate" value="89%" badge="45%" />
          </Box>
        </Box>
      </Grid>

      <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={6}>
        <PlatformChart />

        <Box
          bg="white"
          _dark={{ bg: "gray.800" }}
          p={6}
          borderRadius="lg"
          shadow="sm"
          border="1px"
          borderColor="gray.100"
        >
          <Text
            fontSize="lg"
            fontWeight="semibold"
            mb={2}
            color="gray.900"
            _dark={{ color: "white" }}
          >
            Upcoming Post
          </Text>
          <Text
            fontSize="sm"
            color="gray.500"
            _dark={{ color: "gray.400" }}
            mb={4}
          >
            4 post for your next schedule
          </Text>
          <Box>
            <UpcomingPost
              title="Summer Sale"
              platform="facebook"
              date="10 Apl"
            />
            <Box mt={3}>
              <UpcomingPost
                title="Summer Sale"
                platform="facebook"
                date="10 Apl"
              />
            </Box>
            <Box mt={3}>
              <UpcomingPost
                title="Summer Sale"
                platform="facebook"
                date="10 Apl"
              />
            </Box>
          </Box>
        </Box>
      </Grid>
    </Box>
  )
}
