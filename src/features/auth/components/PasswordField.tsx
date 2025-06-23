import { Box, Button, Field, Flex, Input, Text } from "@chakra-ui/react";
import { calculatePasswordStrength, getStrengthLabel } from "../lib/utils";
import { LuEye, LuEyeOff } from "react-icons/lu";

export default function PasswordField({
  register,
  error,
  password,
  showPassword,
  togglePassword,
}: any) {
  const { color, label } = getStrengthLabel(
    calculatePasswordStrength(password),
  );
  return (
    <Field.Root invalid={!!error} mt={4}>
      <Field.Label>New Password</Field.Label>
      <Box position="relative" w="100%">
        <Input
          {...register("password")}
          type={showPassword ? "text" : "password"}
          placeholder="Create a password"
          pr="2.5rem"
          borderRadius="md"
          w="100%"
        />
        <Button
          variant="ghost"
          size="sm"
          position="absolute"
          top="50%"
          right="0.5rem"
          transform="translateY(-50%)"
          onClick={togglePassword}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <LuEyeOff size={18} /> : <LuEye size={18} />}
        </Button>
      </Box>

      {password && (
        <Flex align="center" mt={2}>
          <Box w="100%" h="2px" bg="gray.200" borderRadius="full">
            <Box
              w={`${(calculatePasswordStrength(password) / 5) * 100}%`}
              h="100%"
              bg={color}
              borderRadius="full"
              transition="width 0.3s ease"
            />
          </Box>
          <Text ml={2} fontSize="sm" color={color}>
            {label}
          </Text>
        </Flex>
      )}
      <Field.ErrorText>{error}</Field.ErrorText>
    </Field.Root>
  );
}
