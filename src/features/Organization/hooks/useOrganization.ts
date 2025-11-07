import { useMutation, useQuery } from "@tanstack/react-query";
import {  useNavigate } from "react-router";
import { handleError, handleSuccess } from "../lib/utils";
import {
	acceptInvite,
	createOrgInvite,
	signupOrganization,
	getRoles,
	getUserofOrganization
} from "../api";
import type { Role, CreateOrgInviteRequest, SignupOrganizationRequest, AcceptInviteRequest, TorgUser } from "../types";

const useAcceptInvite = () => {
	const navigate = useNavigate();
	return useMutation<any, Error, AcceptInviteRequest>({
		mutationFn: acceptInvite,
		onSuccess: () => {
			handleSuccess("Invite accepted", "You can now log in");
			navigate("/login");
		},
		onError: (error: Error) => handleError("Accept invite failed", error),
	});
};

const useCreateOrgInvite = () => {
		const navigate = useNavigate();

	return useMutation<any, Error, { orgId: string | number; data: CreateOrgInviteRequest }>({
		mutationFn: ({ orgId, data }: { orgId: string | number; data: CreateOrgInviteRequest }) =>
			createOrgInvite(orgId, data),
		onSuccess: () => {
			handleSuccess("Invite sent", "User has been invited");
			navigate("/profile");
		},
		onError: (error: Error) => handleError("Create org invite failed", error),
	});
};

const useSignupOrganization = () => {
	const navigate = useNavigate();

	return useMutation<any, Error, SignupOrganizationRequest>({
		mutationFn: signupOrganization,
		onSuccess: () => {
			handleSuccess("Organization created", "Please verify your email");
			navigate("/verify-otp");
		},
		onError: (error: Error) => handleError("Organization signup failed", error),
	});
};

const useRoles = () => {
	return useQuery<Role[]>({
		queryKey: ["roles"],
		queryFn: getRoles,
	});
};





const useGetMembersOfOrganization = (org_id:string,user_id:string) => {
	return useQuery<TorgUser[]>({
		queryKey: ["getUserofOrganization",org_id,user_id],
		queryFn:()=>getUserofOrganization(org_id,user_id),
		enabled: !!org_id && !!user_id, // Only run query if both IDs are provided
	});
}




export {
	useAcceptInvite,
	useCreateOrgInvite,
	useSignupOrganization,
	useRoles,
	useGetMembersOfOrganization
};
