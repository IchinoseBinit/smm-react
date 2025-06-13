import {
  Box,
  Flex,
  Text,
  Image,
  useBreakpointValue,
  Icon,
} from "@chakra-ui/react";
import { LuZap } from "react-icons/lu";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import RegisterForm from "./_components/RegisterForm";

function Register() {
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
          p={{ base: 0, lg: 1 }}
          display="flex"
          gap={10}
          h="100vh"
          overflow="hidden"
          alignItems={{ base: "center", lg: "unset" }}
          justifyContent={{ base: "center", lg: "unset" }}
        >
          {/* Image Section - Only shown on larger screens */}
          {!isMobile && (
            <Box flex="1" bg="gray.800" position="relative" overflow="hidden">
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
                alignItems="center"
                justifyContent="center"
              >
                <Text
                  fontSize={{ base: "3xl", md: "4xl" }}
                  fontWeight="bold"
                  mb={6}
                  lineHeight="tight"
                >
                  Join the Future of Smart Social Media Management
                </Text>
                <Text fontSize="lg" color="blue.100" mb={8}>
                  Create your account and start optimizing content, tracking
                  performance, and growing your brand — all in one place.
                </Text>
              </Box>

              <Image
                src="https://img.freepik.com/free-vector/gradient-network-connection-background_23-2148865392.jpg"
                alt="Hands holding smartphone with social media icons"
                position="absolute"
                inset={0}
                objectFit="cover"
                w="full"
                h="full"
                opacity={0.4}
              />
            </Box>
          )}
          <Box w="full" maxW="md" overflow="scroll" mt={2}>
            <Flex align="center" mb={1}>
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
            <RegisterForm />
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}

export default Register;
