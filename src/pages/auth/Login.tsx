import {
  Box,
  Flex,
  Text,
  Image,
  useBreakpointValue,
  Icon,
} from "@chakra-ui/react";
import LoginForm from "./_components/LoginForm";
import { LuZap } from "react-icons/lu";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router";
import { useEffect } from "react";

function Login() {
  const isMobile = useBreakpointValue({ base: true, lg: false });
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <Box minH="100vh" bg="white" className="light">
      <Flex direction={{ base: "column", lg: "row" }} minH="100vh">
        {/* Form Section */}
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
            <LoginForm />
          </Box>
        </Box>

        {/* Image Section - Only shown on larger screens */}
        {!isMobile && (
          <Box flex="1" bg="blue.600" position="relative" overflow="hidden">
            <Box
              position="absolute"
              inset={0}
              bgGradient="linear(to-br, blue.600, blue.800)"
              opacity={0.9}
              zIndex={1}
            />

            <Box
              position="relative"
              zIndex={2}
              p={12}
              color="white"
              maxW="xl"
              mx="auto"
              h="full"
              display="flex"
              flexDirection="column"
              justifyContent="center"
            >
              <Text
                fontSize={{ base: "3xl", md: "4xl" }}
                fontWeight="bold"
                mb={6}
                lineHeight="tight"
              >
                Empower your brand with AI-driven social media insights
              </Text>
              <Text fontSize="lg" color="blue.100" mb={8}>
                Unlock the potential of your social presence with intelligent
                analytics and content strategies.
              </Text>
            </Box>

            <Image
              src="https://img.freepik.com/free-vector/gradient-network-connection-background_23-2148865392.jpg"
              alt="Digital marketing illustration"
              position="absolute"
              inset={0}
              objectFit="cover"
              w="full"
              h="full"
              opacity={0.4}
            />
          </Box>
        )}
      </Flex>
    </Box>
  );
}

export default Login;
