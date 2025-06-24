import { getSocialUrl } from "@/features/accounts/lib/AccUrl";
import { useAuthUtils } from "@/hooks/useAuthUtils";
import { Box, Button, Heading, HStack, Icon } from "@chakra-ui/react";
import { FaArrowLeft, FaFacebook, FaTiktok, FaYoutube } from "react-icons/fa6";

export default function AccConnect() {
  const { userId, navigate } = useAuthUtils();

  const facebookUrl = getSocialUrl("facebook", userId);
  const tiktokUrl = getSocialUrl("tiktok", userId);
  const youtubeUrl = getSocialUrl("youtube", userId);

  return (
    <Box spaceY={5} mt={5}>
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
