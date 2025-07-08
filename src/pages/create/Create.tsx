import { Box, FileUpload, Heading, Text } from "@chakra-ui/react";
import CreatePostForm from "../../features/post/components/CreatePostForm";

export default function Create() {
  return (
    <Box h="full" overflowY="auto" p={4}>
      <Box mb={4}>
        <Heading size="2xl" mb={1}>
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
  );
}
