interface CalendarEvent {
  id: string;
  start: Date;
  end: Date;
  scheduled_time?: string;
  platform?: PlatformStatus[];
}

interface TimeSlot {
  hour: number;
  label: string;
}

interface WeekDay {
  date: Date;
  dayName: string;
  dayNumber: number;
  isToday: boolean;
  isCurrentMonth: boolean;
}

interface CalendarViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  onDateChange: (date: Date) => void;
  onEventCreate: (event: Omit<CalendarEvent, "id">) => void;
  onEventUpdate: (event: CalendarEvent) => void;
  onEventDelete: (eventId: string) => void;
}




type PostEvent = {
  id: number;
  title: string;
  description: string;
  status: "scheduled" | "published" | string;
  scheduled_time: string;
  platform: PlatformStatus[];
};
type PlatformCalendarGroup = {
  icon: React.ReactElement;
  platform: string;
  time: string;
  posts: {
    id: number;
    title: string;
    description: string;
    medias: any[];
    status: string;
  }[];
};




interface TimeGridProps {
  timeSlots: TimeSlot[]
  weekDays: WeekDay[]
  events: CalendarEvent[]
  onOpen: (e: PlatformCalendarGroup) => void
}

type MergedPost = {
  scheduled_time: string
  platforms: {
    accountType: string
    social_account_id?: number
    facebook_page_id?: number
    posts: {
      id: number
      title: string
      description: string
      medias: any[]
      status: string
    }[]
  }[]
}








interface TimeGridProps {
  timeSlots: TimeSlot[]
  weekDays: WeekDay[]
  events: CalendarEvent[]
  onOpen: (e: PlatformCalendarGroup) => void
}

type Media = {
  s3_url: string
  order: number
}

type PlatformStatus = {
  id: number
  accountType: "FACEBOOK" | "INSTAGRAM" | "TWITTER" | string
  status: "posted" | "scheduled" | "failed" | string
  scheduled_time: string | null
  posted_time: string | null
  facebook_page_id?: number
}

type Post = {
  id: number
  title: string | null
  description: string
  is_photo: boolean
  medias: Media[]
  platform_statuses: PlatformStatus[]
  scheduled_time: string | null
  status: "posted" | "scheduled" | "failed" | string
  surface: "POST" | "STORY" | string
}


export type {
  CalendarEvent,
  TimeSlot,
  WeekDay,
  CalendarViewProps,
  Post,
  Media,
  PlatformStatus,
  PostEvent,
  PlatformCalendarGroup,
  TimeGridProps,
  MergedPost,
};