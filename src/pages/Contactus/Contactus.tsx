import React, { useState } from 'react'
import {
  Box,
  Container,
  Grid,
  Heading,
  Text,
  Button,
  Input,
  Textarea,
  VStack,
  HStack,
  Icon,
  Field,
  Image
} from "@chakra-ui/react"
import { FiPhone, FiMail, FiMapPin, FiClock, FiCheckCircle } from 'react-icons/fi'
import ContactusSvg from "@/assets/Contactus.svg"

const Contactus = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    subject: '',
    message: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Add form submission logic here
  }

  return (
    <Container maxW="7xl" >
      {/* Top Section - Hero with Image */}
      <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={6}  mb={8} alignItems="center">
        {/* Left - Hero Content */}
        <VStack align="start" gap={6}>
          <Box>
            <Heading 
              size="2xl" 
              color="gray.800" 
              mb={4}
              fontWeight="600"
            >
              Get in touch
            </Heading>
            <Text color="gray.600" fontSize="lg" mb={6}>
              We'd love to hear from you. Send us a message and we will respond as soon as possible.
            </Text>
          </Box>

          {/* Response Time Info */}
          <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={4} w="full">
            <HStack gap={3} p={4} bg="blue.50" borderRadius="lg">
              <Icon as={FiCheckCircle} color="blue.500" boxSize={5} />
              <VStack align="start" gap={1}>
                <Text fontWeight="semibold" color="blue.700" fontSize="sm">
                  Response time
                </Text>
                <Text color="blue.600" fontSize="sm">
                  Within 24 hours
                </Text>
              </VStack>
            </HStack>
            <HStack gap={3} p={4} bg="green.50" borderRadius="lg">
              <Icon as={FiCheckCircle} color="green.500" boxSize={5} />
              <VStack align="start" gap={1}>
                <Text fontWeight="semibold" color="green.700" fontSize="sm">
                  Support Team
                </Text>
                <Text color="green.600" fontSize="sm">
                  Always Available
                </Text>
              </VStack>
            </HStack>
          </Grid>
        </VStack>

        {/* Right - Hero Image */}
        <Box>
          <Box
            h="350px"
            borderRadius="xl"
            overflow="hidden"
            bg="gray.100"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Image src={ContactusSvg} alt='contact us' width={"full"} height={"full"} objectFit="cover"/>
          </Box>
        </Box>
      </Grid>

      {/* Bottom Section - Form and Contact Info */}
      <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={8} alignItems="start">
        {/* Left Side - Contact Form */}
        <Box
          bg="white"
          p={8}
          borderRadius="xl"
          border="1px solid"
          borderColor="gray.200"
          boxShadow="lg"
        >
          <form onSubmit={handleSubmit}>
            <VStack gap={6} align="stretch">
              <Box>
                <Heading size="xl" color="gray.800" mb={3}>
                  Send us a Message
                </Heading>
                <Text color="gray.600" fontSize="md" mb={4}>
                  Fill out the form and we will get back to you as soon as possible.
                </Text>
              </Box>

                    {/* Name Fields */}
                    <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={4}>
                      <Field.Root>
                        <Field.Label color="gray.700" fontWeight="medium">
                          First Name
                        </Field.Label>
                        <Input
                          name="firstName"
                          placeholder="John"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          bg="gray.50"
                          border="1px solid"
                          borderColor="gray.200"
                          _focus={{
                            borderColor: "blue.400",
                            boxShadow: "0 0 0 1px rgb(59, 130, 246, 0.3)"
                          }}
                        />
                      </Field.Root>

                      <Field.Root>
                        <Field.Label color="gray.700" fontWeight="medium">
                          Last Name
                        </Field.Label>
                        <Input
                          name="lastName"
                          placeholder="Doe"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          bg="gray.50"
                          border="1px solid"
                          borderColor="gray.200"
                          _focus={{
                            borderColor: "blue.400",
                            boxShadow: "0 0 0 1px rgb(59, 130, 246, 0.3)"
                          }}
                        />
                      </Field.Root>
                    </Grid>

                    {/* Contact Fields */}
                    <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={4}>
                      <Field.Root>
                        <Field.Label color="gray.700" fontWeight="medium">
                          Email
                        </Field.Label>
                        <Input
                          name="email"
                          type="email"
                          placeholder="john@gmail.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          bg="gray.50"
                          border="1px solid"
                          borderColor="gray.200"
                          _focus={{
                            borderColor: "blue.400",
                            boxShadow: "0 0 0 1px rgb(59, 130, 246, 0.3)"
                          }}
                        />
                      </Field.Root>

                      <Field.Root>
                        <Field.Label color="gray.700" fontWeight="medium">
                          Phone Number
                        </Field.Label>
                        <Input
                          name="phoneNumber"
                          placeholder="+977 980-1234776"
                          value={formData.phoneNumber}
                          onChange={handleInputChange}
                          bg="gray.50"
                          border="1px solid"
                          borderColor="gray.200"
                          _focus={{
                            borderColor: "blue.400",
                            boxShadow: "0 0 0 1px rgb(59, 130, 246, 0.3)"
                          }}
                        />
                      </Field.Root>
                    </Grid>

                    {/* Subject */}
                    <Field.Root>
                      <Field.Label color="gray.700" fontWeight="medium">
                        Subject
                      </Field.Label>
                      <Input
                        name="subject"
                        placeholder="Select a Subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        bg="gray.50"
                        border="1px solid"
                        borderColor="gray.200"
                        _focus={{
                          borderColor: "blue.400",
                          boxShadow: "0 0 0 1px rgb(59, 130, 246, 0.3)"
                        }}
                      />
                    </Field.Root>

                    {/* Message */}
                    <Field.Root>
                      <Field.Label color="gray.700" fontWeight="medium">
                        Message
                      </Field.Label>
                      <Textarea
                        name="message"
                        placeholder="Please write us details about your enquiry..."
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={5}
                        bg="gray.50"
                        border="1px solid"
                        borderColor="gray.200"
                        _focus={{
                          borderColor: "blue.400",
                          boxShadow: "0 0 0 1px rgb(59, 130, 246, 0.3)"
                        }}
                        resize="vertical"
                      />
                    </Field.Root>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      colorScheme="green"
                      size="lg"
                      w="full"
                      bg="green.500"
                      _hover={{ bg: "green.600" }}
                      _active={{ bg: "green.700" }}
                    >
                      Send Message
                    </Button>
                  </VStack>
                </form>
        </Box>

        {/* Right Side - Contact Information */}
        <Box
          bg="gray.50"
          p={8}
          borderRadius="xl"
          border="1px solid"
          borderColor="gray.200"
          boxShadow="lg"
        >
          <VStack align="stretch" gap={6}>
            <Box>
              <Heading size="xl" color="gray.800" mb={3}>
                Contact Information
              </Heading>
              <Text color="gray.600" fontSize="md" mb={6}>
                Get in touch with us directly through any of these channels.
              </Text>
            </Box>

            {/* Contact Info Items */}
            <VStack gap={6} align="stretch">
              {/* Phone */}
              <HStack gap={4} p={4} bg="white" borderRadius="lg" boxShadow="sm">
                <Box
                  p={3}
                  bg="blue.100"
                  borderRadius="lg"
                  color="blue.600"
                >
                  <Icon as={FiPhone} boxSize={6} />
                </Box>
                <VStack align="start" gap={1} flex={1}>
                  <Text fontWeight="semibold" color="gray.800" fontSize="lg">
                    Phone Number
                  </Text>
                  <VStack align="start" gap={0}>
                    <Text color="gray.600" fontSize="sm">+977 980-1234776</Text>
                    <Text color="gray.600" fontSize="sm">+977 980-1234776</Text>
                  </VStack>
                </VStack>
              </HStack>

              {/* Email */}
              <HStack gap={4} p={4} bg="white" borderRadius="lg" boxShadow="sm">
                <Box
                  p={3}
                  bg="green.100"
                  borderRadius="lg"
                  color="green.600"
                >
                  <Icon as={FiMail} boxSize={6} />
                </Box>
                <VStack align="start" gap={1} flex={1}>
                  <Text fontWeight="semibold" color="gray.800" fontSize="lg">
                    Email
                  </Text>
                  <Text color="gray.600" fontSize="sm">
                    team@gmail.com
                  </Text>
                </VStack>
              </HStack>

              {/* Address */}
              <HStack gap={4} p={4} bg="white" borderRadius="lg" boxShadow="sm" align="start">
                <Box
                  p={3}
                  bg="purple.100"
                  borderRadius="lg"
                  color="purple.600"
                >
                  <Icon as={FiMapPin} boxSize={6} />
                </Box>
                <VStack align="start" gap={1} flex={1}>
                  <Text fontWeight="semibold" color="gray.800" fontSize="lg">
                    Address
                  </Text>
                  <VStack align="start" gap={0}>
                    <Text color="gray.600" fontSize="sm">
                      team@gmail.com
                    </Text>
                    <Text color="gray.600" fontSize="sm">
                      team@gmail.com
                    </Text>
                  </VStack>
                </VStack>
              </HStack>

              {/* Business Hours */}
              <HStack gap={4} p={4} bg="white" borderRadius="lg" boxShadow="sm" align="start">
                <Box
                  p={3}
                  bg="orange.100"
                  borderRadius="lg"
                  color="orange.600"
                >
                  <Icon as={FiClock} boxSize={6} />
                </Box>
                <VStack align="start" gap={1} flex={1}>
                  <Text fontWeight="semibold" color="gray.800" fontSize="lg">
                    Business Hour
                  </Text>
                  <VStack align="start" gap={0}>
                    <Text color="gray.600" fontSize="sm">
                      Monday - Friday: 9:00AM-6:00PM
                    </Text>
                    <Text color="gray.600" fontSize="sm">
                      Mon-Fri, 9:00AM-6:00PM
                    </Text>
                  </VStack>
                </VStack>
              </HStack>
            </VStack>
          </VStack>
        </Box>
      </Grid>
    </Container>
  )
}

export default Contactus
