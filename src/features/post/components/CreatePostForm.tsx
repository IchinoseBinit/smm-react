import { useCallback, useEffect, useMemo, useState, useRef } from "react"
import {
  Box,
  Text,
  Button,
  HStack,
  Tag,
  VStack,
  Field,
  Textarea,
  FileUpload,
  Icon,
  Heading,
  Input,
  SimpleGrid,
  Accordion,
  Span,
  Flex,
} from "@chakra-ui/react"

import { useForm } from "react-hook-form"
import { LuUpload } from "react-icons/lu"
import { FileUploadList } from "./FileUploadList"
import { FiSmile, FiHash } from "react-icons/fi"
import { Sparkles } from "lucide-react"

import DateTime from "./DateTime"
import { useAuthUtils } from "@/hooks/useAuthUtils"
import { useAllConnAccounts } from "@/hooks/useConnectedAccounts"
import { CircularLoading } from "@/lib/loadings"
import { useCreatePost } from "../hooks/query/usePost"
import useFileUpload from "../hooks/query/useFileUpload"
import { useUploadStore } from "../lib/store/file"
import axios from "axios"
import { useScheduleStore } from "../lib/store/dateTime"
import { useSuccessDialogStore } from "../lib/store/successDialog"
import { SuccessDialog } from "./SuccessCreatePost"
import {
  FacebookPostSchema,
  TikTokMediaPostSchema,
  YouTubeVideoSchema,
} from "@/components/SocialAcc/zod"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  useClearSelectedAccStore,
  useSelectedStore,
} from "../lib/store/selectedAcc"
import { toaster } from "@/components/ui/toaster"

import { PostConnectedAccsSection } from "./ConnectedAccs"
import { accountConfigs, iconMap } from "../lib/accounts"
import { SelectSurface } from "./selectSurface"
import { useContentTypeStore } from "../lib/store/sufaceType"

