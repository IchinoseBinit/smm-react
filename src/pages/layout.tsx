// src/components/DashboardLayout.tsx
import { Box, Grid, GridItem, useBreakpointValue } from "@chakra-ui/react";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { useSidebarStore } from "@/lib/store/sideBarStore";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isOpen = useSidebarStore((s) => s.isOpen);
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box bg="bg.DEFAULT" h="100dvh" overflow="hidden">
      <Grid
        templateAreas={{
          base: `"navbar" "main"`,
          md: `"navbar navbar" "sidebar main"`,
        }}
        templateRows={{ base: "auto 1fr", md: "auto 1fr" }}
        templateColumns={{ base: "1fr", md: "240px 1fr" }}
        h="full"
      >
        <GridItem area="navbar">
          <Navbar />
        </GridItem>

        {/* Desktop sidebar */}
        {!isMobile && (
          <GridItem area="sidebar" position="relative">
            <Sidebar />
          </GridItem>
        )}

        <GridItem area="main" p={4} overflowY="auto">
          {children}
        </GridItem>
      </Grid>

      {/* Mobile slide‑in sidebar */}
      {isMobile && (
        <Box
          pos="absolute"
          top="56px"
          left={0}
          w="240px"
          h="calc(100dvh - 56px)"
          bg="sidebarBg"
          transform={isOpen ? "translateX(0)" : "translateX(-100%)"}
          transition="transform 0.2s ease-out"
          zIndex={100}
          bgColor="white"
        >
          <Sidebar />
        </Box>
      )}
    </Box>
  );
}
