import { connectedFbAcc } from "@/api/userService";
import { useQuery } from "@tanstack/react-query";

const useFbAcc = (user_id: string) => {
  return useQuery({
    queryKey: ["fb-pages", user_id],
    queryFn: () => connectedFbAcc(user_id),
    enabled: !!user_id,
  });
};

export { useFbAcc };
