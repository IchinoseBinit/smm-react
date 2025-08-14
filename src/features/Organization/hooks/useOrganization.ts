import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { handleError, handleSuccess } from "../lib/utils";
import {
  acceptInvite,
  createOrgInvite,
  signupOrganization,
} from "../api";
import type { CreateOrgInviteRequest } from "../types";

const useAcceptInvite = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: acceptInvite,
    onSuccess: () => {
      handleSuccess("Invite accepted", "You can now log in");
      navigate("/login");
    },
    onError: (error: Error) => handleError("Accept invite failed", error),
  });
};

const useCreateOrgInvite = () => {
  return useMutation({
    mutationFn: ({ orgId, data }: { orgId: string | number; data: CreateOrgInviteRequest }) =>
      createOrgInvite(orgId, data),
    onSuccess: () => handleSuccess("Invite sent", "User has been invited"),
    onError: (error: Error) => handleError("Create org invite failed", error),
  });
};

const useSignupOrganization = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: signupOrganization,
    onSuccess: () => {
      handleSuccess("Organization created", "Welcome aboard!");
      navigate("/dashboard");
    },
    onError: (error: Error) => handleError("Organization signup failed", error),
  });
};

export {
  useAcceptInvite,
  useCreateOrgInvite,
  useSignupOrganization,
};
