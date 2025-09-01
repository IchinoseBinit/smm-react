// src/components/DashboardLayout.tsx
import {
  Box,
  Flex,
  useBreakpointValue,
  HStack,
  Heading,
  Image,
  VStack,
} from "@chakra-ui/react"
import { QuickActionSearch } from "@/components/Navbar"
import { Sidebar } from "@/components/Sidebar"
import { useSidebarStore } from "@/lib/store/sideBarStore"
import notificationbing from "@/assets/notification-bing.svg"
import { useColorMode } from "@/components/ui/color-mode"
import { useLocation } from "react-router-dom"
import createPostPencil from "@/assets/createpostpencil.svg"
import { useEditPostStore } from "@/features/calendar/lib/store/editPost.store"

// Define page titles and configurations for different routes
const getPageConfig = (pathname: string) => {
  const { isCreatePostEdit } = useEditPostStore()

  const routeConfigMap: Record<
    string,
    { title: string; icon?: string; subtitle?: string }
  > = {
    "/dashboard": { title: "Dashboard" },
    "/analytics": { title: "Analytics" },
    "/create": {
      title: isCreatePostEdit ? "Edit Post" : "Create ",
      icon: createPostPencil,
    },
    "/engagement": { title: "Engagement" },
    "/calendar": { title: "Calendar" },
    "/posts": { title: "Post" },
    "/account": { title: "Connect Accounts" },
    // "/accounts": { title: "Connect Accounts" },
    "/setting": { title: "Settings" },
    "/settings": { title: "Settings" },
    "/help": { title: "Help & Support" },
  }

  // Check for exact match first
  if (routeConfigMap[pathname]) {
    return routeConfigMap[pathname]
  }

  // Check for partial matches (for nested routes)
  for (const route in routeConfigMap) {
    if (pathname.startsWith(route)) {
      return routeConfigMap[route]
    }
  }

  // Default fallback
  return { title: "Dashboard" }
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const isOpen = useSidebarStore((s) => s.isOpen)
  const isMobile = useBreakpointValue({ base: true, md: false })
  const { colorMode } = useColorMode()
  const location = useLocation()

  const bgColor = colorMode === "light" ? "gray.50" : "gray.700"
  const borderColor = colorMode === "light" ? "gray.200" : "gray.600"

  // Get dynamic page configuration based on current route
  const pageConfig = getPageConfig(location.pathname)

  return (
    <Flex h="100dvh" bg="white">
      {/* Desktop sidebar */}
      {!isMobile && (
        <Box width="240px" flexShrink={0}>
          <Sidebar />
        </Box>
      )}

      {/* Main content area - no separate header */}
      <Box flex="1" bg="white" mt={4}>
        {/* Top right header content - positioned absolutely */}
        <HStack
          justifyContent="space-between"
          width="95%"
          borderBottom="1px solid"
          borderColor="gray.200"
          paddingBottom={4}
        >
          {/* Left side - Title with icon and subtitle */}
          <VStack align="flex-start" gap={1}>
            <HStack gap={3} marginLeft={4}>
              {pageConfig.icon && <Image src={pageConfig.icon} boxSize={6} />}
              <Heading
                size="lg"
                color="gray.800"
                fontWeight="600"
                display={{ base: "none", md: "block" }}
              >
                {pageConfig.title}
              </Heading>
            </HStack>
          </VStack>

          {/* Right side - Search and notification */}
          <HStack gap={4}>
            <Box maxW="300px">
              <QuickActionSearch />
            </Box>
            <Box
              padding={3}
              borderRadius="full"
              bg={bgColor}
              border="1px solid"
              borderColor={borderColor}
              _hover={{ bg: colorMode === "light" ? "gray.100" : "gray.600" }}
              cursor="pointer"
            >
              <Image src={notificationbing} boxSize={5} />
            </Box>
          </HStack>
        </HStack>

        {/* Main content */}
        <Box
          h="full"
          p={6}
          overflowY="auto"
          pt={pageConfig.subtitle ? "0" : "0"}
        >
          {children}
        </Box>
      </Box>

      {/* Mobile slide‑in sidebar */}
      {isMobile && (
        <Box
          pos="absolute"
          top={0}
          left={0}
          w="240px"
          h="100dvh"
          bg="white"
          transform={isOpen ? "translateX(0)" : "translateX(-100%)"}
          transition="transform 0.2s ease-out"
          zIndex={100}
          borderRight="1px solid"
          borderRightColor={borderColor}
          _dark={{ bg: "gray.800" }}
        >
          <Sidebar />
        </Box>
      )}
    </Flex>
  )
}
