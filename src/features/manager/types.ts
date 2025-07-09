type PlatformStatus = {
  accountType: string;
  social_account_id: number;
};

type Media = {
  s3_url: string;
  order: number;
};

type Post = {
  id: number;
  title: string;
  description: string;
  status: "scheduled" | "published" | string;
  scheduled_time: string;
  medias: Media[];
  platform_statuses: PlatformStatus[];
};

export type { Post, Media, PlatformStatus };
