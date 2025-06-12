// src/components/Navbar.tsx
import {
  Flex,
  IconButton,
  Avatar,
  Box,
  Menu,
  Button,
  Portal,
} from "@chakra-ui/react";
import { FiMenu, FiBell } from "react-icons/fi";
import DarkModeToggle from "./DarkModeToggle";
import Cookies from "js-cookie";

export function Navbar() {
  const handleLogout = () => {
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    window.location.reload();
  };
  return (
    <Box>
      <Flex
        as="nav"
        gridArea="navbar"
        bg="navbarBg" // semantic token (light ⇆ dark)
        color="navbarFg" // semantic token (light ⇆ dark)
        px={{ base: 2, md: 4 }}
        h={16}
        align="center"
        justify="space-between"
        boxShadow="shadow.sm"
        position="sticky"
        top="0"
        zIndex="1000"
        p={3}
      >
        {/* Mobile sidebar toggle */}
        <IconButton
          aria-label="Toggle sidebar"
          display={{ base: "inline-flex", md: "none" }}
          variant="ghost"
        >
          <FiMenu />
        </IconButton>

        {/* Brand */}
        <Box fontSize="xl" fontWeight="bold">
          Socially
        </Box>

        {/* Notifications & Avatar */}
        <Flex align="center">
          <DarkModeToggle />
          <IconButton
            aria-label="Notifications"
            variant="ghost"
            fontSize="lg"
            mr={4}
          >
            <FiBell />
          </IconButton>

          <Menu.Root>
            <Menu.Trigger asChild>
              <Button variant="outline" size="sm">
                <Avatar.Root>
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
        </Flex>
      </Flex>
    </Box>
  );
}
