import { safeApiCall } from "@/lib/helper/apiHelper";
import axiosInstance from "@/services/axios";
import API_URL from "./lib/apiUrl";
import type { UserProfile } from "./types";


const getUserProfile = (): Promise<UserProfile> =>
  safeApiCall(() =>
    axiosInstance
      .get(
        `${API_URL.GET_USER_DATA()}`,
      )
      .then((res) => res.data),
  );

export { getUserProfile};
