import { Box, Button, Heading, Image, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router";

export default function Account() {
  const navigate = useNavigate();
  return (
    <Box>
      <Heading>Account</Heading>

      <Box
        boxSize={40}
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        w="full"
        mt={20}
      >
        <Image
          src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTMIqiMHpK1y1uDtxqyxQwLbb_fAhM9XQ99rh6SNzYP54Jcr2Uu"
          alt="placeholder"
          height="auto"
          width="18rem"
          borderRadius="30px"
        />
        <Box textAlign="center" mt={5}>
          <Heading>No connected accounts</Heading>
          <Text fontSize="sm" color="primary.500">
            Connect your account to manage your content
          </Text>
          <Button
            variant="subtle"
            flex={1}
            borderColor="border.DEFAULT"
            borderRadius="xl"
            mt={5}
            onClick={() => navigate("/account/connect")}
          >
            Connect account
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
