import { MainContent } from "@/pages/dashboard/_components/MainContent";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { Box, Grid, GridItem } from "@chakra-ui/react";

export default function Dashboard() {
  return (
    <Box bg="bg.DEFAULT" h="100dvh" overflow="hidden">
      <Grid
        templateAreas={{
          base: `"navbar" "main"`,
          md: `"navbar navbar" "sidebar main"`,
        }}
        templateRows="auto 1fr"
        templateColumns={{ base: "1fr", md: "240px 1fr" }}
        h="full"
      >
        <GridItem area="navbar">
          <Navbar />
        </GridItem>
        <GridItem area="sidebar" display={{ base: "none", md: "block" }}>
          <Sidebar />
        </GridItem>
        <GridItem area="main" p={4} overflowY="auto">
          {/* Main content */}
          <MainContent />
        </GridItem>
      </Grid>
    </Box>
  );
}
