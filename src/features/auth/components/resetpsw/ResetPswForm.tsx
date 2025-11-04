import { Box, Button, Heading, Text, Flex, Icon } from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState, useCallback } from "react"
import useEmailStore from "@/lib/store/useEmailStore"
import { LuMail, LuShield, LuClock } from "react-icons/lu"
import { useNavigate } from "react-router"
import { useChangePassword, useSendOtp } from "../../hooks/useAuth"
import { resetOtpSchema, resetPasswordSchema, type ResetOtpFormData, type ResetPasswordFormData } from "../../lib/schema"
import OtpField from "../OtpField"
import PasswordField from "../PasswordField"

export default function ResetPswForm() {
  const [step, setStep] = useState<'otp' | 'password'>('otp')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [timeLeft, setTimeLeft] = useState(120) // 2 minutes in seconds
  const [canResend, setCanResend] = useState(false)
  const [otpVerified, setOtpVerified] = useState(false)
  const [verifiedOtp, setVerifiedOtp] = useState("")
  const { email } = useEmailStore()
  const navigate = useNavigate()
  const { mutateAsync, isPending } = useChangePassword()
  const { mutateAsync: sendOtpMutation, isPending: isSendingOtp } = useSendOtp()

  console.log("otp verifies",otpVerified)
  useEffect(() => {
    if (!email) {
      navigate("/reset-password/send-otp")
    }
  }, [email, navigate])

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else {
      setCanResend(true)
    }
  }, [timeLeft])

  // Format time display
  const formatTime = useCallback((seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }, [])

  // Handle resend OTP
  const handleResendOTP = useCallback(async () => {
    if (!email) return

    try {
      await sendOtpMutation(email)
      setTimeLeft(120) // Reset to 2 minutes
      setCanResend(false)
    } catch (error) {
      console.error('Failed to resend OTP:', error)
    }
  }, [email, sendOtpMutation])

  // OTP Form
  const {
    register: registerOtp,
    handleSubmit: handleSubmitOtp,
    formState: { errors: errorsOtp, isValid: isValidOtp },
  } = useForm<ResetOtpFormData>({
    resolver: zodResolver(resetOtpSchema),
    mode: "onChange",
  })

  // Password Form
  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    watch,
    formState: { errors: errorsPassword, isValid: isValidPassword },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onChange",
  })

  const password = watch("password", "")
  const confirmPassword = watch("confirmpassword", "")

  // Check if passwords match for visual feedback
  const passwordsMatch =
    password && confirmPassword && password === confirmPassword
  const passwordsDontMatch = confirmPassword && password !== confirmPassword

  const onSubmitOtp = async (data: ResetOtpFormData) => {
    console.log("data",data)
    // Store the OTP for later use
    setVerifiedOtp(data.otp)
    setOtpVerified(true)
    setStep('password')
  }

  const onSubmitPassword = async (data: ResetPasswordFormData) => {
    // Double-check passwords match before submitting
    if (data.password !== data.confirmpassword) {
      return
    }

    await mutateAsync({
      email: email,
      otp: verifiedOtp,
      new_password: data.password,
    })
    navigate("/login")
  }

  // Render OTP Verification Step
  const renderOtpStep = () => (
    <Box
      as="form"
      onSubmit={handleSubmitOtp(onSubmitOtp)}
      bg="white"
      p={8}
      m={20}
      rounded="xl"
      shadow="lg"
      w="full"
      maxW="md"
    >
      <Box textAlign="center" mb={8}>
        {/* Security Shield Icon */}
        <Box
          mb={6}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box
            bg="blue.50"
            w={20}
            h={20}
            rounded="full"
            display="flex"
            alignItems="center"
            justifyContent="center"
            border="8px solid"
            borderColor="blue.100"
          >
            <Icon as={LuShield} boxSize={8} color="blue.600" />
          </Box>
        </Box>

        <Heading size="lg" mb={3} color="gray.800" fontWeight="bold">
          Verify your identity
        </Heading>
        <Text fontSize="md" color="gray.500" mb={6} maxW="sm" mx="auto">
          Enter the verification code sent to your email to proceed securely
        </Text>
        {email && (
          <Box
            bg="gray.50"
            p={4}
            rounded="xl"
            border="1px solid"
            borderColor="gray.200"
            mb={6}
          >
            <Flex gap={3} justify="flex-start" align="center">
              <Icon as={LuMail} color="gray.500" boxSize={5} />
              <Box textAlign="left">
                <Text fontSize="sm" color="gray.600" fontWeight="medium">
                  Code sent to:
                </Text>
                <Text fontSize="sm" color="gray.800" fontWeight="semibold">
                  {email}
                </Text>
              </Box>
            </Flex>
          </Box>
        )}
      </Box>

      {/* OTP Field */}
      <OtpField register={registerOtp} error={errorsOtp.otp?.message} />

      {/* Timer and Resend OTP Section */}
      <Box textAlign="center" mb={6}>
        {!canResend ? (
          <Flex align="center" justify="center" gap={2} mb={2}>
            <Icon as={LuClock} color="gray.500" boxSize={4} />
            <Text fontSize="sm" color="gray.500">
              Resend code in {formatTime(timeLeft)}
            </Text>
          </Flex>
        ) : (
          <Button
            onClick={handleResendOTP}
            size="sm"
            color="blue.600"
            fontWeight="medium"
            loading={isSendingOtp}
            loadingText="Sending..."
            disabled={isSendingOtp}
            _hover={{
              color: "blue.700",
              textDecoration: "underline",
            }}
          >
            Resend verification code
          </Button>
        )}
        <Text fontSize="xs" color="gray.500" mt={2}>
          Didn't receive the code? Check your spam folder
        </Text>
      </Box>

      {/* Verify Code Button */}
      <Button
        type="submit"
        size="lg"
        w="100%"
        bg="blue.600"
        color="white"
        rounded="xl"
        py={6}
        fontSize="md"
        fontWeight="semibold"
        disabled={!isValidOtp}
        _hover={{
          bg: "blue.700",
          transform: "translateY(-1px)",
          boxShadow: "lg"
        }}
        _active={{
          transform: "translateY(0px)"
        }}
        transition="all 0.2s"
      >
        Verify Code
      </Button>

      {/* Security Footer */}
      <Box mt={8} textAlign="center">
        <Text fontSize="xs" color="gray.500" display="flex" alignItems="center" justifyContent="center" gap={2}>
          🔒 Your security is our priority. This process is encrypted and secure.
        </Text>
      </Box>
    </Box>
  )

  // Render Password Creation Step
  const renderPasswordStep = () => (
    <Box
      as="form"
      onSubmit={handleSubmitPassword(onSubmitPassword)}
      bg="white"
      p={8}
      m={20}
      rounded="xl"
      shadow="lg"
      w="full"
      maxW="md"
    >
      <Box textAlign="center" mb={8}>
        {/* Security Shield Icon */}
        <Box
          mb={6}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box
            bg="blue.50"
            w={20}
            h={20}
            rounded="full"
            display="flex"
            alignItems="center"
            justifyContent="center"
            border="8px solid"
            borderColor="blue.100"
          >
            <Icon as={LuShield} boxSize={8} color="blue.600" />
          </Box>
        </Box>

        <Heading size="lg" mb={3} color="gray.800" fontWeight="bold">
          Create new password
        </Heading>
        <Text fontSize="md" color="gray.500" mb={6} maxW="sm" mx="auto">
          Choose a strong password to protect your account
        </Text>
      </Box>

      {/* Password Fields */}
      <PasswordField
        labeltype="New Password"
        register={registerPassword}
        fieldName="password"
        error={errorsPassword.password?.message}
        password={password}
        showPassword={showPassword}
        togglePassword={() => setShowPassword((prev) => !prev)}
      />
      <PasswordField
        labeltype="Confirm Password"
        register={registerPassword}
        fieldName="confirmpassword"
        error={errorsPassword.confirmpassword?.message}
        password={confirmPassword}
        showPassword={showConfirmPassword}
        togglePassword={() => setShowConfirmPassword((prev) => !prev)}
        passwordsMatch={passwordsMatch}
        passwordsDontMatch={passwordsDontMatch}
      />

      {/* Update Password Button */}
      <Button
        type="submit"
        size="lg"
        w="100%"
        bg="blue.600"
        color="white"
        rounded="xl"
        py={6}
        fontSize="md"
        fontWeight="semibold"
        mt={4}
        loading={isPending}
        loadingText="Updating Password..."
        disabled={!isValidPassword || isPending || !!passwordsDontMatch}
        _hover={{
          bg: "blue.700",
          transform: "translateY(-1px)",
          boxShadow: "lg"
        }}
        _active={{
          transform: "translateY(0px)"
        }}
        transition="all 0.2s"
      >
        Update Password
      </Button>
    </Box>
  )

  return step === 'otp' ? renderOtpStep() : renderPasswordStep()
}
