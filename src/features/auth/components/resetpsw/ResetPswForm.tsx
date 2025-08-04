import { Box, Button, Heading, Text, Flex, Icon } from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import useEmailStore from "@/lib/store/useEmailStore"
import { LuMail } from "react-icons/lu"
import { useNavigate } from "react-router"
import { useChangePassword } from "../../hooks/useAuth"
import { resetPswSchema, type ResetPswFormData } from "../../lib/schema"
import OtpField from "../OtpField"
import PasswordField from "../PasswordField"

export default function ResetPswForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { email } = useEmailStore()
  const navigate = useNavigate()
  const { mutateAsync, isPending } = useChangePassword()

  useEffect(() => {
    if (!email) {
      navigate("/reset-password/send-opt")
    }
  }, [email, navigate])

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<ResetPswFormData>({
    resolver: zodResolver(resetPswSchema),
    defaultValues: { email },
    mode: "onChange", // Enable real-time validation
  })

  const password = watch("password", "")
  const confirmPassword = watch("confirmpassword", "")

  // Check if passwords match for visual feedback
  const passwordsMatch =
    password && confirmPassword && password === confirmPassword
  const passwordsDontMatch = confirmPassword && password !== confirmPassword

  const onSubmit = async (data: ResetPswFormData) => {
    // Double-check passwords match before submitting
    if (data.password !== data.confirmpassword) {
      return
    }

    await mutateAsync({
      email: email,
      otp: data.otp,
      new_password: data.password,
    })
    navigate("/login")
  }

  return (
    <Box
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      bg="white"
      p={8}
      m={20}
      rounded="xl"
      shadow="lg"
      w="full"
      maxW="md"
    >
      <Box textAlign="center" mb={6}>
        <Heading size="md" mb={1} color="gray.700">
          Update your password
        </Heading>
        <Text fontSize="sm" color="gray.500" mb={2}>
          Enter the OTP sent to your email and set a new password.
        </Text>
        {email && (
          <Box
            bg="gray.50"
            p={4}
            rounded="lg"
            border="1px solid"
            borderColor="gray.200"
          >
            <Flex gap={3} justify="center" align="center">
              <Icon as={LuMail} color="gray.500" boxSize={4} />
              <Text fontSize="sm" color="gray.700" fontWeight="medium">
                OTP sent to:{" "}
                <Text
                  as="span"
                  fontFamily="monospace"
                  fontWeight="bold"
                  color="gray.800"
                >
                  {email}
                </Text>
              </Text>
            </Flex>
          </Box>
        )}
      </Box>

      {/* Only OTP and Password fields */}
      <OtpField register={register} error={errors.otp?.message} />
      <PasswordField
        labeltype="New Password"
        register={register}
        fieldName="password"
        error={errors.password?.message}
        password={password}
        showPassword={showPassword}
        togglePassword={() => setShowPassword((prev) => !prev)}
      />
      <PasswordField
        labeltype="Confirm Password"
        register={register}
        fieldName="confirmpassword"
        error={errors.confirmpassword?.message}
        password={confirmPassword}
        showPassword={showConfirmPassword}
        togglePassword={() => setShowConfirmPassword((prev) => !prev)}
        passwordsMatch={passwordsMatch}
        passwordsDontMatch={passwordsDontMatch}
      />

      <Button
        type="submit"
        colorScheme="brand"
        size="lg"
        w="100%"
        mt={6}
        loading={isPending}
        loadingText="Resetting Password"
        disabled={!isValid || isPending || !!passwordsDontMatch} // _disabled={!isValid || isPending || passwordsDontMatch}
        _hover={{ transform: "translateY(-2px)", boxShadow: "md" }}
        transition="all 0.2s"
      >
        Reset Password
      </Button>
    </Box>
  )
}
