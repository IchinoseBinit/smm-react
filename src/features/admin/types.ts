export type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  profile_url: string;
  organization: string | null;
};

export type UserListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: User[];
};
