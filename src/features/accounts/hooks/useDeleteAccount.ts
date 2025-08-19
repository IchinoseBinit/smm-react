import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DELETE_Conn_ACC } from "../api";
import type { deleteConnAcc } from "../types";
import { toaster } from "@/components/ui/toaster";

const useDeleteConnAcc = (user_id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: deleteConnAcc) => DELETE_Conn_ACC({ data, user_id }),
    onSuccess: () => {
      toaster.success({
        title: "Success",
        description: "Account deleted successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["all-accounts", user_id] });
    },
    onError: (error) => {
      console.error("Error deleting account:", error);
    },
  });
};

export default useDeleteConnAcc;