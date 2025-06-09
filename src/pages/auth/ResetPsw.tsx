import { useChangePassword } from "@/hooks/useAuthUser";
import useEmailStore from "@/lib/store/useEmailStore";
import { resetPswSchema, type ResetPswFormData } from "@/lib/zod/AuthSchema";
import {
  Box,
  Button,
  Field,
  Flex,
  Heading,
  Input,
  PinInput,
  Text,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { useNavigate } from "react-router";

export default function ResetPsw() {
  const [showPassword, setShowPassword] = useState(false);
  const { email } = useEmailStore();
  const navigate = useNavigate();
  const { mutate } = useChangePassword();

  useEffect(() => {
    if (!email) {
      navigate("/reset-password/send-opt");
    }
  }, [email, navigate]);

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
  } = useForm<ResetPswFormData>({
    resolver: zodResolver(resetPswSchema),
    defaultValues: {
      email: email,
    },
  });
  const password = watch("password", "");
  const passwordStrength = calculatePasswordStrength(password);
  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 2) return "red.400";
    if (passwordStrength <= 4) return "yellow.400";
    return "green.400";
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 2) return "Weak";
    if (passwordStrength <= 4) return "Moderate";
    return "Strong";
  };

  const onSubmit = (data: ResetPswFormData) => {
    mutate({
      email: data.email,
      otp: data.otp,
      password: data.password,
    });
  };
  return (
    <Box
      minH="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bg="gray.50"
      px={4}
    >
      <Box
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        bg="white"
        p={8}
        rounded="xl"
        shadow="lg"
        w="full"
        maxW="md"
      >
        <Box textAlign="center" mb={6}>
          <Heading size="md" mb={1} color="gray.700">
            Update your password
          </Heading>
          <Text fontSize="sm" color="gray.500">
            Fill all the fields below to update your password.
          </Text>
        </Box>

        {/* Email Field */}
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

        {/* OTP Field */}
        <Field.Root invalid={Boolean(errors.otp)} mt={4}>
          <Field.Label>Enter OTP</Field.Label>
          <PinInput.Root>
            <PinInput.HiddenInput {...register("otp")} />
            <PinInput.Control>
              <PinInput.Input index={0} />
              <PinInput.Input index={1} />
              <PinInput.Input index={2} />
              <PinInput.Input index={3} />
              <PinInput.Input index={4} />
              <PinInput.Input index={5} />
            </PinInput.Control>
          </PinInput.Root>
          <Field.ErrorText>{errors.otp?.message}</Field.ErrorText>
        </Field.Root>

        {/* Password Field */}
        <Field.Root invalid={Boolean(errors.password)} mt={4}>
          <Field.Label>New Password</Field.Label>
          <Box position="relative" w="100%">
            <Input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              pr="2.5rem"
              borderRadius="md"
              w="100%"
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
          </Box>

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

        <Button
          type="submit"
          colorScheme="brand"
          size="lg"
          w="100%"
          mt={6}
          loadingText="Resetting Password"
          _hover={{ transform: "translateY(-2px)", boxShadow: "md" }}
          transition="all 0.2s"
        >
          Reset Password
        </Button>
      </Box>
    </Box>
  );
}
