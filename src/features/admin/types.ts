export type Organization = {
  id: number;
  name: string;
  mobile_country_code: string;
  branding_logo: string | null;
};

export type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  profile_url: string | null;
  organization: Organization | null;
};

export type UserListResponse = {
  pageNumber: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  isLastPage: boolean;
  results: User[];
};
