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
import type { FileMeta, FilesPayload } from "../types";
import { useUploadStore } from "../lib/store/file";
import { filesSchema } from "../lib/zod";
import "../css/FileUpload.css";
import {
  FacebookPostSchema,
  TikTokMediaPostSchema,
  YouTubeVideoSchema,
} from "@/components/SocialAcc/zod";
import { toaster } from "@/components/ui/toaster";

export const FileUploadList = ({
  clearFiles,
  onClearComplete,
  selectedPlatforms,
}: {
  clearFiles: boolean;
  onClearComplete?: () => void;
  selectedPlatforms: string[];
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
  const { setHasVideos } = useUploadStore();
  const files = useMemo(
    () => fileUpload.acceptedFiles,
    [fileUpload.acceptedFiles],
  );
  const fileSchem = useMemo(() => {
    if (selectedPlatforms.includes("YOUTUBE")) return YouTubeVideoSchema;
    if (selectedPlatforms.includes("TIKTOK")) return TikTokMediaPostSchema;
    if (selectedPlatforms.includes("FACEBOOK")) return FacebookPostSchema;
    if (selectedPlatforms.includes("INSTAGRAM")) return FacebookPostSchema;
  }, [selectedPlatforms]);
  const validateFiles = useCallback(
    (files: File[]) => {
      // Validate same file type (image/video)
      const batch = filesSchema.safeParse(files);
      if (!batch.success) {
        setError(batch.error.issues[0].message);
        return false;
      }

      if (!fileSchem) {
        queueMicrotask(() => {
          fileUpload.clearFiles();
          toaster.error({
            title: "Not allowed",
            description: "please, select a platform",
            closable: true,
            duration: 4000,
          });
        });
        return false;
      }

      if (files) {
        const videoCount = files.filter((f) =>
          f.type.startsWith("video/"),
        ).length;

        if (videoCount > 1) {
          setHasVideos(false);
          queueMicrotask(() => {
            fileUpload.clearFiles();
            toaster.error({
              title: "Only one video allowed",
              description: "Please select only one video file.",
              duration: 4000,
              closable: true,
            });
          });
          return;
        }
      }

      // Validate each file using imageFile/videoFile/photoFile fields

      for (const file of files) {
        const s: any = fileSchem.shape;
        const tryParse = (key: string) => {
          if (s[key]) {
            try {
              s[key].parse(file);
              return true;
            } catch (e: any) {
              setError(e.errors?.[0]?.message);
              return false;
            }
          }
          return false;
        };

        const type = file.type.startsWith("video/")
          ? ["videoFile"]
          : file.type.startsWith("image/")
            ? ["photoFile", "imageFile", "thumbnailFile"]
            : [];

        if (!type.some((key) => tryParse(key))) {
          setError("Unsupported file");
          return false;
        }
      }

      setError("");
      return true;
    },
    [fileSchem],
  );

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
    <Box minW="60rem">
      {error && (
        <Text color="red.500" fontWeight={500} fontSize="sm">
          {error}
        </Text>
      )}
      <FileUpload.ItemGroup
        display="flex"
        flexDirection="row"
        overflow="scroll"
        className="file-upload-item-group"
        pt={2}
      >
        {!error &&
          files.length > 0 &&
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
                    onClick={() => setHasVideos(false)}
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
                    src={URL.createObjectURL(file)}
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
    </Box>
  );
};
