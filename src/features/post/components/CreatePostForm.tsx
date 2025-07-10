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
  useFileUploadContext,
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
import { PostAccountSection } from "@/components/SocialAcc/AccountSection";
import FacebookAccount from "@/components/SocialAcc/facebook/FacebookAccount";
import TiktokAccount from "@/components/SocialAcc/tiktok/TiktokAccount";
import YoutubeAccount from "@/components/SocialAcc/youtube/YoutubeAccount";
import { useAllConnAccounts } from "@/hooks/useConnectedAccounts";
import { CircularLoading } from "@/lib/loadings";
import { useCreatePost } from "../hooks/query/usePost";
import useFileUpload from "../hooks/query/useFileUpload";
import { useUploadStore } from "../lib/store/filePayload";
import axios from "axios";

export default function CreatePostForm() {
  const { userId } = useAuthUtils();
  const { data, isLoading } = useAllConnAccounts(userId);
  const [itemArr, setItemArr] = useState<any[]>([]);
  const [clearFiles, setClearFiles] = useState(false);
  const [clearSelectedAcc, setClearSelectedAcc] = useState(false);
  const { mutate, isPending } = useCreatePost();
  const fileUpload = useFileUploadContext();
  const files = useMemo(
    () => fileUpload.acceptedFiles,
    [fileUpload.acceptedFiles],
  );
  const { payload } = useUploadStore();
  const { mutateAsync } = useFileUpload();
  const accountConfigs = useMemo(
    () => [
      { type: "FACEBOOK" as AccountType, Component: FacebookAccount },
      { type: "TIKTOK" as AccountType, Component: TiktokAccount },
      { type: "YOUTUBE" as AccountType, Component: YoutubeAccount },
    ],
    [],
  );
  const defaultValues = {
    title: "",
    description: "",
    status: "scheduled", // or ""
    scheduled_time: "",
    medias: [
      {
        s3_url: "",
        order: 0,
      },
    ],
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
  } = useForm({ mode: "onChange", defaultValues });

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
    setValue("platform_statuses", itemArr);
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
        formData.append("file", files[i]);

        return axios.post(post.url, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }),
    );
    const urls = presignedResponse.presigned_posts.map(
      (post: any) => post.url + post.fields.key,
    );
    // Convert to medias format
    const medias = urls.map((url: any, index: any) => ({
      s3_url: url,
      order: index,
    }));
    setValue("medias", medias);
  };

  const onSubmit = async () => {
    await uploadFiles();
    const latestData = getValues(); // This now includes updated "medias"
    mutate(latestData);
    reset(defaultValues);
    setClearFiles(true);
    setClearSelectedAcc(true);
  };

  if (isLoading) return <CircularLoading />;
  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <VStack spaceY={10} align="stretch">
        <Field.Root required>
          <Input
            placeholder="write topic name!"
            {...register("title", { required: true })}
            maxW="30rem"
            maxH="5lh"
            size="xl"
            variant="subtle"
          />
        </Field.Root>
        <Field.Root required>
          <Textarea
            placeholder="What's on your mind?"
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
          <FileUpload.Root maxW="3xl" alignItems="stretch" maxFiles={10}>
            <FileUpload.HiddenInput />
            <FileUpload.Dropzone>
              <Icon size="md" color="fg.muted">
                <LuUpload />
              </Icon>
              <FileUpload.DropzoneContent>
                <Box>Drag and drop files here</Box>
                <Box color="fg.muted">.png, .jpg,mp4</Box>
              </FileUpload.DropzoneContent>
            </FileUpload.Dropzone>
            <FileUploadList
              clearFiles={clearFiles}
              onClearComplete={() => setClearFiles(false)}
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

        <Box>
          <Text mb={2} fontWeight="medium" color="fg.DEFAULT">
            Connected Accounts
          </Text>

          <SimpleGrid columns={{ base: 1, lg: 2, xl: 3 }} gridGap={10} mt={2}>
            {accountConfigs.map(({ type, Component }) => (
              <PostAccountSection
                key={type}
                type={type}
                data={data}
                Component={Component}
                setvalue={setValue}
                ItemArr={itemArr}
                setItemArr={setItemArr}
                clearSelectedAcc={clearSelectedAcc}
                onClearSelectComplete={() => setClearSelectedAcc(false)}
              />
            ))}
          </SimpleGrid>
        </Box>

        <Accordion.Root collapsible defaultValue={[]}>
          <Accordion.Item value="schedule">
            <Accordion.ItemTrigger _hover={{ cursor: "pointer" }}>
              <Span flex="1">Schedule Post (Date/Time)</Span>
              <Accordion.ItemIndicator />
            </Accordion.ItemTrigger>
            <Accordion.ItemContent>
              <Accordion.ItemBody>
                <VStack spaceY={4} align="stretch">
                  <DateTime
                    register={register}
                    setvalue={setValue}
                    scheduled={scheduledTime}
                  />
                  <Flex justify="end">
                    <Button
                      type="submit"
                      bg="secondary.500"
                      color="button.DEFAULT"
                      _hover={{ bg: "button.HOVER" }}
                      _active={{ bg: "button.ACTIVE" }}
                      disabled={!isValid}
                      loading={isPending}
                      loadingText="Posting..."
                    >
                      Schedule Post
                    </Button>
                  </Flex>
                </VStack>
              </Accordion.ItemBody>
            </Accordion.ItemContent>
          </Accordion.Item>
        </Accordion.Root>
      </VStack>
    </Box>
  );
}
