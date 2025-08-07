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
import { FaSlidersH } from "react-icons/fa"
import { Menu, Portal } from "@chakra-ui/react"
import { FFmpeg } from "@ffmpeg/ffmpeg"
import { fetchFile } from "@ffmpeg/util"
import { toaster } from "@/components/ui/toaster"
import { useContentTypeStore } from "../lib/store/sufaceType"

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
  const { surfaceType, setSurfaceType } = useContentTypeStore()

  // Simplified aspect ratios - only the most commonly used ones
  let aspectRatios: {
    [key: string]: {
      width: number
      height: number
      description: string
      icon: string
    }
  }

  if (surfaceType[0] === "POST") {
    aspectRatios = {
      original: {
        width: 0,
        height: 0,
        description: "Keep original",
        icon: "📹",
      },
      "1:1": {
        width: 1080,
        height: 1080,
        description: "Instagram Square",
        icon: "⏹️",
      },
    }
  } else {
    aspectRatios = {
      original: {
        width: 0,
        height: 0,
        description: "Keep original",
        icon: "📹",
      },
      "9:16": {
        width: 1080,
        height: 1920,
        description: "TikTok/Stories",
        icon: "📱",
      },
    }
  }

  let ffmpeg: FFmpeg | null = null

  async function transcodeToSingleAspectRatio(
    file: File,
    aspectRatio: string
  ): Promise<string> {
    if (!ffmpeg) {
      ffmpeg = new FFmpeg()
      await ffmpeg.load()
    }

    const { width, height } = aspectRatios[aspectRatio]
    const randomId = Date.now().toString(36) // Simpler ID generation
    const inputName = `input_${randomId}.mp4`
    const outputName = `output_${aspectRatio}_${randomId}.mp4`

    try {
      await ffmpeg.writeFile(inputName, await fetchFile(file))

      console.log(`Starting transcoding to ${aspectRatio} (${width}x${height})`)

      const baseArgs = ["-i", inputName]

      if (aspectRatio === "9:16") {
        await ffmpeg.exec([
          ...baseArgs,
          "-vf",
          `scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2:black`,
          "-c:v",
          "libx264",
          "-profile:v",
          "high",
          "-level",
          "4.1",
          "-crf",
          "25",
          "-preset",
          "medium",
          "-c:a",
          "aac",
          "-b:a",
          "128k",
          "-movflags",
          "+faststart",
          "-pix_fmt",
          "yuv420p",
          "-r",
          "30", // Force 30fps for TikTok
          "-y",
          outputName,
        ])
      } else {
        await ffmpeg.exec([
          ...baseArgs,
          "-vf",
          `scale=${width}:${height}:force_original_aspect_ratio=decrease,pad=${width}:${height}:(ow-iw)/2:(oh-ih)/2:black`,
          "-c:v",
          "libx264",
          "-crf",
          "28",
          "-preset",
          "fast",
          "-c:a",
          "copy",
          "-threads",
          "0",
          "-movflags",
          "+faststart",
          "-y",
          outputName,
        ])
      }

      console.log(`Transcoding completed for ${aspectRatio}`)

      const data = await ffmpeg.readFile(outputName)
      const blob = new Blob([data], { type: "video/mp4" })
      const url = URL.createObjectURL(blob)

      await Promise.all([
        ffmpeg.deleteFile(outputName),
        ffmpeg.deleteFile(inputName),
      ])

      return url
    } catch (error) {
      await Promise.allSettled([
        ffmpeg.deleteFile(inputName),
        ffmpeg.deleteFile(outputName),
      ])
      throw error
    }
  }

  const [videoUrls, setVideoUrls] = useState<Record<string, string>>({})
  const [selectedAspectRatio, setSelectedAspectRatio] =
    useState<string>("original")
  const [loading, setLoading] = useState(false)

  const files = useMemo(
    () => fileUpload.acceptedFiles,
    [fileUpload.acceptedFiles]
  )
  const currentVideoFile = useMemo(
    () => files.find((file) => file.type.startsWith("video/")),
    [files]
  )
  const hasVideo = useMemo(
    () => files.some((file) => file.type.startsWith("video/")),
    [files]
  )
  console.log("which type of file ", files)

  console.log("Current sufaceType", surfaceType)

  const handleDeleteFile = useCallback(
    (fileToDelete: File) => {
      if (fileUpload.deleteFile) {
        fileUpload.deleteFile(fileToDelete)
      } else if (fileUpload.clearFiles && files.length === 1) {
        fileUpload.clearFiles()
      }

      const remainingFiles = files.filter((file) => file !== fileToDelete)

      if (remainingFiles.length === 0) {
        setPayload({ files: [] })
        setHasVideos(false)
        setError("")
        Object.values(videoUrls).forEach((url) => URL.revokeObjectURL(url))
        setVideoUrls({})
        setSelectedAspectRatio("original")
      } else {
        const fileArr: FileMeta[] = remainingFiles.map((file) => ({
          filename: file.name,
          type: file.type,
          file,
        }))
        setPayload({ files: fileArr })
        setHasVideos(remainingFiles.some((f) => f.type.startsWith("video/")))
      }
    },
    [files, fileUpload, setPayload, setHasVideos, videoUrls]
  )

  useEffect(() => {
    if (files.length === 0) {
      setPayload({ files: [] })
      setError("")
    } else {
      const fileArr: FileMeta[] = files.map((file) => ({
        filename: file.name,
        type: file.type,
        file,
      }))
      setPayload({ files: fileArr })
      setHasVideos(files.some((f) => f.type.startsWith("video/")))
    }
  }, [files, setHasVideos, setPayload])

  const handleAspectRatioClick = useCallback(
    async (aspectRatio: string) => {
      if (!currentVideoFile) {
        toaster.error({
          title: "No video file",
          description: "Please upload a video file first",
          duration: 2000,
        })
        return
      }

      if (aspectRatio === "original") {
        setSelectedAspectRatio("original")
        toaster.success({
          title: "Using original format",
          duration: 1500,
        })
        return
      }

      if (videoUrls[aspectRatio]) {
        setSelectedAspectRatio(aspectRatio)
        toaster.success({
          title: `Using ${aspectRatios[aspectRatio].description}`,
          duration: 1500,
        })
        return
      }

      setLoading(true)
      const { description } = aspectRatios[aspectRatio]

      try {
        toaster.info({
          title: `Converting to ${description}...`,
          duration: 2000,
        })

        console.log(`Converting video to ${aspectRatio}:`, {
          file: currentVideoFile.name,
          size: currentVideoFile.size,
          type: currentVideoFile.type,
          targetDimensions: `${aspectRatios[aspectRatio].width}x${aspectRatios[aspectRatio].height}`,
        })

        const startTime = performance.now()
        const url = await transcodeToSingleAspectRatio(
          currentVideoFile,
          aspectRatio
        )
        const duration = ((performance.now() - startTime) / 1000).toFixed(1)

        console.log(`Transcoded ${aspectRatio} - URL:`, url)
        console.log(
          `Video dimensions: ${aspectRatios[aspectRatio].width}x${aspectRatios[aspectRatio].height}`
        )

        setVideoUrls((prev) => ({ ...prev, [aspectRatio]: url }))
        setSelectedAspectRatio(aspectRatio)

        setTimeout(() => {
          const videoElements = document.querySelectorAll("video")
          videoElements.forEach((video, index) => {
            video.load()
            console.log(`Video element ${index} reloaded for ${aspectRatio}`)
          })
        }, 200)

        toaster.success({
          title: `${description} ready in ${duration}s!`,
          description:
            aspectRatio === "9:16" ? "Perfect for TikTok!" : undefined,
          duration: 2000,
        })
      } catch (err) {
        console.error("Conversion failed:", err)
        toaster.error({
          title: "Conversion failed",
          description: "Try refreshing and uploading again",
          duration: 3000,
        })
        setSelectedAspectRatio("original")
      } finally {
        setLoading(false)
      }
    },
    [currentVideoFile, videoUrls]
  )

  useEffect(() => {
    if (clearFiles) {
      fileUpload.clearFiles()
      setError("")
      Object.values(videoUrls).forEach((url) => URL.revokeObjectURL(url))
      setVideoUrls({})
      setSelectedAspectRatio("original")
      onClearComplete?.()
    }
  }, [clearFiles, fileUpload, onClearComplete, videoUrls])

  useEffect(() => {
    return () => {
      Object.values(videoUrls).forEach((url) => URL.revokeObjectURL(url))
    }
  }, [videoUrls])

  const getCurrentVideoSrc = useCallback(
    (file: File) => {
      if (
        selectedAspectRatio !== "original" &&
        videoUrls[selectedAspectRatio]
      ) {
        return videoUrls[selectedAspectRatio]
      }
      return URL.createObjectURL(file)
    },
    [selectedAspectRatio, videoUrls]
  )

  // Enhanced preview handler that works with the correct video source
  const handleVideoPreview = useCallback(
    (file: File) => {
      const currentSrc = getCurrentVideoSrc(file)

      // If we're using a converted video, create a proper File object for the preview
      if (
        selectedAspectRatio !== "original" &&
        videoUrls[selectedAspectRatio]
      ) {
        fetch(videoUrls[selectedAspectRatio])
          .then((res) => res.blob())
          .then((blob) => {
            const transcodedFile = new File(
              [blob],
              `${file.name}_${selectedAspectRatio}.mp4`,
              { type: "video/mp4" }
            )
            handlePreview(transcodedFile)
          })
          .catch((error) => {
            console.error("Failed to create preview file:", error)
            // Fallback to original file
            handlePreview(file)
          })
      } else {
        // Use original file for preview
        handlePreview(file)
      }
    },
    [selectedAspectRatio, videoUrls, getCurrentVideoSrc, handlePreview]
  )

  return (
    <Box minW="60rem">
      {error && (
        <Text color="red.500" fontWeight={500} fontSize="sm" mb={2}>
          {error}
        </Text>
      )}

      <FileUpload.ItemGroup
        display="flex"
        flexDirection="row"
        overflow="scroll"
        pt={2}
      >
        {/* Aspect ratio menu - only show for videos */}
        {hasVideo && (
          <Menu.Root>
            <Menu.Trigger asChild>
              <Button
                variant="outline"
                size="sm"
                // loading={loading}
                // loadingText="Converting..."
              >
                <FaSlidersH />
                {selectedAspectRatio && (
                  <Text ml={2} fontSize="xs">
                    {aspectRatios[selectedAspectRatio]?.icon}{" "}
                    {selectedAspectRatio}
                  </Text>
                )}
              </Button>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content>
                  <Menu.Item value="header" fontWeight="bold">
                    Aspect Ratio
                  </Menu.Item>
                  {Object.entries(aspectRatios).map(
                    ([ratio, { width, height, description, icon }]) => (
                      <Menu.Item
                        key={ratio}
                        value={ratio}
                        onClick={() => handleAspectRatioClick(ratio)}
                        bg={
                          selectedAspectRatio === ratio
                            ? "blue.50"
                            : "transparent"
                        }
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        minW="200px"
                      >
                        <Box display="flex" alignItems="center" gap={2}>
                          <Text fontSize="sm">{icon}</Text>
                          <Box>
                            <Text fontSize="sm" fontWeight="medium">
                              {ratio}
                            </Text>
                            <Text fontSize="xs" color="gray.500">
                              {description}
                            </Text>
                          </Box>
                        </Box>
                        <Box display="flex" alignItems="center" gap={2}>
                          {videoUrls[ratio] && (
                            <Text color="green.500" fontSize="xs">
                              ✓
                            </Text>
                          )}
                          {ratio !== "original" && (
                            <Text fontSize="xs" color="gray.400">
                              {width}×{height}
                            </Text>
                          )}
                        </Box>
                      </Menu.Item>
                    )
                  )}
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
        )}

        {/* File items */}
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
                  src={getCurrentVideoSrc(file)}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 8,
                    objectFit:
                      selectedAspectRatio === "9:16" ? "cover" : "contain",
                  }}
                  controls={false}
                  preload="metadata"
                  onLoadedData={(e) => {
                    const video = e.target as HTMLVideoElement
                    console.log(
                      `Video loaded successfully - ${selectedAspectRatio}`,
                      {
                        videoWidth: video.videoWidth,
                        videoHeight: video.videoHeight,
                        src: video.src,
                        aspectRatio: selectedAspectRatio,
                      }
                    )
                  }}
                  onLoadedMetadata={(e) => {
                    const video = e.target as HTMLVideoElement
                    console.log("Video metadata loaded:", {
                      width: video.videoWidth,
                      height: video.videoHeight,
                      duration: video.duration,
                      aspectRatio: selectedAspectRatio,
                    })
                  }}
                  onError={(e) => {
                    console.error("Video load error:", e, {
                      src: (e.target as HTMLVideoElement).src,
                      aspectRatio: selectedAspectRatio,
                    })
                  }}
                />

                {/* Preview overlay */}
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
                  onClick={() => handleVideoPreview(file)}
                >
                  <Button size="sm" colorScheme="teal">
                    Preview
                  </Button>
                </Box>

                {/* Aspect ratio indicator */}
                <Box
                  position="absolute"
                  top="2"
                  right="2"
                  bg="blackAlpha.800"
                  color="white"
                  px="1"
                  py="0.5"
                  borderRadius="sm"
                  fontSize="xs"
                >
                  {aspectRatios[selectedAspectRatio]?.icon || "📹"}{" "}
                  {selectedAspectRatio}
                </Box>
              </Box>

              {/* Delete button */}
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
