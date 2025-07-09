import { useQuery } from "@tanstack/react-query";
import { getPostsBydate } from "../../api";

const useGetPostsByDate = ({
  from,
  to,
  userId,
}: {
  from?: string;
  to?: string;
  userId?: number;
}) => {
  return useQuery({
    queryKey: ["posts-by-date", from, to, userId],
    queryFn: () => getPostsBydate(from, to, userId),
    enabled: !!from && !!to && !!userId,
  });
};

export default useGetPostsByDate;
