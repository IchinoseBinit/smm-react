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
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { LuUpload } from "react-icons/lu";
import { FileUploadList } from "./FileUploadList";
import DateTime from "./DateTime";

export default function CreatePostForm() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { isValid },
  } = useForm({ mode: "onChange" });

  const content = watch("content", "");

  const onSubmit = (data: any) => {
    console.log(data);
  };

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
      setValue("content", value, { shouldValidate: true });
    },
    [content, setValue],
  );

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <VStack spaceY={10} align="stretch">
        <Field.Root required>
          <Textarea
            placeholder="What's on your mind?"
            {...register("content", { required: true })}
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
            <FileUploadList />
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
          {/* <HStack spaceX={4}>
            <Button variant="outline" flex={1} borderColor="border.DEFAULT">
              <Icon size="md" color={{ base: "black", _dark: "white" }}>
                <FaXTwitter />
              </Icon>
              Twitter
            </Button>
            <Button variant="outline" flex={1} borderColor="border.DEFAULT">
              <Icon size="md" color="blue.500">
                <FaFacebook />
              </Icon>
              Facebook
            </Button>
            <Button variant="outline" flex={1} borderColor="border.DEFAULT">
              <Icon size="md" color="pink.500">
                <FaInstagram />
              </Icon>
              Instagram
            </Button>
          </HStack> */}
        </Box>

        <DateTime register={register} />
        <Button
          type="submit"
          alignSelf="flex-end"
          bg="secondary.500"
          color="button.DEFAULT"
          _hover={{ bg: "button.HOVER" }}
          _active={{ bg: "button.ACTIVE" }}
          disabled={!isValid}
        >
          Schedule Post
        </Button>
      </VStack>
    </Box>
  );
}
