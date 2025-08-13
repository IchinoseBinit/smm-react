import { Box, Flex, Image, Link, Button, Icon } from "@chakra-ui/react"
import { getStartedLinks } from "../lib/Links"
import logo from "@/assets/app/Header Logo White.png"
import { BsRocketTakeoffFill } from "react-icons/bs"

export default function Header() {
  return (
    <Box as="header" bg="white" whiteSpace="nowrap" p={2}>
      <Flex
        maxW="container.xl"
        mx="auto"
        align="center"
        justify="space-between"
      >
        <Flex align="center" gap={2}>
          <Box
            rounded="lg"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Link href="/">
              <Image
                src={logo}
                alt="logo"
                boxSize="80px"
                objectFit="contain"
                userSelect="none"
                loading="eager"
              />
            </Link>
          </Box>
        </Flex>
        <Box
          as="nav"
          display={{ base: "none", md: "flex" }}
          alignItems="center"
          gap={8}
          fontWeight={500}
        >
          <Link
            href="#features"
            color="gray.600"
            _hover={{ color: "gray.900" }}
          >
            Features
          </Link>
          <Link href="#pricing" color="gray.600" _hover={{ color: "gray.900" }}>
            Pricing
          </Link>
          <Link href="/aboutus" color="gray.600" _hover={{ color: "gray.900" }}>
            About us
          </Link>
          <Link href="#contact" color="gray.600" _hover={{ color: "gray.900" }}>
            Contact
          </Link>
        </Box>
        <Flex align="center" gap={4}>
          {/* <Link href={loginLinks}> */}
          <Link href={"/login"}>
            <Button
              variant="ghost"
              color="gray.600"
              _hover={{ cursor: "pointer" }}
              fontWeight={600}
            >
              Sign In
            </Button>
          </Link>
          <Link href={getStartedLinks} _hover={{ textDecoration: "none" }}>
            <Button
              bg="blue.500"
              color="white"
              _hover={{
                bg: "blue.600",
                cursor: "pointer",
              }}
              borderRadius={8}
              fontWeight={600}
              _focus={{ outline: "none" }}
            >
              <Icon>
                <BsRocketTakeoffFill />
              </Icon>
              Get Started
            </Button>
          </Link>
        </Flex>
      </Flex>
    </Box>
  )
}
