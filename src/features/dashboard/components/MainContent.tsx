import {
  Box,
  Flex,
  Grid,
  Text,
  Progress,
  Badge,
  Button,
} from "@chakra-ui/react"
import { useEffect, useState, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { CircularLoading } from "@/lib/loadings"
import { useAuthUtils } from "@/hooks/useAuthUtils"
import useGetPostsByDate from "@/features/manager/hooks/query/useGetPosts"
import { format, subDays } from "date-fns"
import { useAllConnAccounts } from "@/hooks/useConnectedAccounts"

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

const PlatformChart = ({ connectedAccountsData }: { connectedAccountsData?: any[] }) => {
  // Define platform config function first
  const getPlatformConfig = (platform: string) => {
    switch (platform) {
      case "FACEBOOK":
        return { color: "#3182CE", displayName: "Facebook" }
      case "YOUTUBE":
        return { color: "#E53E3E", displayName: "YouTube" }
      case "INSTAGRAM":
        return { color: "#805AD5", displayName: "Instagram" }
      case "TIKTOK":
        return { color: "#2D3748", displayName: "TikTok" }
      default:
        return { color: "#718096", displayName: platform }
    }
  }

  // Calculate platform distribution
  const platformStats = useMemo(() => {
    console.log('Input data for platform stats:', connectedAccountsData)

    if (!connectedAccountsData || connectedAccountsData.length === 0) {
      console.log('No connected accounts data, returning empty stats')
      return { platforms: [], totalAccounts: 0 }
    }

    const platformCounts = connectedAccountsData.reduce((acc: any, account: any) => {
      const platform = account.account_type
      acc[platform] = (acc[platform] || 0) + 1
      return acc
    }, {})

    console.log('Platform counts:', platformCounts)

    const totalAccounts = connectedAccountsData.length

    const platforms = Object.entries(platformCounts).map(([platform, count]: [string, any]) => {
      const percentage = Math.round((count / totalAccounts) * 100)
      const config = getPlatformConfig(platform)
      const result = {
        name: platform,
        count,
        percentage,
        ...config
      }
      console.log('Platform processed:', result)
      return result
    })

    console.log('Final platform stats:', { platforms, totalAccounts })
    return { platforms, totalAccounts }
  }, [connectedAccountsData])

  // Create SVG-based circular chart
  const createCircularChart = () => {
    if (platformStats.platforms.length === 0) {
      console.log('No platforms to display in chart')
      return null
    }

    const size = 200
    const center = size / 2
    const outerRadius = 85
    const innerRadius = 50

    console.log('Creating chart with platforms:', platformStats.platforms)

    let cumulativeAngle = -90 // Start from top

    const createPath = (startAngle: number, endAngle: number, outerR: number, innerR: number) => {
      const startAngleRad = (startAngle * Math.PI) / 180
      const endAngleRad = (endAngle * Math.PI) / 180

      const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1"

      const x1 = center + outerR * Math.cos(startAngleRad)
      const y1 = center + outerR * Math.sin(startAngleRad)
      const x2 = center + outerR * Math.cos(endAngleRad)
      const y2 = center + outerR * Math.sin(endAngleRad)

      const x3 = center + innerR * Math.cos(endAngleRad)
      const y3 = center + innerR * Math.sin(endAngleRad)
      const x4 = center + innerR * Math.cos(startAngleRad)
      const y4 = center + innerR * Math.sin(startAngleRad)

      return [
        "M", x1, y1,
        "A", outerR, outerR, 0, largeArcFlag, 1, x2, y2,
        "L", x3, y3,
        "A", innerR, innerR, 0, largeArcFlag, 0, x4, y4,
        "Z"
      ].join(" ")
    }

    return (
      <svg width={size} height={size} className="circular-chart">
        {/* Background ring */}
        <circle
          cx={center}
          cy={center}
          r={(outerRadius + innerRadius) / 2}
          fill="none"
          stroke="#f1f5f9"
          strokeWidth={outerRadius - innerRadius}
        />

        {/* Platform segments */}
        {platformStats.platforms.map((platform) => {
          const angle = (platform.percentage / 100) * 360
          const endAngle = cumulativeAngle + angle

          console.log(`Platform ${platform.name}: ${platform.percentage}%, angle: ${angle}, start: ${cumulativeAngle}, end: ${endAngle}`)

          const path = createPath(cumulativeAngle, endAngle, outerRadius, innerRadius)

          cumulativeAngle = endAngle

          return (
            <path
              key={platform.name}
              d={path}
              fill={platform.color}
              stroke="white"
              strokeWidth="2"
            />
          )
        })}
      </svg>
    )
  }


  return (
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

      {platformStats.totalAccounts > 0 ? (
        <>
          <Box position="relative" display="flex" justifyContent="center" mb={6}>
            <Box position="relative">
              {createCircularChart()}
              <Box
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                bg="white"
                _dark={{ bg: "gray.800" }}
                borderRadius="50%"
                w="110px"
                h="110px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
                border="3px solid"
                borderColor="gray.100"
              >
                <Text
                  fontSize="2xl"
                  fontWeight="bold"
                  color="gray.900"
                  _dark={{ color: "white" }}
                >
                  {platformStats.totalAccounts}
                </Text>
                <Text
                  fontSize="xs"
                  color="gray.500"
                  _dark={{ color: "gray.400" }}
                  fontWeight="medium"
                >
                  Accounts
                </Text>
              </Box>
            </Box>
          </Box>

          <Flex justify="center" wrap="wrap" gap={3}>
            {platformStats.platforms.map((platform) => (
              <Flex key={platform.name} align="center" gap={2}>
                <Box w={3} h={3} borderRadius="full" bg={platform.color} />
                <Text fontSize="sm" color="gray.600" _dark={{ color: "gray.400" }}>
                  {platform.displayName} ({platform.percentage}%)
                </Text>
              </Flex>
            ))}
          </Flex>
        </>
      ) : (
        <Flex justify="center" align="center" direction="column" py={8}>
          <Box position="relative" mb={4}>
            <svg height={200} width={200} className="circular-chart">
              <circle
                stroke="#e2e8f0"
                fill="transparent"
                strokeWidth={35}
                r={65}
                cx={100}
                cy={100}
              />
            </svg>
            <Box
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              bg="white"
              borderRadius="50%"
              w="110px"
              h="110px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
              border="3px solid"
              borderColor="gray.200"
            >
              <Text fontSize="xl" fontWeight="bold" color="gray.400">
                0
              </Text>
              <Text fontSize="xs" color="gray.400" fontWeight="medium">
                Accounts
              </Text>
            </Box>
          </Box>
          <Text fontSize="sm" color="gray.500" textAlign="center">
            No connected accounts found
          </Text>
        </Flex>
      )}
    </Box>
  )
}

const PostItem = ({
  title,
  description,
  platform,
  postedTime,
  status,
}: {
  title?: string
  description: string
  platform: string
  postedTime: string
  status: string
}) => {
  const getPlatformConfig = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "facebook":
        return { color: "blue.500", bg: "blue.50", name: "Facebook" }
      case "instagram":
        return { color: "pink.500", bg: "pink.50", name: "Instagram" }
      case "youtube":
        return { color: "red.500", bg: "red.50", name: "YouTube" }
      case "tiktok":
        return { color: "gray.800", bg: "gray.100", name: "TikTok" }
      default:
        return { color: "gray.500", bg: "gray.100", name: "Social" }
    }
  }

  const getStatusConfig = (status: string) => {
    switch (status.toLowerCase()) {
      case "posted":
        return { color: "green", bg: "green.50", textColor: "green.700" }
      case "scheduled":
        return { color: "blue", bg: "blue.50", textColor: "blue.700" }
      case "failed":
        return { color: "red", bg: "red.50", textColor: "red.700" }
      default:
        return { color: "gray", bg: "gray.50", textColor: "gray.700" }
    }
  }

  const platformConfig = getPlatformConfig(platform)
  const statusConfig = getStatusConfig(status)

  return (
    <Box
      p={3}
      borderRadius="md"
      border="1px solid"
      borderColor="gray.100"
      bg="gray.50"
      _hover={{
        bg: "white",
        borderColor: platformConfig.color,
        shadow: "sm",
        transform: "translateY(-1px)"
      }}
      transition="all 0.2s"
      cursor="pointer"
      mb={3}
    >
      <Box flex={1} minW={0}>
          <Flex justify="space-between" align="start" mb={1}>
            <Box flex={1}>
              {title && (
                <Text
                  fontSize="sm"
                  fontWeight="semibold"
                  color="gray.900"
                  _dark={{ color: "white" }}
                  truncate
                  mb={1}
                >
                  {title}
                </Text>
              )}
              <Text
                fontSize="xs"
                color="gray.600"
                _dark={{ color: "gray.400" }}
                overflow="hidden"
                display="-webkit-box"
                style={{ WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}
                lineHeight="1.3"
              >
                {description}
              </Text>
            </Box>

            <Badge
              size="sm"
              bg={statusConfig.bg}
              color={statusConfig.textColor}
              px={2}
              py={1}
              borderRadius="full"
              fontSize="xs"
              fontWeight="medium"
              ml={2}
              flexShrink={0}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
          </Flex>

          <Flex justify="space-between" align="center" mt={2}>
            <Text
              fontSize="xs"
              fontWeight="medium"
              color={platformConfig.color}
              bg={platformConfig.bg}
              px={2}
              py={1}
              borderRadius="md"
            >
              {platformConfig.name}
            </Text>
            <Text
              fontSize="xs"
              color="gray.500"
              _dark={{ color: "gray.400" }}
              fontWeight="medium"
            >
              {postedTime}
            </Text>
          </Flex>
        </Box>
    </Box>
  )
}

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
  const navigate = useNavigate()
  const { userId } = useAuthUtils()
  const { data: connectedAccountsData } = useAllConnAccounts(userId)

  // Sample data for demonstration - 8 accounts total
  // Instagram: 2 accounts (25%), Facebook: 4 accounts (50%), TikTok: 1 account (12.5%), YouTube: 1 account (12.5%)
  const sampleConnectedAccounts = [
    { account_type: "INSTAGRAM" },
    { account_type: "INSTAGRAM" },
    { account_type: "FACEBOOK" },
    { account_type: "FACEBOOK" },
    { account_type: "FACEBOOK" },
    { account_type: "FACEBOOK" },
    { account_type: "TIKTOK" },
    { account_type: "YOUTUBE" }
  ]

  // Use real data if available, otherwise use sample data for demonstration
  const displayData = connectedAccountsData && connectedAccountsData.length > 0
    ? connectedAccountsData
    : sampleConnectedAccounts

  // Get posts from a wide date range to ensure we get data
  const today = new Date()
  const oneYearAgo = subDays(today, 365) // Get posts from last year

  const { data: postsData, isLoading: postsLoading, error } = useGetPostsByDate({
    from: format(oneYearAgo, 'yyyy-MM-dd'),
    to: format(today, 'yyyy-MM-dd'),
    userId: userId || undefined
  })

  // Debug logs
  console.log('Dashboard - Posts Data:', postsData)
  console.log('Dashboard - User ID:', userId)
  console.log('Dashboard - Date range:', format(oneYearAgo, 'yyyy-MM-dd'), 'to', format(today, 'yyyy-MM-dd'))
  console.log('Dashboard - Loading:', postsLoading)
  console.log('Dashboard - Error:', error)

  // Try different ways to access the data and filter for posted status only
  let allPosts = []
  if (postsData) {
    // Try direct access
    if (Array.isArray(postsData)) {
      allPosts = postsData
    }
    // Try data property
    else if (postsData.data && Array.isArray(postsData.data)) {
      allPosts = postsData.data
    }
    // Try posts property
    else if (postsData.posts && Array.isArray(postsData.posts)) {
      allPosts = postsData.posts
    }
  }

  // Filter for only "posted" status and get latest 4
  const latestPosts = allPosts
    .filter((post: any) => post.status?.toLowerCase() === 'posted')
    .slice(0, 4)

  // Fallback sample data for testing if no real posted data is available
  if (latestPosts.length === 0 && !postsLoading) {
    console.log('Dashboard - Using fallback sample data (posted only)')
    const samplePostedPosts = [
      {
        id: 'sample1',
        title: 'Sample YouTube Video',
        description: 'This is a sample post to demonstrate the dashboard functionality',
        status: 'posted',
        platform_statuses: [{ accountType: 'YOUTUBE', posted_time: new Date().toISOString() }]
      },
      {
        id: 'sample2',
        title: 'Facebook Update',
        description: 'Another sample post for testing the Recent Posts section',
        status: 'posted',
        scheduled_time: new Date().toISOString(),
        platform_statuses: [{ accountType: 'FACEBOOK', posted_time: new Date().toISOString() }]
      },
      {
        id: 'sample3',
        description: 'Instagram story update without title',
        status: 'posted',
        platform_statuses: [{ accountType: 'INSTAGRAM', posted_time: new Date().toISOString() }]
      },
      {
        id: 'sample4',
        title: 'TikTok Video',
        description: 'Latest TikTok video posted',
        status: 'posted',
        platform_statuses: [{ accountType: 'TIKTOK', posted_time: new Date().toISOString() }]
      }
    ]
    latestPosts.push(...samplePostedPosts.slice(0, 4))
  }

  console.log('Dashboard - Latest Posts:', latestPosts)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(t)
  }, [])

  if (loading || postsLoading) return <CircularLoading />

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
        <MetricCard title="Total Posts" value={15} percentage={45} />
        <MetricCard title="Scheduled Post" value={7} percentage={45} />
        <MetricCard title="Failed Post" value={15} percentage={45} />
        <MetricCard title="Content Shared" value={7} percentage={45} />
      </Grid>
      {/* 
      <Grid
        templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }}
        gap={6}
        mb={8}
      >
        <MetricCard title="Scheduled Posts" value={15} percentage={45} />
        <MetricCard title="Content Shared" value={7} percentage={45} />
        <MetricCard title="Scheduled Posts" value={15} percentage={45} />
        <MetricCard title="Content Shared" value={7} percentage={45} />
      </Grid> */}

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
          <Flex justify="space-between" align="center" mb={4}>
            <Box>
              <Text
                fontSize="lg"
                fontWeight="semibold"
                color="gray.900"
                _dark={{ color: "white" }}
              >
                Recent Posts
              </Text>
              <Text
                fontSize="sm"
                color="gray.500"
                _dark={{ color: "gray.400" }}
              >
                Latest posted content
              </Text>
            </Box>
            <Button
              size="sm"
              variant="ghost"
              colorScheme="blue"
              onClick={() => navigate('/posts')}
              fontSize="xs"
            >
              See More
            </Button>
          </Flex>
          <Box>
            {latestPosts.length > 0 ? (
              latestPosts.map((post: any) => {
                const platformType = post.platform_statuses?.[0]?.accountType || 'Unknown'
                const postedTime = post.platform_statuses?.[0]?.posted_time
                  ? format(new Date(post.platform_statuses[0].posted_time), 'MMM dd, HH:mm')
                  : post.scheduled_time
                    ? format(new Date(post.scheduled_time), 'MMM dd, HH:mm')
                    : 'No date'

                return (
                  <PostItem
                    key={post.id}
                    title={post.title}
                    description={post.description || 'No description'}
                    platform={platformType}
                    postedTime={postedTime}
                    status={post.status}
                  />
                )
              })
            ) : (
              <Flex align="center" justify="center" py={8}>
                <Text fontSize="sm" color="gray.500" _dark={{ color: "gray.400" }}>
                  No recent posts found
                </Text>
              </Flex>
            )}
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
        <PlatformChart connectedAccountsData={displayData} />

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
