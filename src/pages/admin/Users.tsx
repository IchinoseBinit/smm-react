import { Box } from "@chakra-ui/react";
import { Helmet } from "react-helmet-async";
import { UsersManagement } from "@/features/dashboard/components/UsersManagement";

export default function AdminUsers() {
  return (
    <>
      <Helmet>
        <title>User Management - Admin</title>
      </Helmet>

      <Box h="full" overflowY="auto" p={4} pb={{ base: "100px", md: 4 }}>
        <UsersManagement />
      </Box>
    </>
  );
}
