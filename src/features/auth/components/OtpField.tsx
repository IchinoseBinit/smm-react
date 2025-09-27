import { Field, PinInput, Text, Box } from "@chakra-ui/react";

export default function OtpField({ register, error }: any) {
  return (
    <Field.Root alignItems="center" invalid={!!error} mt={6} mb={6}>
      <Box textAlign="center" mb={4}>
        <Text fontSize="lg" fontWeight="semibold" color="gray.800" mb={6}>
          Enter verification code
        </Text>
      </Box>
      <PinInput.Root size="lg" >
        <PinInput.HiddenInput {...register("otp")} />
        <PinInput.Control display="flex" justifyContent="center" gap={3}>
          {[...Array(6)].map((_, i) => (
            <PinInput.Input
              key={i}
              index={i}
              bg="gray.50"
              border="2px solid"
              borderColor="gray.200"
              rounded="md"
              w={12}
              h={12}
              fontSize="lg"
              fontWeight="bold"
              textAlign="center"
              _focus={{
                borderColor: "blue.500",
                bg: "white",
                boxShadow: "0 0 0 1px var(--chakra-colors-blue-500)"
              }}
              _invalid={{
                borderColor: "red.500"
              }}
            />
          ))}
        </PinInput.Control>
      </PinInput.Root>
      <Field.ErrorText textAlign="center" mt={2}>{error}</Field.ErrorText>
    </Field.Root>
  )
}
