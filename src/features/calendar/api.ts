import { safeApiCall } from "@/lib/helper/apiHelper"
import axiosInstance from "@/services/axios"
import API_URL from "./apiUrl"

const deleteScheduledPostApi = (id: string) => {
    return safeApiCall(() => 
        axiosInstance.post(API_URL.POST(id).DELETE).then((res)=>res.data)
    )
}

export { deleteScheduledPostApi }