import { Field, Input } from "@chakra-ui/react";

export default function EmailField({ register, error }: any) {
  return (
    <Field.Root invalid={!!error}>
      <Field.Label>Email Address</Field.Label>
      <Input
        {...register("email")}
        type="email"
        placeholder="Enter your email"
        borderRadius="md"
      />
      <Field.ErrorText>{error}</Field.ErrorText>
    </Field.Root>
  );
}
