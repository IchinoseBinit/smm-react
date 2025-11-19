// src/components/Navbar.tsx
import {
  Flex,
  IconButton,
  Avatar,
  Box,
  Menu,
  Button,
  Portal,
  Image,
  Heading,
} from "@chakra-ui/react"
import notificationbing from "@/assets/notification-bing.svg"
import { useState } from "react"
import { Input, HStack, Text, Kbd } from "@chakra-ui/react"
import { LuSearch } from "react-icons/lu"
import { FiBell } from "react-icons/fi"
import DarkModeToggle from "./DarkModeToggle"
import Cookies from "js-cookie"
import LightLogo from "@/assets/app/Header Logo White.png"
import DarkLogo from "@/assets/app/Header Logo Black.png"

import { useColorMode } from "./ui/color-mode"
import { useLocation } from "react-router-dom"

import { HamburgerBar } from "./Hamburger"

export function Navbar() {
  const handleLogout = () => {
    Cookies.remove("access_token")
    Cookies.remove("refresh_token")
    window.location.reload()
  }

  const location = useLocation()
  const currentPath = location.pathname
  const { colorMode } = useColorMode()

  const bgColor = colorMode === "light" ? "gray.50" : "gray.700"
  const borderColor = colorMode === "light" ? "gray.200" : "gray.600"

  return (
    <Box>
      <Flex
        as="nav"
        gridArea="navbar"
        bg="white"
        color="gray.800"
        px={{ base: 4, md: 6 }}
        h={16}
        align="center"
        justify="space-between"
        borderBottom="1px solid"
        borderColor="gray.100"
        position="sticky"
        top="0"
        zIndex="1000"
      >
        {/* Left Section - Logo and Title */}
        <Flex align="center" gap={4} flex="1">
          <HamburgerBar />

          <HStack gap={3}>
            <Box>
              {colorMode === "light" ? (
                <Image src={LightLogo} height={8} width="auto" maxW="100%" />
              ) : (
                <Image src={DarkLogo} height={8} width="auto" maxW="100%" />
              )}
            </Box>
          </HStack>
        </Flex>
        {currentPath === "/account" && (
          <>
            <HStack width={"83%"} justifyContent={"space-between"}>
              <Heading
                size="lg"
                color="gray.800"
                fontWeight="600"
                display={{ base: "none", md: "block" }}
              >
                Connect Accounts
              </Heading>
              <HStack flex="1" maxW="300px" mx={6}>
                <QuickActionSearch />
                <Box
                  padding={3}
                  borderRadius={"full"}
                  bg={bgColor}
                  border="1px solid"
                  borderColor={borderColor}
                >
                  <Image src={notificationbing} />
                </Box>
              </HStack>
            </HStack>
          </>
        )}
        {/* Center Section - Search (only show on account page) */}

        {/* Right Section - Actions */}
        {currentPath !== "/account" && (
          <Flex align="center" gap={3} flex="1" justify="flex-end">
            <>
              <DarkModeToggle />
              <IconButton
                aria-label="Notifications"
                variant="ghost"
                size="sm"
                fontSize="lg"
                color="gray.600"
                _hover={{
                  bg: "gray.100",
                  color: "gray.800",
                }}
              >
                <FiBell />
              </IconButton>

              <Menu.Root>
                <Menu.Trigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    borderRadius="full"
                    p={1}
                    _hover={{
                      bg: "gray.100",
                    }}
                  >
                    <Avatar.Root size="sm">
                      <Avatar.Fallback name="Segun Adebayo" />
                      <Avatar.Image src="https://cdn.myanimelist.net/r/84x124/images/characters/9/105421.webp?s=269ff1b2bb9abe3ac1bc443d3a76e863" />
                    </Avatar.Root>
                  </Button>
                </Menu.Trigger>
                <Portal>
                  <Menu.Positioner>
                    <Menu.Content>
                      <Menu.Item value="rename">Profile</Menu.Item>
                      <Menu.Item value="export">Subscriptions</Menu.Item>
                      <Menu.Item
                        value="delete"
                        color="fg.error"
                        _hover={{ bg: "bg.error", color: "fg.error" }}
                        onClick={handleLogout}
                      >
                        Logout
                      </Menu.Item>
                    </Menu.Content>
                  </Menu.Positioner>
                </Portal>
              </Menu.Root>
            </>
          </Flex>
        )}
      </Flex>
    </Box>
  )
}

const QuickActionSearch = () => {
  const [searchValue, setSearchValue] = useState("")
  const { colorMode } = useColorMode()

  const bgColor = colorMode === "light" ? "gray.50" : "gray.700"
  const borderColor = colorMode === "light" ? "gray.200" : "gray.600"
  const textColor = colorMode === "light" ? "gray.500" : "gray.400"

  return (
    <Box
      w="100%"
      bg={bgColor}
      borderRadius="10px"
      border="1px solid"
      borderColor={borderColor}
      px={4}
      py={2}
      _hover={{
        borderColor: "blue.300",
        shadow: "sm",
      }}
      _focusWithin={{
        borderColor: "blue.400",
        shadow: "0 0 0 1px var(--chakra-colors-blue-400)",
      }}
      transition="all 0.2s"
    >
      <HStack gap={3} align="center">
        <HStack flex={1} gap={3}>
          <LuSearch color={textColor} size={18} />
          <Input
            placeholder="Quick Action"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            border="none"
            bg="transparent"
            fontSize="sm"
            fontWeight="400"
            color={textColor}
            _placeholder={{
              color: textColor,
              fontSize: "sm",
              fontWeight: "400",
            }}
            _focus={{
              boxShadow: "none",
              outline: "none",
            }}
            p={0}
            h="auto"
          />
        </HStack>

        <HStack gap={1} opacity={0.6} display={{ base: "none", md: "flex" }}>
          <Kbd
            bg="white"
            borderColor="gray.300"
            fontSize="xs"
            fontWeight="500"
            px={1.5}
            py={0.5}
            minH="auto"
          >
            ⌘
          </Kbd>
          <Text fontSize="sm" color={textColor} fontWeight="400">
            +
          </Text>
          <Kbd
            bg="white"
            borderColor="gray.300"
            fontSize="xs"
            fontWeight="500"
            px={1.5}
            py={0.5}
            minH="auto"
          >
            /
          </Kbd>
        </HStack>
      </HStack>
    </Box>
  )
}

export { QuickActionSearch }
