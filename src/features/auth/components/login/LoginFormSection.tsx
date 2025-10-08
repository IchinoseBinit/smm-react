import { Box, Flex, Image } from "@chakra-ui/react";
import LoginForm from "./LoginForm";
import logo from "@/assets/app/Header Logo White.png";
import { useLocation } from "react-router-dom";

export const LoginFormSection = () => {
  const location = useLocation();
  const shouldHideLogo = location.pathname === "/auth" || location.pathname === "/login";
  const isOrganizationSignup = location.pathname === "/auth" || location.pathname === "/login";

  return (
    <>
      <Box
        flex="1"
        // p={{ base: 8, lg: 12 }}
        p={6}
        display="flex"
        // backgroundColor={"red"}
        alignItems="center"
        justifyContent="center"
        border={isOrganizationSignup ? "1px solid" : "none"}
        borderColor={isOrganizationSignup ? "gray.200" : "transparent"}
        borderRadius={isOrganizationSignup ? "lg" : "none"}
      >
        <Box w="full" maxW="lg">
          {!shouldHideLogo && (
            <Flex align="center" mb={6} ml={{ base: 0, md: -5 }}>
              <Box>
                <Image
                  src={logo}
                  alt="logo"
                  h={8}
                  w="full"
                  objectFit="contain"
                />
              </Box>
            </Flex>
          )}
          {/* login form */}
          <LoginForm />
        </Box>
      </Box>
    </>
  )
};
