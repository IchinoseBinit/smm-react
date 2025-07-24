import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { Box, Grid, GridItem } from "@chakra-ui/react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box bg="bg.DEFAULT" h="100dvh" overflow="hidden">
      <Grid
        templateAreas={{
          base: `"navbar" "sidebar" "main"`, // add sidebar row on mobile
          md: `"navbar navbar" "sidebar main"`,
        }}
        templateRows={{
          base: "auto auto 1fr", // navbar, sidebar, then main
          md: "auto 1fr",
        }}
        templateColumns={{
          base: "auto", // let sidebar size itself
          md: "240px 1fr",
        }}
        h="full"
      >
        <GridItem area="navbar">
          <Navbar />
        </GridItem>

        <GridItem
          area="sidebar"
          display="block" // ← always visible
          position={{ base: "absolute", md: "relative" }}
          top={{ base: "56px", md: "auto" }} // adjust for navbar height
          left={0}
          zIndex={10}
        >
          <Sidebar />
        </GridItem>

        <GridItem area="main" p={4} overflowY="auto" ml={{ base: 16, md: 0 }}>
          {children}
        </GridItem>
      </Grid>
    </Box>
  );
}
