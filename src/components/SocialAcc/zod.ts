import z from "zod";

//facebook
export const FacebookPostSchema = z.object({
  caption: z.string().max(63206).optional(),
  imageFile: z
    .instanceof(File)
    .optional()
    .refine((file) => !file || file.size <= 30 * 1024 * 1024, {
      message: "Max photo file size is 30 MB",
    }),
  videoFile: z
    .instanceof(File)
    .optional()
    .refine((file) => !file || file.size <= 10 * 1024 * 1024 * 1024, {
      message: "Max video file size is 10 GB",
    })
    .refine(
      (file) => !file || ["video/mp4", "video/quicktime"].includes(file.type),
      {
        message: "Only MP4 or MOV videos allowed",
      },
    ),
  videoDurationMinutes: z
    .number()
    .max(240, { message: "Max video duration is 240 minutes" })
    .optional(),
});

//youtube
export const YouTubeVideoSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().max(5000).optional(),
  videoFile: z
    .instanceof(File)
    .refine((file) => file.size <= 256 * 1024 * 1024 * 1024, {
      message: "Max video file size is 256 GB",
    }),
  videoDurationSeconds: z
    .number()
    .max(12 * 60 * 60, { message: "Max video length is 12 hours" }),
  thumbnailFile: z
    .instanceof(File)
    .optional()
    .refine((file) => !file || file.size <= 10 * 1024 * 1024, {
      message: "Recommended thumbnail up to 1280x720 px",
    }),
});

export const YouTubeShortSchema = z.object({
  caption: z.string().optional(),
  videoFile: z
    .instanceof(File)
    .refine((file) => file.size <= 10 * 1024 * 1024 * 1024, {
      message: "Max video file size is 10 GB",
    }),
  videoDurationSeconds: z
    .number()
    .max(180, { message: "Max short length is 180 seconds" }),
});

export const YouTubePostSchema = z.object({
  text: z.string().max(1500),
});

// TikTokSchema.ts

export const TikTokTextPostSchema = z.object({
  text: z.string().max(2200),
});

export const TikTokMediaPostSchema = z.object({
  caption: z.string().optional(),
  videoFile: z
    .instanceof(File)
    .optional()
    .refine((file) => !file || file.size <= 2 * 1024 * 1024 * 1024, {
      message: "Max video file size is 2 GB",
    })
    .refine(
      (file) => !file || ["video/mp4", "video/quicktime"].includes(file.type),
      {
        message: "Invalid video format",
      },
    ),
  photoFile: z
    .instanceof(File)
    .optional()
    .refine((file) => !file || file.size <= 20 * 1024 * 1024, {
      message: "Max photo file size is 20 MB",
    }),
});
