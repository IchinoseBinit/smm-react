import { toaster } from "@/components/ui/toaster";
import { useSendOtp } from "@/hooks/useAuthUser";
import useEmailStore from "@/lib/store/useEmailStore";
import { sendOtpSchema, type SendOtpFormData } from "@/lib/zod/AuthSchema";
import { Box, Button, Field, Heading, Input, Text } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

export default function SendOtp() {
  const { setEmail } = useEmailStore();
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useSendOtp();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SendOtpFormData>({
    resolver: zodResolver(sendOtpSchema),
    defaultValues: {},
  });

  const onSubmit = async (data: SendOtpFormData) => {
    try {
      await mutateAsync(data.email);
      setEmail(data.email);
      navigate("/reset-password");
    } catch (error) {
      console.error(error);
      // optional: show toaster here
      toaster.error({
        title: "Error",
        description: "Something went wrong. Please try again.",
        duration: 5000,
      });
    }
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
            Send Otp
          </Heading>
          <Text fontSize="sm" color="gray.500">
            We'll send a one-time password (OTP) to your <strong>email</strong>.
          </Text>
        </Box>

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

        <Button
          type="submit"
          colorScheme="brand"
          size="lg"
          w="100%"
          mt={4}
          disabled={isPending}
          loadingText="Sending OTP"
          _hover={{ transform: "translateY(-2px)", boxShadow: "md" }}
          transition="all 0.2s"
        >
          Continue
        </Button>
      </Box>
    </Box>
  );
}
