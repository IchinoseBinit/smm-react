import { useIsMobile } from "@/hooks/useIsMobile"
import {
  Box,
  Button,
  FileUpload,
  Float,
  Text,
  useFileUploadContext,
} from "@chakra-ui/react"
import { LuX } from "react-icons/lu"
import { useVideoPreview } from "../hooks/useVideoPreview"
import { VideoPreviewDialog } from "./PreviewModel"
import { useCallback, useEffect, useMemo, useState } from "react"
import type { FileMeta, FilesPayload } from "../types"
import { useUploadStore } from "../lib/store/file"
import { filesSchema } from "../lib/zod"
import "../css/FileUpload.css"
import {
  FacebookPostSchema,
  TikTokMediaPostSchema,
  YouTubeVideoSchema,
} from "@/components/SocialAcc/zod"
import { toaster } from "@/components/ui/toaster"

export const FileUploadList = ({
  clearFiles,
  onClearComplete,
  selectedPlatforms,
}: {
  clearFiles: boolean
  onClearComplete?: () => void
  selectedPlatforms: string[]
}) => {
  const isMobile = useIsMobile()
  const { open: isOpen, onClose, previewSrc, handlePreview } = useVideoPreview()
  const [error, setError] = useState("")
  const fileUpload = useFileUploadContext()
  const { setHasVideos } = useUploadStore()
  const files = useMemo(
    () => fileUpload.acceptedFiles,
    [fileUpload.acceptedFiles]
  )
  const fileSchem = useMemo(() => {
    if (selectedPlatforms.includes("YOUTUBE")) return YouTubeVideoSchema
    if (selectedPlatforms.includes("TIKTOK")) return TikTokMediaPostSchema
    if (selectedPlatforms.includes("FACEBOOK")) return FacebookPostSchema
    if (selectedPlatforms.includes("INSTAGRAM")) return FacebookPostSchema
  }, [selectedPlatforms])

  const validateFiles = useCallback(
    (newFiles: File[]) => {
      // Validate same file type (image/video)
      const batch = filesSchema.safeParse(newFiles)
      if (!batch.success) {
        setError(batch.error.issues[0].message)
        return false
      }

      if (!fileSchem) {
        queueMicrotask(() => {
          fileUpload.clearFiles()
          toaster.error({
            title: "Not allowed",
            description: "please, select a platform",
            closable: true,
            duration: 4000,
          })
        })
        return false
      }

      if (newFiles && newFiles.length > 0) {
        const newVideoCount = newFiles.filter((f) =>
          f.type.startsWith("video/")
        ).length
        const newImageCount = newFiles.filter((f) =>
          f.type.startsWith("image/")
        ).length

        // Get existing files (but exclude the current validation batch)
        const existingFiles = fileUpload.acceptedFiles || []

        // Only validate against truly existing files, not the current batch
        const actualExistingFiles = existingFiles.filter(
          (existingFile) =>
            !newFiles.some((newFile) => newFile.name === existingFile.name)
        )

        const existingVideoCount = actualExistingFiles.filter((f) =>
          f.type.startsWith("video/")
        ).length
        const existingImageCount = actualExistingFiles.filter((f) =>
          f.type.startsWith("image/")
        ).length

        // Rule 1: Cannot mix videos and images in the same upload batch
        if (newVideoCount > 0 && newImageCount > 0) {
          setError("Cannot upload both videos and images together")

          queueMicrotask(() => {
            toaster.error({
              title: "Mixed media not allowed",
              description: "Please upload either videos OR images, not both.",
              duration: 4000,
              closable: true,
            })
          })
          return false
        }

        // Rule 2: Only one video allowed (new videos only)
        if (newVideoCount > 1) {
          setError("Only one video allowed")
          queueMicrotask(() => {
            toaster.error({
              title: "Only one video allowed",
              description: "Please select only one video file.",
              duration: 4000,
              closable: true,
            })
          })
          return false
        }

        // Rule 3: If there are existing images, cannot upload videos
        if (existingImageCount > 0 && newVideoCount > 0) {
          setError("Cannot upload video when images are already uploaded")
          queueMicrotask(() => {
            toaster.error({
              title: "Cannot mix media types",
              description: "Remove existing images first to upload a video.",
              duration: 4000,
              closable: true,
            })
          })
          return false
        }

        // Rule 4: If there are existing videos, cannot upload more videos
        if (existingVideoCount > 0 && newVideoCount > 0) {
          setError("Only one video allowed")
          queueMicrotask(() => {
            toaster.error({
              title: "Only one video allowed",
              description:
                "Remove the existing video before uploading a new one.",
              duration: 4000,
              closable: true,
            })
          })
          return false
        }

        // Rule 5: If there are existing videos, cannot upload images
        if (existingVideoCount > 0 && newImageCount > 0) {
          setError("Cannot upload images when video is already uploaded")
          queueMicrotask(() => {
            toaster.error({
              title: "Cannot mix media types",
              description: "Remove the video first to upload images.",
              duration: 4000,
              closable: true,
            })
          })
          return false
        }

        // Set video state
        if (newVideoCount > 0 || existingVideoCount > 0) {
          setHasVideos(true)
        } else {
          setHasVideos(false)
        }
      }

      // Validate each file using imageFile/videoFile/photoFile fields
      for (const file of newFiles) {
        const s: any = fileSchem.shape
        const tryParse = (key: string) => {
          if (s[key]) {
            try {
              s[key].parse(file)
              return true
            } catch (e: any) {
              setError(e.errors?.[0]?.message)
              return false
            }
          }
          return false
        }

        const type = file.type.startsWith("video/")
          ? ["videoFile"]
          : file.type.startsWith("image/")
          ? ["photoFile", "imageFile", "thumbnailFile"]
          : []

        if (!type.some((key) => tryParse(key))) {
          setError("Unsupported file")
          return false
        }
      }

      setError("")
      return true
    },
    [fileSchem, fileUpload.acceptedFiles, setHasVideos]
  )

  const uploadFiles = useCallback(async () => {
    // Only validate when there are actually new files to process
    if (files.length === 0) return

    // Don't validate the same files repeatedly
    if (!validateFiles(files)) return

    const fileArr: FileMeta[] = files.map((file) => ({
      filename: file.name,
      type: file.type,
      file,
    }))

    console.log("fileArr", fileArr)

    const payload: FilesPayload = { files: fileArr }
    console.log("payload", payload)
    // set files
    useUploadStore.getState().setPayload(payload)
  }, [files, validateFiles])

  useEffect(() => {
    if (files.length === 0) {
      setError("")
      return
    }
    uploadFiles()
  }, [files, uploadFiles])

  useEffect(() => {
    if (clearFiles) {
      fileUpload.clearFiles()
      onClearComplete?.() // callback to parent to reset flag
    }
  }, [clearFiles, fileUpload, onClearComplete])

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
            )
          )}
      </FileUpload.ItemGroup>
      <VideoPreviewDialog isOpen={isOpen} onClose={onClose} src={previewSrc} />
    </Box>
  )
}
