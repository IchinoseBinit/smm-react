export interface SubscriptionPlan {
  id: number;
  name: string;
  max_users: number;
  max_posts_per_month: number;
  price: string;
  currency: string;
}

export interface SubscriptionResponse {
  success: boolean;
  data: SubscriptionPlan[];
  message?: string;
}