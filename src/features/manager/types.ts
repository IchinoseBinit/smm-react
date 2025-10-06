type PlatformStatus = {
  accountType: string;
  social_account_id: number;
  account_name?:string;
  id: number;
  posted_time: string | null;
  scheduled_time: string | null;
  status: "scheduled" | "posted" | "failed";
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


interface StatusConfig {
  text: string
  color: string
  backgroundColor: string
}

export type { Post, Media, PlatformStatus, StatusConfig };
