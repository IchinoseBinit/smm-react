import {
  Box,
  Flex,
  Text,
  Heading,
  Button,
  Badge,
  Input,
  InputGroup,
  SimpleGrid,
  Stack,
  Progress,
  Icon,
  Link,
} from "@chakra-ui/react";
import {
  FaPlay,
  FaSearch,
  FaTh,
  FaUser,
  FaChartLine,
  FaEdit,
  FaFileAlt,
  FaBullseye,
  FaFolder,
  FaChartBar,
  FaCalendar,
  FaComment,
  FaEllipsisH,
} from "react-icons/fa";

export default function HeroSection() {
  return (
    <Box as="section" py={20} bgGradient="linear(to-b, white, gray.50)">
      <Box maxW="container.xl" mx="auto" px={4} textAlign="center">
        <Badge
          mb={6}
          bg="green.100"
          color="green.700"
          _hover={{ bg: "green.100" }}
          fontSize="sm"
        >
          🚀 New: AI-Powered Social Media Analytics
        </Badge>
        <Stack spaceY={{ base: 0, md: 5 }} mb={6}>
          <Heading
            as="h1"
            fontSize={{ base: "2xl", md: "6xl" }}
            fontWeight="bold"
            color="gray.900"
            lineHeight="tight"
          >
            Simplify Social Media Management
          </Heading>
          <Heading
            as="h1"
            fontSize={{ base: "2xl", md: "6xl" }}
            fontWeight="bold"
            color="gray.900"
            lineHeight="tight"
          >
            with One Powerful Platform.
          </Heading>
        </Stack>

        <Text fontSize="xl" color="gray.600" mb={8} maxW="2xl" mx="auto">
          Schedule posts, track performance, and manage all your social media
          accounts from one comprehensive dashboard. Grow your audience with
          Brandlys intelligent social media management tools.
        </Text>
        <Flex
          direction={{ base: "column", md: "row" }}
          gap={4}
          justify="center"
          mb={12}
        >
          <Button
            size="lg"
            bg="green.500"
            color="white"
            _hover={{ bg: "green.600" }}
            px={8}
            py={3}
            borderRadius={8}
            fontWeight={600}
          >
            Start Free Trial
          </Button>
          <Button
            size="lg"
            variant="outline"
            borderColor="gray.300"
            color="gray.700"
            px={8}
            py={3}
          >
            <Icon>
              <FaPlay size="16px" />
            </Icon>
            Watch Demo
          </Button>
        </Flex>

        {/* Dashboard Preview */}
        <Box maxW="6xl" mx="auto" display={{ base: "none", lg: "block" }}>
          <Box
            bg="white"
            rounded="2xl"
            shadow="2xl"
            border="1px"
            borderColor="gray.200"
            overflow="hidden"
          >
            {/* Dashboard Header */}
            <Flex
              bg="white"
              borderBottom="1px"
              borderColor="gray.200"
              px={6}
              py={4}
              align="center"
              justify="space-between"
            >
              <Flex align="center" gap={4}>
                <Flex align="center" gap={2}>
                  <Box
                    w={8}
                    h={8}
                    bg="green.500"
                    rounded="lg"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Text color="white" fontWeight="bold" fontSize="sm">
                      S
                    </Text>
                  </Box>
                  <Text fontSize="lg" fontWeight="bold" color="gray.900">
                    Socially
                  </Text>
                </Flex>
                <Box position="relative">
                  <InputGroup
                    startElement={<FaSearch size="16px" color="gray.400" />}
                  >
                    <Input
                      placeholder="Search here..."
                      pl={8}
                      pr={4}
                      py={2}
                      border="1px solid black"
                      borderColor="gray.200"
                      rounded="lg"
                      fontSize="sm"
                      w={64}
                    />
                  </InputGroup>
                </Box>
              </Flex>
              <Flex align="center" gap={4}>
                <Button variant="ghost" size="sm" color="gray.600">
                  Invite your Team
                </Button>
                <Flex align="center" gap={2}>
                  <Text fontSize="sm" color="gray.600">
                    Eng
                  </Text>
                  <Box w={8} h={8} bg="green.500" rounded="full" />
                  <Text fontSize="sm" fontWeight="medium">
                    Brooklyn
                  </Text>
                </Flex>
              </Flex>
            </Flex>

            {/* Dashboard Content */}
            <Flex>
              {/* Sidebar */}
              <Box
                w={64}
                bg="gray.50"
                borderRight="1px"
                borderColor="gray.200"
                p={4}
              >
                <Box as="nav" display="flex" flexDir="column" gap={2}>
                  <Text
                    fontSize="xs"
                    fontWeight="semibold"
                    color="gray.500"
                    textTransform="uppercase"
                    letterSpacing="wider"
                    mb={3}
                  >
                    Menu
                  </Text>
                  <Link
                    href="#"
                    display="flex"
                    alignItems="center"
                    gap={3}
                    color="gray.600"
                    _hover={{ color: "gray.900" }}
                    py={2}
                    px={3}
                    rounded="lg"
                  >
                    <FaChartBar size="16px" />
                    <Text fontSize="sm">Overview</Text>
                  </Link>
                  <Link
                    href="#"
                    display="flex"
                    alignItems="center"
                    gap={3}
                    color="gray.600"
                    _hover={{ color: "gray.900" }}
                    py={2}
                    px={3}
                    rounded="lg"
                  >
                    <FaUser size="16px" />
                    <Text fontSize="sm">Profile</Text>
                  </Link>
                  <Link
                    href="#"
                    display="flex"
                    alignItems="center"
                    gap={3}
                    color="green.600"
                    bg="green.50"
                    py={2}
                    px={3}
                    rounded="lg"
                  >
                    <FaTh size="16px" />
                    <Text fontSize="sm" fontWeight="medium">
                      Dashboard
                    </Text>
                  </Link>
                  <Link
                    href="#"
                    display="flex"
                    alignItems="center"
                    gap={3}
                    color="gray.600"
                    _hover={{ color: "gray.900" }}
                    py={2}
                    px={3}
                    rounded="lg"
                  >
                    <FaChartLine size="16px" />
                    <Text fontSize="sm">Analytics</Text>
                  </Link>
                  <Link
                    href="#"
                    display="flex"
                    alignItems="center"
                    gap={3}
                    color="gray.600"
                    _hover={{ color: "gray.900" }}
                    py={2}
                    px={3}
                    rounded="lg"
                  >
                    <FaComment size="16px" />
                    <Text fontSize="sm">Contact</Text>
                  </Link>
                  <Link
                    href="#"
                    display="flex"
                    alignItems="center"
                    gap={3}
                    color="gray.600"
                    _hover={{ color: "gray.900" }}
                    py={2}
                    px={3}
                    rounded="lg"
                  >
                    <FaEdit size="16px" />
                    <Text fontSize="sm">Compose</Text>
                  </Link>
                  <Link
                    href="#"
                    display="flex"
                    alignItems="center"
                    gap={3}
                    color="gray.600"
                    _hover={{ color: "gray.900" }}
                    py={2}
                    px={3}
                    rounded="lg"
                  >
                    <FaCalendar size="16px" />
                    <Text fontSize="sm">Calendar</Text>
                  </Link>
                  <Link
                    href="#"
                    display="flex"
                    alignItems="center"
                    gap={3}
                    color="gray.600"
                    _hover={{ color: "gray.900" }}
                    py={2}
                    px={3}
                    rounded="lg"
                  >
                    <FaFileAlt size="16px" />
                    <Text fontSize="sm">Posts</Text>
                  </Link>
                  <Link
                    href="#"
                    display="flex"
                    alignItems="center"
                    gap={3}
                    color="gray.600"
                    _hover={{ color: "gray.900" }}
                    py={2}
                    px={3}
                    rounded="lg"
                  >
                    <FaBullseye size="16px" />
                    <Text fontSize="sm">Campaign</Text>
                  </Link>
                  <Link
                    href="#"
                    display="flex"
                    alignItems="center"
                    gap={3}
                    color="gray.600"
                    _hover={{ color: "gray.900" }}
                    py={2}
                    px={3}
                    rounded="lg"
                  >
                    <FaFolder size="16px" />
                    <Text fontSize="sm">Library</Text>
                  </Link>
                </Box>
              </Box>

              {/* Main Content */}
              <Box flex="1" p={6}>
                <SimpleGrid columns={3} gridGap={6}>
                  {/* Analytics Section */}
                  <Box gridColumn={{ base: "span 3", md: "span 2" }}>
                    <Heading
                      as="h2"
                      fontSize="xl"
                      fontWeight="semibold"
                      color="gray.900"
                      mb={4}
                    >
                      Social Media Analytics
                    </Heading>

                    {/* Metrics Cards */}
                    <SimpleGrid columns={3} gridGap={4} mb={6}>
                      <Box
                        bg="white"
                        border="1px"
                        borderColor="gray.200"
                        rounded="lg"
                        p={4}
                      >
                        <Text fontSize="2xl" fontWeight="bold" color="gray.900">
                          125k
                        </Text>
                        <Text fontSize="sm" color="gray.600">
                          Total Followers
                        </Text>
                        <Flex align="center" mt={2}>
                          <Progress.Root
                            value={75}
                            w="full"
                            rounded="full"
                            h={2}
                          >
                            <Progress.Track bg="gray.50" borderRadius={10}>
                              <Progress.Range bg="green.500" />
                            </Progress.Track>
                          </Progress.Root>
                          <Text fontSize="xs" color="green.600" ml={2}>
                            75%
                          </Text>
                        </Flex>
                      </Box>
                      <Box
                        bg="white"
                        border="1px"
                        borderColor="gray.200"
                        rounded="lg"
                        p={4}
                      >
                        <Text fontSize="2xl" fontWeight="bold" color="gray.900">
                          15k
                        </Text>
                        <Text fontSize="sm" color="gray.600">
                          Total Engagement
                        </Text>
                        <Flex align="center" mt={2}>
                          <Progress.Root
                            value={60}
                            w="full"
                            rounded="full"
                            h={2}
                          >
                            <Progress.Track bg="gray.50" borderRadius={10}>
                              <Progress.Range bg="green.500" />
                            </Progress.Track>
                          </Progress.Root>
                          <Text fontSize="xs" color="green.600" ml={2}>
                            60%
                          </Text>
                        </Flex>
                      </Box>
                      <Box
                        bg="white"
                        border="1px"
                        borderColor="gray.200"
                        rounded="lg"
                        p={4}
                      >
                        <Text fontSize="2xl" fontWeight="bold" color="gray.900">
                          8.5%
                        </Text>
                        <Text fontSize="sm" color="gray.600">
                          Engagement Rate
                        </Text>
                        <Flex align="center" mt={2}>
                          <Progress.Root
                            value={85}
                            w="full"
                            rounded="full"
                            h={2}
                          >
                            <Progress.Track bg="gray.50" borderRadius={10}>
                              <Progress.Range bg="green.500" />
                            </Progress.Track>
                          </Progress.Root>
                          <Text fontSize="xs" color="green.600" ml={2}>
                            85%
                          </Text>
                        </Flex>
                      </Box>
                    </SimpleGrid>

                    {/* Charts */}
                    <SimpleGrid columns={2} gap={4}>
                      <Box
                        bg="white"
                        border="1px"
                        borderColor="gray.200"
                        rounded="lg"
                        p={4}
                      >
                        <Text
                          fontSize="sm"
                          fontWeight="medium"
                          color="gray.900"
                          mb={3}
                        >
                          Platform Performance
                        </Text>
                        <Box
                          h={32}
                          bg="gray.50"
                          rounded="md"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Box textAlign="center">
                            <Box
                              w={16}
                              h={16}
                              bg="green.100"
                              rounded="full"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              mx="auto"
                              mb={2}
                            >
                              <FaChartBar size={32} color="green.600" />
                            </Box>
                            <Text fontSize="xs" color="gray.500">
                              Chart Visualization
                            </Text>
                          </Box>
                        </Box>
                      </Box>
                      <Box
                        bg="white"
                        border="1px"
                        borderColor="gray.200"
                        rounded="lg"
                        p={4}
                      >
                        <Text
                          fontSize="sm"
                          fontWeight="medium"
                          color="gray.900"
                          mb={3}
                        >
                          Posting Schedule
                        </Text>
                        <Box
                          h={32}
                          bg="gray.50"
                          rounded="md"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Box textAlign="center">
                            <Box
                              w={16}
                              h={16}
                              bg="green.100"
                              rounded="full"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              mx="auto"
                              mb={2}
                            >
                              <FaChartLine size={32} color="green.600" />
                            </Box>
                            <Text fontSize="xs" color="gray.500">
                              Time Analytics
                            </Text>
                          </Box>
                        </Box>
                      </Box>
                    </SimpleGrid>
                  </Box>

                  {/* Upcoming Posts */}
                  <Box gridColumn="span 1">
                    <Heading
                      as="h2"
                      fontSize="xl"
                      fontWeight="semibold"
                      color="gray.900"
                      mb={4}
                    >
                      Upcoming Posts
                    </Heading>
                    <Text fontSize="sm" color="gray.600" mb={4}>
                      24 Posts for next Scheduled
                    </Text>

                    <Stack spaceX={3}>
                      <Box
                        bg="white"
                        border="1px"
                        borderColor="gray.200"
                        rounded="lg"
                        p={3}
                      >
                        <Flex align="center" justify="space-between" mb={2}>
                          <Text
                            fontSize="sm"
                            fontWeight="medium"
                            color="gray.900"
                          >
                            Summer Sale Campaign
                          </Text>
                          <Button
                            variant="ghost"
                            color="gray.400"
                            _hover={{ color: "gray.600" }}
                          >
                            <FaEllipsisH size="16px" />
                          </Button>
                        </Flex>
                        <Flex
                          align="center"
                          justify="space-between"
                          fontSize="xs"
                          color="gray.500"
                        >
                          <Text>Post on Facebook</Text>
                          <Text>10 Mar.</Text>
                        </Flex>
                        <Box mt={2}>
                          <Badge
                            bg="green.100"
                            color="green.700"
                            fontSize="xs"
                            px={2}
                            py={1}
                            rounded="md"
                          >
                            Edit Post
                          </Badge>
                        </Box>
                      </Box>

                      <Box
                        bg="white"
                        border="1px"
                        borderColor="gray.200"
                        rounded="lg"
                        p={3}
                      >
                        <Flex align="center" justify="space-between" mb={2}>
                          <Text
                            fontSize="sm"
                            fontWeight="medium"
                            color="gray.900"
                          >
                            Product Launch Teaser
                          </Text>
                          <Button
                            variant="ghost"
                            color="gray.400"
                            _hover={{ color: "gray.600" }}
                          >
                            <FaEllipsisH size="16px" />
                          </Button>
                        </Flex>
                        <Flex
                          align="center"
                          justify="space-between"
                          fontSize="xs"
                          color="gray.500"
                        >
                          <Text>Post on Instagram</Text>
                          <Text>12 Mar.</Text>
                        </Flex>
                        <Box mt={2}>
                          <Badge
                            bg="gray.100"
                            color="gray.700"
                            fontSize="xs"
                            px={2}
                            py={1}
                            rounded="md"
                          >
                            Scheduled
                          </Badge>
                        </Box>
                      </Box>

                      <Box
                        bg="white"
                        border="1px"
                        borderColor="gray.200"
                        rounded="lg"
                        p={3}
                      >
                        <Flex align="center" justify="space-between" mb={2}>
                          <Text
                            fontSize="sm"
                            fontWeight="medium"
                            color="gray.900"
                          >
                            Weekly Newsletter
                          </Text>
                          <Button
                            variant="ghost"
                            color="gray.400"
                            _hover={{ color: "gray.600" }}
                          >
                            <FaEllipsisH size="16px" />
                          </Button>
                        </Flex>
                        <Flex
                          align="center"
                          justify="space-between"
                          fontSize="xs"
                          color="gray.500"
                        >
                          <Text>Post on LinkedIn</Text>
                          <Text>15 Mar.</Text>
                        </Flex>
                        <Box mt={2}>
                          <Badge
                            bg="blue.100"
                            color="blue.700"
                            fontSize="xs"
                            px={2}
                            py={1}
                            rounded="md"
                          >
                            Draft
                          </Badge>
                        </Box>
                      </Box>
                    </Stack>
                  </Box>
                </SimpleGrid>

                {/* Company Logos */}
                <Box mt={8} textAlign="center">
                  <Text fontSize="sm" color="gray.500" mb={4}>
                    More than 100+ companies trusted us
                  </Text>
                  <Flex align="center" justify="center" gap={8} opacity={0.6}>
                    <Text fontSize="sm" fontWeight="medium" color="gray.400">
                      LogoIpsum
                    </Text>
                    <Text fontSize="sm" fontWeight="medium" color="gray.400">
                      LogoIpsum
                    </Text>
                    <Text fontSize="sm" fontWeight="medium" color="gray.400">
                      LogoIpsum
                    </Text>
                    <Text fontSize="sm" fontWeight="medium" color="gray.400">
                      LogoIpsum
                    </Text>
                    <Text fontSize="sm" fontWeight="medium" color="gray.400">
                      LogoIpsum
                    </Text>
                  </Flex>
                </Box>
              </Box>
            </Flex>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
