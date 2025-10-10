import { safeApiCall } from "@/lib/helper/apiHelper";
import axiosInstance from "@/services/axios";
import API_URL from "./lib/apiUrl";

const getPostsBydate = (from?: string, to?: string, userId?: string, status?: string) => {
  const statusParam = status ? `&status=${status}` : '';
  return safeApiCall(() =>
    axiosInstance
      .get(
        `${API_URL.POSTS_BY_DATE(userId!)}?from=${from}&to=${to}&sort_by=id&order_by=desc${statusParam}`,
      )
      .then((res) => res.data),
  );
};






const retryPost = (postId: number) => {
  return safeApiCall(() =>
    axiosInstance
      .post(
        `${API_URL.RETRY_POST()}`,
        { ids: [postId] }
      )
      .then((res) => res.data),
  );
}

export { getPostsBydate, retryPost };
