import { safeApiCall } from "@/lib/helper/apiHelper";
import axiosInstance from "@/services/axios";
import API_URL from "./lib/apiUrl";
import type { SignupOrganizationRequest,CreateOrgInviteRequest,AcceptInviteRequest } from "./types";

const acceptInvite = (data: AcceptInviteRequest) =>
	safeApiCall(() =>
		axiosInstance
			.post(API_URL.ACCEPT_INVITE(), data)
			.then((res) => res.data)
	);

const createOrgInvite = (orgId: string | number, data: CreateOrgInviteRequest) =>
	safeApiCall(() =>
		axiosInstance
			.post(API_URL.CREATE_ORG_INVITE(orgId), data)
			.then((res) => res.data)
	);

const signupOrganization = (data: SignupOrganizationRequest) =>
	safeApiCall(() =>
		axiosInstance
			.post(API_URL.SIGNUP_ORGANIZATION(), data)
			.then((res) => res.data)
	);
const getRoles = () =>
	safeApiCall(() =>
		axiosInstance
			.get(API_URL.Get_Roles())
			.then((res) => res.data)
	);

	const getUserofOrganization = (org_id:string,user_id:string)=>
		safeApiCall(()=>axiosInstance.get(API_URL.GET_USER_OF_ORGANIZATION(org_id,user_id)).then((res)=>res.data))

export {
	acceptInvite,
	createOrgInvite,
	signupOrganization,
	getRoles,
	getUserofOrganization
};
