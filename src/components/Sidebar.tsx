// src/components/Sidebar.tsx
import { Flex, HStack, Icon, Link, Text } from "@chakra-ui/react"
import {
  FiHome,
  // FiBarChart2,
  FiEdit2,
  // FiUsers,
  FiKey,
  FiCalendar,
} from "react-icons/fi"
import { MdManageAccounts } from "react-icons/md"
import { useLocation } from "react-router"
import { Image, Box } from "@chakra-ui/react"
import Logout from "@/assets/logout.svg"
import help from "@/assets/help.svg"
import setting from "@/assets/setting.svg"
import { HamburgerBar } from "./Hamburger"
import LightLogo from "@/assets/app/Header Logo White.png"
import DarkLogo from "@/assets/app/Header Logo Black.png"
import { useColorMode } from "./ui/color-mode"

import Cookies from "js-cookie"

const navItems = [
  { label: "Dashboard", icon: FiHome, href: "/dashboard" },
  // { label: "Analytics", icon: FiBarChart2, href: "/analytics" },
  { label: "Create", icon: FiEdit2, href: "/create" },
  // { label: "Engagement", icon: FiUsers, href: "/engagement" },
  { label: "Calendar", icon: FiCalendar, href: "/calendar" },
  { label: "Posts", icon: MdManageAccounts, href: "/posts" },
  { label: "Accounts", icon: FiKey, href: "/account" },
]

const bottomNavItems = [
  { label: "Setting", icon: setting, href: "/profile" },
  // { label: "Help", icon: help, href: "/help" },
  { label: "Contact", icon: help, href: "/contactus" },
  { label: "Logout", icon: Logout, href: "/logout" },
]

const handleLogout = () => {
  Cookies.remove("access_token")
  Cookies.remove("refresh_token")
  window.location.reload()
}

export function Sidebar() {
  const { pathname } = useLocation()
  const { colorMode } = useColorMode()

  return (
    <Flex
      as="aside"
      gridArea="sidebar"
      direction="column"
      bg="sidebarBg"
      color="fg"
      h="100vh"
      backgroundColor={"#fafafa"}
      px={2}
      pt={4}
      zIndex={100}
      borderRight={"1px solid #e5e5e8"}
      position="fixed"
      width="240px"
      overflow="hidden"
    >
      <Flex align="center" mb={4}>
        <HamburgerBar />

        <HStack>
          <Box>
            {colorMode === "light" ? (
              <Image src={LightLogo} height={8} width="auto" maxW="100%" />
            ) : (
              <Image src={DarkLogo} height={8} width="auto" maxW="100%" />
            )}
          </Box>
        </HStack>
      </Flex>
      <Text marginLeft={2} marginBottom={4} fontWeight={"bold"}>
        Menu
      </Text>
      {navItems.map((item) => {
        const isActive =
          pathname === item.href || pathname.startsWith(`${item.href}/`)

        return (
          <Link
            key={item.label}
            href={item.href}
            mb={1}
            _hover={{
              textDecor: "none",
              bg: "primary.50",
              _dark: { bg: "primary.700" },
            }}
            bg={
              isActive
                ? { base: "primary.50", _dark: "primary.700" }
                : "transparent"
            }
            borderRadius="lg"
          >
            <HStack
              px={{ base: 3, md: 6 }}
              py={3}
              spaceX={3}
              borderRadius="md"
              justify={{ base: "center", md: "flex-start" }}
            >
              <Icon as={item.icon} boxSize={5} />
              <Text fontSize="sm">{item.label}</Text>
            </HStack>
          </Link>
        )
      })}
      <Text marginLeft={2} marginBottom={4} marginTop={1} fontWeight={"bold"}>
        General
      </Text>
      {bottomNavItems.map((item) => {
        const isActive =
          pathname === item.href || pathname.startsWith(`${item.href}/`)

        if (item.label === "Logout") {
          return (
            <Box
              key={item.label}
              mb={1}
              cursor="pointer"
              _hover={{
                bg: "primary.50",
                _dark: { bg: "primary.700" },
              }}
              bg={
                isActive
                  ? { base: "primary.50", _dark: "primary.700" }
                  : "transparent"
              }
              borderRadius="lg"
              onClick={handleLogout}
            >
              <HStack
                px={{ base: 3, md: 6 }}
                py={3}
                spaceX={3}
                borderRadius="md"
                justify={{ base: "center", md: "flex-start" }}
              >
                <Image src={item.icon} boxSize={5} />
                <Text fontSize="sm">{item.label}</Text>
              </HStack>
            </Box>
          )
        }

        return (
          <Link
            key={item.label}
            href={item.href}
            mb={1}
            _hover={{
              textDecor: "none",
              bg: "primary.50",
              _dark: { bg: "primary.700" },
            }}
            bg={
              isActive
                ? { base: "primary.50", _dark: "primary.700" }
                : "transparent"
            }
            borderRadius="lg"
          >
            <HStack
              px={{ base: 3, md: 6 }}
              py={3}
              spaceX={3}
              borderRadius="md"
              justify={{ base: "center", md: "flex-start" }}
            >
              <Image src={item.icon} boxSize={5} />
              <Text fontSize="sm">{item.label}</Text>
            </HStack>
          </Link>
        )
      })}
    </Flex>
  )
}
