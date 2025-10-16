import { allConnectedAccounts } from "@/components/SocialAcc/api";
import { useQuery } from "@tanstack/react-query";

const useAllConnAccounts = (user_id: string) => {
  return useQuery({
    queryKey: ["all-accounts", user_id],
    queryFn: () => allConnectedAccounts(user_id),
    enabled: !!user_id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    refetchOnWindowFocus: false, // Don't refetch when window regains focus
    refetchOnMount: false, // Don't refetch on component mount if data exists
    refetchOnReconnect: false, // Don't refetch on reconnect
  });
};
export { useAllConnAccounts };
