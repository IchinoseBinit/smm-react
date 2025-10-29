
import {  useEffect } from "react";
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
  Image
} from "@chakra-ui/react";
import Lock from "@/assets/lock.svg"
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useProfile, useUpdateProfile } from "@/features/Profile/hooks/useProfile";

const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits").regex(/^\d+$/, "Phone number must contain only numbers"),
});

type ProfileFormInputs = z.infer<typeof profileSchema>;

const Profile = () => {
    const data = useProfile()
    const updateProfileMutation = useUpdateProfile()

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
  });

  useEffect(() => {
    if (data.data?.user) {
      reset({
        firstName: data.data.user.first_name || "",
        lastName: data.data.user.last_name || "",
        email: data.data.user.email || "",
        phone: "983883838",
      });
    }
  }, [data.data?.user, reset]);

  const onSubmit: SubmitHandler<ProfileFormInputs> = async (formData) => {
    const updateData = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      phone: formData.phone,
      profile_url: data.data?.user?.profile_url || ""
    };

    updateProfileMutation.mutate(updateData);
  };

  const isPersonalMode = data.data?.context?.mode === "personal";

  // Hardcoded organization data (will be used when mode is not personal)
  const organizationData = {
    name: "Bini Inc",
    mobile_country_code: "+977",
    billing_email: "ledev92115@iotrama.com",
    branding_logo: "https://socially.work/admin/",
  };

  return (
    <Box maxW="5xl" mx="auto" minH="100vh" py={8} px={6}>
      {/* Header Section */}
      <Flex justify="space-between" align="center" mb={8}>
        <Box>
          <Text fontSize="3xl" fontWeight="bold" color="gray.800" mb={1}>
            Profile Settings
          </Text>
          <Text fontSize="sm" color="gray.600">
            Manage your account information and preferences
          </Text>
        </Box>
        <Button
          variant="outline"
          borderColor="gray.300"
          color="gray.700"
          size="lg"
          gap={2}
          _hover={{
            bg: "white",
            borderColor: "gray.400",
            transform: "translateY(-1px)",
          }}
          transition="all 0.2s"
          boxShadow="sm"
        >
          <Image src={Lock} alt="lock icon" width={4} height={4} />
          Change Password
        </Button>
      </Flex>

      {/* Organization Info Section - Only show if NOT personal mode */}
      {!isPersonalMode && (
        <Box
          mb={6}
          p={8}
          bg="white"
          borderRadius="xl"
          boxShadow="md"
          border="1px solid"
          borderColor="gray.200"
          transition="box-shadow 0.2s"
          _hover={{ boxShadow: "lg" }}
        >
          <Flex
            align="center"
            mb={6}
            pb={4}
            borderBottom="2px solid"
            borderColor="gray.100"
          >
            <Box w={1} h={6} bg="#068e1d" borderRadius="full" mr={3} />
            <Text fontSize="xl" fontWeight="bold" color="gray.800">
              Organization Information
            </Text>
          </Flex>

          <Grid templateColumns="repeat(2, 1fr)" gap={6}>
            {/* Organization Name */}
            <Field.Root>
              <Field.Label
                color="gray.700"
                fontWeight="semibold"
                mb={2}
                fontSize="sm"
              >
                Organization Name
              </Field.Label>
              <Input
                value={organizationData.name}
                bg="gray.50"
                border="1px"
                borderColor="gray.300"
                size="lg"
                readOnly
                cursor="not-allowed"
                fontWeight="medium"
                color="gray.700"
                _hover={{ borderColor: "gray.400" }}
              />
            </Field.Root>

            {/* Billing Email */}
            <Field.Root>
              <Field.Label
                color="gray.700"
                fontWeight="semibold"
                mb={2}
                fontSize="sm"
              >
                Billing Email
              </Field.Label>
              <Input
                value={organizationData.billing_email}
                bg="gray.50"
                border="1px"
                borderColor="gray.300"
                size="lg"
                readOnly
                cursor="not-allowed"
                fontWeight="medium"
                color="gray.700"
                _hover={{ borderColor: "gray.400" }}
              />
            </Field.Root>

            {/* Country Code */}
            <Field.Root>
              <Field.Label
                color="gray.700"
                fontWeight="semibold"
                mb={2}
                fontSize="sm"
              >
                Country Code
              </Field.Label>
              <Input
                value={organizationData.mobile_country_code}
                bg="gray.50"
                border="1px"
                borderColor="gray.300"
                size="lg"
                readOnly
                cursor="not-allowed"
                fontWeight="medium"
                color="gray.700"
                _hover={{ borderColor: "gray.400" }}
              />
            </Field.Root>

            {/* Branding Logo URL */}
            <Field.Root>
              <Field.Label
                color="gray.700"
                fontWeight="semibold"
                mb={2}
                fontSize="sm"
              >
                Branding Logo
              </Field.Label>
              <Input
                value={organizationData.branding_logo}
                bg="gray.50"
                border="1px"
                borderColor="gray.300"
                size="lg"
                readOnly
                cursor="not-allowed"
                fontWeight="medium"
                color="gray.700"
                _hover={{ borderColor: "gray.400" }}
              />
            </Field.Root>
          </Grid>
        </Box>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* User Info Section */}
        <Box
          p={8}
          bg="white"
          borderRadius="xl"
          boxShadow="md"
          border="1px solid"
          borderColor="gray.200"
          transition="box-shadow 0.2s"
          _hover={{ boxShadow: "lg" }}
        >
          <Flex
            align="center"
            mb={6}
            pb={4}
            borderBottom="2px solid"
            borderColor="gray.100"
          >
            <Box w={1} h={6} bg="#068e1d" borderRadius="full" mr={3} />
            <Text fontSize="xl" fontWeight="bold" color="gray.800">
              Personal Information
            </Text>
          </Flex>

          {/* Avatar Section */}
          <Flex
            justify="center"
            align="center"
            mb={8}
            p={6}
            bg="gray.50"
            borderRadius="lg"
            border="1px dashed"
            borderColor="gray.300"
          >
            <Box textAlign="center">
              <Avatar.Root
                size="2xl"
                mb={3}
                borderWidth={4}
                borderColor="white"
                boxShadow="lg"
              >
                <Avatar.Fallback name="Ram Oli" />
                <Avatar.Image src={data.data?.user.profile_url} />
              </Avatar.Root>
              <Text fontSize="sm" color="gray.600" fontWeight="medium">
                Profile Picture
              </Text>
            </Box>
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
                  fontSize="sm"
                >
                  First Name
                </Field.Label>
                <Input
                  {...register("firstName")}
                  bg="white"
                  border="2px"
                  borderColor="gray.300"
                  size="lg"
                  _hover={{ borderColor: "gray.400" }}
                  _focus={{
                    borderColor: "#068e1d",
                    boxShadow: "0 0 0 1px #068e1d",
                  }}
                  transition="all 0.2s"
                />
                <Field.ErrorText>{errors.firstName?.message}</Field.ErrorText>
              </Field.Root>

              {/* Last Name */}
              <Field.Root invalid={!!errors.lastName}>
                <Field.Label
                  color="gray.700"
                  fontWeight="semibold"
                  mb={2}
                  fontSize="sm"
                >
                  Last Name
                </Field.Label>
                <Input
                  {...register("lastName")}
                  bg="white"
                  border="2px"
                  borderColor="gray.300"
                  size="lg"
                  _hover={{ borderColor: "gray.400" }}
                  _focus={{
                    borderColor: "#068e1d",
                    boxShadow: "0 0 0 1px #068e1d",
                  }}
                  transition="all 0.2s"
                />
                <Field.ErrorText>{errors.lastName?.message}</Field.ErrorText>
              </Field.Root>
            </Grid>

            {/* Email */}
            <Field.Root invalid={!!errors.email} mb={6}>
              <Field.Label
                color="gray.700"
                fontWeight="semibold"
                mb={2}
                fontSize="sm"
              >
                Email Address
              </Field.Label>
              <Input
                {...register("email")}
                type="email"
                bg="gray.50"
                border="2px"
                borderColor="gray.300"
                size="lg"
                readOnly
                cursor="not-allowed"
                fontWeight="medium"
                color="gray.700"
                _hover={{ borderColor: "gray.400" }}
              />
              <Text fontSize="xs" color="gray.500" mt={1}>
                Email cannot be changed
              </Text>
              <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
            </Field.Root>

            {/* Phone Number */}
            <Field.Root invalid={!!errors.phone} mb={8}>
              <Field.Label
                color="gray.700"
                fontWeight="semibold"
                mb={2}
                fontSize="sm"
              >
                Phone Number
              </Field.Label>
              <Input
                {...register("phone")}
                type="tel"
                pattern="[0-9]*"
                inputMode="numeric"
                onKeyPress={(e) => {
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
                bg="white"
                border="2px"
                borderColor="gray.300"
                size="lg"
                _hover={{ borderColor: "gray.400" }}
                _focus={{
                  borderColor: "#068e1d",
                  boxShadow: "0 0 0 1px #068e1d",
                }}
                transition="all 0.2s"
              />
              <Field.ErrorText>{errors.phone?.message}</Field.ErrorText>
            </Field.Root>
          </Fieldset.Root>

          {/* Save Button */}
          <Flex
            justify="flex-end"
            pt={4}
            borderTop="1px solid"
            borderColor="gray.200"
          >
            <Button
              type="submit"
              bg="#068e1d"
              color="white"
              borderRadius="lg"
              size="lg"
              px={10}
              loading={updateProfileMutation.isPending}
              loadingText="Saving Changes..."
              _hover={{
                bg: "green.600",
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
              _active={{ transform: "translateY(0)", boxShadow: "md" }}
              transition="all 0.2s"
              boxShadow="md"
              fontWeight="semibold"
            >
              Save Changes
            </Button>
          </Flex>
        </Box>
      </form>
    </Box>
  )
};

export default Profile;
