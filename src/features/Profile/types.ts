interface UserProfile {
  user: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    profile_url: string;
    is_email_verified: boolean;
    trial_ends_at: string | null;
  };
  context: {
    mode: string;
    company_user_id: number | null;
    effective_user_id: number;
  };
}



interface TUpdateProfile { 

  first_name: string;
  last_name: string;
  phone: string;
  profile_url: string;
}

export  type { UserProfile,TUpdateProfile}