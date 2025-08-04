import { Box, Button, Heading, Text } from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import useEmailStore from "@/lib/store/useEmailStore"
import { useNavigate } from "react-router"
import { useChangePassword } from "../../hooks/useAuth"
import { resetPswSchema, type ResetPswFormData } from "../../lib/schema"
import OtpField from "../OtpField"
import PasswordField from "../PasswordField"

export default function ResetPswForm() {
  const [showPassword, setShowPassword] = useState(false)
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
    formState: { errors },
  } = useForm<ResetPswFormData>({
    resolver: zodResolver(resetPswSchema),
    defaultValues: { email },
  })

  const password = watch("password", "")

  const onSubmit = async (data: ResetPswFormData) => {
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
          <Text fontSize="sm" color="blue.600" fontWeight="medium">
            OTP sent to:{" "}
            <span style={{ fontFamily: "monospace" }}>{email}</span>
          </Text>
        )}
      </Box>

      {/* Only OTP and Password fields */}
      <OtpField register={register} error={errors.otp?.message} />
      <PasswordField
        register={register}
        error={errors.password?.message}
        password={password}
        showPassword={showPassword}
        togglePassword={() => setShowPassword((prev) => !prev)}
      />

      <Button
        type="submit"
        colorScheme="brand"
        size="lg"
        w="100%"
        mt={6}
        loading={isPending}
        loadingText="Resetting Password"
        _hover={{ transform: "translateY(-2px)", boxShadow: "md" }}
        transition="all 0.2s"
      >
        Reset Password
      </Button>
    </Box>
  )
}
