import {
  Box,
  Flex,
  Grid,
  Text,
  Button,
  Input,
  Table,
} from "@chakra-ui/react";
import { useState, useMemo, useEffect } from "react";
import { useUserList } from "@/features/admin/hooks/useUserlist";
import { CircularLoading } from "@/lib/loadings";

export function UsersManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { data: userListData, isLoading, isError, error } = useUserList(currentPage);

  // Reset to page 1 when search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Filter users based on search query
  const filteredUsers = useMemo(() => {
    if (!userListData?.results) return [];

    if (!searchQuery.trim()) return userListData.results;

    const query = searchQuery.toLowerCase();
    return userListData.results.filter(
      (user) =>
        user.first_name.toLowerCase().includes(query) ||
        user.last_name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
    );
  }, [userListData, searchQuery]);

  if (isLoading) return <CircularLoading />;

  if (isError) {
    return (
      <Box textAlign="center" py={12}>
        <Text color="red.500" mb={2}>
          Failed to load users
        </Text>
        <Text fontSize="sm" color="gray.500">
          {error instanceof Error ? error.message : "Unknown error occurred"}
        </Text>
      </Box>
    );
  }

  return (
    <Box display="flex" flexDirection="column">
      {/* Header Section */}
      <Box
        flexShrink={0}
        bg="white"
        _dark={{ bg: "gray.900" }}
        pb={1}
      >
        <Flex justify="space-between" align="center" mb={2}>
          <Box>
            <Text
              fontSize="lg"
              fontWeight="medium"
              color="gray.900"
              _dark={{ color: "white" }}
              mb={0}
            >
              User Management
            </Text>
            <Text fontSize="xs" color="gray.600" _dark={{ color: "gray.400" }}>
              Manage all users in your organization
            </Text>
          </Box>
          <Button colorScheme="blue" size="sm">
            Add User
          </Button>
        </Flex>

        {/* Search Bar */}
        <Flex p={2} gap={3} bg="white" _dark={{ bg: "gray.800" }} >
          <Input
            placeholder="Search users by name, email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            size="sm"
            maxW="400px"
          />
        </Flex>
      </Box>

      {/* Users Table */}
      <Box
        bg="white"
        _dark={{ bg: "gray.800" }}
        borderRadius="md"
        border="1px solid"
        borderColor="gray.300"
        mt={1}
        mb={1}
      >
        <Table.Root size="sm" variant="outline" css={{ "& td, & th": { padding: "4px 12px", fontSize: "13px" } }}>
          <Table.Header bg="gray.50" _dark={{ bg: "gray.700" }}>
            <Table.Row bg="gray.50" _dark={{ bg: "gray.700" }}>
              <Table.ColumnHeader bg="gray.50" _dark={{ bg: "gray.700" }}>
                <Text fontSize="xs" fontWeight="semibold" color="gray.600" _dark={{ color: "gray.300" }}>
                  Name
                </Text>
              </Table.ColumnHeader>
              <Table.ColumnHeader bg="gray.50" _dark={{ bg: "gray.700" }}>
                <Text fontSize="xs" fontWeight="semibold" color="gray.600" _dark={{ color: "gray.300" }}>
                  Email
                </Text>
              </Table.ColumnHeader>
              <Table.ColumnHeader bg="gray.50" _dark={{ bg: "gray.700" }}>
                <Text fontSize="xs" fontWeight="semibold" color="gray.600" _dark={{ color: "gray.300" }}>
                  Organization
                </Text>
              </Table.ColumnHeader>
              <Table.ColumnHeader bg="gray.50" _dark={{ bg: "gray.700" }}>
                <Text fontSize="xs" fontWeight="semibold" color="gray.600" _dark={{ color: "gray.300" }}>
                  Actions
                </Text>
              </Table.ColumnHeader>
            </Table.Row>
            </Table.Header>

            <Table.Body>
              {filteredUsers.map((user) => (
                <Table.Row key={user.id} _hover={{ bg: "gray.50", _dark: { bg: "gray.700" } }}>
                  <Table.Cell>
                    <Text fontSize="sm" fontWeight="medium" color="gray.900" _dark={{ color: "white" }}>
                      {user.first_name} {user.last_name}
                    </Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text fontSize="sm" color="gray.600" _dark={{ color: "gray.400" }}>
                      {user.email}
                    </Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text fontSize="sm" color="gray.600" _dark={{ color: "gray.400" }}>
                      {user.organization?.name || "-"}
                    </Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Flex gap={2}>
                      <Button size="xs" variant="ghost" colorScheme="blue">
                        Edit
                      </Button>
                      <Button size="xs" variant="ghost" colorScheme="red">
                        Delete
                      </Button>
                    </Flex>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>

          {/* Empty State (shown when no users found) */}
          {filteredUsers.length === 0 && (
            <Flex justify="center" align="center" py={12}>
              <Box textAlign="center">
                <Text
                  fontSize="sm"
                  color="gray.500"
                  _dark={{ color: "gray.400" }}
                  mb={2}
                >
                  No users found
                </Text>
                <Text fontSize="xs" color="gray.400" _dark={{ color: "gray.500" }}>
                  {searchQuery ? "Try adjusting your search criteria" : "No users available"}
                </Text>
              </Box>
            </Flex>
          )}
        </Box>

      {/* Footer Section - Pagination and Stats */}
      <Box
        flexShrink={0}
        bg="white"
        _dark={{ bg: "gray.900" }}
        pt={1}
        pb={0}
      >
        {/* Stats Cards */}
        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={2} mb={1}>
        <Box
          bg="white"
          _dark={{ bg: "gray.800" }}
          p={2}
          borderRadius="md"
          border="1px solid"
          borderColor="gray.300"
        >
          <Text fontSize="xs" color="gray.500" _dark={{ color: "gray.400" }} mb={0}>
            Total Users
          </Text>
          <Text fontSize="xl" fontWeight="bold" color="gray.900" _dark={{ color: "white" }}>
            {userListData?.totalItems ?? 0}
          </Text>
        </Box>

        <Box
          bg="white"
          _dark={{ bg: "gray.800" }}
          p={2}
          borderRadius="md"
          border="1px solid"
          borderColor="gray.300"
        >
          <Text fontSize="xs" color="gray.500" _dark={{ color: "gray.400" }} mb={0}>
            Users Displayed
          </Text>
          <Text fontSize="xl" fontWeight="bold" color="gray.900" _dark={{ color: "white" }}>
            {filteredUsers.length}
          </Text>
        </Box>
      </Grid>

        {/* Pagination Controls */}
        <Flex
          justify="space-between"
          align="center"
          gap={4}
          bg="white"
          _dark={{ bg: "gray.800" }}
          p={2}
          borderRadius="md"
          border="1px solid"
          borderColor="gray.300"
        >
          <Button
            size="sm"
            variant="outline"
            onClick={() => setCurrentPage((prev) => prev - 1)}
            disabled={currentPage === 1}
            _disabled={{ opacity: 0.4, cursor: "not-allowed", bg: "gray.100" }}
            colorScheme="blue"
          >
            Previous
          </Button>

          <Text fontSize="sm" fontWeight="medium" color="gray.700" _dark={{ color: "gray.300" }}>
            Page {currentPage} of {userListData?.totalPages ?? 1}
          </Text>

          <Button
            size="sm"
            variant="outline"
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={userListData?.isLastPage ?? true}
            _disabled={{ opacity: 0.4, cursor: "not-allowed", bg: "gray.100" }}
            colorScheme="blue"
          >
            Next
          </Button>
        </Flex>
      </Box>
    </Box>
  );
}
