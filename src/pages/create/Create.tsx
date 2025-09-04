import {
  Box,
  // FileUpload,
  Heading,
  Text,
} from "@chakra-ui/react"
import CreatePostForm from "../../features/post/components/CreatePostForm"
import { Helmet } from "react-helmet-async"
import { useEditPostStore } from "@/features/calendar/lib/store/editPost.store"

export default function Create() {
  const { isCreatePostEdit } = useEditPostStore()

  return (
    <>
      <Helmet>
        <title>Create Post </title>
      </Helmet>

      <Box minH="100dvh" overflowY="hidden" p={4}>
        <Box mb={4}>
          <Heading size="2xl" mb={1} color={"#00325c"}>
            {isCreatePostEdit ? "Edit Post" : " Post Content"}
          </Heading>
          <Text fontSize="sm" color="fg.MUTED">
            Craft your content and engage your audience
          </Text>
        </Box>
        <CreatePostForm />
      </Box>
    </>
  )
}
