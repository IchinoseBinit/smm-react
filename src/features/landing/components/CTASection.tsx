import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Image,
  Icon,
} from "@chakra-ui/react";
import { FaArrowRight } from "react-icons/fa";

export default function CTASection() {
  return (
    <Box as="section" py={20} bg="blue.500">
      <Box maxW="container.xl" mx="auto" px={4} textAlign="center">
        <Box position="relative">
          <Box position="absolute" top={10} left={10} opacity={0.2}>
            <Image
              src="https://img.freepik.com/free-vector/rocket-launch-concept-illustration_114360-1623.jpg"
              alt="Rocket Launch"
              boxSize="100px"
              objectFit="cover"
            />
          </Box>
          <Box position="absolute" bottom={10} right={10} opacity={0.2}>
            <Image
              src="https://img.freepik.com/free-vector/success-concept-illustration_114360-1454.jpg"
              alt="Success"
              boxSize="100px"
              objectFit="cover"
            />
          </Box>
          <Heading
            as="h2"
            fontSize="4xl"
            fontWeight="bold"
            color="white"
            mb={4}
          >
            Ready to Transform Your
            <br />
            Brand Management?
          </Heading>
          <Text fontSize="xl" color="green.100" mb={8} maxW="2xl" mx="auto">
            Join thousands of businesses already using Socially to streamline
            their brand operations and drive growth.
          </Text>
          <Flex
            direction={{ base: "column", sm: "row" }}
            gap={4}
            justify="center"
          >
            <Button
              onClick={() => (window.location.href = "/register")}
              size="lg"
              bg="white"
              color="blue.500"
              _hover={{ bg: "gray.100" }}
              px={8}
              py={3}
              borderRadius={8}
            >
              <Icon>
                <FaArrowRight size={16} />
              </Icon>
              Start Free Trial
            </Button>
            {/* <Button
              size="lg"
              variant="outline"
              borderColor="white"
              color="white"
              _hover={{ bg: "white", color: "green.500" }}
              px={8}
              py={3}
              rounded="lg"
            >
              Schedule Demo
            </Button> */}
          </Flex>
        </Box>
      </Box>
    </Box>
  )
}
