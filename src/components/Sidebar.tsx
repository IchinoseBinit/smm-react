// src/components/Sidebar.tsx
import { Flex, HStack, Icon, Link, Text } from "@chakra-ui/react";
import {
  FiHome,
  FiBarChart2,
  FiEdit2,
  FiUsers,
  FiKey,
  FiCalendar,
} from "react-icons/fi";
import { MdManageAccounts } from "react-icons/md";
import { useLocation } from "react-router";

const navItems = [
  { label: "Dashboard", icon: FiHome, href: "/" },
  { label: "Analytics", icon: FiBarChart2, href: "/analytics" },
  { label: "Create", icon: FiEdit2, href: "/create" },
  { label: "Engagement", icon: FiUsers, href: "/engagement" },
  { label: "Calendar", icon: FiCalendar, href: "/calendar" },
  { label: "Manager", icon: MdManageAccounts, href: "/manager" },
  { label: "Accounts", icon: FiKey, href: "/account" },
];

export function Sidebar() {
  const location = useLocation();
  const path = location.pathname; // current route path
  return (
    <Flex
      as="aside"
      gridArea="sidebar"
      direction="column"
      bg="sidebarBg" // semantic token (light ⇆ dark)
      color="fg"
      w={{ base: 0, md: 60 }} // 240px on md+, hidden on base
      display={{ base: "none", md: "flex" }}
      mt={5}
      h="full"
    >
      {/* Nav links */}
      {navItems.map((item) => {
        const isActive = path === item.href || path.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.label}
            href={item.href}
            mb={1}
            ml={2}
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
            <HStack px={6} py={3} spaceX={3} borderRadius="md">
              <Icon as={item.icon} boxSize={5} />
              <Text fontSize="sm">{item.label}</Text>
            </HStack>
          </Link>
        );
      })}
    </Flex>
  );
}
