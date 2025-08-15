import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/services/axios";

export const usePrivacyPolicy = () =>
  useQuery({
    queryKey: ["privacyPolicy"],
    queryFn: async () => {
      const res = await axiosInstance.get("/v1/api/pages/legal/privacy_policy/");
      return res.data.content;
    },
    staleTime: 1000 * 60 * 60 * 4, 
  });

export const useTermsOfService = () =>
  useQuery({
    queryKey: ["termsOfService"],
    queryFn: async () => {
      const res = await axiosInstance.get("/v1/api/pages/legal/terms_of_service/");
      return res.data.content;
    },
    staleTime: 1000 * 60 * 60 * 4, 
  });