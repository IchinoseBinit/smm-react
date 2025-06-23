import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { LuZap } from "react-icons/lu";
import LoginForm from "./LoginForm";

export const LoginFormSection = () => {
  return (
    <>
      <Box
        flex="1"
        p={{ base: 8, lg: 12 }}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Box w="full" maxW="md">
          <Flex align="center" mb={8}>
            <Icon
              as={LuZap}
              _dark={{ color: "secondary.500" }}
              color="secondary.500"
              boxSize={8}
              mr={2}
            />
            <Text fontSize="2xl" fontWeight="bold" color="gray.900">
              Socially
            </Text>
          </Flex>
          {/* login form */}
          <LoginForm />
        </Box>
      </Box>
    </>
  );
};
