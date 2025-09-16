import { Box } from "@chakra-ui/react"
import CreatePostForm from "../../features/post/components/CreatePostForm"
import { Helmet } from "react-helmet-async"

export default function Create() {

  return (
    <>
      <Helmet>
        <title>Create Post </title>
      </Helmet>

      <Box w="full">
        <CreatePostForm />
      </Box>
    </>
  )
}
