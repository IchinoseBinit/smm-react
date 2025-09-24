import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getSubscriptionPlans, createSubscription } from "../api";
import type { SubscriptionPlan } from "../types";

// Hook to get all subscription plans
const useSubscriptionPlans = () => {
  return useQuery({
    queryKey: ["subscription-plans"],
    queryFn: () => getSubscriptionPlans(),
  });
};



// Hook to create a new subscription
const useCreateSubscription = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (subscriptionData: SubscriptionPlan) => createSubscription(subscriptionData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscription-plans"] });
      queryClient.invalidateQueries({ queryKey: ["subscription"] });
    },
  });
};


export {
  useSubscriptionPlans,
  useCreateSubscription,
};
