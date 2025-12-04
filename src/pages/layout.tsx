// src/components/DashboardLayout.tsx
import {
  Box,
  Flex,
  useBreakpointValue,
  HStack,
  Heading,
  Image,
  IconButton,
  Icon,
} from "@chakra-ui/react"
import { QuickActionSearch } from "@/components/Navbar"
import { Sidebar } from "@/components/Sidebar"
import { MobileBottomNav } from "@/components/MobileBottomNav"
import { useSidebarStore } from "@/lib/store/sideBarStore"
import notificationbing from "@/assets/notification-bing.svg"
import { useColorMode } from "@/components/ui/color-mode"
import { useLocation } from "react-router-dom"
import createPostPencil from "@/assets/createpostpencil.svg"
import { useEditPostStore } from "@/features/calendar/lib/store/editPost.store"
import { FiMenu } from "react-icons/fi"

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
    "/contact": { title: "Contact Us" },
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
  const toggle = useSidebarStore((s) => s.toggle)
  const isMobile = useBreakpointValue({ base: true, md: false })
  const { colorMode } = useColorMode()
  const location = useLocation()

  const bgColor = colorMode === "light" ? "gray.50" : "gray.700"
  const borderColor = colorMode === "light" ? "gray.200" : "gray.600"

  // Get dynamic page configuration based on current route
  const pageConfig = getPageConfig(location.pathname)

  return (
    <Flex minH="100vh" w="100%" position="relative">
      {/* Desktop sidebar */}
      {!isMobile && <Sidebar />}

      {/* Main content area */}
      <Box
        flex="1"
        bg="white"
        mt={{ base: 2, md: 4 }}
        ml={!isMobile ? "240px" : 0}
        minW={0}
        w={{ base: "100%", md: "calc(100% - 240px)" }}
      >
        {/* Header with mobile menu button */}
        <HStack
          justifyContent="space-between"
          w="100%"
          minW={0}
          borderBottom="1px solid"
          borderColor="gray.200"
          paddingBottom={{ base: 3, md: 4 }}
          px={{ base: 2, md: 4 }}
        >
          {/* Left side - Mobile menu button + Title with icon */}
          <HStack gap={{ base: 1, md: 3 }}>
            {/* Mobile hamburger menu - always visible on mobile */}
            {isMobile && (
              <IconButton
                aria-label="Open menu"
                variant="ghost"
                onClick={toggle}
                size="sm"
              >
                <Icon as={FiMenu} boxSize={5} />
              </IconButton>
            )}

            {/* Page icon and title */}
            {pageConfig.icon && (
              <Image src={pageConfig.icon} boxSize={{ base: 5, md: 6 }} />
            )}
            <Heading
              size={{ base: "sm", md: "lg" }}
              color="gray.800"
              fontWeight="600"
            >
              {pageConfig.title}
            </Heading>
          </HStack>

          {/* Right side - Search and notification */}
          <HStack gap={{ base: 2, md: 4 }}>
            <Box
              maxW={{ base: "150px", md: "300px" }}
              display={{ base: "none", sm: "block" }}
            >
              <QuickActionSearch />
            </Box>
            <Box
              padding={{ base: 2, md: 3 }}
              borderRadius="full"
              bg={bgColor}
              border="1px solid"
              borderColor={borderColor}
              _hover={{ bg: colorMode === "light" ? "gray.100" : "gray.600" }}
              cursor="pointer"
            >
              <Image src={notificationbing} boxSize={{ base: 4, md: 5 }} />
            </Box>
          </HStack>
        </HStack>

        {/* Main content */}
        <Box
          p={{ base: 2, md: 6 }}
          overflowY="auto"
          overflowX="hidden"
          css={{
            "&::-webkit-scrollbar": { display: "none" },
          }}
          h="calc(100vh - 100px)"
          minH="calc(100vh - 100px)"
          w="100%"
          maxW="100%"
          minW={0}
        >
          {children}
        </Box>
      </Box>

      {/* Backdrop overlay for mobile sidebar */}
      {isMobile && isOpen && (
        <Box
          pos="fixed"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg="blackAlpha.600"
          zIndex={99}
          onClick={toggle}
        />
      )}

      {/* Mobile slide-in sidebar */}
      {isMobile && (
        <Box
          pos="fixed"
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
          boxShadow={isOpen ? "xl" : "none"}
        >
          <Sidebar />
        </Box>
      )}

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
    </Flex>
  )
}
