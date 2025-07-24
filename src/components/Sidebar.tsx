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
  { label: "Posts", icon: MdManageAccounts, href: "/posts" },
  { label: "Accounts", icon: FiKey, href: "/account" },
];

export function Sidebar() {
  const { pathname } = useLocation();

  return (
    <Flex
      as="aside"
      gridArea="sidebar"
      direction="column"
      bg="sidebarBg"
      color="fg"
      w={{ base: "16", md: 60 }} // icon-only width on mobile
      h="full"
      px={2}
      mt={4}
    >
      {navItems.map((item) => {
        const isActive =
          pathname === item.href || pathname.startsWith(`${item.href}/`);

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
              <Text fontSize="sm" display={{ base: "none", md: "block" }}>
                {item.label}
              </Text>
            </HStack>
          </Link>
        );
      })}
    </Flex>
  );
}
