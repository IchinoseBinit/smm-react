import { createContext } from "react";

type AuthContextType = {
  user: null;
  isAuthenticated: boolean;
};
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);
