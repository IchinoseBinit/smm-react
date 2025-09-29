import { safeApiCall } from "@/lib/helper/apiHelper";
import axiosInstance from "@/services/axios";
import API_URL from "./lib/apiUrl";


const getTotalPost = (userId: string) =>
	safeApiCall(() =>
		axiosInstance
			.get(API_URL.Get_TOTAL_POST(userId))
			.then((res) => res.data)
	);


const getMediaSummary=()=>
	safeApiCall(()=>
		axiosInstance.get(API_URL.MEDIA_SUMMARY()).then((res)=>res.data))


export {
	
	getTotalPost,
	getMediaSummary
};
