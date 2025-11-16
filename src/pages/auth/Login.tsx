import { Box, Flex, Image, VStack } from "@chakra-ui/react";
import { useSearchParams, useNavigate } from "react-router-dom";
import LoginForm from "@/features/auth/components/login/LoginForm";
import RegisterForm from "@/features/auth/components/register/RegisterForm";
import logo from "@/assets/app/Header Logo White.png";

function Login() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const modal = searchParams.get("modal");

  // Determine which tab is active
  const isSignup = modal === "signup";

  const handleTabClick = (tab: "signin" | "signup") => {
    if (tab === "signup") {
      navigate("/login?modal=signup");
    } else {
      navigate("/login");
    }
  };

  return (
    <Box minH="100vh" bg="gray.50" display="flex" alignItems="center" justifyContent="center" p={{ base: 2, md: 4 }} py={{ base: 4, md: 6 }}>
      <VStack gap={{ base: 2, md: 6 }} w="full" maxW="lg" px={{ base: 2, md: 0 }}>
        {/* Logo */}
        <Image src={logo} height={{ base: 6, md: 8 }} width="auto" maxW="100%" />

        {/* Manual Tabs */}
        <Box w="full">
          {/* Tab Buttons */}
          <Flex
            bg="transparent"
            borderRadius="lg"
            mb={{ base: 2, md: 6 }}
            gap={0}
            border="1px solid"
            borderColor="gray.300"
            overflow="hidden"
          >
            <Box
              flex={1}
              py={{ base: 2, md: 2.5 }}
              px={{ base: 2, md: 4 }}
              bg={!isSignup ? "white" : "gray.200"}
              color={!isSignup ? "gray.900" : "gray.600"}
              fontWeight="medium"
              cursor="pointer"
              textAlign="center"
              onClick={() => handleTabClick("signin")}
              transition="all 0.2s"
              borderRight="1px solid"
              borderColor="gray.300"
              _hover={{
                bg: !isSignup ? "white" : "gray.300"
              }}
            >
              Sign In
            </Box>
            <Box
              flex={1}
              py={{ base: 2, md: 2.5 }}
              px={{ base: 2, md: 4 }}
              bg={isSignup ? "white" : "gray.200"}
              color={isSignup ? "gray.900" : "gray.600"}
              fontWeight="medium"
              cursor="pointer"
              textAlign="center"
              onClick={() => handleTabClick("signup")}
              transition="all 0.2s"
              _hover={{
                bg: isSignup ? "white" : "gray.300"
              }}
            >
              Create Account
            </Box>
          </Flex>

          {/* Tab Content */}
          <Box>
            {!isSignup ? <LoginForm /> : <RegisterForm />}
          </Box>
        </Box>
      </VStack>
    </Box>
  );
}

export default Login;
