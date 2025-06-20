import { connectedFbAcc, connectedFbAccPages } from "@/api/userService";
import { useQuery } from "@tanstack/react-query";

const useFbAcc = (user_id: string) => {
  return useQuery({
    queryKey: ["fb-acc", user_id],
    queryFn: () => connectedFbAcc(user_id),
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

export { useFbAcc, useFbAccPages };
