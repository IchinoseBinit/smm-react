import { Box, Button, Heading, Text, VStack, Icon } from "@chakra-ui/react";
import { FaFacebook } from "react-icons/fa";
import { useNavigate } from "react-router";

const FacebookSuccessPage = () => {
  const navigate = useNavigate();

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
          as={FaFacebook}
          boxSize={12}
          color="blue.500"
          transition="transform 0.2s"
          _hover={{ transform: "scale(1.1)" }}
        />

        <Heading size="lg" color="fg.DEFAULT" display="flex" gap={2}>
          Facebook Connected
        </Heading>

        <Text fontSize="md" color="fg.MUTED">
          Your Facebook account has been successfully linked.
        </Text>

        <Button
          onClick={() => navigate("/")}
          variant="solid"
          colorScheme="primary"
          size="lg"
          w="full"
          borderRadius="xl"
          transition="transform 0.2s"
          _hover={{ transform: "scale(1.02)" }}
        >
          Go to Home
        </Button>
      </VStack>
    </Box>
  );
};

export default FacebookSuccessPage;
