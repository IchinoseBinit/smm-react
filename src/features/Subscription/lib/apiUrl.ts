const api = "/v1/api";

const API_URL = {
  ACCEPT_INVITE: () => `/api/auth/accept-invite`,

  CREATE_ORG_INVITE: (orgId: string | number) =>
    `/v1/api/orgs/${orgId}/invites`,

  GET_SUBSCRIPTION_PLANS: () => `${api}/subscription/plans/`,
  GET_SUBSCRIPTION_DETAIL: (subscriptionId: string) => `${api}/subscription/${subscriptionId}`,
  CREATE_SUBSCRIPTION: () => `${api}/subscription/`,
  UPDATE_SUBSCRIPTION: (subscriptionId: string) => `${api}/subscription/${subscriptionId}`,

};

export default API_URL;
