import { useMutation } from "@tanstack/react-query";
import { uploadFiles } from "../../api";
import { handleError } from "@/features/auth/lib/utils";

const useFileUpload = () => {
  return useMutation({
    mutationFn: uploadFiles,
    onSuccess: (data) => {
      console.log("successfully uploadfiles", data);
    },
    onError: (error: Error) => handleError("file upload failed", error),
  });
};

export default useFileUpload;
