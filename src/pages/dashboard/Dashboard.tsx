import { MainContent } from "@/features/dashboard/components/MainContent";
import { Box } from "@chakra-ui/react"
import { Helmet } from "react-helmet-async";

export default function Dashboard() {
  return (
    <>
      <Helmet>
        <title>Dashboard </title>
      </Helmet>

      <Box h="full" overflowY="auto" p={4} pb={{ base: "100px", md: 4 }}>
        {/* <Box mb={4}> */}
        {/* <Heading size="3xl" mb={1}>
            Dashboard
          </Heading>
          <Text fontSize="sm" color="fg.MUTED">
            Overview of your social media performance
          </Text> */}
        {/* </Box> */}
        <MainContent />
      </Box>
    </>
  )
}
