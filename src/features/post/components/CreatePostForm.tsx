import { useCallback, useEffect, useMemo, useState, useRef } from "react"
import {
  Box,
  Text,
  Button,
  HStack,
  Tag,
  VStack,
  // Field,
  Textarea,
  FileUpload,
  Icon,
  Heading,
  // Input,
  SimpleGrid,
  Accordion,
  // Span,
  Flex,
  Span,
} from "@chakra-ui/react"

// import StarterKit from "@tiptap/starter-kit"
// import Underline from "@tiptap/extension-underline"
// import TextAlign from "@tiptap/extension-text-align"

import { useForm } from "react-hook-form"
import { LuUpload } from "react-icons/lu"
import { FileUploadList } from "./FileUploadList"
// import { FiSmile, FiHash } from "react-icons/fi"
// import { Sparkles } from "lucide-react"

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
import { TiptapDescriptionEditor } from "./TipTapDescriptionEditor"
import { Switch } from "@chakra-ui/react"
import { useEditPostStore } from "@/features/calendar/lib/store/editPost.store"
import useDeleteScheduledPost from "@/features/calendar/hooks/useDeleteSchedul"

export default function CreatePostForm() {
  const { isCreatePostEdit, postData } = useEditPostStore()
  const deleteScheduledPostMutation = useDeleteScheduledPost()

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
  // const [checked, setChecked] = useState(false)

  // Add state for description content
  const [descriptionContent, setDescriptionContent] = useState("")
  const [titleContent, setTitleContent] = useState("")

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

  const canUploadAnyContent = hasConnectedAccounts && hasSelectedAccounts

  const acceptedFileTypes = useMemo(() => {
    if (!canUploadAnyContent) {
      return ""
    }

    if (hasImages) {
      return "image/*" // Only allow images if images are already uploaded
    }
    if (hasVideo) {
      return "" // Don't allow any new files if video is uploaded (only 1 video allowed)
    }
    return "image/*,video/*" // Allow both if nothing is uploaded and accounts are selected
  }, [hasImages, hasVideo, canUploadAnyContent])

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
  const titleValue = watch("title", "")
  const scheduledTime = watch("scheduled_time")

  const suggestions = [
    "#TechTrends",
    "#Innovation",
    "#FutureTech",
    "#DigitalWorld",
    "#TechNews",
  ]

  // Updated addTag function to work with the editor
  const addTag = useCallback(
    (tag: string) => {
      const value = descriptionContent.length
        ? `${descriptionContent} ${tag}`
        : tag
      setDescriptionContent(value)
      setValue("description", value, { shouldValidate: true })
    },
    [descriptionContent, setValue]
  )

  const handleEmojiClick = () => {
    console.log("Emoji clicked")
  }

  const handleHashtagClick = () => {
    console.log("Hashtag clicked")
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setTitleContent(value)
    setValue("title", value, { shouldValidate: true })
  }

  useEffect(() => {
    if (content !== descriptionContent) {
      setDescriptionContent(content)
    }
  }, [content])

  useEffect(() => {
    if (titleValue !== titleContent) {
      setTitleContent(titleValue)
    }
  }, [titleValue])

  useEffect(() => {
    setValue("platform_statuses", itemArr, { shouldValidate: true })
  }, [itemArr, setValue])

  // Add helper function to extract time
  const extractTime = (time: string) => {
    return time.split("T")[1].split("+")[0] // "22:19:00"
  }

  // Add effect to populate form when editing
  useEffect(() => {
    if (isCreatePostEdit && postData) {
      console.log("Populating form with post data:", postData)

      // Set title
      if (postData.title) {
        setTitleContent(postData.title)
        setValue("title", postData.title, { shouldValidate: true })
      }

      // Set description
      if (postData.description) {
        setDescriptionContent(postData.description)
        setValue("description", postData.description, { shouldValidate: true })
      }

      // Set medias
      if (postData.medias && postData.medias.length > 0) {
        setValue("medias", postData.medias, { shouldValidate: true })
      }

      // Set surface type
      if (postData.surface) {
        setValue("surface", postData.surface, { shouldValidate: true })
      }

      // Set scheduled time and schedule state
      if (postData.scheduled_time) {
        console.log("Setting scheduled time:", postData.scheduled_time)
        setValue("scheduled_time", postData.scheduled_time, {
          shouldValidate: true,
        })
        setIsScheduled(true)
      } else if (postData.platform_statuses?.[0]?.posted_time) {
        // For published posts, show the published time
        const publishedTime = postData.platform_statuses[0].posted_time
        console.log("Setting published time:", publishedTime)
        console.log("Extracted time:", extractTime(publishedTime))
        setValue("scheduled_time", publishedTime, {
          shouldValidate: true,
        })
        setIsScheduled(false) // Keep schedule toggle off for published posts
      } else {
        setIsScheduled(false)
      }

      // Set platform statuses and selected accounts
      if (postData.platform_statuses && postData.platform_statuses.length > 0) {
        setValue("platform_statuses", postData.platform_statuses, {
          shouldValidate: true,
        })

        // Map platform statuses to itemArr format
        const mappedItems = postData.platform_statuses.map((status) => ({
          social_account_id: status.id,
          accountType: status.accountType,
          facebook_page_id: status.facebook_page_id || null,
        }))
        setItemArr(mappedItems)
      }

      // Set photo flag
      if (typeof postData.is_photo === "boolean") {
        setValue("is_photo", postData.is_photo, { shouldValidate: true })
      }
    }
  }, [
    isCreatePostEdit,
    postData,
    setValue,
    setIsScheduled,
    setTitleContent,
    setDescriptionContent,
  ])

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
    alert("Form submitted successfully!")
    console.log("on submit button clicked successfully")

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
      // If editing post, delete the scheduled post first
      if (isCreatePostEdit && postData?.id) {
        console.log("Deleting scheduled post with ID:", postData.id)
        await deleteScheduledPostMutation.mutateAsync(postData.id.toString())
      }

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
      console.log("latest dat", latestData)

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
        console.log("mutate create post", res.data)

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
      setDescriptionContent("") // Reset description content
      setTitleContent("") // Reset title content
      setTimeout(() => setClearSelectedAcc(true), 0)
    } catch (error) {
      console.error("Error in onSubmit:", error)
      toaster.error({
        title: "Error",
        description: "Failed to update post",
      })
    } finally {
      setPostLoading(false)
    }
  }

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
          <Text mb={2} fontWeight="bold" color="#00325c">
            Connected Accounts <Span color={"red.600"}>*</Span>
          </Text>
          {/* <Test width={100} height={100} fill="red" /> */}
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
        {(selectedPlatformsType.includes("YOUTUBE") ||
          selectedPlatformsType.includes("TIKTOK")) && (
          <Box maxW="40rem">
            {/* Label */}
            <Text fontSize="lg" fontWeight="semibold" mb={2} color="#00325c">
              Title <Span color="red.500">*</Span>
            </Text>
            <Box
              border="1px solid"
              borderColor="gray.200"
              rounded="lg"
              overflow="hidden"
              width="full"
            >
              <Textarea
                placeholder="Write topic name"
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
                size={"sm"}
                fontSize="sm"
                minH="2.5rem" // control height
                _placeholder={{ color: "gray.500" }}
                resize="none"
                rounded="lg"
                overflow="hidden"
                backgroundColor={"white"}
                value={titleContent}
                onChange={handleTitleChange}
              />
            </Box>
          </Box>
        )}
        {/* Description Section with Tiptap Editor */}
        <TiptapDescriptionEditor
          fixedHeight={false}
          value={descriptionContent}
          onChange={(text: string) => {
            setDescriptionContent(text)
            setValue("description", text, { shouldValidate: true })
          }}
          onEmojiClick={handleEmojiClick}
          onHashtagClick={handleHashtagClick}
          placeholder="Write something awesome"
        />
        <Box p={2} spaceY={6}>
          <Heading color={"#00325c"} fontSize="fontSizes.4xl">
            Media
          </Heading>

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
                // border="1px solid"
                // borderColor="#e5e5e5"
                // borderColor="gray.200"
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
                  <Box
                    fontWeight={"bold"}
                    letterSpacing="0.1px"
                    color={canUploadAnyContent ? "fg.default" : "gray.400"}
                  >
                    {canUploadAnyContent
                      ? "Choose a file or drag & drop it here"
                      : "Select accounts to upload content"}
                  </Box>
                  <Box color={canUploadAnyContent ? "fg.muted" : "gray.400"}>
                    {canUploadAnyContent
                      ? hasImages
                        ? ".png, .jpg only"
                        : "JPEG, PNG, PDG, and MP4 formats, "
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
        <Box>
          {/* Hashtag suggestions */}
          <Text fontSize="lg" fontWeight="semibold" mb={2} color="#00325c">
            Hashtags
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
        {/* Schedule section */}
        <Box
          w="full"
          border="1px solid"
          borderColor="gray.200"
          borderRadius="md"
        >
          <VStack align="flex-start" gap={8} w="full">
            {/* Header */}
            <Box
              backgroundColor={"gray.100"}
              borderBottom={"1px solid"}
              borderColor={"gray.200"}
              paddingTop={"2"}
              w="full"
              flexDirection="row"
              display={"flex"}
              justifyContent={"space-between"}
            >
              <Text
                fontSize="lg"
                fontWeight="semibold"
                mb={2}
                color="#00325c"
                paddingLeft={5}
                paddingRight={10}
              >
                Schedule Post (Date/Time)
              </Text>
              <Switch.Root
                checked={isScheduled}
                onCheckedChange={() => setIsScheduled(!isScheduled)}
              >
                <Switch.HiddenInput />
                <Switch.Control
                  _checked={{
                    bg: "blue.500",
                    borderColor: "blue.500",
                  }}
                >
                  <Switch.Thumb />
                </Switch.Control>
                <Switch.Label />
              </Switch.Root>
            </Box>

            {/* Radio Options */}
          </VStack>

          <Box>
            <Accordion.Root
              collapsible
              value={isScheduled ? ["schedule"] : []} // Control based on isSchedule state
              borderBottom="none"
              textDecoration="none"
              outline="none"
            >
              <Accordion.Item value="schedule" border="none" outline="none">
                <Accordion.ItemContent ml={3} overflow="visible">
                  <Accordion.ItemBody>
                    <Flex
                      align="center"
                      gap={2}
                      bg="white"
                      width={"full"}
                      display="inline-flex"
                      position={"relative"}
                      mb={3}
                    >
                      <Text fontSize="sm" color="orange.500">
                        ⚠️
                      </Text>
                      <Text
                        fontSize="13"
                        color="#d16f16"
                        fontWeight="bolder"
                        m={0}
                        display="flex"
                        justifyContent={"space-between"}
                        alignItems={"center"}
                      >
                        Action Required
                        <Span> </Span>
                        <Text
                          as="span"
                          color="gray.500"
                          fontWeight="normal"
                          ml={1}
                        >
                          <Span color={"red.600"}>*</Span>
                          <Text
                            marginLeft={"auto"}
                            color={"gray"}
                            fontSize={"sm"}
                            position={"absolute"}
                            left={170}
                            top={1}
                          >
                            This Section Required.
                          </Text>
                        </Text>
                      </Text>
                    </Flex>
                    <VStack spaceY={4} align="stretch">
                      <DateTime
                        setvalue={setValue}
                        scheduled={scheduledTime}
                        key={scheduledTime} // Force re-render when scheduledTime changes
                      />
                    </VStack>
                  </Accordion.ItemBody>
                </Accordion.ItemContent>
              </Accordion.Item>
            </Accordion.Root>
          </Box>
        </Box>
        <Flex justify="end" gap={2}>
          <Button
            type="submit"
            bg="secondary.500"
            color="button.DEFAULT"
            _hover={{ bg: "button.HOVER" }}
            _active={{ bg: "button.ACTIVE" }}
            disabled={!isValid || !hasSelectedAccounts}
            loading={postLoading}
            loadingText={
              isCreatePostEdit
                ? isScheduled
                  ? "Updating Schedule..."
                  : "Updating Post..."
                : isScheduled
                ? "Scheduling..."
                : "Posting..."
            }
          >
            {isCreatePostEdit
              ? isScheduled
                ? "Update Schedule"
                : "Update Post"
              : isScheduled
              ? "Schedule Post"
              : "Post Now"}
          </Button>
        </Flex>
      </VStack>
      <SuccessDialog />
    </Box>
  )
}
