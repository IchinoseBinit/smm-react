import { VStack , Text, HStack, Image, Button} from '@chakra-ui/react'

import { LuCalendar } from "react-icons/lu"

import womenimg from "@/assets/womenimg.png"
import type { Post, StatusConfig } from "../types"
import { formatToLocalTime } from "@/lib/helper/formateDateTime"
import React from "react"
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa"

const getPlatformIcon = (accountType: string): React.ReactNode | null => {
  switch (accountType.toUpperCase()) {
    case "FACEBOOK":
      return <FaFacebook color="#1877F2" size={20} />
    case "INSTAGRAM":
      return <FaInstagram color="#E4405F" size={20} />
    case "TWITTER":
      return <FaTwitter color="#1DA1F2" size={20} />
    case "LINKEDIN":
      return <FaLinkedin color="#0A66C2" size={20} />
    default:
      return null
  }
}

const FailedCardDemo = ({ data }: { data: Post }) => {
  const platformIcons = data.platform_statuses
    .map((platform) => platform.accountType)
    .filter((accountType, index, array) => array.indexOf(accountType) === index) // Remove duplicates
    .map((accountType) => getPlatformIcon(accountType))
    .filter((icon) => icon !== null)

  return (
    <HStack
      border="1px solid"
      borderColor="gray.300"
      borderRadius={12}
      justifyContent="space-between"
      padding={3}
    >
      <HStack>
        <Image
          src={womenimg}
          alt="Post preview"
          objectFit="cover"
          borderRadius="md"
        />
        <VStack alignItems="flex-start">
          <Text fontWeight="semibold">{data?.title}</Text>
          <Text fontSize="sm" color="gray.600">
            {data.description}
          </Text>
          <HStack gap={2}>
            {platformIcons.map((icon, index) => (
              <React.Fragment key={index}>{icon}</React.Fragment>
            ))}
          </HStack>
        </VStack>
      </HStack>
      <VStack
        alignItems="flex-end"
        gap={3}
        minWidth="fit-content"
        flexShrink={0}
      >
        <Button
          size="sm"
          color="red.700"
          backgroundColor="red.200"
          _hover={{ opacity: 0.8 }}
        >
          Failed
        </Button>
        <HStack fontSize="sm" color="gray.500">
          <LuCalendar />
          <Text>{formatToLocalTime(data?.scheduled_time)}</Text>
        </HStack>
        <Button
          size="sm"
          _hover={{ opacity: 0.8 }}
          color="white"
          backgroundColor="red.700"
        >
          Retry
        </Button>
      </VStack>
    </HStack>
  )
}
const SocialPostCard = ({ post }: { post: Post }) => {
  const getStatusConfig = (status: Post["status"]): StatusConfig => {
    switch (status) {
      case "posted":
        return {
          text: "Posted",
          color: "green.700",
          backgroundColor: "green.200",
        }
      case "failed":
        return {
          text: "Failed",
          color: "red.700",
          backgroundColor: "red.200",
        }
      case "scheduled":
      default:
        return {
          text: "Scheduled",
          color: "#003a6b",
          backgroundColor: "#f2f6fa",
        }
    }
  }

  const statusConfig = getStatusConfig(post.status)

  const platformIcons = post.platform_statuses
    .map((platform) => platform.accountType)
    .filter((accountType, index, array) => array.indexOf(accountType) === index) // Remove duplicates
    .map((accountType) => getPlatformIcon(accountType))
    .filter((icon) => icon !== null) //

  return (
    <HStack
      border="1px solid"
      borderColor="gray.300"
      borderRadius={12}
      justifyContent="space-between"
      padding={3}
    >
      <HStack>
        <Image
          src={womenimg}
          alt="Post preview"
          width="60px"
          height="60px"
          objectFit="cover"
          borderRadius="md"
        />

        <VStack alignItems="flex-start">
          <Text fontWeight="semibold">{post.title}</Text>
          <Text fontSize="sm" color="gray.600">
            {post.description}
          </Text>
          <HStack gap={2}>
            {platformIcons.map((icon, index) => (
              <React.Fragment key={index}>{icon}</React.Fragment>
            ))}
          </HStack>
        </VStack>
      </HStack>

      <VStack
        alignItems="flex-end"
        gap={3}
        minWidth="fit-content"
        flexShrink={0}
      >
        <Button
          size="sm"
          color={statusConfig.color}
          backgroundColor={statusConfig.backgroundColor}
          _hover={{ opacity: 0.8 }}
        >
          {statusConfig.text}
        </Button>
        <HStack fontSize="sm" color="gray.500">
          <LuCalendar />
          <Text>{formatToLocalTime(post.scheduled_time)}</Text>
        </HStack>
      </VStack>
    </HStack>
  )
}

export { FailedCardDemo, SocialPostCard }


