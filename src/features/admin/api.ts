
import { API_ROUTES } from "@/lib/constants/apiRoutes";
import { safeApiCall } from "@/lib/helper/apiHelper";
import axiosInstance from "@/services/axios";


const userList = () =>
  safeApiCall(() =>
    axiosInstance
      .get(`${API_ROUTES.USER.LIST}`)
      .then((res) => res.data),
  );



  export { userList}