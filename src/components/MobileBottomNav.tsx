// src/components/MobileBottomNav.tsx
import { Box, Flex, Icon, Link, Text, VStack } from "@chakra-ui/react"
import {
  FiHome,
  FiEdit2,
  FiCalendar,
  FiKey,
} from "react-icons/fi"
import { MdManageAccounts } from "react-icons/md"
import { useLocation } from "react-router"

const navItems = [
  { label: "Home", icon: FiHome, href: "/dashboard" },
  { label: "Create", icon: FiEdit2, href: "/create" },
  { label: "Calendar", icon: FiCalendar, href: "/calendar" },
  { label: "Posts", icon: MdManageAccounts, href: "/posts" },
  { label: "Account", icon: FiKey, href: "/account" },
]

export function MobileBottomNav() {
  const { pathname } = useLocation()

  return (
    <Box
      position="fixed"
      bottom={0}
      left={0}
      right={0}
      bg="white"
      borderTop="1px solid"
      borderColor="gray.200"
      zIndex={1000}
      display={{ base: "block", md: "none" }}
      _dark={{ bg: "gray.800", borderColor: "gray.600" }}
    >
      <Flex justify="space-around" align="center" py={2}>
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`)

          return (
            <Link
              key={item.label}
              href={item.href}
              _hover={{ textDecor: "none" }}
              flex={1}
            >
              <VStack gap={1}>
                <Icon
                  as={item.icon}
                  boxSize={5}
                  color={isActive ? "blue.500" : "gray.500"}
                />
                <Text
                  fontSize="xs"
                  color={isActive ? "blue.500" : "gray.500"}
                  fontWeight={isActive ? "semibold" : "normal"}
                >
                  {item.label}
                </Text>
              </VStack>
            </Link>
          )
        })}
      </Flex>
    </Box>
  )
}
