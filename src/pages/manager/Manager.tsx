import { Box, Text } from "@chakra-ui/react";
import SocialMediaPosts from "@/features/manager/components/SocialMediaPosts";
import { Helmet } from "react-helmet-async";

export default function Manager() {
  return (
    <>
      <Helmet>
        <title>Posts</title>
      </Helmet>
      <Box p={{ base: 4, md: 8 }} bg="bg.DEFAULT" minH="100vh">
        <Text
          fontSize={{ base: "2xl", md: "3xl" }}
          fontWeight="bold"
          mb={6}
          color="fg.DEFAULT"
        >
          Social Media Posts
        </Text>
        <SocialMediaPosts />
      </Box>
    </>
  );
}
