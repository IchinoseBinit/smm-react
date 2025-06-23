import { Field, PinInput } from "@chakra-ui/react";

export default function OtpField({ register, error }: any) {
  return (
    <Field.Root invalid={!!error} mt={4}>
      <Field.Label>Enter OTP</Field.Label>
      <PinInput.Root>
        <PinInput.HiddenInput {...register("otp")} />
        <PinInput.Control>
          {[...Array(6)].map((_, i) => (
            <PinInput.Input key={i} index={i} />
          ))}
        </PinInput.Control>
      </PinInput.Root>
      <Field.ErrorText>{error}</Field.ErrorText>
    </Field.Root>
  );
}
