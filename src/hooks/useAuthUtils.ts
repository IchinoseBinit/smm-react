import { useNavigate } from "react-router";
import { useAuthContext } from "./useAuthContext";

export const useAuthUtils = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const userId = user?.user_id ?? "";
  return { userId, navigate, user };
};
