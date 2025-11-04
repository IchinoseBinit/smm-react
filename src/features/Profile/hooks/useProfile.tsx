import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getUserProfile ,updateProfile} from "../api"
import { handleError, handleSuccess } from "@/features/auth/lib/utils"

const useProfile = ()=> {
    return useQuery({
        queryKey: ["user-profile"],
        queryFn:getUserProfile,
    })
}


const useUpdateProfile = () => {
    const queryClient = useQueryClient()

    return useMutation({
      mutationKey: ["update-profile"],
      mutationFn: updateProfile,
      onSuccess: () => {
      handleSuccess("Profile updated successfully", "")
      // Invalidate and refetch user profile data
      queryClient.invalidateQueries({ queryKey: ["user-profile"] })
      },
      onError: (error) => {
      handleError("Failed to update profile", error)
      },
    })
}

export { useProfile, useUpdateProfile }