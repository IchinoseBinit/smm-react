import { Box, FileUpload, Heading, Text } from "@chakra-ui/react";
import CreatePostForm from "../../features/post/components/CreatePostForm";
import { Helmet } from "react-helmet-async";

export default function Create() {
  return (
    <>
      <Helmet>
        <title>Create a Post </title>
      </Helmet>

      <Box minH="100dvh" overflowY="hidden" p={4}>
        <Box mb={4}>
          <Heading size="2xl" mb={1} color={"#00325c"}>
            Create Post
          </Heading>
          <Text fontSize="sm" color="fg.MUTED">
            Craft your content and engage your audience
          </Text>
        </Box>
        <FileUpload.Root>
          <CreatePostForm />
        </FileUpload.Root>
      </Box>
    </>
  )
}
