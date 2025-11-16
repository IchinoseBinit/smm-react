import { Box } from "@chakra-ui/react"
import CreatePostForm from "../../features/post/components/CreatePostForm"
import { Helmet } from "react-helmet-async"

export default function Create() {

  return (
    <>
      <Helmet>
        <title>Create Post </title>
      </Helmet>

      <Box w="100%" maxW="100%" minW={0} px={{ base: 0, md: 2 }}>
        <CreatePostForm />
      </Box>
    </>
  )
}
