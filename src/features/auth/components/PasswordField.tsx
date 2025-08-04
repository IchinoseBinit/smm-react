import { Box, Button, Field, Flex, Input, Text } from "@chakra-ui/react"
import { calculatePasswordStrength, getStrengthLabel } from "../lib/utils"
import { LuEye, LuEyeOff, LuCheck, LuX } from "react-icons/lu"

export default function PasswordField({
  register,
  error,
  password,
  showPassword,
  togglePassword,
  labeltype,
  fieldName = "password",
  passwordsMatch,
  passwordsDontMatch,
}: any) {
  const { color, label } = getStrengthLabel(calculatePasswordStrength(password))

  return (
    <Field.Root invalid={!!error} mt={4}>
      <Field.Label>
        <Flex align="center" gap={2}>
          {labeltype}
          {/* Show match/mismatch indicator for confirm password */}
          {fieldName === "confirmpassword" && password && (
            <>
              {passwordsMatch && (
                <Flex align="center" gap={1} color="green.500">
                  <LuCheck size={16} />
                  <Text fontSize="xs">Match</Text>
                </Flex>
              )}
              {passwordsDontMatch && (
                <Flex align="center" gap={1} color="red.500">
                  <LuX size={16} />
                  <Text fontSize="xs">Don't match</Text>
                </Flex>
              )}
            </>
          )}
        </Flex>
      </Field.Label>
      <Box position="relative" w="100%">
        <Input
          {...register(fieldName)}
          type={showPassword ? "text" : "password"}
          placeholder={
            labeltype === "Confirm Password"
              ? "Confirm your password"
              : "Create a password"
          }
          pr="2.5rem"
          borderRadius="md"
          w="100%"
          // Add border color based on password match status
          borderColor={
            fieldName === "confirmpassword" && password
              ? passwordsMatch
                ? "green.300"
                : passwordsDontMatch
                ? "red.300"
                : undefined
              : undefined
          }
          _focus={{
            borderColor:
              fieldName === "confirmpassword" && password
                ? passwordsMatch
                  ? "green.500"
                  : passwordsDontMatch
                  ? "red.500"
                  : "blue.500"
                : "blue.500",
          }}
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

      {/* Only show password strength for the main password field, not confirm password */}
      {password && fieldName === "password" && (
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
  )
}
