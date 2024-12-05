"use client";

import Loading from "@/components/shared/Loading";
import useCheckAuth from "@/hooks/useLogin/useCheckAuth";
import { User } from "@/types/user";
import { useRouter } from "nextjs-toploader/app";
import { createContext, useEffect } from "react";

type AuthContextProviderProps = {
  children: React.ReactNode;
};

type ProviderValue = {
  user: User | null;
};

const AuthContext = createContext<ProviderValue>({
  user: null,
});

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const {
    checkAuthQuery: { data: checkAuth, isError, error },
  } = useCheckAuth();

  const { replace: redirect } = useRouter();

  useEffect(() => {
    if (isError) {
      redirect("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError]);

  const value: ProviderValue = { user: checkAuth ?? null };
  return (
    <AuthContext.Provider value={value}>
      {checkAuth ? (
        children
      ) : (
        <div className="w-full h-screen flex justify-center items-center">
          <Loading />
        </div>
      )}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
export { AuthContext };
