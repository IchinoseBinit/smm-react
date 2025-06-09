// src/lib/apiRoutes.ts
const api = "/v1/api";
export const API_ROUTES = {
  AUTH: {
    REGISTER: `${api}/user/register/`,
    LOGIN: `${api}/user/login/`,
    REFRESH_TOKEN: `${api}/v1/api/user/refresh/`,
    SEND_OTP: `${api}/user/auth/password-reset/`,
    UPDATE_PSW: `${api}/user/auth/confirm-password/`,
  },
};
