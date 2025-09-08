import { Box } from "@chakra-ui/react"
import CreatePostForm from "../../features/post/components/CreatePostForm"
import { Helmet } from "react-helmet-async"
import { useState } from "react"
import { useSelectedStore } from "../../features/post/lib/store/selectedAcc"

export default function Create() {
  const [formKey, setFormKey] = useState(0)
  const { clear } = useSelectedStore()

  const resetForm = () => {
    // Clear the selected accounts store before remounting
    clear()
    setFormKey(prev => prev + 1)
  }

  return (
    <>
      <Helmet>
        <title>Create Post </title>
      </Helmet>

      <Box w="full">
        <CreatePostForm key={formKey} onResetForm={resetForm} />
      </Box>
    </>
  )
}
