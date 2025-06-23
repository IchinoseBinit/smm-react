import { useQuery } from "@tanstack/react-query";
import { connectedAccounts, connectedFbAccPages } from "../api";

const useAccounts = (user_id: string) => {
  return useQuery({
    queryKey: ["all-accounts", user_id],
    queryFn: () => connectedAccounts(user_id),
    enabled: !!user_id,
  });
};
const useFbAccPages = (user_id: string) => {
  return useQuery({
    queryKey: ["fb-pages", user_id],
    queryFn: () => connectedFbAccPages(user_id),
    enabled: !!user_id,
  });
};

export { useAccounts, useFbAccPages };
