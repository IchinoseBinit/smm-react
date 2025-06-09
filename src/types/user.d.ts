//registration
interface RegisterUserData {
  first_name: string;
  last_name: string;
  email: string;
  mobile: string;
  password: string;
}

type RegisterResponse = Omit<RegisterUserData, "password"> & {
  id: string;
};

interface LoginUserData {
  email: string;
  password: string;
}

type LoginResponse = {
  refresh: string;
  access: string;
};

type TokenError = {
  response: {
    data: {
      detail: string;
      code: string;
    };
  };
};
type otpSend = {
  email: string;
};
type changePsw = {
  email: string;
  otp: string;
  password: string;
};
export {
  RegisterResponse,
  RegisterUserData,
  LoginUserData,
  LoginResponse,
  TokenError,
  otpSend,
  changePsw,
};
