import { Box, Container } from "@chakra-ui/react"
import { usePrivacyPolicy } from "./api"

export default function Privacypolicy() {
  const { data, isLoading, isError } = usePrivacyPolicy()

  if (isLoading) {
    return <Box p={4}>Loading...</Box>
  }

  if (isError) {
    return <Box p={4}>Error loading privacy policy.</Box>
  }

  return (
    <Container maxW="container.lg" py={8}>
      <Box dangerouslySetInnerHTML={{ __html: data }} />
    </Container>
  )
}
