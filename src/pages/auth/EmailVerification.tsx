import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  PinInput,
  HStack,
  VStack,
  Link,
  ProgressCircle,
} from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { toaster } from "@/components/ui/toaster";
import { LuArrowLeft, LuCircle, LuRefreshCw } from "react-icons/lu";

const EmailVerification: React.FC = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const timerRef = useRef<number | null>(null);

  // Get email from session storage
  const signupData = sessionStorage.getItem("signupData");
  const email = signupData ? JSON.parse(signupData).email : "";

  // Masked email for display
  const maskEmail = (email: string) => {
    if (!email) return "";
    const [username, domain] = email.split("@");
    const maskedUsername =
      username.charAt(0) +
      "*".repeat(Math.max(username.length - 2, 2)) +
      username.charAt(username.length - 1);
    return `${maskedUsername}@${domain}`;
  };

  useEffect(() => {
    // Start the countdown timer
    startTimer();

    return () => {
      // Clean up timer on unmount
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const startTimer = () => {
    setTimeLeft(60);

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  // @ts-expect-error: will sovle it later
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleOtpChange = (value: string) => {
    setOtp(value);
  };

  const handleVerify = () => {
    if (otp.length !== 6) {
      toaster.error({
        title: "Invalid code",
        description: "Please enter the 6-digit verification code",
        duration: 3000,
      });
      return;
    }

    setIsVerifying(true);

    // Simulate verification process
    setTimeout(() => {
      setIsVerifying(false);
      setVerificationSuccess(true);

      toaster.success({
        title: "Email verified!",
        description: "Your account has been successfully created",
        duration: 5000,
      });

      // Redirect to home/dashboard after short delay
      setTimeout(() => {
        sessionStorage.removeItem("signupData"); // Clean up
        navigate("/");
      }, 2000);
    }, 1500);
  };

  const handleResendCode = () => {
    if (timeLeft > 0) return;

    setIsResending(true);

    // Simulate resending OTP
    setTimeout(() => {
      setIsResending(false);
      startTimer();

      toaster.success({
        title: "Code resent",
        description: `We've sent a new verification code to ${maskEmail(email)}`,
        duration: 3000,
      });
    }, 1000);
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
      {verificationSuccess ? (
        <VStack spaceY={6} align="center">
          <Box
            p={3}
            borderRadius="full"
            bg="green.100"
            color="green.500"
            animation="pulse 2s infinite"
          >
            <LuCircle size={48} />
          </Box>
          <Heading size="lg">Verification Complete</Heading>
          <Text textAlign="center">
            Your email has been verified successfully. Your account is now
            active.
          </Text>
          <Text color="gray.500">Redirecting you...</Text>
        </VStack>
      ) : (
        <>
          <Flex align="center" mb={6}>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/")}
              mr={2}
            >
              <LuArrowLeft size={16} />
              Back
            </Button>
            <Heading size="lg">Verify Your Email</Heading>
          </Flex>

          <VStack spaceY={6} align="stretch">
            <Text>
              We've sent a verification code to{" "}
              <strong>{maskEmail(email)}</strong>. Enter the 6-digit code below
              to verify your email address.
            </Text>

            <Box py={4}>
              <HStack justify="center" spaceX={4}>
                <PinInput.Root>
                  <PinInput.HiddenInput />
                  <PinInput.Control>
                    <PinInput.Input index={0} />
                    <PinInput.Input index={1} />
                    <PinInput.Input index={2} />
                    <PinInput.Input index={3} />
                    <PinInput.Input index={4} />
                    <PinInput.Input index={5} />
                  </PinInput.Control>
                </PinInput.Root>
              </HStack>
            </Box>

            <Flex justify="center" align="center" direction="column">
              <ProgressCircle.Root
                value={Math.max(0, (timeLeft / 60) * 100)}
                color="brand.500"
              >
                <ProgressCircle.Label>{timeLeft}s</ProgressCircle.Label>
              </ProgressCircle.Root>

              <Button
                variant="solid"
                colorScheme="brand"
                disabled={timeLeft > 0}
                onClick={handleResendCode}
                loading={isResending}
                loadingText="Resending"
                mt={2}
              >
                <LuRefreshCw size={16} />
                {timeLeft > 0 ? `Resend code in ${timeLeft}s` : "Resend code"}
              </Button>
            </Flex>

            <Button
              colorScheme="brand"
              size="lg"
              w="100%"
              mt={4}
              onClick={handleVerify}
              loading={isVerifying}
              loadingText="Verifying"
              disabled={otp.length !== 6}
              _hover={{ transform: "translateY(-2px)", boxShadow: "md" }}
              transition="all 0.2s"
            >
              Verify Email
            </Button>

            <Text fontSize="sm" textAlign="center" color="gray.600">
              Didn't receive the email? Check your spam folder or{" "}
              <Link color="brand.500" href="#" onClick={() => navigate("/")}>
                try using a different email address
              </Link>
            </Text>
          </VStack>
        </>
      )}
    </Box>
  );
};

export default EmailVerification;
