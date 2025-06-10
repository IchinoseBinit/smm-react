import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  VStack,
  Link,
  ProgressCircle,
  Field,
  PinInput,
} from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { toaster } from "@/components/ui/toaster";
import { LuArrowLeft, LuRefreshCw } from "react-icons/lu";
import useEmailStore from "@/lib/store/useEmailStore";
import { verifyOtpSchema, type VerifyOtpFormData } from "@/lib/zod/AuthSchema";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSendOtp, useVerifyOtp } from "@/hooks/useAuthUser";

const EmailVerification: React.FC = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(60);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const timerRef = useRef<any | null>(null);

  const { email } = useEmailStore();
  const { mutate: sendOtp } = useSendOtp();
  const { mutate: verifyOtp } = useVerifyOtp();

  const sendOtpFunc = (e: string) => {
    sendOtp(e);
  };
  useEffect(() => {
    if (!email) {
      navigate("/register");
    }
    sendOtpFunc(email);
  }, [email, navigate]);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<VerifyOtpFormData>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: {},
  });

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
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const startTimer = () => {
    setTimeLeft(60);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleResendCode = () => {
    if (timeLeft > 0) return;

    setIsResending(true);
    setTimeout(() => {
      setIsResending(false);
      sendOtpFunc(email);
      startTimer();
      toaster.success({
        title: "Code resent",
        description: `We've sent a new verification code to ${maskEmail(email)}`,
        duration: 3000,
      });
    }, 1000);
  };

  const onSubmit = (data: VerifyOtpFormData) => {
    const datas = { email, otp: data.otp.join() };
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      verifyOtp(datas);
    }, 1500);
  };

  return (
    <Box
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      bg="white"
      boxShadow="md"
      borderRadius="lg"
      p={8}
      w="100%"
      maxW="md"
      mx="auto"
      transition="all 0.3s ease"
    >
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
            <strong>{maskEmail(email)}</strong>. Enter the 6-digit code below to
            verify your email address.
          </Text>

          <Field.Root invalid={!!errors.otp}>
            <Controller
              control={control}
              name="otp"
              render={({ field }) => (
                <PinInput.Root
                  value={field.value}
                  onValueChange={(e) => field.onChange(e.value)}
                >
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
              )}
            />
            <Field.ErrorText>{errors.otp?.message}</Field.ErrorText>
          </Field.Root>

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
            type="submit"
            colorScheme="brand"
            size="lg"
            w="100%"
            mt={4}
            loading={isVerifying}
            loadingText="Verifying"
            disabled={watch("otp")?.length !== 6}
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
    </Box>
  );
};

export default EmailVerification;
