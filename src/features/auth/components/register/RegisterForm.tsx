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
import { LuEye, LuEyeOff } from "react-icons/lu";
import useEmailStore from "@/lib/store/useEmailStore";
import { useRegisterUser } from "../../hooks/useAuth";
import { signupSchema, type SignupFormData } from "../../lib/schema";

const RegisterForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { mutate, isPending } = useRegisterUser();
  const { setEmail } = useEmailStore();

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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...registerData } = data;
    mutate(registerData);
    setEmail(data.email);
  };

  return (
    <Box bg="white" w="100%" maxW="lg" mx="auto" transition="all 0.3s ease">
      <Flex align="center" mb={7}>
        <Heading size="2xl">Create Account</Heading>
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
            <Flex gap={4}>
              <Field.Root invalid={Boolean(errors.first_name)} required>
                <Field.Label>
                  First Name
                  <Field.RequiredIndicator />
                </Field.Label>
                <Input
                  {...register("first_name")}
                  placeholder="Enter first name"
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
                  borderRadius="md"
                />
                <Field.ErrorText>{errors.first_name?.message}</Field.ErrorText>
              </Field.Root>

              <Field.Root invalid={Boolean(errors.last_name)} required>
                <Field.Label>
                  Last Name
                  <Field.RequiredIndicator />
                </Field.Label>
                <Input
                  {...register("last_name")}
                  placeholder="Enter last name"
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
                  borderRadius="md"
                />
                <Field.ErrorText>{errors.last_name?.message}</Field.ErrorText>
              </Field.Root>
            </Flex>

            <Field.Root invalid={Boolean(errors.email)} required>
              <Field.Label>
                Email Address
                <Field.RequiredIndicator />
              </Field.Label>
              <Input
                {...register("email")}
                type="email"
                placeholder="Enter your email"
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
                    borderRadius="md"
                  />
                  <Field.ErrorText>{errors.mobile?.message}</Field.ErrorText>
                </Field.Root>
              </Flex>
            </Fieldset.Root>

            <Field.Root invalid={Boolean(errors.password)} required>
              <Field.Label>
                Password
                <Field.RequiredIndicator />
              </Field.Label>
              <Box position="relative" w="100%">
                <Input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  pr="2.5rem"
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

            <Field.Root invalid={Boolean(errors.confirmPassword)} required>
              <Field.Label>
                Confirm Password
                <Field.RequiredIndicator />
              </Field.Label>
              <Box position="relative" w="100%">
                <Input
                  {...register("confirmPassword")}
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Re-enter password"
                  pr="2.5rem"
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
                  borderRadius="md"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  position="absolute"
                  top="50%"
                  right="0.5rem"
                  transform="translateY(-50%)"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                >
                  {showConfirmPassword ? (
                    <LuEyeOff size={18} />
                  ) : (
                    <LuEye size={18} />
                  )}
                </Button>
              </Box>
              <Field.ErrorText>
                {errors.confirmPassword?.message}
              </Field.ErrorText>
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
            bg="blue.500"
            color="white"
            size="lg"
            w="100%"
            mt={4}
            loading={isPending}
            loadingText="Creating Account"
            _hover={{ bg: "blue.600" }}
            transition="all 0.2s"
          >
            Continue
          </Button>
        </VStack>
      </form>

      <Flex justify="center" mt={6}>
        <Text fontSize="sm" color="gray.600">
          Already have an account?{" "}
          <Link
            color="blue.500"
            
            textDecoration="underline"
            fontWeight="bold"
            href="/login"
          >
            Sign in
          </Link>
        </Text>
      </Flex>

      <Flex justify="center">
        <Link
          color="gray.600"
          fontWeight="medium"
          textDecoration="underline"
          fontSize="sm"
          href="https://socially.work/privacy_policy"
          target="_blank"
        >
          Privacy Policy
        </Link>
      </Flex>
    </Box>
  );
};

export default RegisterForm;
