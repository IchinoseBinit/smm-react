interface TeamMember {
  id: number;
  name: string;
  email: string;
  profile_url?: string;
  role?: string;
  joined_date?: string;
  is_active?: boolean;
}

interface UserProfile {
  user: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    profile_url: string;
    is_email_verified: boolean;
    trial_ends_at: string | null;
    phone?: string;
  };
  context: {
    mode: string;
    company_user_id: number | null;
    effective_user_id: number;
  };
  team_members?: TeamMember[];
}



interface TUpdateProfile { 

  first_name: string;
  last_name: string;
  phone: string;
  profile_url: string;
}

export  type { UserProfile, TUpdateProfile, TeamMember }