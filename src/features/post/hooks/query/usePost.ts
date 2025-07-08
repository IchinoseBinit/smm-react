import { useMutation } from "@tanstack/react-query";
import { createPost } from "../../api";
import { handleError, handleSuccess } from "@/features/auth/lib/utils";

const useCreatePost = () => {
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      handleSuccess("Post created successfully", "");
    },
    onError: (error: Error) => handleError("create post failed", error),
  });
};

export { useCreatePost };
