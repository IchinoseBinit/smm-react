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
  showStatusMessages = false,
}: {
  clearFiles: boolean
  onClearComplete?: () => void
  selectedPlatforms: string[]
  showStatusMessages?: boolean
}) => {
  const isMobile = useIsMobile()
  const { open: isOpen, onClose, previewSrc, handlePreview } = useVideoPreview()
  const [error, setError] = useState("")
  const fileUpload = useFileUploadContext()
  const { setHasVideos, payload, setPayload } = useUploadStore()

  const files = useMemo(
    () => fileUpload.acceptedFiles,
    [fileUpload.acceptedFiles]
  )

  // Get file status from both sources for status messages
  const uploadedFiles = payload?.files || []
  const hasImages =
    files.some((file) => file.type.startsWith("image/")) ||
    uploadedFiles.some((file) => file.type.startsWith("image/"))
  const hasVideo =
    files.some((file) => file.type.startsWith("video/")) ||
    uploadedFiles.some((file) => file.type.startsWith("video/"))

  const fileSchem = useMemo(() => {
    if (selectedPlatforms.includes("YOUTUBE")) return YouTubeVideoSchema
    if (selectedPlatforms.includes("TIKTOK")) return TikTokMediaPostSchema
    if (selectedPlatforms.includes("FACEBOOK")) return FacebookPostSchema
    if (selectedPlatforms.includes("INSTAGRAM")) return FacebookPostSchema
  }, [selectedPlatforms])

  // Custom delete function that actually removes the file
  const handleDeleteFile = useCallback(
    (fileToDelete: File) => {
      console.log(
        "Attempting to delete file:",
        fileToDelete.name,
        fileToDelete.type
      )

      if (fileUpload.deleteFile) {
        console.log("Using fileUpload.deleteFile method")
        fileUpload.deleteFile(fileToDelete)
      } else if (fileUpload.clearFiles && files.length === 1) {
        console.log("Clearing all files since only one exists")
        fileUpload.clearFiles()
      } else {
        console.log("Manually filtering files")
        const newFiles = files.filter((file) => file !== fileToDelete)

        if (fileUpload.setFiles) {
          fileUpload.setFiles(newFiles)
        } else {
          const fileInput = document.querySelector(
            'input[type="file"]'
          ) as HTMLInputElement
          if (fileInput) {
            const dt = new DataTransfer()
            newFiles.forEach((file) => dt.items.add(file))
            fileInput.files = dt.files

            const event = new Event("change", { bubbles: true })
            fileInput.dispatchEvent(event)
          }
        }
      }

      // Update our store immediately
      const remainingFiles = files.filter((file) => file !== fileToDelete)
      console.log("Remaining files after delete:", remainingFiles.length)

      if (remainingFiles.length === 0) {
        setPayload(null)
        setHasVideos(false)
        setError("")
      } else {
        const fileArr: FileMeta[] = remainingFiles.map((file) => ({
          filename: file.name,
          type: file.type,
          file,
        }))
        setPayload({ files: fileArr })
        setHasVideos(remainingFiles.some((f) => f.type.startsWith("video/")))
      }

      try {
        URL.revokeObjectURL(URL.createObjectURL(fileToDelete))
      } catch (e) {
        console.log("Error revoking object URL:", e)
      }
    },
    [files, fileUpload, setPayload, setHasVideos]
  )

  useEffect(() => {
    const currentVideos = files.filter((file) => file.type.startsWith("video/"))
    const currentImages = files.filter((file) => file.type.startsWith("image/"))

    setHasVideos(currentVideos.length > 0)

    if (files.length === 0) {
      setPayload(null)
      setError("")
    } else {
      const fileArr: FileMeta[] = files.map((file) => ({
        filename: file.name,
        type: file.type,
        file,
      }))
      setPayload({ files: fileArr })
    }
  }, [files, setHasVideos, setPayload])

  const validateFiles = useCallback(
    (newFiles: File[]) => {
      // Don't validate if no files (this happens during removal)
      if (newFiles.length === 0) {
        setError("")
        return true
      }

      const batch = filesSchema.safeParse(newFiles)
      if (!batch.success) {
        toaster.error({
          title: "Invalid file type",
          description: batch.error.issues[0].message,
          closable: true,
          duration: 4000,
        })
        return false
      }

      if (!fileSchem) {
        queueMicrotask(() => {
          fileUpload.clearFiles()
          toaster.error({
            title: "Not allowed",
            description: "Please, select a platform",
            closable: true,
            duration: 4000,
          })
        })
        return false
      }

      const newVideoCount = newFiles.filter((f) =>
        f.type.startsWith("video/")
      ).length
      const newImageCount = newFiles.filter((f) =>
        f.type.startsWith("image/")
      ).length

      const existingFiles = fileUpload.acceptedFiles || []
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

      if (existingImageCount > 0 && newVideoCount > 0) {
        setError("Cannot upload videos after images are uploaded.")
        queueMicrotask(() => {
          toaster.error({
            title: "Upload blocked",
            description:
              "You have already uploaded images. Remove them to upload a video instead.",
            duration: 4000,
            closable: true,
          })
        })
        return false
      }

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
    if (files.length === 0) {
      setError("")
      return
    }

    if (!validateFiles(files)) return

    const fileArr: FileMeta[] = files.map((file) => ({
      filename: file.name,
      type: file.type,
      file,
    }))

    const payload: FilesPayload = { files: fileArr }
    useUploadStore.getState().setPayload(payload)
  }, [files, validateFiles])

  useEffect(() => {
    uploadFiles()
  }, [uploadFiles])

  useEffect(() => {
    if (clearFiles) {
      fileUpload.clearFiles()
      setError("") // Clear error when clearing files
      onClearComplete?.()
    }
  }, [clearFiles, fileUpload, onClearComplete])

  return (
    <Box minW="60rem">
      {showStatusMessages && (
        <Box mb={4}>
          {hasImages && (
            <Text fontSize="sm" color="orange.600" fontWeight="medium">
              📷 Images uploaded.
            </Text>
          )}
          {hasVideo && (
            <Text fontSize="sm" color="orange.600" fontWeight="medium">
              🎥 Video uploaded. Only one video allowed.
            </Text>
          )}
          {!hasImages && !hasVideo && (
            <Text fontSize="sm" color="green.600" fontWeight="medium">
              📁 Ready to upload. You can upload images or videos.
            </Text>
          )}
        </Box>
      )}

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
        {files.length > 0 &&
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
                  <Box
                    boxSize="4"
                    bg="red.500"
                    borderRadius="full"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    cursor="pointer"
                    color="white"
                    _hover={{ bg: "red.600" }}
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      console.log("Custom video delete clicked")
                      handleDeleteFile(file)
                    }}
                  >
                    <LuX size="12" />
                  </Box>
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
                  <Box
                    boxSize="4"
                    bg="red.500"
                    borderRadius="full"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    cursor="pointer"
                    color="white"
                    _hover={{ bg: "red.600" }}
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      console.log("Custom image delete clicked")
                      handleDeleteFile(file)
                    }}
                  >
                    <LuX size="12" />
                  </Box>
                </Float>
              </FileUpload.Item>
            )
          )}
      </FileUpload.ItemGroup>
      <VideoPreviewDialog isOpen={isOpen} onClose={onClose} src={previewSrc} />
    </Box>
  )
}
