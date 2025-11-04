
import { useEffect, useState } from "react"
import {
  Box,
  Button,
  Input,
  Text,
  Flex,
  Grid,
  Field,
  Fieldset,
  Avatar,
  Image,
  Spinner,

} from "@chakra-ui/react"
import Lock from "@/assets/lock.svg"
import { useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
  useProfile,
  useUpdateProfile,
} from "@/features/Profile/hooks/useProfile"
import { IoIosSearch } from "react-icons/io"
import { useNavigate } from "react-router-dom"

const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .optional()
    .refine((val) => !val || val.length >= 10, {
      message: "Phone number must be at least 10 digits",
    })
    .refine((val) => !val || /^\d+$/.test(val), {
      message: "Phone number must contain only numbers",
    }),
})

type ProfileFormInputs = z.infer<typeof profileSchema>

const Profile = () => {
  const navigate = useNavigate()
  const data = useProfile()
  const updateProfileMutation = useUpdateProfile()
  const [activeFilter, setActiveFilter] = useState<
    "all" | "active" | "inactive"
  >("all")
  const [searchQuery, setSearchQuery] = useState("")

  const handleInviteMember = () => {
    navigate("/invite")
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormInputs>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
  })

  useEffect(() => {
    if (data.data?.user) {
      reset({
        firstName: data.data.user.first_name || "",
        lastName: data.data.user.last_name || "",
        email: data.data.user.email || "",
        phone: data.data.user.phone || "",
      })
    }
  }, [data.data?.user, reset])

  const onSubmit: SubmitHandler<ProfileFormInputs> = async (formData) => {
    const updateData = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      phone: formData.phone || "",
      profile_url: data.data?.user?.profile_url || "",
    }

    updateProfileMutation.mutate(updateData)
  }

  const isPersonalMode = data.data?.context?.mode === "personal"

  // Organization data from API
  const organizationData = (data.data as any)?.organization || {
    name: "Tech solution",
    mobile_country_code: "",
    billing_email: "",
    branding_logo: "",
  }

  // Team members data - hardcoded for now
  const teamMembers = data.data?.team_members || [
    {
      id: 1,
      name: "Asha Shrestha",
      email: "bibekupreti9813@gmail.com",
      profile_url: "",
      role: "Member",
      joined_date: "March 2020",
      is_active: true,
    },
    {
      id: 2,
      name: "Ram Oli",
      email: "ramoli@gmail.com",
      profile_url: "",
      role: "Member",
      joined_date: "March 2020",
      is_active: true,
    },
    {
      id: 3,
      name: "Rita Oli",
      email: "ritaoli@gmail.com",
      profile_url: "",
      role: "Member",
      joined_date: "April 2020",
      is_active: false,
    },
    {
      id: 4,
      name: "Sita Sharma",
      email: "sitasharma@gmail.com",
      profile_url: "",
      role: "Member",
      joined_date: "May 2020",
      is_active: true,
    },
  ]

  // Filter team members based on active filter and search query
  const filteredTeamMembers = teamMembers.filter((member) => {
    // Apply status filter
    const matchesFilter =
      activeFilter === "all" ||
      (activeFilter === "active" && member.is_active) ||
      (activeFilter === "inactive" && !member.is_active)

    // Apply search filter
    const matchesSearch =
      searchQuery === "" ||
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesFilter && matchesSearch
  })

  // Show loading state while data is being fetched
  if (data.isLoading) {
    return (
      <Flex justify="center" align="center" minH="100vh">
        <Spinner size="xl" color="#068e1d" />
      </Flex>
    )
  }

  return (
    <Box
      maxW={isPersonalMode ? "4xl" : "7xl"}
      mx="auto"
      minH="100vh"
      py={6}
      px={4}
    >
      {/* Header Section */}
      {/* <Flex justify="space-between" align="center" mb={8}>
        <Text fontSize="2xl" fontWeight="bold" color="#1a365d">
          {isPersonalMode ? "" : organizationData.name}
        </Text>
        <Button
          variant="outline"
          borderColor="gray.300"
          color="gray.700"
          size="md"
          gap={2}
          _hover={{
            bg: "white",
            borderColor: "gray.400",
          }}
        >
          <Image src={Lock} alt="lock icon" width={4} height={4} />
          Change Password
        </Button>
      </Flex> */}

      {/* Two Column Layout */}
      <Grid templateColumns={isPersonalMode ? "1fr" : "400px 1fr"} gap={6}>
        {/* Left Column - User Info */}
        <Box
          w={isPersonalMode ? "100%" : "auto"}
          mx={isPersonalMode ? "0" : "0"}
        >
          <Flex justify="space-between" align="center" mb={8}>
            <Text fontSize="2xl" fontWeight="bold" color="#1a365d">
              {isPersonalMode ? "" : organizationData.name}
            </Text>
            <Button
              variant="outline"
              borderColor="gray.300"
              color="gray.700"
              size="md"
              gap={2}
              _hover={{
                bg: "white",
                borderColor: "gray.400",
              }}
              onClick={() => navigate("/reset-password/send-otp")}
            >
              <Image src={Lock} alt="lock icon" width={4} height={4} />
              Change Password
            </Button>
          </Flex>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* User Info Section */}
            <Box>
              <Text fontSize="xl" fontWeight="semibold" color="gray.800" mb={6}>
                User Info
              </Text>

              {/* Avatar Section */}
              <Flex justify="center" align="center" mb={8}>
                <Avatar.Root size="2xl">
                  <Avatar.Fallback name="Ram Oli" />
                  <Avatar.Image src={data.data?.user.profile_url} />
                </Avatar.Root>
              </Flex>

              {/* Form Fields */}
              <Fieldset.Root>
                <Grid templateColumns="repeat(2, 1fr)" gap={6} mb={6}>
                  {/* First Name */}
                  <Field.Root invalid={!!errors.firstName}>
                    <Field.Label
                      color="gray.700"
                      fontWeight="semibold"
                      mb={2}
                      fontSize="md"
                    >
                      First Name
                    </Field.Label>
                    <Input
                      {...register("firstName")}
                      bg="gray.50"
                      border="1px solid"
                      borderColor="gray.300"
                      size="lg"
                      _hover={{ borderColor: "gray.400" }}
                      _focus={{
                        borderColor: "#068e1d",
                        boxShadow: "0 0 0 1px #068e1d",
                      }}
                    />
                    <Field.ErrorText>
                      {errors.firstName?.message}
                    </Field.ErrorText>
                  </Field.Root>

                  {/* Last Name */}
                  <Field.Root invalid={!!errors.lastName}>
                    <Field.Label
                      color="gray.700"
                      fontWeight="semibold"
                      mb={2}
                      fontSize="md"
                    >
                      Last Name
                    </Field.Label>
                    <Input
                      {...register("lastName")}
                      bg="gray.50"
                      border="1px solid"
                      borderColor="gray.300"
                      size="lg"
                      _hover={{ borderColor: "gray.400" }}
                      _focus={{
                        borderColor: "#068e1d",
                        boxShadow: "0 0 0 1px #068e1d",
                      }}
                    />
                    <Field.ErrorText>
                      {errors.lastName?.message}
                    </Field.ErrorText>
                  </Field.Root>
                </Grid>

                {/* Email */}
                <Field.Root invalid={!!errors.email} mb={6}>
                  <Field.Label
                    color="gray.700"
                    fontWeight="semibold"
                    mb={2}
                    fontSize="md"
                  >
                    Email Address
                  </Field.Label>
                  <Input
                    {...register("email")}
                    type="email"
                    bg="gray.50"
                    border="1px solid"
                    borderColor="gray.300"
                    size="lg"
                    readOnly
                    cursor="not-allowed"
                    color="gray.500"
                    _hover={{ borderColor: "gray.400" }}
                  />
                  <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
                </Field.Root>

                {/* Phone Number */}
                <Field.Root invalid={!!errors.phone} mb={6}>
                  <Field.Label
                    color="gray.700"
                    fontWeight="semibold"
                    mb={2}
                    fontSize="md"
                  >
                    Phone Number ( Optional)
                  </Field.Label>
                  <Input
                    {...register("phone")}
                    type="tel"
                    pattern="[0-9]*"
                    inputMode="numeric"
                    placeholder="9845463404"
                    onKeyDown={(e) => {
                      if (
                        !/[0-9]/.test(e.key) &&
                        e.key !== "Backspace" &&
                        e.key !== "Delete" &&
                        e.key !== "Tab" &&
                        e.key !== "ArrowLeft" &&
                        e.key !== "ArrowRight"
                      ) {
                        e.preventDefault()
                      }
                    }}
                    bg="gray.50"
                    border="1px solid"
                    borderColor="gray.300"
                    size="lg"
                    _hover={{ borderColor: "gray.400" }}
                    _focus={{
                      borderColor: "#068e1d",
                      boxShadow: "0 0 0 1px #068e1d",
                    }}
                    _placeholder={{ color: "gray.400" }}
                  />
                  <Field.ErrorText>{errors.phone?.message}</Field.ErrorText>
                </Field.Root>
              </Fieldset.Root>

              {/* Save Button */}
              <Flex justify="flex-start" pt={6}>
                <Button
                  type="submit"
                  bg="#068e1d"
                  color="white"
                  borderRadius="md"
                  size="lg"
                  px={10}
                  loading={updateProfileMutation.isPending}
                  loadingText="Saving Changes..."
                  _hover={{
                    bg: "green.600",
                  }}
                  fontWeight="normal"
                >
                  Save Changes
                </Button>
              </Flex>
            </Box>
          </form>
        </Box>

        {/* Right Column - Team Members - Only show in organization mode */}
        {!isPersonalMode && (
          <Box>
            {/* Team Members Header */}
            <Flex justify="space-between" align="center" mb={6}>
              <Text fontSize="xl" fontWeight="semibold" color="gray.800">
                Team Members
              </Text>
              <Button
                bg="#1a365d"
                color="white"
                onClick={() => handleInviteMember()}
                size="sm"
                _hover={{ bg: "#2d3748" }}
              >
                + Invite members
              </Button>
            </Flex>

            {/* Filter Tabs and Search */}
            <Flex gap={3} mb={6} flexWrap="wrap" align="center">
              <Button
                variant="outline"
                borderColor={
                  activeFilter === "active" ? "green.500" : "gray.300"
                }
                color={activeFilter === "active" ? "green.700" : "gray.700"}
                bg={activeFilter === "active" ? "green.50" : "transparent"}
                size="sm"
                gap={2}
                onClick={() => setActiveFilter("active")}
                _hover={{
                  bg: activeFilter === "active" ? "green.100" : "gray.50",
                }}
              >
                <Text>✓</Text>
                Active members
              </Button>
              <Button
                variant="outline"
                borderColor={
                  activeFilter === "inactive" ? "red.500" : "gray.300"
                }
                color={activeFilter === "inactive" ? "red.700" : "gray.700"}
                bg={activeFilter === "inactive" ? "red.50" : "transparent"}
                size="sm"
                gap={2}
                onClick={() => setActiveFilter("inactive")}
                _hover={{
                  bg: activeFilter === "inactive" ? "red.100" : "gray.50",
                }}
              >
                <Text>⊘</Text>
                Inactive members
              </Button>
              <Button
                variant="outline"
                borderColor={activeFilter === "all" ? "blue.500" : "gray.300"}
                color={activeFilter === "all" ? "blue.700" : "gray.700"}
                bg={activeFilter === "all" ? "blue.50" : "transparent"}
                size="sm"
                gap={2}
                onClick={() => setActiveFilter("all")}
                _hover={{
                  bg: activeFilter === "all" ? "blue.100" : "gray.50",
                }}
              >
                <Text>👥</Text>
                All
              </Button>

              {/* Search Box */}
              <Box flex="1" position="relative">
                <Box
                  position="absolute"
                  left="3"
                  top="50%"
                  transform="translateY(-50%)"
                  zIndex="1"
                  pointerEvents="none"
                >
                  <IoIosSearch size={18} color="gray" />
                </Box>
                <Input
                  placeholder="Search team member"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  bg="white"
                  border="1px solid"
                  borderColor="gray.300"
                  pl="10"
                  size="sm"
                  _placeholder={{ color: "gray.400" }}
                  _hover={{ borderColor: "gray.400" }}
                  _focus={{
                    borderColor: "#068e1d",
                    boxShadow: "0 0 0 1px #068e1d",
                  }}
                />
              </Box>
            </Flex>

            {/* Team Members List */}
            <Box>
              {filteredTeamMembers.length === 0 ? (
                <Text fontSize="sm" color="gray.500" textAlign="center" py={8}>
                  No team members to display
                </Text>
              ) : (
                filteredTeamMembers.map((member) => (
                  <Flex
                    key={member.id}
                    justify="space-between"
                    align="center"
                    p={2}
                    mb={3}
                    bg="white"
                    border="1px solid"
                    borderColor="gray.200"
                    borderRadius="lg"
                  >
                    <Flex align="center" gap={3}>
                      <Avatar.Root size="md">
                        <Avatar.Fallback name={member.name} />
                        {member.profile_url && (
                          <Avatar.Image src={member.profile_url} />
                        )}
                      </Avatar.Root>
                      <Box>
                        <Flex align="center" gap={2}>
                          <Text fontWeight="semibold" fontSize="sm">
                            {member.name}
                          </Text>
                          {member.role && (
                            <Box
                              bg="blue.100"
                              color="blue.700"
                              px={2}
                              py={0.5}
                              borderRadius="md"
                              fontSize="xs"
                            >
                              {member.role}
                            </Box>
                          )}
                        </Flex>
                        <Text fontSize="sm" color="gray.600">
                          {member.email}
                        </Text>
                        {member.joined_date && (
                          <Text fontSize="xs" color="gray.500">
                            Joined {member.joined_date}
                          </Text>
                        )}
                      </Box>
                    </Flex>
                    <Button
                      variant="outline"
                      borderColor={member.is_active ? "red.500" : "green.500"}
                      color={member.is_active ? "red.600" : "green.600"}
                      size="sm"
                      gap={2}
                      _hover={{
                        bg: member.is_active ? "red.50" : "green.50",
                      }}
                    >
                      <Text>{member.is_active ? "⊘" : "✓"}</Text>
                      {member.is_active ? "Add to Inactive" : "Add to Active"}
                    </Button>
                  </Flex>
                ))
              )}
            </Box>
          </Box>
        )}
      </Grid>
    </Box>
  )
}

export default Profile;
