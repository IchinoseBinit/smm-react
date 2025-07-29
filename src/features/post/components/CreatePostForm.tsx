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
  const [selectedPlatformsType, setSelectedPlatformsType] = useState<string[]>(
    [],
  );

  const selectedPlatforms = useMemo(
    () => itemArr.map((item) => item.social_account_id),
    [itemArr],
  );

  const formSchema = useMemo(() => {
    const selectedTypes = Array.from(
      new Set(
        itemArr
          .filter((item) => selectedIds.includes(item.social_account_id))
          .map((item) => item.accountType),
      ),
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
    status: "", // or ""
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
    [content, setValue],
  );
  useEffect(() => {
    setValue("platform_statuses", itemArr, { shouldValidate: true });
  }, [itemArr, setValue]);

  const uploadFiles = async () => {
    // Step 1: get presigned URLs
    const presignedResponse: any = await mutateAsync(payload);

    // Step 2: upload files to S3
    await Promise.all(
      presignedResponse.presigned_posts.map((post: any, i: any) => {
        const formData = new FormData();
        Object.entries(post.fields).forEach(([key, value]) => {
          formData.append(key, value as string);
        });
        formData.append("file", payload.files[i].file);

        return axios.post(post.url, formData);
      }),
    );
    const urls = presignedResponse.presigned_posts.map(
      (post: any) => post.url + post.fields.key,
    );
    // Convert to medias format

    const medias = urls.map((url: string, index: number) => ({
      s3_url: encodeURI(url),
      order: index,
    }));
    if (medias.length === 0) return false;
    setValue("medias", medias, { shouldValidate: true });
    return true;
  };

  const onSubmit = async () => {
    setPostLoading(true);

    try {
      setValue("status", isScheduled ? "scheduled" : "posted", {
        shouldValidate: true,
      });
      if (!isScheduled) {
        setValue("scheduled_time", null, { shouldValidate: true });
      }

      // clear if not scheduled
      const x = await uploadFiles();
      if (x == false) {
        console.log(x);
        return;
      }

      const isPhoto = payload.files.every((f) => f.type.startsWith("image/"));
      setValue("is_photo", isPhoto, { shouldValidate: true }); // ✅ here

      const currentType = useContentTypeStore.getState().surfaceType[0]; // ✅ always up-to-date
      setValue("surface", currentType, { shouldValidate: true });

      const latestData = getValues();

      if (
        !selectedPlatformsType.includes("YOUTUBE") &&
        !selectedPlatformsType.includes("TIKTOK") &&
        !selectedPlatformsType.includes("INSTAGRAM")
      ) {
        delete latestData.title;
      }
      if (latestData.scheduled_time) {
        latestData.scheduled_time = new Date(
          latestData.scheduled_time,
        ).toISOString();
      }

      await mutateCreatePost(latestData).then((res) => {
        if (res?.success) {
          openDialog({
            status: isScheduled ? "scheduled" : "posted",
          });
        }
      });
      reset(defaultValues);
      resetSurfaceType();
      setIsScheduled(false);
      setClearFiles(true);
      setTimeout(() => setClearSelectedAcc(true), 0);
    } finally {
      setPostLoading(false);
    }
  };

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
                setItemArr={setItemArr} // ← fixed prop name
                selectedPlatforms={selectedPlatforms}
                icon={iconMap[type].icon} // ← pass icon
                iconColor={iconMap[type].color} // ← pass color
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
        <Box p={2} spaceY={6}>
          <Heading fontSize="fontSizes.4xl">Media</Heading>
          <FileUpload.Root maxW="3xl" alignItems="stretch" maxFiles={5}>
            <FileUpload.HiddenInput />
            {hasVideos === false && (
              <FileUpload.Dropzone>
                <Icon size="md" color="fg.muted">
                  <LuUpload />
                </Icon>
                <FileUpload.DropzoneContent>
                  <Box>Drag and drop files here</Box>
                  <Box color="fg.muted">.png, .jpg,mp4</Box>
                </FileUpload.DropzoneContent>
              </FileUpload.Dropzone>
            )}
            <FileUploadList
              clearFiles={clearFiles}
              onClearComplete={() => setClearFiles(false)}
              selectedPlatforms={selectedPlatformsType}
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
              // base styles
              bg="bg.DIM"
              shadow="md"
              borderRadius="lg"
              px={4}
              py={2}
              width={80}
              transition="background 0.2s, color 0.2s"
              // hover state
              _hover={{
                bg: "bg.DEFAULT",
                color: "fg.DEFAULT",
                cursor: "pointer",
              }}
              // expanded state
              _expanded={{ bg: "bg.DEFAULT", boxShadow: "md" }}
            >
              <Span flex="1">Schedule Post (Date/Time)</Span>
              <Accordion.ItemIndicator />
            </Accordion.ItemTrigger>
            <Accordion.ItemContent
              border="none"
              outline="none"
              textDecoration="none"
              m={5}
              mt={2}
              bg="bg.SUBTLE"
              shadow="md"
              borderRadius="md"
              p={4}
              overflow="visible"
            >
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
