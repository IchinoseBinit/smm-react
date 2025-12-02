import { useCallback, useEffect, useMemo, useState, useRef } from "react"
import {
  Box,
  Text,
  Button,
  HStack,
  VStack,
  Textarea,
  FileUpload,
  Icon,
  Heading,
  SimpleGrid,
  Accordion,
  Flex,
  Span,
} from "@chakra-ui/react"
import type { AccountType } from "@/types/accounts"
import useDeleteScheduledPost from "@/features/calendar/hooks/useDeleteSchedule"
import { useEditPostStore } from "@/features/calendar/lib/store/editPost.store"

import { AccountSection } from "@/components/SocialAcc/AccountSection"

import { useForm } from "react-hook-form"
import { LuUpload } from "react-icons/lu"
import { FileUploadList } from "./FileUploadList"

import DateTime from "./DateTime"
import { useAuthUtils } from "@/hooks/useAuthUtils"
import { useAllConnAccounts } from "@/hooks/useConnectedAccounts"
import { CircularLoading } from "@/lib/loadings"
import { createPost } from "../api"
import { useMutation } from "@tanstack/react-query"
import useFileUpload from "../hooks/query/useFileUpload"
import { useUploadStore } from "../lib/store/file"
import axios from "axios"
import { useInitialTimeStore, useScheduleStore } from "../lib/store/dateTime"
// import { useSuccessDialogStore } from "../lib/store/successDialog"
import { SuccessDialog } from "./SuccessCreatePost"
import {
  FacebookPostSchema,
  TikTokMediaPostSchema,
  YouTubeVideoSchema,
} from "@/components/SocialAcc/zod"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSelectedStore, useClearSelectedAccStore } from "../lib/store/selectedAcc"
import { toaster } from "@/components/ui/toaster"

// import { PostConnectedAccsSection } from "./ConnectedAccs"
// import { accountConfigs, iconMap } from "../lib/accounts"
import { SelectSurface } from "./selectSurface"
import { useContentTypeStore } from "../lib/store/sufaceType"
import { TiptapDescriptionEditor } from "./TipTapDescriptionEditor"
import { Switch } from "@chakra-ui/react"
import SelectChannelDropdown from "./SelectChannelDropdown"

import FacebookAccount from "../../../components/SocialAcc/facebook/FacebookAccount"
import TiktokAccount from "../../../components/SocialAcc/tiktok/TiktokAccount"
import YoutubeAccount from "../../../components/SocialAcc/youtube/YoutubeAccount"
import InstagramAccount from "@/components/SocialAcc/instagram/InstagramAccount"
import useGetYoutubeCategories from "../hooks/query/useYoutube"

