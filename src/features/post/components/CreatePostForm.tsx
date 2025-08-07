import { useCallback, useEffect, useMemo, useState } from "react";
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
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { LuUpload } from "react-icons/lu";
import { FileUploadList } from "./FileUploadList";
import DateTime from "./DateTime";
import { useAuthUtils } from "@/hooks/useAuthUtils";
import { useAllConnAccounts } from "@/hooks/useConnectedAccounts";
import { CircularLoading } from "@/lib/loadings";
import { useCreatePost } from "../hooks/query/usePost";
import useFileUpload from "../hooks/query/useFileUpload";
import { useUploadStore } from "../lib/store/file";
import axios from "axios";
import { useScheduleStore } from "../lib/store/dateTime";
import { useSuccessDialogStore } from "../lib/store/successDialog";
import { SuccessDialog } from "./SuccessCreatePost";
import {
  FacebookPostSchema,
  TikTokMediaPostSchema,
  YouTubeVideoSchema,
} from "@/components/SocialAcc/zod";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useClearSelectedAccStore,
  useSelectedStore,
} from "../lib/store/selectedAcc";
import { PostConnectedAccsSection } from "./ConnectedAccs";
import { accountConfigs, iconMap } from "../lib/accounts";
import { SelectSurface } from "./selectSurface";
import { useContentTypeStore } from "../lib/store/sufaceType";

export default function CreatePostForm() {
  const { userId } = useAuthUtils();
  const { data, isLoading } = useAllConnAccounts(userId);
  const isScheduled = useScheduleStore((s) => s.isScheduled);
  const setIsScheduled = useScheduleStore((s) => s.setIsScheduled);
  const { setClearSelectedAcc } = useClearSelectedAccStore();
  const [itemArr, setItemArr] = useState<any[]>([]);
  const [clearFiles, setClearFiles] = useState(false);
  const [postLoading, setPostLoading] = useState(false);
  const { mutateAsync: mutateCreatePost } = useCreatePost();
  const { openDialog } = useSuccessDialogStore();

  const { payload, hasVideos } = useUploadStore();
  const { mutateAsync } = useFileUpload();
  const { selectedIds } = useSelectedStore();
  const { resetSurfaceType } = useContentTypeStore();
  const [selectedPlatformsType, setSelectedPlatformsType] = useState<string[]>([]);

  const selectedPlatforms = useMemo(
    () => itemArr.map((item) => item.social_account_id),
    [itemArr]
  );

  // Check what files are currently uploaded
  const uploadedFiles = payload?.files || [];
  const hasImages = uploadedFiles.some((file) => file.type.startsWith("image/"));
  const hasVideo = uploadedFiles.some((file) => file.type.startsWith("video/"));

  // Determine what file types to accept
  const acceptedFileTypes = useMemo(() => {
    if (hasImages) {
      return "image/*"; // Only allow images if images are already uploaded
    }
    if (hasVideo) {
      return ""; // Don't allow any new files if video is uploaded (only 1 video allowed)
    }
    return "image/*,video/*"; // Allow both if nothing is uploaded
  }, [hasImages, hasVideo]);

  const formSchema = useMemo(() => {
    const selectedTypes = Array.from(
      new Set(
        itemArr
          .filter((item) => selectedIds.includes(item.social_account_id))
          .map((item) => item.accountType)
      )
    );
    setSelectedPlatformsType(selectedTypes);

    if (selectedTypes.includes("YOUTUBE")) return YouTubeVideoSchema;
    if (selectedTypes.includes("TIKTOK")) return TikTokMediaPostSchema;
    if (selectedTypes.includes("FACEBOOK")) return FacebookPostSchema;
    if (selectedTypes.includes("INSTAGRAM")) return FacebookPostSchema;
    return z.any();
  }, [itemArr, selectedIds]);

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
  };

  const {
    register,
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
  });

  const content = watch("description", "");
  const scheduledTime = watch("scheduled_time");

  const suggestions = [
    "#TechTrends",
    "#Innovation",
    "#FutureTech",
    "#DigitalWorld",
    "#TechNews",
  ];

  const addTag = useCallback(
    (tag: string) => {
      const value = content.length ? `${content} ${tag}` : tag;
      setValue("description", value, { shouldValidate: true });
    },
    [content, setValue]
  );

  useEffect(() => {
    setValue("platform_statuses", itemArr, { shouldValidate: true });
  }, [itemArr, setValue]);

  const uploadFiles = async () => {
    console.log("uploadFiles called with payload:", payload)
    const presignedResponse: any = await mutateAsync(payload)
    console.log("presigned_post", presignedResponse)

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
    console.log("onsubmit called with:")
    setPostLoading(true)

    try {
      setValue("status", isScheduled ? "scheduled" : "posted", {
        shouldValidate: true,
      })
      if (!isScheduled) {
        setValue("scheduled_time", null, { shouldValidate: true })
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

  if (isLoading) return <CircularLoading />;

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
        {(selectedPlatformsType.includes("YOUTUBE") ||
          selectedPlatformsType.includes("TIKTOK")) && (
          <Field.Root required>
            <Field.Label>
              <Text fontSize={16} mb={2} fontWeight="medium" color="fg.DEFAULT">
                Title
              </Text>
            </Field.Label>
            <Input
              placeholder="write a title!"
              {...register("title", { required: true })}
              maxW="30rem"
              maxH="5lh"
              size="xl"
              variant="subtle"
            />
          </Field.Root>
        )}
        <Field.Root required>
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
        </Field.Root>

        {/* Simplified Media Upload Section */}
        <Box p={2} spaceY={6}>
          <Heading fontSize="fontSizes.4xl">Media</Heading>

          <FileUpload.Root
            maxW="3xl"
            alignItems="stretch"
            maxFiles={5}
            accept={acceptedFileTypes}
            disabled={hasVideo} // Disable entirely if video is uploaded
          >
            <FileUpload.HiddenInput />
            {hasVideos === false && !hasVideo && (
              <FileUpload.Dropzone>
                <Icon size="md" color="fg.muted">
                  <LuUpload />
                </Icon>
                <FileUpload.DropzoneContent>
                  <Box>Drag and drop files here</Box>
                  <Box color="fg.muted">
                    {hasImages ? ".png, .jpg only" : ".png, .jpg, .mp4"}
                  </Box>
                </FileUpload.DropzoneContent>
              </FileUpload.Dropzone>
            )}
            <FileUploadList
              clearFiles={clearFiles}
              onClearComplete={() => setClearFiles(false)}
              selectedPlatforms={selectedPlatformsType}
              showStatusMessages={true} // New prop to show status messages
            />
          </FileUpload.Root>
        </Box>

        <Box>
          <Text mb={2} fontWeight="medium" color="fg.DEFAULT">
            Hashtag Suggestions
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

        <Accordion.Root
          collapsible
          defaultValue={[]}
          borderBottom="none"
          textDecoration="none"
          outline="none"
        >
          <Accordion.Item value="schedule" border="none" outline="none">
            <Accordion.ItemTrigger
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
            </Accordion.ItemTrigger>
            <Accordion.ItemContent ml={3} overflow="visible">
              <Accordion.ItemBody>
                <VStack spaceY={4} align="stretch">
                  <DateTime
                    register={register}
                    setvalue={setValue}
                    scheduled={scheduledTime}
                  />
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
            disabled={!isValid}
            loading={postLoading}
            loadingText={isScheduled ? "Scheduling..." : "Posting..."}
          >
            {isScheduled ? "Schedule Post" : "Post"}
          </Button>
        </Flex>
      </VStack>
      <SuccessDialog />
    </Box>
  );
}
