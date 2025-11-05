import React, { useState, useEffect } from "react"
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  Text,
  VStack,
  Icon,
  Field,
  Image,
} from "@chakra-ui/react"
import { FiUser, FiLock, FiPhone } from "react-icons/fi"
import { useSearchParams } from "react-router"
import LightLogo from "@/assets/app/Header Logo White.png"
import { useAcceptInvite } from "@/features/Organization/hooks/useOrganization"

interface FormData {
  first_name: string
  last_name: string
  mobile: string
  password: string
}

interface FormErrors {
  first_name?: string
  last_name?: string
  mobile?: string
  password?: string
  token?: string
}

const AcceptInvite: React.FC = () => {
  const [searchParams] = useSearchParams()
  const token = searchParams.get("token")

  const { mutate: acceptInvite, isPending: isAccepting } = useAcceptInvite()

  const [formData, setFormData] = useState<FormData>({
    first_name: "",
    last_name: "",
    mobile: "",
    password: "",
  })

  const [errors, setErrors] = useState<FormErrors>({})

  useEffect(() => {
    if (!token) {
      setErrors({ token: "Invalid or missing invitation token" })
    }
  }, [token])

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    let isValid = true

    if (!formData.first_name.trim()) {
      newErrors.first_name = "First name is required"
      isValid = false
    }

    if (!formData.last_name.trim()) {
      newErrors.last_name = "Last name is required"
      isValid = false
    }

    // Mobile is optional, but if provided, validate format
    if (formData.mobile && !/^\d{10}$/.test(formData.mobile.replace(/\s/g, ""))) {
      newErrors.mobile = "Please enter a valid 10-digit mobile number"
      isValid = false
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
      isValid = false
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
      isValid = false
    }

    if (!token) {
      newErrors.token = "Invalid or missing invitation token"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = () => {
    if (validateForm() && token) {
      acceptInvite({
        token,
        first_name: formData.first_name,
        last_name: formData.last_name,
        mobile: formData.mobile,
        password: formData.password,
      })
    }
  }

  return (
    <Box
      minH="100vh"
      bg="gray.50"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={4}
    >
      <Container maxW="2xl" py={8}>
        <VStack gap={8} w="full">
          {/* Logo */}
          <VStack gap={4} textAlign="center">
            <Image src={LightLogo} height={10} width="auto" maxW="100%" />
          </VStack>

          {/* Form Container */}
          <Box
            bg="white"
            p={8}
            borderRadius="xl"
            w="full"
            maxW="2xl"
            mx="auto"
            boxShadow="lg"
            border="1px solid"
            borderColor="gray.100"
          >
            <VStack gap={8}>
              <VStack gap={2} textAlign="center">
                <Heading size="2xl" color="gray.900" fontWeight="bold">
                  Accept Invitation
                </Heading>
                <Text color="gray.600" fontSize="lg" maxW="md">
                  Complete your profile to join the organization
                </Text>
              </VStack>

              {/* Token Error */}
              {errors.token && (
                <Box
                  p={4}
                  bg="red.50"
                  borderRadius="lg"
                  border="1px solid"
                  borderColor="red.200"
                  w="full"
                >
                  <Text color="red.600" fontSize="md" fontWeight="medium">
                    {errors.token}
                  </Text>
                </Box>
              )}

              {/* Form Fields */}
              <VStack gap={6} w="full">
                {/* First Name */}
                <Field.Root w="full">
                  <Field.Label
                    color="gray.800"
                    fontWeight="bold"
                    fontSize="md"
                    mb={3}
                  >
                    First Name *
                  </Field.Label>
                  <Box position="relative" w="full">
                    <Input
                      type="text"
                      placeholder="Enter your first name"
                      value={formData.first_name}
                      onChange={(e) =>
                        handleInputChange("first_name", e.target.value)
                      }
                      pl={12}
                      pr={4}
                      py={4}
                      h={14}
                      w="full"
                      border="2px solid"
                      borderColor={errors.first_name ? "red.300" : "gray.200"}
                      borderRadius="xl"
                      bg="gray.50"
                      fontSize="lg"
                      fontWeight="medium"
                      _focus={{
                        borderColor: "blue.400",
                        boxShadow: "0 0 0 4px rgba(66, 153, 225, 0.1)",
                        outline: "none",
                        bg: "white",
                      }}
                      _hover={{
                        borderColor: "gray.300",
                        bg: "white",
                      }}
                      _placeholder={{
                        color: "gray.400",
                        fontWeight: "normal",
                      }}
                    />
                    <Icon
                      as={FiUser}
                      color="gray.500"
                      position="absolute"
                      left={4}
                      top="50%"
                      transform="translateY(-50%)"
                      boxSize={5}
                    />
                  </Box>
                  {errors.first_name && (
                    <Text
                      color="red.500"
                      fontSize="sm"
                      mt={2}
                      fontWeight="medium"
                    >
                      {errors.first_name}
                    </Text>
                  )}
                </Field.Root>

                {/* Last Name */}
                <Field.Root w="full">
                  <Field.Label
                    color="gray.800"
                    fontWeight="bold"
                    fontSize="md"
                    mb={3}
                  >
                    Last Name *
                  </Field.Label>
                  <Box position="relative" w="full">
                    <Input
                      type="text"
                      placeholder="Enter your last name"
                      value={formData.last_name}
                      onChange={(e) =>
                        handleInputChange("last_name", e.target.value)
                      }
                      pl={12}
                      pr={4}
                      py={4}
                      h={14}
                      w="full"
                      border="2px solid"
                      borderColor={errors.last_name ? "red.300" : "gray.200"}
                      borderRadius="xl"
                      bg="gray.50"
                      fontSize="lg"
                      fontWeight="medium"
                      _focus={{
                        borderColor: "blue.400",
                        boxShadow: "0 0 0 4px rgba(66, 153, 225, 0.1)",
                        outline: "none",
                        bg: "white",
                      }}
                      _hover={{
                        borderColor: "gray.300",
                        bg: "white",
                      }}
                      _placeholder={{
                        color: "gray.400",
                        fontWeight: "normal",
                      }}
                    />
                    <Icon
                      as={FiUser}
                      color="gray.500"
                      position="absolute"
                      left={4}
                      top="50%"
                      transform="translateY(-50%)"
                      boxSize={5}
                    />
                  </Box>
                  {errors.last_name && (
                    <Text
                      color="red.500"
                      fontSize="sm"
                      mt={2}
                      fontWeight="medium"
                    >
                      {errors.last_name}
                    </Text>
                  )}
                </Field.Root>

                {/* Mobile (Optional) */}
                <Field.Root w="full">
                  <Field.Label
                    color="gray.800"
                    fontWeight="bold"
                    fontSize="md"
                    mb={3}
                  >
                    Mobile Number <Text as="span" color="gray.500" fontWeight="normal">(Optional)</Text>
                  </Field.Label>
                  <Box position="relative" w="full">
                    <Input
                      type="tel"
                      placeholder="Enter your mobile number"
                      value={formData.mobile}
                      onChange={(e) =>
                        handleInputChange("mobile", e.target.value)
                      }
                      pl={12}
                      pr={4}
                      py={4}
                      h={14}
                      w="full"
                      border="2px solid"
                      borderColor={errors.mobile ? "red.300" : "gray.200"}
                      borderRadius="xl"
                      bg="gray.50"
                      fontSize="lg"
                      fontWeight="medium"
                      _focus={{
                        borderColor: "blue.400",
                        boxShadow: "0 0 0 4px rgba(66, 153, 225, 0.1)",
                        outline: "none",
                        bg: "white",
                      }}
                      _hover={{
                        borderColor: "gray.300",
                        bg: "white",
                      }}
                      _placeholder={{
                        color: "gray.400",
                        fontWeight: "normal",
                      }}
                    />
                    <Icon
                      as={FiPhone}
                      color="gray.500"
                      position="absolute"
                      left={4}
                      top="50%"
                      transform="translateY(-50%)"
                      boxSize={5}
                    />
                  </Box>
                  {errors.mobile && (
                    <Text
                      color="red.500"
                      fontSize="sm"
                      mt={2}
                      fontWeight="medium"
                    >
                      {errors.mobile}
                    </Text>
                  )}
                </Field.Root>

                {/* Password */}
                <Field.Root w="full">
                  <Field.Label
                    color="gray.800"
                    fontWeight="bold"
                    fontSize="md"
                    mb={3}
                  >
                    Password *
                  </Field.Label>
                  <Box position="relative" w="full">
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) =>
                        handleInputChange("password", e.target.value)
                      }
                      pl={12}
                      pr={4}
                      py={4}
                      h={14}
                      w="full"
                      border="2px solid"
                      borderColor={errors.password ? "red.300" : "gray.200"}
                      borderRadius="xl"
                      bg="gray.50"
                      fontSize="lg"
                      fontWeight="medium"
                      _focus={{
                        borderColor: "blue.400",
                        boxShadow: "0 0 0 4px rgba(66, 153, 225, 0.1)",
                        outline: "none",
                        bg: "white",
                      }}
                      _hover={{
                        borderColor: "gray.300",
                        bg: "white",
                      }}
                      _placeholder={{
                        color: "gray.400",
                        fontWeight: "normal",
                      }}
                    />
                    <Icon
                      as={FiLock}
                      color="gray.500"
                      position="absolute"
                      left={4}
                      top="50%"
                      transform="translateY(-50%)"
                      boxSize={5}
                    />
                  </Box>
                  {errors.password && (
                    <Text
                      color="red.500"
                      fontSize="sm"
                      mt={2}
                      fontWeight="medium"
                    >
                      {errors.password}
                    </Text>
                  )}
                  <Text
                    color="gray.500"
                    fontSize="sm"
                    mt={2}
                  >
                    Password must be at least 6 characters
                  </Text>
                </Field.Root>
              </VStack>

              {/* Submit Button */}
              <Button
                w="full"
                bg="blue.500"
                color="white"
                size="lg"
                _active={{ bg: "blue.700" }}
                onClick={handleSubmit}
                py={8}
                borderRadius="xl"
                fontSize="lg"
                fontWeight="bold"
                boxShadow="lg"
                _hover={{
                  bg: "blue.600",
                  transform: "translateY(-1px)",
                  boxShadow: "xl",
                }}
                transition="all 0.2s"
                loading={isAccepting}
                disabled={isAccepting || !!errors.token}
              >
                {isAccepting ? "Accepting Invitation..." : "Accept Invitation"}
              </Button>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  )
}

export default AcceptInvite
