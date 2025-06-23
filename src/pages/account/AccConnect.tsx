import { useAuthContext } from "@/hooks/useAuthContext";
import { Box, Button, Heading, HStack, Icon } from "@chakra-ui/react";
import { FaArrowLeft, FaFacebook, FaTiktok, FaYoutube } from "react-icons/fa6";
import { useNavigate } from "react-router";

export default function AccConnect() {
  const { user } = useAuthContext();

  const facebookUrl = `https://socially.work/v1/auth/social/facebook/login/?user_id=${user?.user_id}`;
  const tiktokUrl = `https://socially.work/v1/auth/social/tiktok/login/?user_id=${user?.user_id}`;
  const youtubeUrl = `https://socially.work/v1/auth/social/youtube/login/?user_id=${user?.user_id}`;
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
            onClick={() => (window.location.href = facebookUrl)}
          >
            <Icon size="md" color="blue.500">
              <FaFacebook />
            </Icon>
            Facebook
          </Button>
          <Button
            variant="outline"
            flex={1}
            borderColor="border.DEFAULT"
            onClick={() => (window.location.href = tiktokUrl)}
          >
            <Icon size="md" color={{ base: "black", _dark: "white" }}>
              <FaTiktok />
            </Icon>
            Tiktok
          </Button>
          <Button
            variant="outline"
            flex={1}
            borderColor="border.DEFAULT"
            onClick={() => (window.location.href = youtubeUrl)}
          >
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
