import { useQuery } from "@tanstack/react-query";
import { getPostsBydate } from "../../api";

const useGetPostsByDate = ({
  from,
  to,
  userId,
  status,
}: {
  from?: string;
  to?: string;
  userId?: string;
  status?: string;
}) => {
  return useQuery({
    queryKey: ["posts-by-date", from, to, userId, status],
    queryFn: () => {
      console.log('Fetching posts with params:', { from, to, userId, status });
      return getPostsBydate(from, to, userId, status);
    },
    enabled: !!userId,
    staleTime: 5*60*1000,
    gcTime: 10*60*1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchInterval: false,
  });
};

export default useGetPostsByDate;
