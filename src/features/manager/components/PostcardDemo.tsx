import { VStack , Text, HStack, Image, Button, Box} from '@chakra-ui/react'

import { LuCalendar } from "react-icons/lu"

import womenimg from "@/assets/womenimg.png"
import type { Post, StatusConfig } from "../types"
import { formatToLocalTime } from "@/lib/helper/formateDateTime"
import React from "react"
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaTiktok, FaYoutube } from "react-icons/fa"
import type { UseMutationResult } from "@tanstack/react-query"



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
    case "TIKTOK":
      return <FaTiktok color="#000000" size={20} />
    case "YOUTUBE":
      return <FaYoutube color="#FF0000" size={20} />
    default:
      return null
  }
}


const FailedCardDemo = ({
  data,
  retryMutation
}: {
  data: Post;
  retryMutation: UseMutationResult<any, any, number, unknown>
}) => {
  const handleRetry = () => {
    if (data.id) {
      retryMutation.mutate(data.id);
    }
  };

  // Check if this specific post is being retried
  const isRetrying = retryMutation.isPending && retryMutation.variables === data.id;
  
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
          src={data.medias[0].s3_url||womenimg}
          // src={womenimg}
          alt="Post preview"
          objectFit="cover"
          borderRadius="md"
          width={"100px" }
          height={"100px"}
        />
        <VStack alignItems="flex-start">
          <Text fontWeight="semibold">{data?.title}</Text>
          <Text fontSize="sm" color="gray.600">
            {data.description}
          </Text>
          {/* <HStack gap={2}>
            {platformIcons.map((icon, index) => (
              <React.Fragment key={index}>{icon}</React.Fragment>
            ))}

          </HStack> */}
          <HStack gap={2} flexWrap="wrap">
  {data.platform_statuses
    .filter((platform, index, array) =>
      array.findIndex(p => p.social_account_id === platform.social_account_id && p.accountType === platform.accountType) === index
    )
    .map((platform, idx) => (
      <Box
        key={idx}
        bg="gray.100"
        px={2}
        py={1}
        borderRadius="md"
        cursor="pointer"
        display="flex"
        alignItems="center"
        gap={1}
        _dark={{ bg: "gray.700" }}
        title={platform.account_name}
      >
        {getPlatformIcon(platform.accountType)}
        <Text
          display={{ base: "none", md: "block" }}
          fontSize="xs"
          color="gray.700"
          _dark={{ color: "gray.300" }}
          fontWeight="medium"
        >
          {platform.account_name}
        </Text>
      </Box>
    ))
  }
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
          
          {data.uploaded_at && <LuCalendar />}
          <Text>{formatToLocalTime(data?.uploaded_at)}</Text>
        </HStack>
        <Button
          size="sm"
          _hover={{ opacity: 0.8 }}
          color="white"
          backgroundColor="red.700"
          onClick={handleRetry}
          loading={isRetrying}
          disabled={isRetrying}
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
          src={post.medias[0].s3_url || womenimg}
          // src={womenimg}
          alt="Post preview"
          width="100px"
          height="100px"
          objectFit="cover"
          borderRadius="md"
        />

        <VStack alignItems="flex-start">
          <Text fontWeight="semibold">{post.title}</Text>
          <Text fontSize="sm" color="gray.600">
            {post.description}
            
          </Text>
          {/* <HStack gap={2}>
            {platformIcons.map((icon, index) => (
              <React.Fragment key={index}>{icon}</React.Fragment>
            ))}
            {post.platform_statuses
  .filter((platform, index, array) => 
    array.findIndex(p => p.social_account_id === platform.social_account_id && p.accountType === platform.accountType) === index
  )
  .map((platform, idx) => 
    <Text key={idx} fontSize="xs" color="gray.600">
      { platform.accountType}
    </Text>
  )
}
          </HStack> */}
<HStack gap={2} flexWrap="wrap">
  {post.platform_statuses
    .filter((platform, index, array) =>
      array.findIndex(p => p.social_account_id === platform.social_account_id && p.accountType === platform.accountType) === index
    )
    .map((platform, idx) => (
      <Box
        key={idx}
        bg="gray.100"
        px={2}
        py={1}
        borderRadius="md"
        cursor="pointer"
        display="flex"
        alignItems="center"
        gap={1}
        _dark={{ bg: "gray.700" }}
        title={platform.account_name}
      >
        {getPlatformIcon(platform.accountType)}
        <Text
          display={{ base: "none", md: "block" }}
          fontSize="xs"
          color="gray.700"
          _dark={{ color: "gray.300" }}
          fontWeight="medium"
        >
          {platform.account_name}
        </Text>
      </Box>
    ))
  }
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
        {post.uploaded_at && (
  <HStack fontSize="sm" color="gray.500">
    <LuCalendar />
    <Text>{formatToLocalTime(post.uploaded_at)}</Text>
  </HStack>
)}
      </VStack>
    </HStack>
  )
}

export { FailedCardDemo, SocialPostCard }


