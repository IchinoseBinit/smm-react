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
      gap={3}
      align="flex-start"
    >
      {/* Left side - Image + Content (flexible, can shrink) */}
      <HStack flex={1} minW={0} align="flex-start">
        <Image
          src={data.medias[0].s3_url||womenimg}
          alt="Post preview"
          objectFit="cover"
          borderRadius="md"
          width={{ base: "60px", md: "100px" }}
          height={{ base: "60px", md: "100px" }}
          flexShrink={0}
        />
        <VStack alignItems="flex-start" flex={1} minW={0} gap={1}>
          {(data?.title || data?.description) && (
            <Text fontWeight="semibold" fontSize="sm" lineClamp={2}>
              {data?.title || data?.description}
            </Text>
          )}
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

      {/* Right side - Status + Date + Retry (fixed, never shrinks) */}
      <VStack
        alignItems="flex-end"
        gap={2}
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
        <HStack fontSize="xs" color="gray.500" flexWrap="nowrap">
          {data.uploaded_at && <LuCalendar />}
          <Text whiteSpace="nowrap">{formatToLocalTime(data?.uploaded_at)}</Text>
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
      gap={3}
      align="flex-start"
    >
      {/* Left side - Image + Content (flexible, can shrink) */}
      <HStack flex={1} minW={0} align="flex-start">
        <Image
          src={post.medias[0].s3_url || womenimg}
          alt="Post preview"
          width={{ base: "60px", md: "100px" }}
          height={{ base: "60px", md: "100px" }}
          objectFit="cover"
          borderRadius="md"
          flexShrink={0}
        />

        <VStack alignItems="flex-start" flex={1} minW={0} gap={1}>
          {(post.title || post.description) && (
            <Text fontWeight="semibold" fontSize="sm" lineClamp={2}>
              {post.title || post.description}
            </Text>
          )}
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

      {/* Right side - Status + Date (fixed, never shrinks) */}
      <VStack
        alignItems="flex-end"
        gap={2}
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
          <HStack fontSize="xs" color="gray.500" flexWrap="nowrap">
            <LuCalendar />
            <Text whiteSpace="nowrap">{formatToLocalTime(post.uploaded_at)}</Text>
          </HStack>
        )}
      </VStack>
    </HStack>
  )
}

export { FailedCardDemo, SocialPostCard }


