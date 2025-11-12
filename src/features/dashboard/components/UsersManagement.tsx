import {
  Box,
  Flex,
  Grid,
  Text,
  Button,
  Input,
  Table,
  HStack,
  Image,
} from "@chakra-ui/react";
import { useState, useMemo } from "react";
import { useUserList } from "@/features/admin/hooks/useUserlist";
import { CircularLoading } from "@/lib/loadings";

export function UsersManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: userListData, isLoading, isError, error } = useUserList();

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
    <Box>
      <Flex justify="space-between" align="center" mb={6}>
        <Box>
          <Text
            fontSize="lg"
            fontWeight="medium"
            color="gray.900"
            _dark={{ color: "white" }}
            mb={1}
          >
            User Management
          </Text>
          <Text fontSize="sm" color="gray.600" _dark={{ color: "gray.400" }}>
            Manage all users in your organization
          </Text>
        </Box>
        <Button colorScheme="blue" size="sm">
          Add User
        </Button>
      </Flex>

      <Box
        bg="white"
        _dark={{ bg: "gray.800" }}
        borderRadius="lg"
        shadow="sm"
        border="1px"
        borderColor="gray.100"
        overflow="hidden"
      >
        {/* Search and Filter Bar */}
        <Flex p={4} gap={3} borderBottom="1px" borderColor="gray.100">
          <Input
            placeholder="Search users by name, email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            size="sm"
            maxW="400px"
          />
        </Flex>

        {/* Users Table */}
        <Box overflowX="auto">
          <Table.Root size="sm" variant="outline">
            <Table.Header>
              <Table.Row bg="gray.50" _dark={{ bg: "gray.700" }}>
                <Table.ColumnHeader>
                  <Text fontSize="xs" fontWeight="semibold" color="gray.600" _dark={{ color: "gray.300" }}>
                    Name
                  </Text>
                </Table.ColumnHeader>
                <Table.ColumnHeader>
                  <Text fontSize="xs" fontWeight="semibold" color="gray.600" _dark={{ color: "gray.300" }}>
                    Email
                  </Text>
                </Table.ColumnHeader>
                <Table.ColumnHeader>
                  <Text fontSize="xs" fontWeight="semibold" color="gray.600" _dark={{ color: "gray.300" }}>
                    Organization
                  </Text>
                </Table.ColumnHeader>
                <Table.ColumnHeader>
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
                    <HStack gap={3}>
                      <Box
                        w={8}
                        h={8}
                        borderRadius="full"
                        overflow="hidden"
                        bg="gray.200"
                        _dark={{ bg: "gray.600" }}
                        flexShrink={0}
                      >
                        <Image
                          src={user.profile_url}
                          alt={`${user.first_name} ${user.last_name}`}
                          w="100%"
                          h="100%"
                          objectFit="cover"
                        />
                      </Box>
                      <Text fontSize="sm" fontWeight="medium" color="gray.900" _dark={{ color: "white" }}>
                        {user.first_name} {user.last_name}
                      </Text>
                    </HStack>
                  </Table.Cell>
                  <Table.Cell>
                    <Text fontSize="sm" color="gray.600" _dark={{ color: "gray.400" }}>
                      {user.email}
                    </Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text fontSize="sm" color="gray.600" _dark={{ color: "gray.400" }}>
                      {user.organization || "-"}
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
        </Box>

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

      {/* Stats Cards */}
      <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4} mt={6}>
        <Box
          bg="white"
          _dark={{ bg: "gray.800" }}
          p={4}
          borderRadius="lg"
          shadow="sm"
          border="1px"
          borderColor="gray.100"
        >
          <Text fontSize="xs" color="gray.500" _dark={{ color: "gray.400" }} mb={1}>
            Total Users
          </Text>
          <Text fontSize="2xl" fontWeight="bold" color="gray.900" _dark={{ color: "white" }}>
            {userListData?.count ?? 0}
          </Text>
        </Box>

        <Box
          bg="white"
          _dark={{ bg: "gray.800" }}
          p={4}
          borderRadius="lg"
          shadow="sm"
          border="1px"
          borderColor="gray.100"
        >
          <Text fontSize="xs" color="gray.500" _dark={{ color: "gray.400" }} mb={1}>
            Users Displayed
          </Text>
          <Text fontSize="2xl" fontWeight="bold" color="gray.900" _dark={{ color: "white" }}>
            {filteredUsers.length}
          </Text>
        </Box>
      </Grid>
    </Box>
  );
}
