// src/components/Sidebar.tsx
import { Flex, HStack, Icon, Link, Text } from "@chakra-ui/react";
import {
  FiHome,
  FiBarChart2,
  FiEdit2,
  FiUsers,
  FiMic,
  FiKey,
  FiPhone,
} from "react-icons/fi";

const navItems = [
  { label: "Dashboard", icon: FiHome, href: "dashboard" },
  { label: "Analytics", icon: FiBarChart2, href: "analytics" },
  { label: "Publishing", icon: FiEdit2, href: "publishing" },
  { label: "Engagement", icon: FiUsers, href: "engagement" },
  { label: "Listening", icon: FiMic, href: "listening" },
  { label: "Advertising", icon: FiPhone, href: "advertising" },
  { label: "Accounts", icon: FiKey, href: "accounts" },
];

export function Sidebar() {
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
    >
      {/* Nav links */}
      {navItems.map((item) => {
        const isActive = item.label === item.href;
        return (
          <Link
            key={item.label}
            href={item.href}
            mb={1}
            _hover={{
              textDecor: "none",
              bg: "primary.100",
              w: "full",
              _dark: { bg: "primary.700" },
            }}
            bg={isActive ? "primary.50" : "transparent"}
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
