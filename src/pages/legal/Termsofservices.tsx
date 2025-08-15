import { Box, Container } from "@chakra-ui/react"
import { useTermsOfService } from "./api"

export default function Termsofservices() {
  const { data, isLoading, isError } = useTermsOfService()

  if (isLoading) {
    return <Box p={4}>Loading...</Box>
  }

  if (isError) {
    return <Box p={4}>Error loading terms of service.</Box>
  }

  return (
    <Container maxW="container.lg" py={8}>
      <Box dangerouslySetInnerHTML={{ __html: data }} />
    </Container>
  )
}
