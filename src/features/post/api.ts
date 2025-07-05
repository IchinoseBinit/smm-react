import { safeApiCall } from "@/lib/helper/apiHelper";
import axiosInstance from "@/services/axios";
import API_URL from "../auth/lib/apiUrl";
import type { FilesPayload } from "./post.types";

const uploadFiles = (fileData: FilesPayload): Promise<any> =>
  safeApiCall(() =>
    axiosInstance.post(API_URL.FILES.UPLOAD, fileData).then((res) => res.data),
  );

export { uploadFiles };
