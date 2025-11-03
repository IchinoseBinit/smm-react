import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { handleError, handleSuccess } from "../lib/utils";
import {
	acceptInvite,
	createOrgInvite,
	signupOrganization,
	getRoles
} from "../api";
import type { Role, CreateOrgInviteRequest, SignupOrganizationRequest, AcceptInviteRequest } from "../types";

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
	return useMutation<any, Error, { orgId: string | number; data: CreateOrgInviteRequest }>({
		mutationFn: ({ orgId, data }: { orgId: string | number; data: CreateOrgInviteRequest }) =>
			createOrgInvite(orgId, data),
		onSuccess: () => handleSuccess("Invite sent", "User has been invited"),
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






export {
	useAcceptInvite,
	useCreateOrgInvite,
	useSignupOrganization,
	useRoles,
};
