interface CalendarEvent {
  id: string;
  title: string;
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
type PostEvent = {
  id: number;
  title: string;
  description: string;
  status: "scheduled" | "published" | string;
  scheduled_time: string;
  platform: PlatformStatus[];
};

export type {
  CalendarEvent,
  TimeSlot,
  WeekDay,
  CalendarViewProps,
  Post,
  Media,
  PlatformStatus,
  PostEvent,
};
