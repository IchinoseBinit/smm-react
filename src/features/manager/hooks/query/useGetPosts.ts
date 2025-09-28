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
    queryKey: ["posts-by-date", from, to, userId,status],
    queryFn: () => getPostsBydate(from, to, userId, status),
    // enabled: !!from && !!to && !!userId,
    enabled: !!userId,
  });
};

export default useGetPostsByDate;
