import { useMutation, useQueryClient } from "@tanstack/react-query";
import { retryPost } from "../api";
import { handleSuccess, handleError } from "@/features/auth/lib/utils";

const useRetryPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: number) => retryPost(postId),
    onSuccess: () => {
      handleSuccess("Success", "Post retried successfully!");
      // Invalidate the posts query to refetch the updated data
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error: any) => {
      handleError(error?.response?.data?.message || "Failed to retry post. Please try again.");
    },
  });
};

export default useRetryPost;
