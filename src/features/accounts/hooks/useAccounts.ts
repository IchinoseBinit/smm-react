import { useQuery } from "@tanstack/react-query";
import { connectedFbAccPages } from "../api";

const useFbAccPages = (user_id: string) => {
  return useQuery({
    queryKey: ["fb-pages", user_id],
    queryFn: () => connectedFbAccPages(user_id),
    enabled: !!user_id,
  });
};

export { useFbAccPages };
