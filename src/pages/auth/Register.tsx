import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Field,
  Fieldset,
  Flex,
  Heading,
  Input,
  Link,
  // NativeSelect,
  // NativeSelectIndicator,
  Text,
  VStack,
} from "@chakra-ui/react";
import { signupSchema, type SignupFormData } from "@/lib/zod/RegisterSchema";
import { LuArrowLeft, LuEye, LuEyeOff } from "react-icons/lu";
import { useNavigate } from "react-router";
import { useRegisterUser } from "@/hooks/useAuthUser";

const SignUpForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { mutate, isPending } = useRegisterUser();
  const navigate = useNavigate();

  const calculatePasswordStrength = (password: string): number => {
    if (!password) return 0;
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    return strength;
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      // countryCode: "+977",
    },
  });

  const password = watch("password", "");
  const passwordStrength = calculatePasswordStrength(password);

  // const countries = [
  //   "United States",
  //   "Canada",
  //   "United Kingdom",
  //   "Australia",
  //   "Germany",
  //   "France",
  //   "Japan",
  //   "India",
  //   "Nepal",
  //   "Brazil",
  //   "South Africa",
  // ] as const;
  // const countryCode = ["+1", "+91", "+977"] as const;

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 1) return "red.500";
    if (passwordStrength <= 3) return "yellow.500";
    return "green.500";
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 1) return "Weak";
    if (passwordStrength <= 3) return "Moderate";
    return "Strong";
  };

  const onSubmit = async (data: SignupFormData) => {
    mutate(data);
  };

  return (
    <Box
      bg="white"
      boxShadow="md"
      borderRadius="lg"
      p={8}
      w="100%"
      maxW="md"
      mx="auto"
      transition="all 0.3s ease"
    >
      <Flex align="center" mb={6}>
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)} mr={2}>
          <LuArrowLeft size={16} />
          Back
        </Button>
        <Heading size="lg">Create Account</Heading>
      </Flex>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* {error && (
          <p className="text-red-600">
            {error.message || "Registration failed"}
          </p>
        )} */}
        <VStack spaceY={5} align="stretch">
          <Fieldset.Root invalid>
            {/* <Field.Root>
              <Field.Label>Country</Field.Label>
              <NativeSelect.Root {...register("country")} borderRadius="md">
                <NativeSelect.Field name="country">
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </NativeSelect.Field>
                <NativeSelectIndicator />
              </NativeSelect.Root>
              <Field.ErrorText>{errors.country?.message}</Field.ErrorText>
            </Field.Root> */}

            <Field.Root invalid={Boolean(errors.email)}>
              <Field.Label>Email Address</Field.Label>
              <Input
                {...register("email")}
                type="email"
                placeholder="Enter your email"
                borderRadius="md"
              />
              <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
            </Field.Root>

            <Fieldset.Root>
              <Flex>
                {/* <Field.Root invalid={Boolean(errors.countryCode)}>
                  <Field.Label>Code</Field.Label>
                  <NativeSelect.Root
                    {...register("countryCode")}
                    borderRadius="md"
                  >
                    <NativeSelect.Field name="countryCode">
                      {countryCode.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </NativeSelect.Field>
                    <NativeSelectIndicator />
                  </NativeSelect.Root>
                  <Field.ErrorText>
                    {errors.countryCode?.message}
                  </Field.ErrorText>
                </Field.Root> */}

                <Field.Root invalid={Boolean(errors.mobile)}>
                  <Field.Label>Mobile Number</Field.Label>
                  <Input
                    {...register("mobile")}
                    type="tel"
                    placeholder="Enter mobile number"
                    borderRadius="md"
                  />
                  <Field.ErrorText>{errors.mobile?.message}</Field.ErrorText>
                </Field.Root>
              </Flex>
            </Fieldset.Root>
            <Flex gap={4}>
              <Field.Root invalid={Boolean(errors.first_name)}>
                <Field.Label>First Name</Field.Label>
                <Input
                  {...register("first_name")}
                  placeholder="Enter first name"
                  borderRadius="md"
                />
                <Field.ErrorText>{errors.first_name?.message}</Field.ErrorText>
              </Field.Root>

              <Field.Root invalid={Boolean(errors.last_name)}>
                <Field.Label>Last Name</Field.Label>
                <Input
                  {...register("last_name")}
                  placeholder="Enter last name"
                  borderRadius="md"
                />
                <Field.ErrorText>{errors.last_name?.message}</Field.ErrorText>
              </Field.Root>
            </Flex>

            <Field.Root invalid={Boolean(errors.password)}>
              <Field.Label>Password</Field.Label>
              <Box position="relative">
                <Input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  pr="2.5rem"
                  borderRadius="md"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  position="absolute"
                  top="50%"
                  right="0.5rem"
                  transform="translateY(-50%)"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <LuEyeOff size={18} /> : <LuEye size={18} />}
                </Button>
              </Box>{" "}
              {password && (
                <Flex align="center" mt={2}>
                  <Box w="100%" h="2px" bg="gray.200" borderRadius="full">
                    <Box
                      w={`${(passwordStrength / 5) * 100}%`}
                      h="100%"
                      bg={getPasswordStrengthColor()}
                      borderRadius="full"
                      transition="width 0.3s ease"
                    />
                  </Box>
                  <Text ml={2} fontSize="sm" color={getPasswordStrengthColor()}>
                    {getPasswordStrengthText()}
                  </Text>
                </Flex>
              )}
              <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
            </Field.Root>

            {/* <Field.Root>
              <Checkbox.Root
                {...register("receiveUpdates")}
                colorScheme="brand"
                mt={2}
              >
                <Checkbox.Label fontSize="sm">
                  Send me news, surveys and special offers
                </Checkbox.Label>
              </Checkbox.Root>
            </Field.Root> */}

            {/* <Field.Root invalid={Boolean(errors.agreeToTerms)}>
              <Checkbox.Root {...register("agreeToTerms")} colorScheme="brand">
                <Checkbox.Label fontSize="sm">
                  I have read and agree to the{" "}
                  <Link color="brand.500" href="#">
                    Terms of Service
                  </Link>{" "}
                  and the{" "}
                  <Link color="brand.500" href="#">
                    Privacy Policy
                  </Link>
                </Checkbox.Label>
              </Checkbox.Root>
              <Field.ErrorText>{errors.agreeToTerms?.message}</Field.ErrorText>
            </Field.Root> */}
          </Fieldset.Root>
          <Button
            type="submit"
            colorScheme="brand"
            size="lg"
            w="100%"
            mt={4}
            disabled={isPending}
            loadingText="Creating Account"
            _hover={{ transform: "translateY(-2px)", boxShadow: "md" }}
            transition="all 0.2s"
          >
            Continue
          </Button>
        </VStack>
      </form>

      <Flex justify="center" mt={6}>
        <Text fontSize="sm">
          Already have an account?{" "}
          <Link color="brand.500" href="/login">
            Sign in
          </Link>
        </Text>
      </Flex>

      <Flex justify="center">
        <Link color="brand.500" fontSize="sm" href="#">
          Privacy Policy
        </Link>
      </Flex>
    </Box>
  );
};

export default SignUpForm;
