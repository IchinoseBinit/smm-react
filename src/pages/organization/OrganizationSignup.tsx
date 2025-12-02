import React, { useState, useEffect } from "react"
import {
  Box,
  Button,
  Container,
  HStack,
  Link,
  Text,
  VStack,
  Image,
} from "@chakra-ui/react"
import LightLogo from "@/assets/app/Header Logo White.png"
import { LoginFormSection } from "@/features/auth/components/login/LoginFormSection"
import { RegisterFormSection } from "@/features/auth/components/register/RegisterFormSection"
import { useNavigate, useSearchParams } from "react-router-dom"

const OrganizationSignup: React.FC = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const modal = searchParams.get("modal")

  // Determine initial tab based on URL parameter
  const [activeTab, setActiveTab] = useState<"signin" | "create">(
    modal === "signup" ? "create" : "signin"
  )

  // Update tab when URL parameter changes
  useEffect(() => {
    if (modal === "signup") {
      setActiveTab("create")
    } else {
      setActiveTab("signin")
    }
  }, [modal])

  return (
    <Box
      minH="100vh"
      bg="#ffffff"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={{ base: 3, md: 4 }}
    >
      <Container maxW="2xl" py={{ base: 4, md: 6 }}>
        <VStack gap={{ base: 3, md: 4 }} w="full">
          {/* Logo */}
          <VStack gap={{ base: 2, md: 3 }} textAlign="center">
            <Image
              src={LightLogo}
              height={8}
              width="auto"
              maxW="100%"
              cursor="pointer"
              onClick={() => navigate("/")}
            />
          </VStack>

          {/* Tab Navigation */}
          <HStack
            bg="gray.200"
            p={1}
            borderRadius="lg"
            w="full"
            maxW="sm"
            mx="auto"
          >
            <Button
              flex={1}
              size="md"
              variant={activeTab === "signin" ? "solid" : "ghost"}
              bg={activeTab === "signin" ? "white" : "transparent"}
              color={activeTab === "signin" ? "gray.900" : "gray.600"}
              _hover={{
                bg: activeTab === "signin" ? "white" : "gray.300",
              }}
              onClick={() => {
                setActiveTab("signin")
                navigate("/login")
              }}
              borderRadius="md"
            >
              Sign In
            </Button>
            <Button
              flex={1}
              size="md"
              variant={activeTab === "create" ? "solid" : "ghost"}
              bg={activeTab === "create" ? "white" : "transparent"}
              color={activeTab === "create" ? "gray.900" : "gray.600"}
              _hover={{
                bg: activeTab === "create" ? "white" : "gray.300",
              }}
              onClick={() => {
                setActiveTab("create")
                navigate("/login?modal=signup")
              }}
              borderRadius="md"
            >
              Create Account
            </Button>
          </HStack>

          {/* Show Login Form when Sign In tab is active */}
          {activeTab === "signin" && (
            <Box
              bg="white"
              p={{ base: 3, md: 4, lg: 5 }}
              borderRadius="lg"
              w="full"
              maxW="sm"
              mx="auto"
            >
              <LoginFormSection />
            </Box>
          )}

          {/* Show Register Form when Create Account tab is active */}
          {activeTab === "create" && (
            <Box
              bg="white"
              p={{ base: 3, md: 4, lg: 5 }}
              borderRadius="lg"
              w="full"
              maxW="sm"
              mx="auto"
            >
              <RegisterFormSection />
            </Box>
          )}

          {/* Privacy Policy Link */}
          <Text color="gray.600" fontSize="sm" textAlign="center">
            <Link
              color="blue.500"
              href="#"
              _hover={{ textDecoration: "underline" }}
            >
              Privacy Policy
            </Link>
          </Text>
        </VStack>
      </Container>
    </Box>
  )
}

export default OrganizationSignup
