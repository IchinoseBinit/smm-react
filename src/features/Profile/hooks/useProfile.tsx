import { useQuery } from "@tanstack/react-query"
import { getUserProfile } from "../api"

const useProfile = ()=> {
    return useQuery({
        queryKey: ["user-profile"],
        queryFn:getUserProfile,
    })
}

export { useProfile}