import { Box, Flex, Image } from "@chakra-ui/react";
import RegisterForm from "./RegisterForm";
import logo from "@/assets/app/Header Logo White.png";

export const RegisterFormSection = () => {
  return (
    <>
      <Box
        flex="1"
        p={{ base: 8, lg: 12 }}
        display="flex"
        alignItems="center"
        justifyContent="center"
        overflowY="scroll"
        className="hide-scrollbar"
      >
        <Box w="full" maxW="lg">
          <Flex mb={5} mt={10} ml={{ base: 0, md: 3 }}>
            <Box>
              <Image src={logo} alt="logo" h={8} w="full" />
            </Box>
          </Flex>
          <RegisterForm />
        </Box>
      </Box>
    </>
  );
};
