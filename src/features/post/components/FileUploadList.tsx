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
import type { FileMeta, FilesPayload } from "../types";
import { useUploadStore } from "../lib/store/filePayload";

export const FileUploadList = ({
  clearFiles,
  onClearComplete,
}: {
  clearFiles: boolean;
  onClearComplete?: () => void;
}) => {
  const isMobile = useIsMobile();
  const {
    open: isOpen,
    onClose,
    previewSrc,
    handlePreview,
  } = useVideoPreview();
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
      file,
    }));

    const payload: FilesPayload = { files: fileArr };
    // set files
    useUploadStore.getState().setPayload(payload);
  }, [files, validateFiles]);

  useEffect(() => {
    if (files.length === 0) {
      setError("");
      return;
    }
    uploadFiles();
  }, [files, uploadFiles]);

  useEffect(() => {
    if (clearFiles) {
      fileUpload.clearFiles();
      onClearComplete?.(); // callback to parent to reset flag
    }
  }, [clearFiles, fileUpload, onClearComplete]);

  return (
    <>
      {error && (
        <Text color="red.500" fontWeight={500} fontSize="sm">
          {error}
        </Text>
      )}
      <FileUpload.ItemGroup display="flex" flexDirection="row">
        {files.length > 0 &&
          !error &&
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
                <Box overflow="hidden" w="auto" boxSize="52" p="2">
                  <FileUpload.ItemPreviewImage
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
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
            ),
          )}
      </FileUpload.ItemGroup>
      <VideoPreviewDialog isOpen={isOpen} onClose={onClose} src={previewSrc} />
    </>
  );
};
