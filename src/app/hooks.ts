import { useContext } from "react";
import { MainContext } from "./context";
import { User } from "firebase/auth";
import { getCurrentUser } from "../firebase/firebase";

export const useLoading = () => {
  const { loading, setLoading } = useContext(MainContext);

  const setLoadingState = (val: boolean) => {
    setLoading(val);
  };

  return {
    setLoadingState,
    loading,
  };
};

export const useAuth = () => {
  const user: User | null = getCurrentUser();

  return {
    user,
  };
};
