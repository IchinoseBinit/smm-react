import { Box, Flex, Skeleton, HStack, VStack, Spinner } from "@chakra-ui/react";

export const InitialAppLoading = () => {
  return (
    <Box>
      {/* Navbar Skeleton */}
      <Flex
        as="nav"
        px={{ base: 2, md: 4 }}
        h={16}
        align="center"
        justify="space-between"
        boxShadow="shadow.sm"
        position="sticky"
        top="0"
        zIndex="1000"
        bg={{ base: "white", _dark: "gray.600" }}
        p={3}
      >
        <Skeleton height="20px" width="100px" />
        <HStack spaceX={4}>
          <Skeleton height="20px" width="20px" />
          <Skeleton height="20px" width="20px" />
          <Skeleton />
        </HStack>
      </Flex>

      <Flex>
        {/* Sidebar Skeleton */}
        <VStack
          as="aside"
          w={{ base: 0, md: 60 }}
          display={{ base: "none", md: "flex" }}
          mt={5}
          spaceY={4}
          p={3}
        >
          {[...Array(7)].map((_, i) => (
            <Skeleton key={i} height="40px" width="100%" borderRadius="lg" />
          ))}
        </VStack>

        {/* Main Content Skeleton */}
        <Box flex="1" p={4}>
          <Skeleton height="80vh" borderRadius="md" />
        </Box>
      </Flex>
    </Box>
  );
};

export const CircularLoading = () => {
  return (
    <Flex
      justify="center"
      align="center"
      minH="200px"
      minW="200px"
      borderRadius="50%"
    >
      <Spinner size="xl" color="secondary.500" />
    </Flex>
  );
};
