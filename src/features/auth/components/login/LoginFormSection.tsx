import { Box, Flex, Image } from "@chakra-ui/react";
import LoginForm from "./LoginForm";
import logo from "@/assets/app/Header Logo White.png";
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
          <Flex align="center" mb={6} ml={{ base: 0, md: -5 }}>
            <Box>
              <Image src={logo} alt="logo" h={8} w="full" objectFit="contain" />
            </Box>
          </Flex>
          {/* login form */}
          <LoginForm />
        </Box>
      </Box>
    </>
  );
};
