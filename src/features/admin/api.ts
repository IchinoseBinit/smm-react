
import { API_ROUTES } from "@/lib/constants/apiRoutes";
import { safeApiCall } from "@/lib/helper/apiHelper";
import axiosInstance from "@/services/axios";


const userList = (page: number = 1, pageSize: number = 8) =>
  safeApiCall(() =>
    axiosInstance
      .get(`${API_ROUTES.USER.LIST}?page=${page}&page_size=${pageSize}`)
      .then((res) => res.data),
  );



  export { userList}