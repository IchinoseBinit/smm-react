import { API_ROUTES } from "@/lib/constants/apiRoutes";
import { safeApiCall } from "@/lib/helper/apiHelper";
import axiosInstance from "@/services/axios";

const allConnectedAccounts = (user_id: string) =>
  safeApiCall(() =>
    axiosInstance
      .get(`${API_ROUTES.CONNECT_ACC.ALL_Conn_ACC}${user_id}/`)
      .then((res) => res.data),
  );
export { allConnectedAccounts };
