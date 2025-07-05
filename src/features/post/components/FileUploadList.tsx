import { useIsMobile } from "@/hooks/useIsMobile";
import {
  Box,
  Button,
  FileUpload,
  Float,
  Text,
  useFileUploadContext,
} from "@chakra-ui/react";
import { LuX } from "react-icons/lu";
import { useVideoPreview } from "../hooks/useVideoPreview";
import { VideoPreviewDialog } from "./PreviewModel";
import { useCallback, useEffect, useMemo, useState } from "react";
import { filesSchema } from "../lib/zod";
import useFileUpload from "../hooks/query/useFileUpload";
import type { FileMeta, FilesPayload } from "../post.types";

export const FileUploadList = () => {
  const isMobile = useIsMobile();
  const {
    open: isOpen,
    onClose,
    previewSrc,
    handlePreview,
  } = useVideoPreview();
  const { mutateAsync } = useFileUpload();
  const [error, setError] = useState("");
  const fileUpload = useFileUploadContext();
  const files = useMemo(
    () => fileUpload.acceptedFiles,
    [fileUpload.acceptedFiles],
  );

  const validateFiles = useCallback((files: File[]) => {
    const result = filesSchema.safeParse(files);
    if (!result.success) {
      setError(result.error.issues[0].message);
      return false;
    }
    setError("");
    return true;
  }, []);

  const uploadFiles = useCallback(async () => {
    if (!validateFiles(files)) return;

    const fileArr: FileMeta[] = files.map((file) => ({
      filename: file.name,
      type: file.type,
    }));

    const payload: FilesPayload = { files: fileArr };

    await mutateAsync(payload);
  }, [files, validateFiles, mutateAsync]);

  useEffect(() => {
    if (files.length === 0) {
      setError("");
      return;
    }
    uploadFiles();
  }, [files, uploadFiles]);
  return (
    <>
      {error && (
        <Text color="red.500" fontWeight={500} fontSize="sm">
          {error}
        </Text>
      )}
      <FileUpload.ItemGroup display="flex" flexDirection="row">
        {!error &&
          files.map((file) =>
            file.type.startsWith("video/") ? (
              <FileUpload.Item
                w="auto"
                boxSize="52"
                p="2"
                file={file}
                key={file.name}
              >
                <Box position="relative" w="100%" h="100%">
                  <video
                    src={URL.createObjectURL(file)}
                    style={{ width: "100%", height: "100%", borderRadius: 8 }}
                    controls={false}
                  />

                  <Box
                    position="absolute"
                    top="0"
                    left="0"
                    w="100%"
                    h="100%"
                    bg="blackAlpha.500"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    opacity={isMobile ? 1 : 0}
                    _hover={isMobile ? {} : { opacity: 1, cursor: "pointer" }}
                    borderRadius={8}
                    transition="opacity 0.2s"
                    onClick={() => handlePreview(file)}
                  >
                    <Button size="sm" colorScheme="teal">
                      Preview
                    </Button>
                  </Box>
                </Box>

                <Float placement="top-end">
                  <FileUpload.ItemDeleteTrigger
                    boxSize="4"
                    layerStyle="fill.solid"
                    bg="red"
                    borderRadius="full"
                  >
                    <LuX />
                  </FileUpload.ItemDeleteTrigger>
                </Float>
              </FileUpload.Item>
            ) : (
              <FileUpload.Item
                w="auto"
                boxSize="52"
                p="2"
                file={file}
                key={file.name}
              >
                <FileUpload.ItemPreviewImage />
                <Float placement="top-end">
                  <FileUpload.ItemDeleteTrigger
                    boxSize="4"
                    layerStyle="fill.solid"
                    bg="red"
                    borderRadius="full"
                  >
                    <LuX />
                  </FileUpload.ItemDeleteTrigger>
                </Float>
              </FileUpload.Item>
            ),
          )}
      </FileUpload.ItemGroup>
      <VideoPreviewDialog isOpen={isOpen} onClose={onClose} src={previewSrc} />
    </>
  );
};
