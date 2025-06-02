import React from "react";
import {
  Box,
  Button,
  VStack,
  Text,
  Flex,
  Link,
  Image,
  Input,
  Field,
} from "@chakra-ui/react";
import { z } from "zod";

const schema = z.object({
  email: z
    .string()
    .nonempty({ message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export default function Login() {
  const [formData, setFormData] = React.useState({ email: "", password: "" });
  const [errors, setErrors] = React.useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = schema.safeParse(formData);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        email: fieldErrors.email?.[0] || "",
        password: fieldErrors.password?.[0] || "",
      });
    } else {
      console.log(result.data);
    }
  };

  return (
    <Box position="relative" h="100vh" w="100%">
      <Flex justify="center" w="100%">
        <Box bg="white" w={{ base: "90%", md: "50%" }}>
          <Box m={{ base: "0", md: "10" }} mt={{ base: "5", md: "0" }}>
            <Text fontSize="3xl" fontWeight="bold" whiteSpace="nowrap">
              Brandly
            </Text>
          </Box>
          <Box
            m={{ base: "0", md: "20" }}
            minW={{ base: "19rem", md: "20rem" }}
            mt={{ base: "8rem", md: "10rem" }}
          >
            <Text fontSize="2xl" fontWeight="bold" mb={6}>
              Log in
            </Text>
            <form onSubmit={handleSubmit}>
              <VStack>
                <Field.Root invalid={!!errors.email}>
                  <Field.Label fontWeight="semibold">
                    Email
                    <Field.RequiredIndicator />
                  </Field.Label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <Field.ErrorText>{errors.email}</Field.ErrorText>
                </Field.Root>

                <Field.Root invalid={!!errors.password}>
                  <Field.Label fontWeight="semibold">Password</Field.Label>
                  <Input
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <Field.ErrorText>{errors.password}</Field.ErrorText>
                </Field.Root>
                <Button
                  type="submit"
                  colorScheme="purple"
                  w="full"
                  bgColor="blue"
                  fontWeight="semibold"
                >
                  Log In
                </Button>
                <Flex
                  justify="space-between"
                  w="full"
                  fontWeight="semibold"
                  gap={4}
                  fontSize="sm"
                >
                  <Link
                    href="/register"
                    color="gray.400"
                    _hover={{ color: "gray.600" }}
                  >
                    Create an account
                  </Link>
                  <Link
                    href="#"
                    color="gray.400"
                    _hover={{ color: "gray.600" }}
                  >
                    Forgot your password?
                  </Link>
                </Flex>
              </VStack>
            </form>
          </Box>
          {/* <Box>
            <Flex mt="8rem" gap={4} fontSize="xs" color="gray.500">
              <Link href="#">Terms of Service</Link>
              <Text>•</Text>
              <Link href="#">Privacy Policy</Link>
              <Text>•</Text>
              <Link href="#">Security</Link>
            </Flex>
          </Box> */}
        </Box>
        <Box
          color="white"
          bgColor="blue"
          border="1px solid black"
          w="100%"
          h="100vh"
          display={{ base: "none", lg: "block" }}
          overflow="hidden"
        >
          <Box>
            <Text
              fontSize="4xl"
              fontWeight="bold"
              whiteSpace="wrap"
              w="70%"
              mt="18rem"
              ml="15rem"
            >
              Brandly AI Assistant Becomes Social Media Smart
            </Text>
            <Image
              src="https://s3.amazonaws.com/static.buffer.com/login/public/img/ai-assistant-feature@2x.png"
              alt="AI Assistant Feature"
              maxW="900px"
              ml="10rem"
              borderRadius={30}
            />
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}
