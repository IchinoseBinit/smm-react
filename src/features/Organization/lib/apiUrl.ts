const api = "/v1/api";

const API_URL = {
  ACCEPT_INVITE: () => `/api/auth/accept-invite`,

  CREATE_ORG_INVITE: (orgId: string | number) =>
    `/v1/api/orgs/${orgId}/invites`,
 

  SIGNUP_ORGANIZATION: () => `${api}/user/orgs/signup/`,
  Get_Roles: () => `${api}/user/roles/org/`,
  
  

};

export default API_URL;
