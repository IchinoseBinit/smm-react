export const getSocialUrl = (
  platform: "facebook" | "tiktok" | "youtube",
  userId: string,
) =>
  `https://socially.work/v1/auth/social/${platform}/login/?user_id=${userId}`;
