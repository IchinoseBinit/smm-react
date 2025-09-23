type Role = {
  id: number;
  name: string;
  can_post: boolean;
  can_approve: boolean;
  can_view_analytics: boolean;
  can_manage_billing: boolean;
  is_default: boolean;
};

type AcceptInviteRequest = {
  token: string;
  first_name: string;
  last_name: string;
  mobile: string;
  password: string;
};

type CreateOrgInviteRequest = {
  email: string;
  role_id: number;
};

type SignupOrganizationRequest = {
  organization: {
    name: string;
    mobile_country_code: string;
    billing_email: string;
    request_approval: boolean;
    branding_logo: string;
    managed_posts: boolean;
  };
  user: {
    email: string;
    first_name: string;
    last_name: string;
    mobile: string;
    password: string;
  };
};

export type { Role, AcceptInviteRequest, CreateOrgInviteRequest, SignupOrganizationRequest };