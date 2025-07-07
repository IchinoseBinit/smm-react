import { useCallback } from "react";
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
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { LuUpload } from "react-icons/lu";
import { FileUploadList } from "./FileUploadList";
import DateTime from "./DateTime";
import { useAuthUtils } from "@/hooks/useAuthUtils";
import { AccountSection } from "@/components/SocialAcc/AccountSection";
import FacebookAccount from "@/components/SocialAcc/facebook/FacebookAccount";
import TiktokAccount from "@/components/SocialAcc/tiktok/TiktokAccount";
import YoutubeAccount from "@/components/SocialAcc/youtube/YoutubeAccount";
import { useAllConnAccounts } from "@/hooks/useConnectedAccounts";
import { CircularLoading } from "@/lib/loadings";
import { useCreatePost } from "../hooks/query/usePost";

export default function CreatePostForm() {
  const { userId } = useAuthUtils();
  const { data, isLoading } = useAllConnAccounts(userId);
  const { mutate, isPending } = useCreatePost();
  const accountConfigs = [
    { type: "FACEBOOK" as AccountType, Component: FacebookAccount },
    { type: "TIKTOK" as AccountType, Component: TiktokAccount },
    { type: "YOUTUBE" as AccountType, Component: YoutubeAccount },
  ];
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

  const onSubmit = (data: any) => {
    mutate(data);
    reset(defaultValues);
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
                <Box color="fg.muted">.png, .jpg up to 5MB</Box>
              </FileUpload.DropzoneContent>
            </FileUpload.Dropzone>
            <FileUploadList setvalue={setValue} />
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
          <>
            {accountConfigs.map(({ type, Component }) => (
              <AccountSection
                key={type}
                type={type}
                data={data}
                Component={Component}
                setvalue={setValue}
              />
            ))}
          </>
        </Box>

        <DateTime
          register={register}
          setvalue={setValue}
          scheduled={scheduledTime}
        />
        <Button
          type="submit"
          alignSelf="flex-end"
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
      </VStack>
    </Box>
  );
}
