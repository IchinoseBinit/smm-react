import { useAuth } from "@/hooks/useAuth";
import { Box, Button, Heading, HStack, Icon } from "@chakra-ui/react";
import {
  FaArrowLeft,
  FaFacebook,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { useNavigate } from "react-router";

export default function AccConnect() {
  const { user } = useAuth();

  const socialUrl = `https://socially.work/v1/auth/social/facebook/login/?user_id=${user?.user_id}`;
  const navigate = useNavigate();
  return (
    <Box spaceY={5} mt={10}>
      <Box>
        <Button
          variant="subtle"
          flex={1}
          borderColor="border.DEFAULT"
          size="xs"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft />
          Back
        </Button>
      </Box>
      <Heading>Connect a Social Account</Heading>
      <Box>
        <HStack spaceX={4}>
          <Button
            variant="outline"
            loadingText="Connecting"
            flex={1}
            borderColor="border.DEFAULT"
            onClick={() => (window.location.href = socialUrl)}
          >
            <Icon size="md" color="blue.500">
              <FaFacebook />
            </Icon>
            Facebook
          </Button>
          <Button variant="outline" flex={1} borderColor="border.DEFAULT">
            <Icon size="md" color={{ base: "black", _dark: "white" }}>
              <FaXTwitter />
            </Icon>
            Twitter
          </Button>
          <Button variant="outline" flex={1} borderColor="border.DEFAULT">
            <Icon size="md" color="red.600">
              <FaYoutube />
            </Icon>
            Youtube
          </Button>
        </HStack>
      </Box>
    </Box>
  );
}
