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



const DELETE_Conn_ACC = ({data,user_id}:{data:deleteConnAcc,user_id:string}) =>
  safeApiCall(() =>
    axiosInstance.post(`${API_ROUTES.CONNECT_ACC.DELETE_Conn_ACC}${user_id}/delete/`,data)
      .then((res) => res.data),
  );
export { connectedFbAccPages, DELETE_Conn_ACC }
