// src/lib/apiRoutes.ts
const api = "/v1/api";
const thirdPartyApi = "/v1";
export const API_ROUTES = {
  AUTH: {
    REGISTER: `${api}/user/register/`,
    LOGIN: `${api}/user/login/`,
    REFRESH_TOKEN: `${api}/user/refresh/`,
    SEND_OTP: `${api}/user/auth/password-reset/`,
    UPDATE_PSW: `${api}/user/auth/confirm-password/`,
  },
  USER: {
    LIST: `${api}/user/user-list/`,
  },
  CONNECT_ACC: {
    ALL_Conn_ACC: `${thirdPartyApi}/auth/social/connected-accounts/`,
    DELETE_Conn_ACC: `${thirdPartyApi}/auth/social/connected-accounts/`,
    FACEBOOK: {
      URL: `/v1/auth/social/facebook/login/`,
      PAGES: `${thirdPartyApi}/auth/social/facebook/pages/user/`,
    },
    TIKTOK: {
      URL: `/v1/auth/social/tiktok/login/`,
    },
    YOUTUBE: {
      URL: `/v1/auth/social/youtube/login/`,
    },
  },
};
