import { ResetPswBanner } from "@/features/auth/components/resetpsw/ResetPswBanner";
import ResetPswForm from "@/features/auth/components/resetpsw/ResetPswForm";
import { Box, Flex } from "@chakra-ui/react";

export default function ResetPsw() {
  return (
    <Box minH="100vh" bg="white" className="light">
      <Flex direction={{ base: "column", lg: "row" }} minH="100vh">
        {/* Form Section */}
        <ResetPswForm />
        <ResetPswBanner />
      </Flex>
    </Box>
  );
}
