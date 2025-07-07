import { allConnectedAccounts } from "@/components/SocialAcc/api";
import { useQuery } from "@tanstack/react-query";

const useAllConnAccounts = (user_id: string) => {
  return useQuery({
    queryKey: ["all-accounts", user_id],
    queryFn: () => allConnectedAccounts(user_id),
    enabled: !!user_id,
  });
};
export { useAllConnAccounts };
