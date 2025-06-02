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

export default function Register() {
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
        <Box
          color="white"
          bgColor="blue"
          w="50%"
          h="100vh"
          display={{ base: "none", lg: "block" }}
          overflow="hidden"
        >
          <Box>
            <Image
              src="../src/assets/registerbluebg.jpg"
              alt="AI Assistant Feature"
              maxW="800px"
              h="100vh"
            />
          </Box>
        </Box>
        <Box bg="white" w={{ base: "90%", md: "50%" }}>
          <Box m={{ base: "0", md: "10" }} mt={{ base: "5", md: "0" }}>
            <Text
              fontSize="3xl"
              fontWeight="bold"
              whiteSpace="nowrap"
              color={{ base: "black" }}
            >
              Brandly
            </Text>
          </Box>
          <Box
            m={{ base: "0", md: "20" }}
            minW={{ base: "19rem", md: "20rem" }}
            mt={{ base: "8rem", md: "10rem" }}
          >
            <Text
              fontSize="2xl"
              fontWeight="bold"
              mb={6}
              color={{ base: "black" }}
            >
              Register
            </Text>
            <form onSubmit={handleSubmit}>
              <VStack>
                <Field.Root invalid={!!errors.email}>
                  <Field.Label fontWeight="semibold" color={{ base: "black" }}>
                    Email
                    <Field.RequiredIndicator />
                  </Field.Label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <Field.ErrorText color={{ base: "red.600" }}>
                    {errors.email}
                  </Field.ErrorText>
                </Field.Root>

                <Field.Root invalid={!!errors.password}>
                  <Field.Label fontWeight="semibold" color={{ base: "black" }}>
                    Create Password
                  </Field.Label>
                  <Input
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <Field.ErrorText color={{ base: "red.600" }}>
                    {errors.password}
                  </Field.ErrorText>
                </Field.Root>
                <Button
                  type="submit"
                  colorScheme="purple"
                  w="full"
                  bgColor="blue"
                  fontWeight="semibold"
                  color={{ base: "white" }}
                >
                  Register
                </Button>
                <Flex
                  justify="space-between"
                  w="full"
                  fontWeight="semibold"
                  gap={4}
                  fontSize="sm"
                >
                  <Text fontSize="md" mt="2" color={{ base: "black" }}>
                    Already have an account?
                    <Link
                      href="/login"
                      color="blue.700"
                      _hover={{ color: "gray.600" }}
                    >
                      Log in
                    </Link>
                  </Text>
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
      </Flex>
    </Box>
  );
}
