import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteScheduledPostApi } from "../api";
import { toaster } from "@/components/ui/toaster";

const useDeleteScheduledPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteScheduledPostApi(id),
    onSuccess: () => {
      toaster.success({
        title: "Success",
        description: "Scheduled post deleted successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      console.error("Error deleting scheduled post:", error);
      toaster.error({
        title: "Error",
        description: "Failed to delete scheduled post",
      });
    },
  });
};

export default useDeleteScheduledPost;