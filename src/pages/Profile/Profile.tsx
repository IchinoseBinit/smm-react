
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

  // Hardcoded organization data
  const organizationData = {
    name: "Bini Inc",
    mobile_country_code: "+977",
    billing_email: "ledev92115@iotrama.com",
    branding_logo: "https://socially.work/admin/",
  };

  return (
    <Box maxW="4xl" mx="auto" bg="white" minH="100vh" p={6}>
      {/* Header Section */}
      <Flex justify="flex-end" align="center" mb={8}>
        <Button
          variant="outline"
          borderColor="gray.300"
          color="gray.700"
          _hover={{ bg: "gray.50" }}
        >
          <Image
            src={Lock}
            alt="contact us"
            width={"full"}
            height={"auto"}
            objectFit="cover"
          />
          Change Password
        </Button>
      </Flex>

      {/* Organization Info Section */}
      <Box mb={12} pb={8} borderBottom="1px solid" borderColor="gray.200">
        <Text fontSize="lg" fontWeight="semibold" color="gray.800" mb={6}>
          Organization Info
        </Text>

        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          {/* Organization Name */}
          <Field.Root>
            <Field.Label color="gray.700" fontWeight="medium">
              Organization Name
            </Field.Label>
            <Input
              value={organizationData.name}
              bg="#f5f5f5"
              border="1px"
              borderColor="gray.200"
              size="lg"
              readOnly
              cursor="default"
            />
          </Field.Root>

          {/* Billing Email */}
          <Field.Root>
            <Field.Label color="gray.700" fontWeight="medium">
              Billing Email
            </Field.Label>
            <Input
              value={organizationData.billing_email}
              bg="#f5f5f5"
              border="1px"
              borderColor="gray.200"
              size="lg"
              readOnly
              cursor="default"
            />
          </Field.Root>

          {/* Country Code */}
          <Field.Root>
            <Field.Label color="gray.700" fontWeight="medium">
              Country Code
            </Field.Label>
            <Input
              value={organizationData.mobile_country_code}
              bg="#f5f5f5"
              border="1px"
              borderColor="gray.200"
              size="lg"
              readOnly
              cursor="default"
            />
          </Field.Root>

          {/* Branding Logo URL */}
          <Field.Root>
            <Field.Label color="gray.700" fontWeight="medium">
              Branding Logo
            </Field.Label>
            <Input
              value={organizationData.branding_logo}
              bg="#f5f5f5"
              border="1px"
              borderColor="gray.200"
              size="lg"
              readOnly
              cursor="default"
            />
          </Field.Root>
        </Grid>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* User Info Section */}
        <Box mb={8}>
          <Text fontSize="lg" fontWeight="semibold" color="gray.800" mb={4}>
            User Info
          </Text>

          <Box display="flex" justifyContent="flex-start" pl={16}>
            <Avatar.Root size="2xl" mb={6}>
              <Avatar.Fallback name="Ram Oli" />
              <Avatar.Image src={data.data?.user.profile_url} />
            </Avatar.Root>
          </Box>
        </Box>

        {/* Form Fields */}
        <Fieldset.Root>
          <Grid templateColumns="repeat(2, 1fr)" gap={6} mb={6}>
            {/* First Name */}
            <Field.Root invalid={!!errors.firstName}>
              <Field.Label color="gray.700" fontWeight="medium">
                First Name
              </Field.Label>
              <Input
                {...register("firstName")}
                bg="#f5f5f5"
                border="1px"
                borderColor="gray.200"
                size="lg"
              />
              <Field.ErrorText>{errors.firstName?.message}</Field.ErrorText>
            </Field.Root>

            {/* Last Name */}
            <Field.Root invalid={!!errors.lastName}>
              <Field.Label color="gray.700" fontWeight="medium">
                Last Name
              </Field.Label>
              <Input
                {...register("lastName")}
                bg="#f5f5f5"
                border="1px"
                borderColor="gray.200"
                size="lg"
              />
              <Field.ErrorText>{errors.lastName?.message}</Field.ErrorText>
            </Field.Root>
          </Grid>

          {/* Email */}
          <Field.Root invalid={!!errors.email} mb={6}>
            <Field.Label color="gray.700" fontWeight="medium">
              Email
            </Field.Label>
            <Input
              {...register("email")}
              type="email"
              bg="#f5f5f5"
              border="1px"
              borderColor="gray.200"
              size="lg"
              readOnly
              cursor="default"
              _focus={{}}
            />
            <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
          </Field.Root>

          {/* Phone Number */}
          <Field.Root invalid={!!errors.phone} mb={8}>
            <Field.Label color="gray.700" fontWeight="medium">
              Phone Number
            </Field.Label>
            <Input
              {...register("phone")}
              type="tel"
              pattern="[0-9]*"
              inputMode="numeric"
              onKeyPress={(e) => {
                if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'Tab' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') {
                  e.preventDefault();
                }
              }}
              bg="#f5f5f5"
              border="1px"
              borderColor="gray.200"
              size="lg"
            />
            <Field.ErrorText>{errors.phone?.message}</Field.ErrorText>
          </Field.Root>
        </Fieldset.Root>

        {/* Save Button */}
        <Button
          type="submit"
          bg="#068e1d"
          color="white"
          borderRadius={10}
          size="lg"
          px={8}
          loading={updateProfileMutation.isPending}
          loadingText="Saving..."
          _hover={{ bg: "green.600" }}
        >
          Save Changes
        </Button>
      </form>
    </Box>
  )
};

export default Profile;
