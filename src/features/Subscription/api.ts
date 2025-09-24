import { safeApiCall } from "@/lib/helper/apiHelper";
import axiosInstance from "@/services/axios";
import API_URL from "./lib/apiUrl";
import type { SubscriptionPlan } from "./types";

// Get all subscription plans
const getSubscriptionPlans = () =>
	safeApiCall(() =>
		axiosInstance
			.get(API_URL.GET_SUBSCRIPTION_PLANS())
			.then((res) => res.data)
	);


// Create a new subscription
const createSubscription = (subscriptionData: SubscriptionPlan) =>
	safeApiCall(() =>
		axiosInstance
			.post(API_URL.CREATE_SUBSCRIPTION(), subscriptionData)
			.then((res) => res.data)
	);



export {
	getSubscriptionPlans,
	createSubscription,
};