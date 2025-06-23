import Cookies from "js-cookie";

const setAuthCookies = (
  access: string,
  refresh: string,
  getTokenExpiry: (token: string) => Date,
) => {
  const isProd = window.location.hostname !== "localhost";
  const access_exp = getTokenExpiry(access);
  const refresh_exp = getTokenExpiry(refresh);

  Cookies.set("access_token", access, {
    expires: access_exp,
    secure: isProd,
    sameSite: isProd ? "None" : "Lax",
  });
  Cookies.set("refresh_token", refresh, {
    expires: refresh_exp,
    secure: isProd,
    sameSite: isProd ? "None" : "Lax",
  });
};

export { setAuthCookies };
