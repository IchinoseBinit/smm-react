const api = "/v1/api";

const API_URL = {
  ACCEPT_INVITE: () => `${api}/user/auth/accept-invite`,

  CREATE_ORG_INVITE: (orgId: string | number) =>
    `/v1/api/user/orgs/${orgId}/invites`,
 

  SIGNUP_ORGANIZATION: () => `${api}/user/orgs/signup/`,
  Get_Roles: () => `${api}/user/roles/org/`,
  
  GET_USER_OF_ORGANIZATION: (org_id :string , user_id:string)=>`${api}/user/org-users/?org_id=${org_id}&user_id=${user_id}`,
  

};

export default API_URL;
