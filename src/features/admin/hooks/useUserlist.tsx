import { useQuery } from "@tanstack/react-query";
import { userList } from "../api";
import type { UserListResponse } from "../types";

const useUserList = () => {
  return useQuery<UserListResponse>({
    queryKey: ["userList"],
    queryFn: userList,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    refetchOnWindowFocus: false, // Don't refetch when window regains focus
    refetchOnMount: false, // Don't refetch on component mount if data exists
    refetchOnReconnect: false, // Don't refetch on reconnect
  });
};

export { useUserList };
