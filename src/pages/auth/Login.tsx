import { Box, Flex } from "@chakra-ui/react";
import AuthBanner from "@/features/auth/components/login/LoginAuthBanner";
import { LoginFormSection } from "@/features/auth/components/login/LoginFormSection";

function Login() {
  return (
    <Box minH="100vh" bg="white" className="light">
      <Flex direction={{ base: "column", lg: "row" }} minH="100vh">
        {/* Form Section */}
        <LoginFormSection />
        <AuthBanner />
      </Flex>
    </Box>
  );
}

export default Login;
