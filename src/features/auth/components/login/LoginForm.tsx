import { useState } from "react";
import {
  Box,
  Button,
  Input,
  Stack,
  Text,
  IconButton,
  Checkbox,
  Flex,
  Link,
  Fieldset,
  Field,
} from "@chakra-ui/react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { useNavigate } from "react-router";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useLoginUser } from "../../hooks/useAuth";
import { useLocation } from "react-router";

// Define the validation schema with Zod
const loginSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .email("Invalid email address"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

// Create a TypeScript type from the schema
type LoginFormInputs = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { mutateAsync, isPending } = useLoginUser();
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuthContext();
    const location = useLocation()


    const isOrganizationSignup = location.pathname === "/organizationsignup" || location.pathname === "/auth" || location.pathname === "/login";


  // Initialize React Hook Form with Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  // Form submission handler
  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    await mutateAsync(data);
    setIsAuthenticated(true);
    navigate("/dashboard");
  };

  return (
    <Box w="full" bg="white" className="light">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Box mb={8}>
          <Text
            fontSize="3xl"
            fontWeight="bold"
            color="gray.900"
            textAlign={isOrganizationSignup ? "center" : ""}
          >
            Log in
          </Text>
          <Text
            color="gray.600"
            textAlign={isOrganizationSignup ? "center" : ""}
            mt={2}
          >
            Welcome back! Please enter your details.
          </Text>
        </Box>

        <Stack spaceY={5}>
          <Fieldset.Root color="fg">
            <Field.Root invalid required>
              <Field.Label>
                Email address
                <Field.RequiredIndicator />
              </Field.Label>
              <Input
                type="email"
                {...register("email")}
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
              />
              <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root invalid mt={5} required>
              <Field.Label>
                Password
                <Field.RequiredIndicator />
              </Field.Label>
              <Flex position="relative" align="center" w="full">
                <Input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  placeholder="Enter your password"
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
                />
                <IconButton
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  variant="ghost"
                  size="sm"
                  position="absolute"
                  right="0.5rem"
                  top="50%"
                  transform="translateY(-50%)"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <LuEyeOff size={20} /> : <LuEye size={20} />}
                </IconButton>
              </Flex>

              <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
            </Field.Root>

            <Flex justify="space-between" align="center">
              <Checkbox.Root>
                <Checkbox.HiddenInput />
                <Checkbox.Control boxSize={4} cursor="pointer" />
                <Checkbox.Label>Remember me</Checkbox.Label>
              </Checkbox.Root>
              <Link
                href="/reset-password/send-opt"
                color="blue.600"
                fontSize="sm"
                fontWeight="medium"
              >
                Forgot password?
              </Link>
            </Flex>
          </Fieldset.Root>

          <Button
            type="submit"
            size="lg"
            loading={isPending}
            loadingText="Signing in"
            w="full"
            bg="blue.500"
            color="white"
            _hover={{ bg: "blue.600" }}
          >
            Sign in
          </Button>

          <Text textAlign="center" mt={6} color="gray.600">
            Don't have an account?{" "}
            <Link href="/register" color="blue.600" fontWeight="medium">
              Sign up
            </Link>
          </Text>
        </Stack>
      </form>
    </Box>
  )
};

export default LoginForm;
