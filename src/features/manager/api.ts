import { safeApiCall } from "@/lib/helper/apiHelper";
import axiosInstance from "@/services/axios";
import API_URL from "./lib/apiUrl";

const getPostsBydate = (from?: string, to?: string, userId?: string) =>
  safeApiCall(() =>
    axiosInstance
      .get(
        `${API_URL.POSTS_BY_DATE(userId!)}?from=${from}&to=${to}&sort_by=id&order_by=desc
        `,
      )
      .then((res) => res.data),
  );
export { getPostsBydate };
