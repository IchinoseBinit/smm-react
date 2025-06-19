import { toaster } from "@/components/ui/toaster";
import { useSendOtp } from "@/hooks/useAuthUser";
import useEmailStore from "@/lib/store/useEmailStore";
import { sendOtpSchema, type SendOtpFormData } from "@/lib/zod/AuthSchema";
import {
  Box,
  Button,
  Field,
  Flex,
  Heading,
  Image,
  Input,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

export default function SendOtp() {
  const { setEmail } = useEmailStore();
  const isMobile = useBreakpointValue({ base: true, lg: false });
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
    <>
      <Box minH="100vh" bg="white" className="light">
        <Flex direction={{ base: "column", lg: "row" }} minH="100vh">
          {/* Form Section */}
          <Box
            flex="1"
            p={{ base: 8, lg: 12 }}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Box
              minH="100vh"
              display="flex"
              justifyContent="center"
              alignItems="center"
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
                    We'll send a one-time password (OTP) to your{" "}
                    <strong>email</strong>.
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
                  loading={isPending}
                  loadingText="Sending OTP"
                  _hover={{ transform: "translateY(-2px)", boxShadow: "md" }}
                  transition="all 0.2s"
                >
                  Continue
                </Button>
              </Box>
            </Box>
          </Box>

          {/* Image Section - Only shown on larger screens */}
          {!isMobile && (
            <Box flex="1" bg="gray.700" position="relative" overflow="hidden">
              <Box
                position="absolute"
                inset={0}
                bgGradient="linear(to-br, blue.600, blue.800)"
                opacity={0.9}
                zIndex={1}
              />

              <Box
                position="relative"
                zIndex={2}
                p={12}
                color="white"
                maxW="xl"
                mx="auto"
                h="full"
                display="flex"
                flexDirection="column"
                justifyContent="center"
              >
                <Text
                  fontSize={{ base: "3xl", md: "4xl" }}
                  fontWeight="bold"
                  mb={6}
                  lineHeight="tight"
                >
                  Empower your brand with AI-driven social media insights
                </Text>
                <Text fontSize="lg" color="blue.100" mb={8}>
                  Unlock the potential of your social presence with intelligent
                  analytics and content strategies.
                </Text>
              </Box>
              <Image
                src="https://img.freepik.com/free-vector/gradient-network-connection-background_23-2148865392.jpg"
                alt="Digital marketing illustration"
                position="absolute"
                inset={0}
                objectFit="cover"
                w="full"
                h="full"
                opacity={0.4}
              />
            </Box>
          )}
        </Flex>
      </Box>
    </>
  );
}
