import { Box } from "@chakra-ui/react";
import RegisterForm from "./RegisterForm";

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
          <RegisterForm />
        </Box>
      </Box>
    </>
  );
};