export default function CreatePostForm() {
  const { userId } = useAuthUtils()
  const { data, isLoading } = useAllConnAccounts(userId)
  const isScheduled = useScheduleStore((s) => s.isScheduled)
  const setIsScheduled = useScheduleStore((s) => s.setIsScheduled)
  const { setClearSelectedAcc } = useClearSelectedAccStore()
  const [itemArr, setItemArr] = useState<any[]>([])
  const [clearFiles, setClearFiles] = useState(false)
  const [postLoading, setPostLoading] = useState(false)
  const { mutateAsync: mutateCreatePost } = useCreatePost()
  const { openDialog } = useSuccessDialogStore()

  // Add the missing ref declaration
  const fileUploadListRef = useRef<any>(null)

  const { payload, hasVideos } = useUploadStore()
  const { mutateAsync } = useFileUpload()
  const { selectedIds } = useSelectedStore()
  const { resetSurfaceType } = useContentTypeStore()
  const [selectedPlatformsType, setSelectedPlatformsType] = useState<string[]>(
    []
  )

  const selectedPlatforms = useMemo(
    () => itemArr.map((item) => item.social_account_id),
    [itemArr]
  )

  const hasConnectedAccounts = data && data.length > 0
  const hasSelectedAccounts = selectedPlatforms.length > 0

  console.log("selected platforms", selectedPlatforms)

  // Check what files are currently uploaded
  const uploadedFiles = payload?.files || []
  const hasImages = uploadedFiles.some((file) => file.type.startsWith("image/"))
  const hasVideo = uploadedFiles.some((file) => file.type.startsWith("video/"))

  console.log("isScheduled", isScheduled)

  // Block ALL uploads if no accounts are connected or selected
  const canUploadAnyContent = hasConnectedAccounts && hasSelectedAccounts

  // Determine what file types to accept
  const acceptedFileTypes = useMemo(() => {
    // Block all uploads if no accounts selected
    if (!canUploadAnyContent) {
      return "" // Empty string blocks all file types
    }

    if (hasImages) {
      return "image/*" // Only allow images if images are already uploaded
    }
    if (hasVideo) {
      return "" // Don't allow any new files if video is uploaded (only 1 video allowed)
    }
    return "image/*,video/*" // Allow both if nothing is uploaded and accounts are selected
  }, [hasImages, hasVideo, canUploadAnyContent])

  // Handle file drop when restrictions are in place
  const handleRestrictedUpload = useCallback(() => {
    if (!hasConnectedAccounts) {
      toaster.error({
        title: "No Connected Accounts",
        description:
          "Please connect at least one social media account to upload content.",
        duration: 2000,
        closable: true,
      })
      return
    }

    if (!hasSelectedAccounts) {
      toaster.error({
        title: "No Accounts Selected",
        description:
          "Please select at least one account below to upload content.",
        duration: 2000,
        closable: true,
      })
      return
    }
  }, [hasConnectedAccounts, hasSelectedAccounts])

  const formSchema = useMemo(() => {
    const selectedTypes = Array.from(
      new Set(
        itemArr
          .filter((item) => selectedIds.includes(item.social_account_id))
          .map((item) => item.accountType)
      )
    )
    setSelectedPlatformsType(selectedTypes)

    if (selectedTypes.includes("YOUTUBE")) return YouTubeVideoSchema
    if (selectedTypes.includes("TIKTOK")) return TikTokMediaPostSchema
    if (selectedTypes.includes("FACEBOOK")) return FacebookPostSchema
    if (selectedTypes.includes("INSTAGRAM")) return FacebookPostSchema
    return z.any()
  }, [itemArr, selectedIds])

  const defaultValues = {
    title: "",
    description: "",
    status: "",
    scheduled_time: null,
    is_photo: false,
    surface: useContentTypeStore.getState().surfaceType[0],
    medias: [],
    platform_statuses: [
      {
        accountType: "",
        social_account_id: null,
      },
    ],
  }

  const {
    // register,
    handleSubmit,
    watch,
    reset,
    setValue,
    getValues,
    formState: { isValid },
  } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: zodResolver(formSchema),
  })

  const content = watch("description", "")
  const scheduledTime = watch("scheduled_time")

  const suggestions = [
    "#TechTrends",
    "#Innovation",
    "#FutureTech",
    "#DigitalWorld",
    "#TechNews",
  ]

  const addTag = useCallback(
    (tag: string) => {
      const value = content.length ? `${content} ${tag}` : tag
      setValue("description", value, { shouldValidate: true })
    },
    [content, setValue]
  )

  useEffect(() => {
    setValue("platform_statuses", itemArr, { shouldValidate: true })
  }, [itemArr, setValue])

  const uploadFiles = async () => {
    console.log("uploadFiles called with payload:", payload)
    const presignedResponse: any = await mutateAsync(payload)
    console.log("presigned_post", presignedResponse)
    console.log("presigned_post. 1", presignedResponse.presigned_posts)

    await Promise.all(
      presignedResponse.presigned_posts.map((post: any, i: any) => {
        const formData = new FormData()
        Object.entries(post.fields).forEach(([key, value]) => {
          formData.append(key, value as string)
        })
        console.log("payload files", payload.files[i])
        formData.append("file", payload.files[i].file)

        return axios.post(post.url, formData)
      })
    )
    const urls = presignedResponse.presigned_posts.map(
      (post: any) => post.url + post.fields.key
    )
    console.log("uploaded urls", urls)

    const medias = urls.map((url: string, index: number) => ({
      s3_url: encodeURI(url),
      order: index,
    }))
    console.log("uploaded urls", medias)

    if (medias.length === 0) return false
    setValue("medias", medias, { shouldValidate: true })
    return true
  }

  const onSubmit = async () => {
    // Check if user has selected accounts before submitting
    if (!hasSelectedAccounts) {
      toaster.error({
        title: "No Accounts Selected",
        description:
          "Please select at least one account below to upload content.",
        duration: 2000,
        closable: true,
      })
      return
    }

    console.log("onsubmit called with:")
    setPostLoading(true)

    try {
      setValue("status", isScheduled ? "scheduled" : "posted", {
        shouldValidate: true,
      })

      if (!isScheduled) {
        setValue("scheduled_time", null, { shouldValidate: true })
      } else {
        // 🎯 TRIGGER AUTO-CONVERSION WHEN SCHEDULING
        if (hasVideo && fileUploadListRef.current?.triggerAutoConversion) {
          console.log("🔄 Triggering auto-conversion for scheduled post...")

          try {
            const convertedUrl =
              await fileUploadListRef.current.triggerAutoConversion()
            if (convertedUrl) {
              console.log("✅ Video auto-converted successfully for scheduling")
            } else {
              console.log(
                "⚠️ Auto-conversion failed, proceeding with original video"
              )
            }
          } catch (error) {
            console.error("❌ Auto-conversion error:", error)
            // Continue with original video if conversion fails
          }
        }
      }

      const x = await uploadFiles()
      console.log("uploadFiles result", x)
      if (x == false) {
        console.log(x, "please upload files to server")
        return
      }

      const isPhoto = payload.files.every((f) => f.type.startsWith("image/"))
      setValue("is_photo", isPhoto, { shouldValidate: true })

      const currentType = useContentTypeStore.getState().surfaceType[0]
      setValue("surface", currentType, { shouldValidate: true })

      const latestData = getValues()

      if (
        !selectedPlatformsType.includes("YOUTUBE") &&
        !selectedPlatformsType.includes("TIKTOK") &&
        !selectedPlatformsType.includes("INSTAGRAM")
      ) {
        delete latestData.title
      }

      if (latestData.scheduled_time) {
        latestData.scheduled_time = new Date(
          latestData.scheduled_time
        ).toISOString()
      }

      await mutateCreatePost(latestData).then((res) => {
        if (res?.success) {
          openDialog({
            status: isScheduled ? "scheduled" : "posted",
          })
        }
      })

      reset(defaultValues)
      resetSurfaceType()
      setIsScheduled(false)
      setClearFiles(true)
      setTimeout(() => setClearSelectedAcc(true), 0)
    } finally {
      setPostLoading(false)
    }
  }

  const [isSchedule, setIsSchedule] = useState(false) // false = Post Now, true = Schedule Post

  // const handleEmojiClick = () => {
  //   // Add emoji functionality here
  //   console.log("Emoji clicked")
  // }

  // const handleHashtagClick = () => {
  //   // Add hashtag suggestion functionality here
  //   console.log("Hashtag Suggestion clicked")
  // }

  // const handleAIGeneratorClick = () => {
  //   // Add AI caption generator functionality here
  //   console.log("AI Caption Generator clicked")
  // }

  if (isLoading) return <CircularLoading />

  return (
    <Box
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      minH="100dvh"
      overflowY="hidden"
    >
      <VStack spaceY={8} align="stretch">
        <SelectSurface />
        <Box>
          <Text mb={2} fontWeight="medium" color="fg.DEFAULT">
            Connected Accounts
          </Text>

          <SimpleGrid columns={{ base: 1, lg: 2, xl: 3 }} gridGap={2} mt={2}>
            {accountConfigs.map(({ type }, index) => (
              <PostConnectedAccsSection
                key={index}
                type={type}
                data={data}
                setvalue={setValue}
                setItemArr={setItemArr}
                selectedPlatforms={selectedPlatforms}
                icon={iconMap[type].icon}
                iconColor={iconMap[type].color}
              />
            ))}
          </SimpleGrid>
        </Box>
        {/* Media Upload Section with Proper Restrictions */}
        <Box p={2} spaceY={6}>
          <Heading fontSize="fontSizes.4xl">Media</Heading>

          <FileUpload.Root
            maxW="3xl"
            alignItems="stretch"
            maxFiles={5}
            accept={acceptedFileTypes}
            disabled={hasVideo || !canUploadAnyContent} // Disable if video uploaded OR no accounts selected
            onFileReject={handleRestrictedUpload} // Show toast when files are rejected
          >
            <FileUpload.HiddenInput />
            {hasVideos === false && !hasVideo && (
              <FileUpload.Dropzone
                border="1px solid"
                borderColor="blue.100"
                borderRadius="8px"
                onClick={() => {
                  // Show toast when user clicks on disabled dropzone
                  if (!canUploadAnyContent) {
                    handleRestrictedUpload()
                  }
                }}
              >
                <Icon
                  size="md"
                  color={canUploadAnyContent ? "fg.muted" : "gray.400"}
                >
                  <LuUpload />
                </Icon>
                <FileUpload.DropzoneContent>
                  <Box color={canUploadAnyContent ? "fg.default" : "gray.400"}>
                    {canUploadAnyContent
                      ? "Drag and drop files here"
                      : "Select accounts to upload content"}
                  </Box>
                  <Box color={canUploadAnyContent ? "fg.muted" : "gray.400"}>
                    {canUploadAnyContent
                      ? hasImages
                        ? ".png, .jpg only"
                        : ".png, .jpg, .mp4"
                      : "Connect and select accounts first"}
                  </Box>
                </FileUpload.DropzoneContent>
              </FileUpload.Dropzone>
            )}
            <FileUploadList
              ref={fileUploadListRef} // Now properly declared ref
              clearFiles={clearFiles}
              onClearComplete={() => setClearFiles(false)}
              selectedPlatforms={selectedPlatformsType}
              showStatusMessages={true}
            />
          </FileUpload.Root>
        </Box>
        {(selectedPlatformsType.includes("YOUTUBE") ||
          selectedPlatformsType.includes("TIKTOK")) && (
          <Box maxW="40rem">
            {/* Label */}
            <Text fontSize="lg" fontWeight="semibold" mb={2} color="fg.DEFAULT">
              Title
            </Text>
            <Box
              border="1px solid"
              borderColor="blue.100"
              rounded="lg"
              overflow="hidden"
            >
              <Textarea
                placeholder="Write a caption"
                border="none"
                _focus={{
                  borderColor: "transparent",
                  boxShadow: "none",
                  outline: "none",
                }}
                _hover={{
                  borderColor: "transparent",
                }}
                p={4}
                size={"xl"}
                fontSize="md"
                _placeholder={{ color: "gray.500" }}
                resize="none"
                rounded="lg"
                overflow="hidden"
                backgroundColor={"white"}
              />
            </Box>

            {/* Footer */}
          </Box>
        )}
        {/* <Field.Root required>
           <Field.Label>
             <Text fontSize={16} mb={2} fontWeight="medium" color="fg.DEFAULT">
               Description
             </Text>
           </Field.Label>
           <Textarea
             placeholder="write a description"
             {...register("description", { required: true })}
             maxW="30rem"
             maxH="5lh"
             size="xl"
             variant="subtle"
             autoresize
           />
         </Field.Root> */}
        {/* Desctiption Section Starts from here.  */}
        <Box maxW="40rem">
          {/* Label */}
          <Text fontSize="lg" fontWeight="semibold" mb={2} color="fg.DEFAULT">
            Description
          </Text>

          {/* Input container */}
          <Box
            border="1px solid"
            borderColor="blue.100"
            rounded="lg"
            overflow="hidden"
          >
            <Textarea
              placeholder="Write a caption"
              border="none" // Remove default border
              _focus={{
                borderColor: "transparent",
                boxShadow: "none",
                outline: "none", // Remove any outline
              }}
              _hover={{
                borderColor: "transparent", // Remove hover border
              }}
              p={4}
              size={"xl"}
              fontSize="md"
              _placeholder={{ color: "gray.500" }}
              resize="none"
              rounded="lg"
              overflow="hidden"
              backgroundColor={"white"}
            />

            {/* Footer */}
            <HStack gap={4} px={4} py={2} borderColor="blue.100">
              <HStack gap={1} cursor="pointer">
                <Icon as={FiSmile} color="blue.900" />
                <Text fontSize="sm" color="blue.900">
                  Emoji
                </Text>
              </HStack>

              {/* Custom vertical divider */}
              <Box w="1px" h="16px" bg="blue.100" />

              <HStack gap={1} cursor="pointer">
                <Icon as={FiHash} color="blue.900" />
                <Text fontSize="sm" color="blue.900">
                  Hashtag Suggestion
                </Text>
              </HStack>

              {/* Custom vertical divider */}
              <Box w="1px" h="16px" bg="blue.100" />

              <HStack gap={1} cursor="pointer">
                <Icon as={Sparkles} color="blue.900" />
                <Text fontSize="sm" color="blue.900">
                  AI Caption Generator
                </Text>
              </HStack>
            </HStack>
          </Box>
        </Box>
        <Box>
          {/* //hastag suggestion? */}
          <Text fontSize="lg" fontWeight="semibold" mb={2} color="fg.DEFAULT">
            Hastags
          </Text>
          <HStack spaceX={2} wrap="wrap">
            {suggestions.map((tag) => (
              <Tag.Root
                key={tag}
                size="md"
                p={1}
                borderRadius="lg"
                cursor="pointer"
                onClick={() => addTag(tag)}
                bg="bg.MUTED"
                color="fg.DEFAULT"
              >
                <Tag.Label>{tag}</Tag.Label>
              </Tag.Root>
            ))}
          </HStack>
        </Box>
        {/* Shedule wala here  */}
        <Box w="full" py={8}>
          <VStack align="flex-start" gap={8} w="full">
            {/* Header */}
            <Box w="full">
              <Text
                fontSize="lg"
                fontWeight="semibold"
                mb={2}
                color="fg.DEFAULT"
              >
                Schedule Setting
              </Text>
              <Text
                fontSize="16px"
                color="#4a5568"
                fontWeight="400"
                lineHeight="1.5"
              >
                Choose when you want your post to be published
              </Text>
            </Box>

            {/* Radio Options */}
            <HStack align="flex-start" gap={4} w="full" mt={4}>
              {/* Post Now */}
              <HStack
                gap={4}
                align="center"
                cursor="pointer"
                onClick={() => setIsSchedule(false)}
              >
                <Box
                  w="20px"
                  h="20px"
                  border="2px solid"
                  borderColor={!isSchedule ? "#3182ce" : "#e2e8f0"}
                  borderRadius="50%"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  bg="white"
                >
                  {!isSchedule && (
                    <Box w="10px" h="10px" bg="#3182ce" borderRadius="50%" />
                  )}
                </Box>
                <Text fontSize="18px" fontWeight="500" color="#1a365d">
                  Post
                </Text>
              </HStack>

              {/* Schedule Post */}
              <HStack
                gap={4}
                align="center"
                cursor="pointer"
                onClick={() => setIsSchedule(true)}
              >
                <Box
                  w="20px"
                  h="20px"
                  border="2px solid"
                  borderColor={isSchedule ? "#3182ce" : "#e2e8f0"}
                  borderRadius="50%"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  bg="white"
                >
                  {isSchedule && (
                    <Box w="10px" h="10px" bg="#3182ce" borderRadius="50%" />
                  )}
                </Box>
                <Text fontSize="18px" fontWeight="500" color="#1a365d">
                  Schedule
                </Text>
              </HStack>
            </HStack>
          </VStack>
        </Box>
        <Accordion.Root
          collapsible
          value={isSchedule ? ["schedule"] : []} // Control based on isSchedule state
          borderBottom="none"
          textDecoration="none"
          outline="none"
        >
          <Accordion.Item value="schedule" border="none" outline="none">
            {/* <Accordion.ItemTrigger
              bg="bg.DIM"
              m={2}
              shadow="md"
              borderRadius="lg"
              px={4}
              py={2}
              width={80}
              transition="background 0.2s, color 0.2s"
              _hover={{
                bg: "bg.DEFAULT",
                color: "fg.DEFAULT",
                cursor: "pointer",
              }}
              _expanded={{ bg: "bg.DEFAULT", boxShadow: "md" }}
            >
              <Span flex="1">Schedule Post (Date/Time)</Span>
              <Accordion.ItemIndicator />
            </Accordion.ItemTrigger> */}
            <Accordion.ItemContent ml={3} overflow="visible">
              <Accordion.ItemBody>
                <VStack spaceY={4} align="stretch">
                  <DateTime setvalue={setValue} scheduled={scheduledTime} />
                </VStack>
              </Accordion.ItemBody>
            </Accordion.ItemContent>
          </Accordion.Item>
        </Accordion.Root>
        <Flex justify="end" gap={2}>
          <Button
            type="submit"
            bg="secondary.500"
            color="button.DEFAULT"
            _hover={{ bg: "button.HOVER" }}
            _active={{ bg: "button.ACTIVE" }}
            disabled={!isValid || !hasSelectedAccounts} // Disable submit if no accounts selected
            loading={postLoading}
            loadingText={isScheduled ? "Scheduling..." : "Posting..."}
          >
            {isScheduled ? "Schedule Post" : "Post Now"}
          </Button>
        </Flex>
      </VStack>
      <SuccessDialog />
    </Box>
  )
}
