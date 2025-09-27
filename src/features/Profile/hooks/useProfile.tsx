import { useMutation, useQuery } from "@tanstack/react-query"
import { getUserProfile ,updateProfile} from "../api"
import { handleError, handleSuccess } from "@/features/auth/lib/utils"

const useProfile = ()=> {
    return useQuery({
        queryKey: ["user-profile"],
        queryFn:getUserProfile,
    })
}


const useUpdateProfile = () => {
    return useMutation({
      mutationKey: ["update-profile"],
      mutationFn: updateProfile,
      onSuccess: () => {
      handleSuccess("Profile updated successfully", "")
      },
      onError: (error) => {
      handleError("Failed to update profile", error)
      },
    })
}

export { useProfile, useUpdateProfile }