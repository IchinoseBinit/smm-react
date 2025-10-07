import React, { useState, useMemo } from "react"
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
  Field,
  Image,
  Select,
  Portal,
  createListCollection,
} from "@chakra-ui/react"
import { FiUser, FiBriefcase, FiEye, FiEyeOff } from "react-icons/fi"
import LightLogo from "@/assets/app/Header Logo White.png"
import { useSignupOrganization } from "@/features/Organization/hooks/useOrganization"
import countryData from "@/data/country.json"
import { LoginFormSection } from "@/features/auth/components/login/LoginFormSection"
import { useNavigate } from "react-router-dom"

interface FormData {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  password: string
  confirmPassword: string
}

interface OrganizationFormData {
  organizationName: string
  billingEmail: string
  countryCode: string
  brandingLogoUrl: string
}

type AccountType = "individual" | "organization"

const OrganizationSignup: React.FC = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<"signin" | "create">("create")
  const [accountType, setAccountType] = useState<AccountType>("individual")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const signupOrganization = useSignupOrganization()
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  })
  const [orgFormData, setOrgFormData] = useState<OrganizationFormData>({
    organizationName: "",
    billingEmail: "",
    countryCode: "+977",
    brandingLogoUrl: "",
  })

  const countries = useMemo(
    () =>
      createListCollection({
        items: Object.entries(countryData).map(([country, code]) => ({
          label: `${country} (${code})`,
          value: code,
        })),
      }),
    []
  )

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
    // Clear error for this field when user starts typing
    if (submitted && errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const handleOrgInputChange = (
    field: keyof OrganizationFormData,
    value: string
  ) => {
    setOrgFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
    // Clear error for this field when user starts typing
    if (submitted && orgErrors[field]) {
      setOrgErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [orgErrors, setOrgErrors] = useState<Partial<OrganizationFormData>>({})
  const [submitted, setSubmitted] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required"
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required"
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required"
    }
    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateOrgForm = (): boolean => {
    const newErrors: Partial<OrganizationFormData> = {}

    if (!orgFormData.organizationName.trim()) {
      newErrors.organizationName = "Organization name is required"
    }
    if (!orgFormData.billingEmail.trim()) {
      newErrors.billingEmail = "Billing email is required"
    } else if (!/\S+@\S+\.\S+/.test(orgFormData.billingEmail)) {
      newErrors.billingEmail = "Email is invalid"
    }

    setOrgErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (activeTab === "create") {
      if (accountType === "organization") {
        setSubmitted(true)
        if (validateOrgForm() && validateForm()) {
          // Map form data to API structure
          const signupRequest = {
            organization: {
              name: orgFormData.organizationName,
              mobile_country_code: orgFormData.countryCode,
              billing_email: orgFormData.billingEmail,
              request_approval: true,
              branding_logo: orgFormData.brandingLogoUrl,
              managed_posts: true,
            },
            user: {
              email: formData.email,
              first_name: formData.firstName,
              last_name: formData.lastName,
              mobile: formData.phoneNumber,
              password: formData.password,
            },
          }
          signupOrganization.mutate(signupRequest)
        }
      } else {
        // Individual account - validate and move to organization
        setSubmitted(true)
        if (validateForm()) {
          setAccountType("organization")
          setSubmitted(false) // Reset submitted state for organization form
        }
      }
    }
  }

  return (
    <Box
      minH="100vh"
      bg="#ffffff"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={4}
    >
      <Container maxW="2xl" py={8}>
        <VStack gap={6} w="full">
          {/* Logo */}
          <VStack gap={4} textAlign="center">
            <Image
              src={LightLogo}
              height={8}
              width="auto"
              maxW="100%"
              cursor="pointer"
              onClick={() => navigate("/")}
            />
          </VStack>

          {/* Tab Navigation */}
          <HStack
            bg="gray.200"
            p={1}
            borderRadius="lg"
            w="full"
            maxW="sm"
            mx="auto"
          >
            <Button
              flex={1}
              size="md"
              variant={activeTab === "signin" ? "solid" : "ghost"}
              bg={activeTab === "signin" ? "white" : "transparent"}
              color={activeTab === "signin" ? "gray.900" : "gray.600"}
              _hover={{
                bg: activeTab === "signin" ? "white" : "gray.300",
              }}
              onClick={() => setActiveTab("signin")}
              borderRadius="md"
            >
              Sign In
            </Button>
            <Button
              flex={1}
              size="md"
              variant={activeTab === "create" ? "solid" : "ghost"}
              bg={activeTab === "create" ? "white" : "transparent"}
              color={activeTab === "create" ? "gray.900" : "gray.600"}
              _hover={{
                bg: activeTab === "create" ? "white" : "gray.300",
              }}
              onClick={() => setActiveTab("create")}
              borderRadius="md"
            >
              Create Account
            </Button>
          </HStack>

          {/* Show Login Form when Sign In tab is active */}
          {activeTab === "signin" && (
            <Box
              bg="white"
              p={6}
              borderRadius="lg"
              w="full"
              maxW="3xl"
              mx="auto"
            >
              <LoginFormSection />
            </Box>
          )}

          {/* Form Container */}
          <Box
            bg="white"
            p={6}
            borderRadius="lg"
            w="full"
            maxW="3xl"
            mx="auto"
          >
            {activeTab === "create" && (
              <VStack
                gap={6}
                border="1px solid"
                borderColor="gray.200"
                p={6}
                borderRadius="lg"
              >
                <VStack gap={1} textAlign="center">
                  <Heading size="xl" color="gray.900" fontWeight="bold">
                    {accountType === "organization"
                      ? "Organization Sign Up"
                      : "Create Account"}
                  </Heading>
                  <Text color="gray.500" fontSize="md" fontWeight="medium">
                    {accountType === "organization"
                      ? "Create your organization account to get started"
                      : "Choose your account type to get started"}
                  </Text>
                </VStack>

                {/* Account Type Selection */}
                <HStack gap={4} w="full">
                  <Box
                    flex={1}
                    as="button"
                    onClick={() => setAccountType("individual")}
                    bg={accountType === "individual" ? "#3b83f6" : "white"}
                    color={accountType === "individual" ? "white" : "gray.700"}
                    border={accountType === "individual" ? "none" : "1px solid"}
                    borderColor={
                      accountType === "individual" ? "transparent" : "gray.300"
                    }
                    _hover={{
                      bg: accountType === "individual" ? "#3b83f6" : "gray.100",
                    }}
                    py={6}
                    px={4}
                    borderRadius="lg"
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    gap={2}
                    cursor="pointer"
                    transition="all 0.2s"
                  >
                    <Icon as={FiUser} size="lg" />
                    <VStack gap={0}>
                      <Text fontWeight="semibold">Individual</Text>
                      <Text fontSize="xs" opacity={0.8}>
                        Personal use
                      </Text>
                    </VStack>
                  </Box>
                  <Box
                    flex={1}
                    as="button"
                    onClick={() => setAccountType("organization")}
                    bg={accountType === "organization" ? "#3b83f6" : "white"}
                    color={
                      accountType === "organization" ? "white" : "gray.700"
                    }
                    border={
                      accountType === "organization" ? "none" : "1px solid"
                    }
                    borderColor={
                      accountType === "organization"
                        ? "transparent"
                        : "gray.400"
                    }
                    _hover={{
                      bg:
                        accountType === "organization" ? "#3b83f6" : "gray.100",
                    }}
                    py={6}
                    px={4}
                    borderRadius="lg"
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    gap={2}
                    cursor="pointer"
                    transition="all 0.2s"
                  >
                    <Icon as={FiBriefcase} size="lg" />
                    <VStack gap={0}>
                      <Text fontWeight="semibold">Organization</Text>
                      <Text fontSize="xs" opacity={0.8}>
                        Team & business
                      </Text>
                    </VStack>
                  </Box>
                </HStack>

                {/* Form Fields */}
                <VStack gap={4} w="full">
                  {accountType === "organization" ? (
                    // Organization Form Fields
                    <>
                      <Field.Root w="full">
                        <Field.Label color="gray.700" fontWeight="medium">
                          Organization Name
                        </Field.Label>
                        <Input
                          placeholder="Enter your organization name"
                          value={orgFormData.organizationName}
                          onChange={(e) =>
                            handleOrgInputChange(
                              "organizationName",
                              e.target.value
                            )
                          }
                          border="none"
                          bg="gray.50"
                          _focus={{
                            bg: "gray.100",
                            boxShadow: "none",
                            outline: "none",
                          }}
                          _hover={{
                            bg: "gray.100",
                          }}
                        />
                        {submitted && orgErrors.organizationName && (
                          <Text color="red.500" fontSize="sm" mt={1}>
                            {orgErrors.organizationName}
                          </Text>
                        )}
                      </Field.Root>

                      <Field.Root w="full">
                        <Field.Label color="gray.700" fontWeight="medium">
                          Billing Email
                        </Field.Label>
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          value={orgFormData.billingEmail}
                          onChange={(e) =>
                            handleOrgInputChange("billingEmail", e.target.value)
                          }
                          border="none"
                          bg="gray.50"
                          _focus={{
                            bg: "gray.100",
                            boxShadow: "none",
                            outline: "none",
                          }}
                          _hover={{
                            bg: "gray.100",
                          }}
                        />
                        {submitted && orgErrors.billingEmail && (
                          <Text color="red.500" fontSize="sm" mt={1}>
                            {orgErrors.billingEmail}
                          </Text>
                        )}
                      </Field.Root>

                      <Field.Root w="full">
                        <Field.Label color="gray.700" fontWeight="medium">
                          Country Code
                        </Field.Label>
                        <Select.Root
                          collection={countries}
                          value={[orgFormData.countryCode]}
                          onValueChange={(e) =>
                            handleOrgInputChange("countryCode", e.value[0])
                          }
                          positioning={{ sameWidth: true }}
                        >
                          <Select.HiddenSelect />
                          <Select.Control>
                            <Select.Trigger
                              border="none"
                              bg="gray.50"
                              _focus={{
                                bg: "gray.100",
                                boxShadow: "none",
                                outline: "none",
                              }}
                              _hover={{
                                bg: "gray.100",
                              }}
                            >
                              <Select.ValueText placeholder="Select country code" />
                            </Select.Trigger>
                            <Select.IndicatorGroup>
                              <Select.Indicator />
                            </Select.IndicatorGroup>
                          </Select.Control>
                          <Portal>
                            <Select.Positioner>
                              <Select.Content maxH="250px">
                                {countries.items.map((country) => (
                                  <Select.Item
                                    item={country}
                                    key={country.value}
                                  >
                                    {country.label}
                                    <Select.ItemIndicator />
                                  </Select.Item>
                                ))}
                              </Select.Content>
                            </Select.Positioner>
                          </Portal>
                        </Select.Root>
                      </Field.Root>

                      <Field.Root w="full">
                        <Field.Label color="gray.700" fontWeight="medium">
                          Branding Logo URL
                        </Field.Label>
                        <Input
                          placeholder="https://example.com/logo.png"
                          value={orgFormData.brandingLogoUrl}
                          onChange={(e) =>
                            handleOrgInputChange(
                              "brandingLogoUrl",
                              e.target.value
                            )
                          }
                          border="none"
                          bg="gray.50"
                          _focus={{
                            bg: "gray.100",
                            boxShadow: "none",
                            outline: "none",
                          }}
                          _hover={{
                            bg: "gray.100",
                          }}
                        />
                      </Field.Root>
                    </>
                  ) : (
                    // Individual Form Fields
                    <>
                      <HStack gap={4} w="full">
                        <Field.Root flex={1}>
                          <Field.Label color="gray.700" fontWeight="medium">
                            First Name
                          </Field.Label>
                          <Input
                            placeholder="Enter first name"
                            value={formData.firstName}
                            onChange={(e) =>
                              handleInputChange("firstName", e.target.value)
                            }
                            border="none"
                            bg="gray.50"
                            _focus={{
                              bg: "gray.100",
                              boxShadow: "none",
                              outline: "none",
                            }}
                            _hover={{
                              bg: "gray.100",
                            }}
                          />
                          {submitted && errors.firstName && (
                            <Text color="red.500" fontSize="sm" mt={1}>
                              {errors.firstName}
                            </Text>
                          )}
                        </Field.Root>
                        <Field.Root flex={1}>
                          <Field.Label color="gray.700" fontWeight="medium">
                            Last Name
                          </Field.Label>
                          <Input
                            placeholder="Enter last name"
                            value={formData.lastName}
                            onChange={(e) =>
                              handleInputChange("lastName", e.target.value)
                            }
                            border="none"
                            bg="gray.50"
                            _focus={{
                              bg: "gray.100",
                              boxShadow: "none",
                              outline: "none",
                            }}
                            _hover={{
                              bg: "gray.100",
                            }}
                          />
                          {submitted && errors.lastName && (
                            <Text color="red.500" fontSize="sm" mt={1}>
                              {errors.lastName}
                            </Text>
                          )}
                        </Field.Root>
                      </HStack>

                      <Field.Root w="full">
                        <Field.Label color="gray.700" fontWeight="medium">
                          Email Address
                        </Field.Label>
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          border="none"
                          bg="gray.50"
                          _focus={{
                            bg: "gray.100",
                            boxShadow: "none",
                            outline: "none",
                          }}
                          _hover={{
                            bg: "gray.100",
                          }}
                        />
                        {submitted && errors.email && (
                          <Text color="red.500" fontSize="sm" mt={1}>
                            {errors.email}
                          </Text>
                        )}
                      </Field.Root>

                      <Field.Root w="full">
                        <Field.Label color="gray.700" fontWeight="medium">
                          Phone Number
                        </Field.Label>
                        <Input
                          placeholder="Enter your number"
                          value={formData.phoneNumber}
                          onChange={(e) =>
                            handleInputChange("phoneNumber", e.target.value)
                          }
                          border="none"
                          bg="gray.50"
                          _focus={{
                            bg: "gray.100",
                            boxShadow: "none",
                            outline: "none",
                          }}
                          _hover={{
                            bg: "gray.100",
                          }}
                        />
                        {submitted && errors.phoneNumber && (
                          <Text color="red.500" fontSize="sm" mt={1}>
                            {errors.phoneNumber}
                          </Text>
                        )}
                      </Field.Root>

                      <Field.Root w="full">
                        <Field.Label color="gray.700" fontWeight="medium">
                          Password
                        </Field.Label>
                        <Box position="relative" w="full">
                          <Input
                            w="full"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={(e) =>
                              handleInputChange("password", e.target.value)
                            }
                            border="none"
                            bg="gray.50"
                            _focus={{
                              bg: "gray.100",
                              boxShadow: "none",
                              outline: "none",
                            }}
                            _hover={{
                              bg: "gray.100",
                            }}
                            pr={10}
                          />
                          <Box
                            position="absolute"
                            right={2}
                            top="50%"
                            transform="translateY(-50%)"
                          >
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setShowPassword(!showPassword)}
                              p={0}
                              minW={8}
                              h={8}
                            >
                              <Icon as={showPassword ? FiEyeOff : FiEye} />
                            </Button>
                          </Box>
                        </Box>
                        {submitted && errors.password && (
                          <Text color="red.500" fontSize="sm" mt={1}>
                            {errors.password}
                          </Text>
                        )}
                      </Field.Root>

                      <Field.Root w="full">
                        <Field.Label color="gray.700" fontWeight="medium">
                          Confirm Password
                        </Field.Label>
                        <Box position="relative" w="full">
                          <Input
                            w="full"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Re-enter your password"
                            value={formData.confirmPassword}
                            onChange={(e) =>
                              handleInputChange(
                                "confirmPassword",
                                e.target.value
                              )
                            }
                            border="none"
                            bg="gray.50"
                            _focus={{
                              bg: "gray.100",
                              boxShadow: "none",
                              outline: "none",
                            }}
                            _hover={{
                              bg: "gray.100",
                            }}
                            pr={10}
                          />
                          <Box
                            position="absolute"
                            right={2}
                            top="50%"
                            transform="translateY(-50%)"
                          >
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                              }
                              p={0}
                              minW={8}
                              h={8}
                            >
                              <Icon
                                as={showConfirmPassword ? FiEyeOff : FiEye}
                              />
                            </Button>
                          </Box>
                        </Box>
                        {submitted && errors.confirmPassword && (
                          <Text color="red.500" fontSize="sm" mt={1}>
                            {errors.confirmPassword}
                          </Text>
                        )}
                      </Field.Root>
                    </>
                  )}
                </VStack>

                {/* Submit Button */}
                <Button
                  w="full"
                  bg="blue.500"
                  color="white"
                  size="lg"
                  _hover={{ bg: "blue.600" }}
                  onClick={handleSubmit}
                  py={6}
                >
                  {accountType === "organization" ? "Sign Up" : "Continue"}
                </Button>
              </VStack>
            )}
          </Box>

          {/* Privacy Policy Link */}
          <Text color="gray.600" fontSize="sm" textAlign="center">
            <Link
              color="blue.500"
              href="#"
              _hover={{ textDecoration: "underline" }}
            >
              Privacy Policy
            </Link>
          </Text>
        </VStack>
      </Container>
    </Box>
  )
}

export default OrganizationSignup
