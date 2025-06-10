import { createContext } from "react";

type AuthContextType = {
  user: null;
  isAuthenticated: boolean;
  recheckAuth: () => void;
};
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);