export default function CreatePostForm() {
  const { userId } = useAuthUtils()
  const { data, isLoading } = useAllConnAccounts(userId)
  const isScheduled = useScheduleStore((s) => s.isScheduled)
  const setIsScheduled = useScheduleStore((s) => s.setIsScheduled)
  const [itemArr, setItemArr] = useState<any[]>([])
  const [clearFiles, setClearFiles] = useState(false)
  const [postLoading, setPostLoading] = useState(false)
  // Create a custom mutation without auto-toasters to prevent duplicates
  const { mutateAsync: mutateCreatePost } = useMutation({
    mutationFn: createPost,
    // No onSuccess/onError handlers to prevent duplicate toasters
  })
  // const { openDialog } = useSuccessDialogStore()

  const { isCreatePostEdit, postData } = useEditPostStore()
  const deleteScheduledPostMutation = useDeleteScheduledPost()
  const { setInitialTime } = useInitialTimeStore()

  // Get current surface type from store (needed for filtering configs)
  const { surfaceType } = useContentTypeStore()

  // Create sorted social media configs based on connected accounts count
  const SocialMediaConfigs = useMemo(() => {
    const configs = [
      {
        type: "FACEBOOK" as AccountType,
        Component: FacebookAccount,
        pagesPath: "/account/facebook/pages",
      },
      { type: "TIKTOK" as AccountType, Component: TiktokAccount },
      { type: "YOUTUBE" as AccountType, Component: YoutubeAccount },
      { type: "INSTAGRAM" as AccountType, Component: InstagramAccount },
    ]

    if (!data) return configs

    // Filter out YouTube and TikTok when surface type is STORY (only Facebook and Instagram support stories)
    const isStory = surfaceType[0] === "STORY"
    const filteredConfigs = isStory
      ? configs.filter(config => config.type !== "YOUTUBE" && config.type !== "TIKTOK")
      : configs

    // Sort configs by number of connected accounts (highest first)
    return filteredConfigs.sort((a, b) => {
      const aCount = data.filter((d: any) => d.account_type === a.type).length
      const bCount = data.filter((d: any) => d.account_type === b.type).length
      return bCount - aCount // Descending order (highest first)
    })
  }, [data, surfaceType])

  const extractTime = (time: string) => {
    return time.split("T")[1].split("+")[0] // "22:19:00"
  }

  const { data: youtubeCategories } = useGetYoutubeCategories()
  console.log("Youtube Categories:", youtubeCategories)

  // Add effect to populate form when editing

  // Add the missing ref declaration
  const fileUploadListRef = useRef<any>(null)
  // const [checked, setChecked] = useState(false)

  // Add state for description content
  const [descriptionContent, setDescriptionContent] = useState("")
  const [titleContent, setTitleContent] = useState("")

  const { payload, hasVideos, setPayload, setHasVideos } = useUploadStore()
  const { mutateAsync } = useFileUpload()
  const { selectedIds, clear: clearSelectedAccounts } = useSelectedStore()
  const { resetSurfaceType } = useContentTypeStore()
  const { setClearSelectedAcc } = useClearSelectedAccStore()
  const [selectedPlatformsType, setSelectedPlatformsType] = useState<string[]>(
    []
  )

  // Determine if description should be hidden
  const shouldHideDescription = useMemo(() => {
    const isStory = surfaceType[0] === "STORY"
    return isStory
  }, [surfaceType])

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
    console.log("selectedTypes updated:", selectedTypes)
    setSelectedPlatformsType(selectedTypes)

    if (selectedTypes.includes("YOUTUBE")) return YouTubeVideoSchema
    if (selectedTypes.includes("TIKTOK")) return TikTokMediaPostSchema
    if (selectedTypes.includes("FACEBOOK")) return FacebookPostSchema
    if (selectedTypes.includes("INSTAGRAM")) return FacebookPostSchema
    return z.any()
  }, [itemArr, selectedIds])

  const defaultValues = useMemo(() => ({
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
  }), [])

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
    "TechTrends",
    "Innovation",
    "FutureTech",
    "DigitalWorld",
    "TechNews",
  ]

  // Custom validation to prevent submission when scheduling without date/time
  const isFormValidForSubmission = useMemo(() => {
    // Basic form validation
    if (!isValid || !hasSelectedAccounts) {
      return false
    }

    // For stories, description is optional. For other content types, require description
    const isStory = surfaceType[0] === "STORY"
    if (!isStory && (!descriptionContent || descriptionContent.trim().length === 0)) {
      return false
    }

    // For stories, require at least one media file (image or video)
    if (isStory && (!payload.files || payload.files.length === 0)) {
      return false
    }

    // If scheduling is enabled, require date/time to be selected
    if (isScheduled && !scheduledTime) {
      return false
    }

    return true
  }, [isValid, hasSelectedAccounts, descriptionContent, isScheduled, scheduledTime, surfaceType, payload.files])

  const resetFormData = useCallback(async () => {
    console.log("🔄 Starting form reset...")
    console.log("Current state before reset:", {
      descriptionContent,
      titleContent,
      itemArr: itemArr.length,
      selectedPlatformsType,
      isScheduled,
      payload: payload.files?.length || 0
    })

    try {
      // First, clear all React state immediately
      setDescriptionContent("")
      setTitleContent("")
      setItemArr([])
      setSelectedPlatformsType([])
      setIsScheduled(false)
      setInitialTime(null)

      // Clear file-related state
      setPayload({ files: [] })
      setHasVideos(false)
      setClearFiles(true)
      setClearSelectedAcc(true)

      // Clear stores
      clearSelectedAccounts()
      resetSurfaceType()

      // Reset react-hook-form
      reset(defaultValues)

      // Force update form values explicitly
      setValue("title", "")
      setValue("description", "")
      setValue("status", "")
      setValue("scheduled_time", null)
      setValue("is_photo", false)
      setValue("medias", [])
      setValue("platform_statuses", [])

      // Allow state updates to propagate
      await new Promise(resolve => setTimeout(resolve, 200))

      // Final form reset to ensure everything is clean
      reset(defaultValues)

      console.log("✅ Form reset completed")
      console.log("State after reset:", {
        descriptionContent: "",
        titleContent: "",
        itemArr: [],
        formValues: getValues()
      })
    } catch (error) {
      console.error("❌ Error during clearing:", error)
      // Fallback reset
      try {
        reset(defaultValues)
        setDescriptionContent("")
        setTitleContent("")
      } catch (fallbackError) {
        console.error("❌ Fallback reset also failed:", fallbackError)
      }
    }
  }, [
    reset,
    defaultValues,
    descriptionContent,
    titleContent,
    itemArr,
    selectedPlatformsType,
    isScheduled,
    payload,
    clearSelectedAccounts,
    resetSurfaceType,
    setIsScheduled,
    setInitialTime,
    setPayload,
    setHasVideos,
    setClearSelectedAcc,
    setValue,
    getValues,
  ])
  // Updated addTag function to work with the editor
  const addTag = useCallback(
    (tag: string) => {
      // Ensure hashtag starts with #
      const hashtag = tag.startsWith("#") ? tag : `#${tag.replace("#", "")}`

      const currentContent = descriptionContent.trim()
      const value = currentContent.length
        ? `${currentContent} ${hashtag}`
        : hashtag

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

  // Don't auto-select accounts on load - let user choose manually

  const uploadFiles = async () => {
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
        const extractTime = (time: any) => {
          return time.split("T")[1].split("+")[0] // "22:19:00"
        }
        const time = extractTime(postData.scheduled_time)
        setInitialTime(time)

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

  const onSubmit = async () => {
    console.log("onSubmit called")

    // Prevent double submission
    if (postLoading) {
      console.log("Already submitting, ignoring duplicate call")
      return
    }

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

    // Check if user has provided description content (not required for stories)
    const isStory = surfaceType[0] === "STORY"
    if (!isStory && (!descriptionContent || descriptionContent.trim().length === 0)) {
      toaster.error({
        title: "Description Required",
        description:
          "Please write some content for your post before submitting.",
        duration: 3000,
        closable: true,
      })
      return
    }

    // For stories, require at least one media file
    if (isStory && (!payload.files || payload.files.length === 0)) {
      toaster.error({
        title: "Media Required for Story",
        description:
          "Please upload at least one image or video for your story.",
        duration: 3000,
        closable: true,
      })
      return
    }

    // Prevent submission if scheduling is enabled but no date/time selected
    if (isScheduled && !scheduledTime) {
      toaster.error({
        title: "Schedule Time Required",
        description: "Please select both date and time when scheduling a post.",
        duration: 3000,
        closable: true,
      })
      return
    }

    console.log("onsubmit called with:")
    setPostLoading(true)

    try {
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

      const result = await mutateCreatePost(latestData)
      console.log("📊 API Response:", result)

      // If we reach here, the mutation was successful (no error was thrown)
      console.log("✅ Post submitted successfully, clearing form...")

      // Show success toast instead of dialog
      toaster.success({
        title: isScheduled ? "Post Scheduled!" : "Post Published!",
        description: isScheduled
          ? "Your post has been scheduled successfully"
          : "Your post has been published successfully",
        duration: 2000,
        closable: true,
      })

      // Small delay to let toast render
      await new Promise(resolve => setTimeout(resolve, 100))

      // Clear all form data without page reload
      console.log("🧹 About to call resetFormData after successful post...")
      await resetFormData()
      console.log("🧹 resetFormData completed after successful post")
    } catch (error) {
      console.error("❌ Error in onSubmit:", error)

      // Only show error toaster if it's not a validation error
      const errorMessage = error instanceof Error ? error.message : String(error)
      if (!errorMessage?.includes("validation") && !errorMessage?.includes("required")) {
        toaster.error({
          title: "Submission Failed",
          description: "There was an error submitting your post. Please try again.",
          duration: 2000,
          closable: true,
        })
      }

      // Clear form data even on error, without page reload
      console.log("🧹 About to call resetFormData after error...")
      try {
        await resetFormData()
        console.log("🧹 resetFormData completed after error")
      } catch (resetError) {
        console.error("❌ Error during form reset:", resetError)
        // Force a basic reset if the full reset fails
        reset(defaultValues)
        setDescriptionContent("")
        setTitleContent("")
      }
    } finally {
      setPostLoading(false)
    }
  }

  if (isLoading)
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        minH="50vh"
        w="full"
      >
        <CircularLoading />
      </Box>
    )

  return (
    <Box
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      w="100%"
      maxW="100%"
      minW={0}
    >
      <Heading
        paddingLeft={{ base: 2, md: 4 }}
        fontSize={{ base: "xl", md: "2xl" }}
        maxW="100%"
      >
        Post Content
      </Heading>
      <Text
        paddingLeft={{ base: 2, md: 4 }}
        fontSize={{ base: "sm", md: "md" }}
        maxW="100%"
      >
        Craft your content and engage your audience
      </Text>
      <VStack
        spaceY={{ base: 3, md: 6 }}
        align="stretch"
        p={{ base: 2, md: 4 }}
        w="100%"
        maxW="100%"
        minW={0}
      >
        <SelectSurface />
        <Box w="full" maxW="100%" minW={0}>
          <HStack
            justify="space-between"
            align="center"
            mb={{ base: 2, md: 4 }}
            w="full"
          >
            <Text
              fontWeight="bold"
              color="#00325c"
              fontSize={{ base: "md", md: "lg" }}
            >
              Connected Accounts <Span color={"red.600"}>*</Span>
            </Text>
          </HStack>
          {/* <SimpleGrid columns={{ base: 1, lg: 2, xl: 3 }} gridGap={2} mt={2}>
            {accountConfigs
              .slice()
              .sort((a, b) => {
                if (!data) return 0
                const aCount = data.filter(
                  (d: any) => d.account_type === a.type
                ).length
                const bCount = data.filter(
                  (d: any) => d.account_type === b.type
                ).length
                return bCount - aCount // Descending order (highest first)
              })
              .map(({ type }, index) => (
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
          </SimpleGrid> */}

          <SimpleGrid
            columns={{ base: 1, sm: 1, md: 2, lg: 3, xl: 4 }}
            gap={{ base: 2, md: 4 }}
            mt={{ base: 2, md: 6 }}
            w="full"
            maxW="100%"
            minChildWidth={0}
          >
            {SocialMediaConfigs.map(({ type, Component, pagesPath }) => (
              <AccountSection
                key={type}
                type={type}
                label={type}
                data={data}
                Component={Component}
                pagesPath={pagesPath}
                setValue={setValue}
                setItemArr={setItemArr}
              />
            ))}
          </SimpleGrid>
        </Box>

        <HStack
          width={"full"}
          maxW="100%"
          minW={0}
          gap={{ base: 2, md: 4 }}
          alignItems="flex-start"
          flexDirection={{ base: "column", md: "row" }}
        >
          {/* Title Section */}
          {(() => {
            console.log(
              "Title section check - selectedPlatformsType:",
              selectedPlatformsType
            )
            return selectedPlatformsType.includes("YOUTUBE")
          })() && (
            <Box flex="1" maxW={{ base: "100%", md: "56%" }} w="full" minW={0}>
              <Text
                fontSize={{ base: "md", md: "lg" }}
                fontWeight="semibold"
                mb={{ base: 2, md: 3 }}
                color="#00325c"
              >
                Title{" "}
                <Span fontSize="sm" color={"gray.500"}>
                  (For Youtube Only )
                </Span>{" "}
                <Span color="red.500">*</Span>
              </Text>
              <Box
                // border="1px solid"
                // borderColor="gray.200"
                borderRadius={"6px"}
                height="44px" // Fixed height to match design
              >
                <Textarea
                  placeholder="Write a title"
                  border="none"
                  backgroundColor={"#f7f7f7"}
                  _focus={{
                    borderColor: "transparent",
                    boxShadow: "none",
                    outline: "none",
                  }}
                  _hover={{
                    borderColor: "transparent",
                  }}
                  p={3}
                  fontSize="14px"
                  height="44px" // Match container height
                  _placeholder={{ color: "gray.500" }}
                  resize="none"
                  value={titleContent}
                  onChange={handleTitleChange}
                />
              </Box>
            </Box>
          )}

          {/* Channel Selection */}
          {(() => {
            console.log(
              "Channel section check - selectedPlatformsType:",
              selectedPlatformsType
            )
            return selectedPlatformsType.includes("YOUTUBE")
          })() && (
            <Box flex="1" maxW={{ base: "100%", md: "38%" }} w="full" minW={0}>
              <SelectChannelDropdown />
            </Box>
          )}
        </HStack>

        {/* Description Section with Tiptap Editor */}
        {/* Hide description when surface type is STORY and platform is Facebook, Instagram, or TikTok */}
        {!shouldHideDescription && (
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
        )}

        {/* Hashtag suggestions section - hide when description is hidden */}
        {!shouldHideDescription && (
          <Box w="full" maxW="100%" minW={0}>
            <Text
              fontSize={{ base: "md", md: "lg" }}
              fontWeight="semibold"
              mb={{ base: 2, md: 3 }}
              color="#00325c"
            >
              Hashtag Suggestions
            </Text>
            <Flex wrap="wrap" gap={{ base: 1.5, md: 2 }} w="full">
              {suggestions.map((tag) => (
                <Box
                  key={tag}
                  as="button"
                  px={{ base: 2, md: 3 }}
                  py={{ base: 1.5, md: 2 }}
                  borderRadius="md"
                  cursor="pointer"
                  onClick={(e) => {
                    e.preventDefault()
                    addTag(tag)
                  }}
                  backgroundColor="gray.100"
                  color="gray.700"
                  fontSize={{ base: "xs", md: "sm" }}
                  fontWeight="medium"
                  border="1px solid"
                  borderColor="gray.200"
                  _hover={{
                    backgroundColor: "gray.200",
                    borderColor: "gray.300",
                  }}
                  _active={{
                    backgroundColor: "gray.300",
                  }}
                  transition="all 0.2s"
                >
                  #{tag}
                </Box>
              ))}
            </Flex>
          </Box>
        )}
        <Box
          p={{ base: 1, md: 2 }}
          spaceY={{ base: 3, md: 6 }}
          w="full"
          maxW="100%"
          minW={0}
        >
          <Heading
            color={"#00325c"}
            fontSize={{ base: "lg", md: "fontSizes.4xl" }}
          >
            Media
          </Heading>

          <FileUpload.Root
            maxW={{ base: "100%", md: "3xl" }}
            w="full"
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

        {/* Schedule section */}
        <Box
          w="full"
          maxW="100%"
          minW={0}
          border="1px solid"
          borderColor="gray.200"
          borderRadius="md"
        >
          <VStack
            align="flex-start"
            gap={{ base: 4, md: 8 }}
            w="full"
            maxW="100%"
            minW={0}
          >
            {/* Header */}
            <Box
              backgroundColor={"gray.100"}
              borderBottom={"1px solid"}
              borderColor={"gray.200"}
              paddingTop={"2"}
              w="full"
              maxW="100%"
              minW={0}
              flexDirection="row"
              display={"flex"}
              justifyContent={"space-between"}
            >
              <Text
                fontSize={{ base: "md", md: "lg" }}
                fontWeight="semibold"
                mb={2}
                color="#00325c"
                paddingLeft={{ base: 3, md: 5 }}
                paddingRight={{ base: 3, md: 10 }}
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

          <Box w="full" maxW="100%" minW={0}>
            <Accordion.Root
              collapsible
              value={isScheduled ? ["schedule"] : []} // Control based on isSchedule state
              borderBottom="none"
              textDecoration="none"
              outline="none"
            >
              <Accordion.Item value="schedule" border="none" outline="none">
                <Accordion.ItemContent
                  ml={{ base: 2, md: 3 }}
                  overflow="visible"
                >
                  <Accordion.ItemBody>
                    <Flex
                      align="center"
                      gap={{ base: 1.5, md: 2 }}
                      bg="white"
                      width={"full"}
                      maxW="100%"
                      display="inline-flex"
                      position={"relative"}
                      mb={{ base: 2, md: 3 }}
                    >
                      <Text
                        fontSize={{ base: "xs", md: "sm" }}
                        color="orange.500"
                      >
                        ⚠️
                      </Text>
                      <Text
                        fontSize={{ base: "xs", md: "13" }}
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
                            fontSize={{ base: "xs", md: "sm" }}
                            position={"absolute"}
                            left={{ base: 120, md: 170 }}
                            top={1}
                          >
                            This Section Required.
                          </Text>
                        </Text>
                      </Text>
                    </Flex>
                    <VStack
                      spaceY={{ base: 3, md: 4 }}
                      align="stretch"
                      w="full"
                      maxW="100%"
                      minW={0}
                    >
                      <DateTime setvalue={setValue} scheduled={scheduledTime} />
                    </VStack>
                  </Accordion.ItemBody>
                </Accordion.ItemContent>
              </Accordion.Item>
            </Accordion.Root>
          </Box>
        </Box>
        <Box pb={{ base: "50px", md: 4 }} w="full" maxW="100%" minW={0}>
          <Flex justify="end" gap={{ base: 1.5, md: 2 }} w="full">
            <Button
              type="submit"
              bg="secondary.500"
              color="button.DEFAULT"
              size={{ base: "sm", md: "md" }}
              _hover={{ bg: "button.HOVER" }}
              _active={{ bg: "button.ACTIVE" }}
              disabled={!isFormValidForSubmission} // Use custom validation
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
                : "Post Now"}{" "}
            </Button>
            {/* <Button
              variant="outline"
              onClick={async () => {
                console.log("Manual clear button clicked")
                await resetFormData()
              }}
              size="sm"
            >
              Clear Form
            </Button> */}
          </Flex>
        </Box>
      </VStack>
      <SuccessDialog />
    </Box>
  )
}
