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
} from "@chakra-ui/react";
import { FiBell } from "react-icons/fi";
import DarkModeToggle from "./DarkModeToggle";
import Cookies from "js-cookie";
import LightLogo from "@/assets/app/Header Logo White.png";
import DarkLogo from "@/assets/app/Header Logo Black.png";

import { useColorMode } from "./ui/color-mode";

export function Navbar() {
  const handleLogout = () => {
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    window.location.reload();
  };

  const { colorMode } = useColorMode();
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
        <Flex gap={3}>
          {/* Brand */}

          <Box fontSize="xl" fontWeight="bold">
            {colorMode === "light" ? (
              <Image
                src={LightLogo}
                height={{ base: 7, md: 8 }}
                mt={{ base: 2, md: 0 }}
                width="auto"
                maxW="100%"
              />
            ) : (
              <Image
                src={DarkLogo}
                height={{ base: 7, md: 8 }}
                mt={{ base: 2, md: 0 }}
                width="auto"
                maxW="100%"
              />
            )}
          </Box>
        </Flex>

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
              <Button rounded="full" w="10">
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
