import { useIsMobile } from "@/hooks/useIsMobile";
import {
  Box,
  Button,
  FileUpload,
  Float,
  useFileUploadContext,
} from "@chakra-ui/react";
import { LuX } from "react-icons/lu";
import { useVideoPreview } from "../hooks/useVideoPreview";
import { VideoPreviewDialog } from "./PreviewModel";

export const FileUploadList = () => {
  const isMobile = useIsMobile();
  const {
    open: isOpen,
    onClose,
    previewSrc,
    handlePreview,
  } = useVideoPreview();
  const fileUpload = useFileUploadContext();
  const files = fileUpload.acceptedFiles;
  if (files.length === 0) return null;
  return (
    <>
      <FileUpload.ItemGroup display="flex" flexDirection="row">
        {files.map((file) =>
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
