type PlatformStatus = {
  accountType: string;
  social_account_id: number;
  id: number;
  posted_time: string | null;
};

type Media = {
  s3_url: string;
  order: number;
};

type Post = {
  id: number;
  title: string;
  is_photo: boolean;
  description: string;
  status: "scheduled" | "posted" | "failed";
  scheduled_time: string;
  medias: Media[];
  platform_statuses: PlatformStatus[];
};

export type { Post, Media, PlatformStatus };
