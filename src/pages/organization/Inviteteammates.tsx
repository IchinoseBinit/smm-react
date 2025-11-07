import React, { useState } from "react"
import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Input,
  Text,
  VStack,
  Icon,
  Field,
  Image,
  SimpleGrid,
  Checkbox,
  Skeleton,
} from "@chakra-ui/react"
import { FiMail, FiUsers, FiX } from "react-icons/fi"
import LightLogo from "@/assets/app/Header Logo White.png"
import { useRoles, useCreateOrgInvite } from "@/features/Organization/hooks/useOrganization"

interface TeamMember {
  email: string
  roles: number[]
}

interface FormErrors {
  email?: string
  roles?: string
}

interface InviteteammatesProps {
  orgId?: string | number
}

const Inviteteammates: React.FC<InviteteammatesProps> = ({ orgId = "1" }) => {
  const { data: roles, isLoading: rolesLoading, error: rolesError } = useRoles()
  const { mutate: createInvite, isPending: isInviting } = useCreateOrgInvite()
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    { email: "", roles: [] },
  ])
  const [errors, setErrors] = useState<FormErrors[]>([{}])

  const handleEmailChange = (index: number, email: string) => {
    const updatedMembers = [...teamMembers]
    updatedMembers[index].email = email
    setTeamMembers(updatedMembers)

    // Clear email error when user starts typing
    if (errors[index]?.email) {
      const updatedErrors = [...errors]
      delete updatedErrors[index].email
      setErrors(updatedErrors)
    }
  }

  const handleRoleChange = (
    memberIndex: number,
    roleId: number,
    checked: boolean
  ) => {
    const updatedMembers = [...teamMembers]
    if (checked) {
      updatedMembers[memberIndex].roles = [
        ...updatedMembers[memberIndex].roles,
        roleId,
      ]
    } else {
      updatedMembers[memberIndex].roles = updatedMembers[
        memberIndex
      ].roles.filter((role) => role !== roleId)
    }
    setTeamMembers(updatedMembers)

    // Clear roles error when user selects a role
    if (errors[memberIndex]?.roles) {
      const updatedErrors = [...errors]
      delete updatedErrors[memberIndex].roles
      setErrors(updatedErrors)
    }
  }

  // const addTeamMember = () => {
  //   setTeamMembers([...teamMembers, { email: "", roles: [] }])
  //   setErrors([...errors, {}])
  // }

  const removeTeamMember = (index: number) => {
    if (teamMembers.length > 1) {
      const updatedMembers = teamMembers.filter((_, i) => i !== index)
      const updatedErrors = errors.filter((_, i) => i !== index)
      setTeamMembers(updatedMembers)
      setErrors(updatedErrors)
    }
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors[] = []
    let isValid = true

    teamMembers.forEach((member, index) => {
      const memberErrors: FormErrors = {}

      if (!member.email.trim()) {
        memberErrors.email = "Email is required"
        isValid = false
      } else if (!/\S+@\S+\.\S+/.test(member.email)) {
        memberErrors.email = "Email is invalid"
        isValid = false
      }

      if (member.roles.length === 0) {
        memberErrors.roles = "At least one role must be selected"
        isValid = false
      }

      newErrors[index] = memberErrors
    })

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = () => {
    if (validateForm()) {
      // Send invites for each team member with each of their selected roles
      teamMembers.forEach((member) => {
        member.roles.forEach((roleId) => {
          createInvite({
            orgId,
            data: {
              email: member.email,
              role_id: roleId
            }
          })
        })
      })
    }
  }

  return (
    <Box
      minH="100vh"
      bg="gray.50"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={4}
    >
      <Container maxW="lg" py={4}>
        <VStack gap={4} w="full">
          {/* Logo */}

          {/* Form Container */}
          <Box
            bg="white"
            p={5}
            borderRadius="lg"
            w="full"
            maxW="lg"
            mx="auto"
            boxShadow="lg"
            border="1px solid"
            borderColor="gray.100"
          >
            <VStack gap={2} textAlign="center">
              <Image src={LightLogo} height={6} width="auto" maxW="100%" />
            </VStack>
            <VStack gap={4} mt={4}>
              <VStack gap={1} textAlign="center">
                <Heading size="lg" color="gray.900" fontWeight="bold">
                  Invite Team Members
                </Heading>
                <Text color="gray.600" fontSize="sm" maxW="md">
                  Add team members to your organization and assign their roles
                </Text>
              </VStack>

              {/* Team Members Section */}
              <VStack gap={3} w="full">
                {teamMembers.map((member, memberIndex) => (
                  <Box
                    key={memberIndex}
                    w="full"
                    p={3}
                    border="1px solid"
                    borderColor="gray.200"
                    borderRadius="md"
                    bg="white"
                    boxShadow="sm"
                    _hover={{ boxShadow: "md" }}
                    transition="all 0.2s"
                  >
                    <VStack gap={3} w="full">
                      {/* Header with member number and remove button */}
                      <HStack w="full" justify="space-between" align="center">
                        <HStack gap={2}>
                          <Box bg="blue.50" p={1} borderRadius="md">
                            <Icon as={FiUsers} color="blue.600" boxSize={3.5} />
                          </Box>
                          <Text
                            fontWeight="bold"
                            color="gray.800"
                            fontSize="sm"
                          >
                            Team Member {memberIndex + 1}
                          </Text>
                        </HStack>
                        {teamMembers.length > 1 && (
                          <Button
                            size="sm"
                            variant="ghost"
                            colorScheme="red"
                            onClick={() => removeTeamMember(memberIndex)}
                            borderRadius="full"
                            _hover={{ bg: "red.50" }}
                          >
                            <Icon as={FiX} boxSize={4} />
                          </Button>
                        )}
                      </HStack>

                      {/* Email Input */}
                      <Field.Root w="full">
                        <Field.Label
                          color="gray.800"
                          fontWeight="semibold"
                          fontSize="sm"
                          mb={2}
                        >
                          Email Address
                        </Field.Label>
                        <Box position="relative" w="full" maxW="none">
                          <Input
                            type="email"
                            placeholder="Enter email address"
                            value={member.email}
                            onChange={(e) =>
                              handleEmailChange(memberIndex, e.target.value)
                            }
                            pl={9}
                            pr={3}
                            py={1.5}
                            h={9}
                            w="full"
                            border="1px solid"
                            borderColor={
                              errors[memberIndex]?.email
                                ? "red.300"
                                : "gray.200"
                            }
                            borderRadius="lg"
                            bg="gray.50"
                            fontSize="md"
                            fontWeight="medium"
                            _focus={{
                              borderColor: "blue.400",
                              boxShadow: "0 0 0 4px rgba(66, 153, 225, 0.1)",
                              outline: "none",
                              bg: "white",
                            }}
                            _hover={{
                              borderColor: "gray.300",
                              bg: "white",
                            }}
                            _placeholder={{
                              color: "gray.400",
                              fontWeight: "normal",
                            }}
                          />
                          <Icon
                            as={FiMail}
                            color="gray.500"
                            position="absolute"
                            left={3}
                            top="50%"
                            transform="translateY(-50%)"
                            boxSize={4}
                          />
                        </Box>
                        {errors[memberIndex]?.email && (
                          <Text
                            color="red.500"
                            fontSize="sm"
                            mt={2}
                            fontWeight="medium"
                          >
                            {errors[memberIndex].email}
                          </Text>
                        )}
                      </Field.Root>

                      {/* Roles Selection */}
                      <Field.Root w="full">
                        <Field.Label
                          color="gray.800"
                          fontWeight="semibold"
                          fontSize="sm"
                          mb={2}
                        >
                          Roles
                        </Field.Label>
                        {rolesLoading && (
                          <SimpleGrid
                            columns={{ base: 1, md: 1 }}
                            gap={4}
                            mt={2}
                            width={"full"}
                          >
                            {[1].map((i) => (
                              <Box
                                key={i}
                                p={5}
                                border="2px solid"
                                borderColor="gray.200"
                                borderRadius="xl"
                                bg="white"
                                width={"full"}
                              >
                                <HStack gap={4} align="start">
                                  <Skeleton
                                    height="20px"
                                    width="20px"
                                    borderRadius="md"
                                    mt={1}
                                  />
                                  <VStack gap={2} align="start" flex={1}>
                                    <Skeleton height="14px" width="80%" />
                                  </VStack>
                                </HStack>
                              </Box>
                            ))}
                          </SimpleGrid>
                        )}
                        {rolesError && (
                          <Box
                            p={4}
                            bg="red.50"
                            borderRadius="lg"
                            border="1px solid"
                            borderColor="red.200"
                          >
                            <Text
                              color="red.600"
                              fontSize="md"
                              fontWeight="medium"
                            >
                              Error loading roles
                            </Text>
                          </Box>
                        )}
                        {roles && (
                          <SimpleGrid
                            columns={{ base: 1, md: 1 }}
                            gap={4}
                            mt={2}
                          >
                            {roles.map((role) => (
                              <Box
                                key={role.id}
                                p={2.5}
                                border="1px solid"
                                borderColor={
                                  member.roles.includes(role.id)
                                    ? "blue.300"
                                    : "gray.200"
                                }
                                borderRadius="lg"
                                bg={
                                  member.roles.includes(role.id)
                                    ? "blue.50"
                                    : "white"
                                }
                                _hover={{
                                  bg: member.roles.includes(role.id)
                                    ? "blue.100"
                                    : "gray.50",
                                  borderColor: member.roles.includes(role.id)
                                    ? "blue.400"
                                    : "gray.300",
                                }}
                                cursor="pointer"
                                transition="all 0.2s"
                                onClick={() =>
                                  handleRoleChange(
                                    memberIndex,
                                    role.id,
                                    !member.roles.includes(role.id)
                                  )
                                }
                              >
                                <HStack gap={3} align="start">
                                  <Checkbox.Root
                                    checked={member.roles.includes(role.id)}
                                    onCheckedChange={(details) =>
                                      handleRoleChange(
                                        memberIndex,
                                        role.id,
                                        details.checked as boolean
                                      )
                                    }
                                    colorPalette="blue"
                                    mt={0.5}
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <Checkbox.HiddenInput />
                                    <Checkbox.Control>
                                      <Checkbox.Indicator />
                                    </Checkbox.Control>
                                  </Checkbox.Root>
                                  <VStack gap={0.5} align="start" flex={1}>
                                    <Text
                                      fontWeight="semibold"
                                      fontSize="sm"
                                      color="gray.800"
                                    >
                                      {role.name}
                                    </Text>
                                    <Text
                                      fontSize="sm"
                                      color="gray.600"
                                      lineHeight="1.4"
                                    >
                                      {[
                                        role.can_post && "Can post",
                                        role.can_approve && "Can approve",
                                        role.can_view_analytics &&
                                          "Can view analytics",
                                        role.can_manage_billing &&
                                          "Can manage billing",
                                      ]
                                        .filter(Boolean)
                                        .join(" • ")}
                                    </Text>
                                  </VStack>
                                </HStack>
                              </Box>
                            ))}
                          </SimpleGrid>
                        )}
                        {errors[memberIndex]?.roles && (
                          <Text
                            color="red.500"
                            fontSize="sm"
                            mt={3}
                            fontWeight="medium"
                          >
                            {errors[memberIndex].roles}
                          </Text>
                        )}
                      </Field.Root>
                    </VStack>
                  </Box>
                ))}
              </VStack>

              {/* Submit Button */}
              <Button
                w="full"
                bg="blue.500"
                color="white"
                size="sm"
                _active={{ bg: "blue.700" }}
                onClick={handleSubmit}
                py={4}
                borderRadius="md"
                fontSize="sm"
                fontWeight="bold"
                boxShadow="md"
                _hover={{
                  bg: "blue.600",
                  transform: "translateY(-1px)",
                  boxShadow: "lg",
                }}
                transition="all 0.2s"
                loading={isInviting}
                disabled={isInviting}
              >
                {isInviting ? "Sending Invitations..." : "Send Invitations"}
              </Button>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  )
}

export default Inviteteammates
