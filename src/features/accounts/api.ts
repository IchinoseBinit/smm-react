import { API_ROUTES } from "@/lib/constants/apiRoutes";
import { safeApiCall } from "@/lib/helper/apiHelper";
import axiosInstance from "@/services/axios";
import type { deleteConnAcc } from "./types";

const connectedFbAccPages = (user_id: string) =>
  safeApiCall(() =>
    axiosInstance
      .get(`${API_ROUTES.CONNECT_ACC.FACEBOOK.PAGES}${user_id}/`)
      .then((res) => res.data),
  );



const DELETE_Conn_ACC = ({data}:{data:deleteConnAcc}) =>
  safeApiCall(() =>
    axiosInstance.delete(`${API_ROUTES.CONNECT_ACC.DELETE_Conn_ACC}`,{data})
      .then((res) => res.data),
  );
export { connectedFbAccPages, DELETE_Conn_ACC }
