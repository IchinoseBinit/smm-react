import { Flex, Avatar, Text, IconButton, VStack } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";

const ConnectAccountCard = () => {
  return (
    <Flex
      justify="space-between"
      align="center"
      bg="gray.50"
      _dark={{ bg: "gray.800" }}
      p={4}
      borderRadius="lg"
      boxShadow="sm"
    >
      <Flex align="center" gap={4}>
        <Avatar.Root shape="square" size="lg">
          <Avatar.Fallback name="Dan Abramov" />
          <Avatar.Image src="https://bit.ly/dan-abramov" />
        </Avatar.Root>
        <VStack align="start" spaceY={0}>
          <Text fontWeight="bold">Connect account</Text>
          <Text fontSize="sm" color="blue.500">
            Connect your social media accounts to manage your content.
          </Text>
        </VStack>
      </Flex>
      <IconButton aria-label="Options" fontSize="xl">
        <BsThreeDots />
      </IconButton>
    </Flex>
  );
};

export default ConnectAccountCard;
