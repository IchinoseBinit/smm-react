import { Box, VStack, Icon, Heading, Text, Button } from "@chakra-ui/react";
import { FaYoutube } from "react-icons/fa6";
import { useNavigate, useSearchParams } from "react-router";

export default function YoutubeSuccessPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status");

  const renderContent = () => {
    switch (status) {
      case "success":
        return {
          title: "Youtube Connected",
          description: "Your Tiktok account has been successfully linked.",
          color: "red.600",
        };
      case "false":
      case "error":
        return {
          title: "Youtube Connection Failed",
          description:
            "Youtube linking was cancelled or failed. Please try again.",
          color: "red.500",
        };
      default:
        return {
          title: "Unknown Status",
          description: "We couldn't verify your Youtube connection.",
          color: "gray.600",
        };
    }
  };

  const { title, description, color } = renderContent();

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="bg.DEFAULT"
      px={4}
    >
      <VStack
        spaceY={6}
        textAlign="center"
        bg="bg.SURFACE"
        p={10}
        borderRadius="2xl"
        boxShadow="lg"
        maxW="sm"
        w="full"
      >
        <Icon
          as={FaYoutube}
          boxSize={12}
          color={color}
          transition="transform 0.2s"
          _hover={{ transform: "scale(1.1)" }}
        />

        <Heading size="lg" color="fg.DEFAULT" display="flex" gap={2}>
          {title}
        </Heading>

        <Text fontSize="md" color="fg.MUTED">
          {description}
        </Text>

        <Button
          onClick={() => navigate("/account")}
          variant="solid"
          colorScheme="primary"
          size="lg"
          w="full"
          borderRadius="xl"
          transition="transform 0.2s"
          _hover={{ transform: "scale(1.02)" }}
        >
          Go to Account
        </Button>
      </VStack>
    </Box>
  );
}
