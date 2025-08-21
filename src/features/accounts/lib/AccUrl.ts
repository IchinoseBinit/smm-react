export const getSocialUrl = (
  platform: "facebook" | "tiktok" | "youtube",
  userId: string,
) =>
  `${import.meta.env.VITE_API_BASE_URL}/v1/auth/social/${platform}/login/?user_id=${userId}`;
  // `https://socially.work/v1/auth/social/${platform}/login/?user_id=${userId}`;
