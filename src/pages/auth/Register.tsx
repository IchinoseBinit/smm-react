import { Box, Flex } from "@chakra-ui/react";
import "./Auth.css";
import { RegisterFormSection } from "@/features/auth/components/register/RegisterFormSection";
// import { RegisterAuthBanner } from "@/features/auth/components/register/RegisterAuthBanner";

function Register() {
  return (
    <Box minH="100vh" bg="white" className="light">
      <Flex direction={{ base: "column", lg: "row" }} minH="100vh">
        {/* Form Section */}
        <Box
          flex="1"
          p={{ base: 0, lg: 1 }}
          display="flex"
          gap={10}
          h="100vh"
          overflow="hidden"
          alignItems={{ base: "center", lg: "unset" }}
          justifyContent={{ base: "center", lg: "unset" }}
        >
          <RegisterFormSection />
          {/* Image Section - Only shown on larger screens */}
          {/* <RegisterAuthBanner /> */}
        </Box>
      </Flex>
    </Box>
  );
}

export default Register;
