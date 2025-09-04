import { safeApiCall } from "@/lib/helper/apiHelper"
import axiosInstance from "@/services/axios"
import API_URL from "./apiUrl"

const deleteScheduledPostApi = (id: string) => {
    return safeApiCall(() => 
        axiosInstance.post(API_URL.POST(id).DELETE).then((res)=>res.data)
    )
}

export { deleteScheduledPostApi }



const getPostsBydate = (from?: string, to?: string, userId?: string) =>
  safeApiCall(() =>
    axiosInstance
      .get(
        `${API_URL.POSTS_BY_DATE(userId!)}?from=${from}&to=${to}&sort_by=id&order_by=desc&status=scheduled
        `,
      )
      .then((res) => res.data),
  );
export { getPostsBydate };
