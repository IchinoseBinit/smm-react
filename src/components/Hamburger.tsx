// src/components/HamburgerBar.tsx
import { useSidebarStore } from "@/lib/store/sideBarStore";
import { Icon, IconButton } from "@chakra-ui/react";
import { FiMenu, FiX } from "react-icons/fi";

export function HamburgerBar() {
  const { isOpen, toggle } = useSidebarStore();
  return (
    <IconButton
      aria-label="Toggle sidebar"
      display={{ base: "flex", md: "none" }}
      variant="ghost"
      onClick={toggle}
    >
      {isOpen ? (
        <Icon>
          <FiX />
        </Icon>
      ) : (
        <Icon>
          <FiMenu />
        </Icon>
      )}
    </IconButton>
  );
}
