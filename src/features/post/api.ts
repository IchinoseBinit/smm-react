import { safeApiCall } from "@/lib/helper/apiHelper";
import axiosInstance from "@/services/axios";
import API_URL from "./lib/apiUrl";
import type { FilesPayload, YoutubeCategory } from "./types";
import type { MutationFunction } from "@tanstack/react-query";

const uploadFiles = (
  fileData: FilesPayload,
): Promise<MutationFunction<any, { files: File[] }>> =>
  safeApiCall(() =>
    axiosInstance.post(API_URL.FILES.UPLOAD, fileData).then((res) => res.data),
  );

const createPost = (data: any): Promise<any> =>
  safeApiCall(() =>
    axiosInstance.post(API_URL.POST.CREATE, data).then((res) => res.data),
  );


  const getYoutubeCategories = (): Promise<YoutubeCategory> =>
  safeApiCall(() =>
    axiosInstance.get(API_URL.YOUTUBE_CATEGORIES).then((res) => res.data),
  );
export { uploadFiles, createPost,getYoutubeCategories };
