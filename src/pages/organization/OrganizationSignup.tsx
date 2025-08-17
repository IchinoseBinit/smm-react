import React, { useState } from "react"
import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Input,
  Link,
  Text,
  VStack,
  Icon,
  Flex,
  IconButton,
  Field,
  Checkbox,
  NativeSelectRoot,
  NativeSelectField,
  Group,
} from "@chakra-ui/react"
import { FiUser, FiFileText, FiUpload } from "react-icons/fi"

interface FormData {
  firstName: string
  lastName: string
  email: string
  mobileNumber: string
  password: string
  organizationName: string
  billingEmail: string
  countryCode: string
  brandingLogoUrl: string
  requireApproval: boolean
  enableManagedPosts: boolean
}

const OrganizationSignup: React.FC = () => {
  const [step, setStep] = useState<1 | 2>(1)
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    password: "",
    organizationName: "",
    billingEmail: "",
    countryCode: "+977 (Nepal)",
    brandingLogoUrl: "",
    requireApproval: true,
    enableManagedPosts: true,
  })

  const bgColor = "gray.50"
  const cardBgColor = "white"
  const textColor = "gray.600"
  const borderColor = "gray.200"

  const handleInputChange = (
    field: keyof FormData,
    value: string | boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleNext = () => {
    if (step === 1) {
      setStep(2)
    }
  }

  const handleBack = () => {
    if (step === 2) {
      setStep(1)
    }
  }

  const handleSubmit = () => {
    console.log("Form submitted:", formData)
    // Handle form submission here
  }

  const StepIndicator = ({ currentStep }: { currentStep: number }) => (
    <HStack gap={4} mb={8} justify="center">
      <Flex align="center">
        <Box
          w={10}
          h={10}
          borderRadius="full"
          bg={currentStep >= 1 ? "blue.500" : "gray.300"}
          color="white"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Icon as={FiFileText} />
        </Box>
      </Flex>
      <Box w={12} h={0.5} bg={currentStep >= 2 ? "blue.500" : "gray.300"} />
      <Flex align="center">
        <Box
          w={10}
          h={10}
          borderRadius="full"
          bg={currentStep >= 2 ? "blue.500" : "gray.300"}
          color="white"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Icon as={FiUser} />
        </Box>
      </Flex>
    </HStack>
  )

  return (
    <Box minH="100vh" bg={bgColor}>
      <Container maxW="full" py={8}>
        <VStack gap={8} maxW="2xl" mx="auto">
          <VStack gap={2} textAlign="center" w="full">
            <Heading
              size="4xl"
              fontWeight="bolder"
              color="blue.500"
              whiteSpace="nowrap"
              lineHeight="1.2"
            >
              Create Your Organization
            </Heading>
            <Text color={textColor} fontSize="md">
              Join thousands of organizations already using our platform
            </Text>
          </VStack>

          <Box
            bg={cardBgColor}
            p={8}
            borderRadius="lg"
            boxShadow="sm"
            border="1px"
            borderColor={borderColor}
            w="full"
            maxW="lg"
            mx="auto"
          >
            {step === 1 ? (
              <VStack gap={6}>
                <Heading size="md" textAlign="center" mb={4}>
                  Organization Details
                </Heading>
                <StepIndicator currentStep={step} />

                <Field.Root>
                  <Field.Label>Organization Name</Field.Label>
                  <Input
                    placeholder="Enter your organization name"
                    value={formData.organizationName}
                    onChange={(e) =>
                      handleInputChange("organizationName", e.target.value)
                    }
                  />
                </Field.Root>

                <Field.Root>
                  <Field.Label>Billing Email</Field.Label>
                  <Input
                    type="email"
                    placeholder="billing@company.com"
                    value={formData.billingEmail}
                    onChange={(e) =>
                      handleInputChange("billingEmail", e.target.value)
                    }
                  />
                </Field.Root>

                <Field.Root>
                  <Field.Label>Country Code</Field.Label>
                  <NativeSelectRoot>
                    <NativeSelectField
                      value={formData.countryCode}
                      onChange={(e) =>
                        handleInputChange("countryCode", e.target.value)
                      }
                    >
                      <option value="+977 (Nepal)">+977 (Nepal)</option>
                      <option value="+1 (USA)">+1 (USA)</option>
                      <option value="+91 (India)">+91 (India)</option>
                      <option value="+44 (UK)">+44 (UK)</option>
                    </NativeSelectField>
                  </NativeSelectRoot>
                </Field.Root>

                <Field.Root>
                  <Field.Label>Branding Logo URL</Field.Label>
                  <Group w="full">
                    <Input
                      placeholder="https://example.com/logo.png"
                      value={formData.brandingLogoUrl}
                      onChange={(e) =>
                        handleInputChange("brandingLogoUrl", e.target.value)
                      }
                      flex={1}
                    />
                    <IconButton
                      aria-label="Upload logo"
                      size="sm"
                      variant="outline"
                    >
                      <Icon as={FiUpload} />
                    </IconButton>
                  </Group>
                </Field.Root>

                <HStack gap={4} w="full" pt={4}>
                  <Button
                    background={"blue.500"}
                    size="lg"
                    flex={1}
                    onClick={handleNext}
                  >
                    <Icon as={FiUser} />
                    Continue to Admin Setup
                  </Button>
                </HStack>
              </VStack>
            ) : (
              <VStack gap={6}>
                <Heading size="md" textAlign="center" mb={4}>
                  Administrator Account
                </Heading>
                <StepIndicator currentStep={step} />

                <Group gap={4} w="full">
                  <Field.Root>
                    <Field.Label>First Name</Field.Label>
                    <Input
                      placeholder="John"
                      value={formData.firstName}
                      onChange={(e) =>
                        handleInputChange("firstName", e.target.value)
                      }
                    />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>Last Name</Field.Label>
                    <Input
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={(e) =>
                        handleInputChange("lastName", e.target.value)
                      }
                    />
                  </Field.Root>
                </Group>

                <Field.Root>
                  <Field.Label>Email Address</Field.Label>
                  <Input
                    type="email"
                    placeholder="john@company.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                </Field.Root>

                <Field.Root>
                  <Field.Label>Mobile Number</Field.Label>
                  <Input
                    placeholder="9800000001"
                    value={formData.mobileNumber}
                    onChange={(e) =>
                      handleInputChange("mobileNumber", e.target.value)
                    }
                  />
                </Field.Root>

                <Field.Root>
                  <Field.Label>Password</Field.Label>
                  <Input
                    type="password"
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                  />
                </Field.Root>

                <VStack gap={3} align="start" w="full">
                  <Checkbox.Root
                    checked={formData.requireApproval}
                    onCheckedChange={(e) =>
                      handleInputChange("requireApproval", e.checked)
                    }
                  >
                    <Checkbox.HiddenInput />
                    <Checkbox.Control />
                    <Checkbox.Label>
                      Require approval for new members
                    </Checkbox.Label>
                  </Checkbox.Root>
                  <Checkbox.Root
                    checked={formData.enableManagedPosts}
                    onCheckedChange={(e) =>
                      handleInputChange("enableManagedPosts", e.checked)
                    }
                  >
                    <Checkbox.HiddenInput />
                    <Checkbox.Control />
                    <Checkbox.Label>Enable managed posts</Checkbox.Label>
                  </Checkbox.Root>
                </VStack>

                <HStack gap={4} w="full" pt={4}>
                  <Button
                    variant="outline"
                    size="lg"
                    flex={1}
                    onClick={handleBack}
                  >
                    Back
                  </Button>

                  <Button
                    backgroundColor={"blue.500"}
                    size="lg"
                    flex={1}
                    onClick={handleSubmit}
                  >
                    Create Organization
                  </Button>
                </HStack>
              </VStack>
            )}
          </Box>

          <Text color={textColor} fontSize="sm" textAlign="center">
            Already have an account?{" "}
            <Link color="blue.500" href="#" fontWeight="medium">
              Sign in here
            </Link>
          </Text>
        </VStack>
      </Container>
    </Box>
  )
}

export default OrganizationSignup
