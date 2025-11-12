import { Box, Grid, Text } from "@chakra-ui/react";
import { Helmet } from "react-helmet-async";

export default function AdminDashboard() {
  return (
    <>
      <Helmet>
        <title>Admin Dashboard</title>
      </Helmet>

      <Box h="full" overflowY="auto" p={4}>
        <Text
          fontSize="2xl"
          fontWeight="bold"
          color="gray.900"
          _dark={{ color: "white" }}
          mb={6}
        >
          Admin Dashboard
        </Text>

        <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6} mb={8}>
          <Box
            bg="white"
            _dark={{ bg: "gray.800" }}
            p={6}
            borderRadius="lg"
            shadow="sm"
            border="1px"
            borderColor="gray.100"
          >
            <Text fontSize="xs" color="gray.500" _dark={{ color: "gray.400" }} mb={2}>
              Total Users
            </Text>
            <Text fontSize="3xl" fontWeight="bold" color="gray.900" _dark={{ color: "white" }}>
              -
            </Text>
          </Box>

          <Box
            bg="white"
            _dark={{ bg: "gray.800" }}
            p={6}
            borderRadius="lg"
            shadow="sm"
            border="1px"
            borderColor="gray.100"
          >
            <Text fontSize="xs" color="gray.500" _dark={{ color: "gray.400" }} mb={2}>
              Total Posts
            </Text>
            <Text fontSize="3xl" fontWeight="bold" color="gray.900" _dark={{ color: "white" }}>
              -
            </Text>
          </Box>

          <Box
            bg="white"
            _dark={{ bg: "gray.800" }}
            p={6}
            borderRadius="lg"
            shadow="sm"
            border="1px"
            borderColor="gray.100"
          >
            <Text fontSize="xs" color="gray.500" _dark={{ color: "gray.400" }} mb={2}>
              Active Accounts
            </Text>
            <Text fontSize="3xl" fontWeight="bold" color="gray.900" _dark={{ color: "white" }}>
              -
            </Text>
          </Box>
        </Grid>

        <Box
          bg="white"
          _dark={{ bg: "gray.800" }}
          p={6}
          borderRadius="lg"
          shadow="sm"
          border="1px"
          borderColor="gray.100"
        >
          <Text
            fontSize="lg"
            fontWeight="semibold"
            mb={4}
            color="gray.900"
            _dark={{ color: "white" }}
          >
            Admin Overview
          </Text>
          <Text fontSize="sm" color="gray.600" _dark={{ color: "gray.400" }}>
            Welcome to the admin panel. Use the navigation menu to manage users, view reports, and configure settings.
          </Text>
        </Box>
      </Box>
    </>
  );
}
