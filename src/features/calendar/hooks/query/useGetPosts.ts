import { getPostsBydate } from "@/features/manager/api";
import { useQuery } from "@tanstack/react-query";

const useGetPostsByDate = ({
  from,
  to,
  userId,
}: {
  from?: string;
  to?: string;
  userId?: string;
}) => {
  return useQuery({
    queryKey: ["posts-by-date", from, to, userId],
    queryFn: () => getPostsBydate(from, to, userId),
    enabled: !!from && !!to && !!userId,
  });
};

export default useGetPostsByDate;
