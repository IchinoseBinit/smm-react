import { createContext } from "react";

type AuthContextType = {
  user: null;
  isAuthenticated: boolean;
  recheckAuth: () => void;
  isLoading: boolean;
};
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);
