export const getSocialUrl = (
  platform: "facebook" | "tiktok" | "youtube",
  userId: string,
): string => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    return `${API_BASE_URL}/v1/auth/social/${platform}/login/?user_id=${userId}`;
};
