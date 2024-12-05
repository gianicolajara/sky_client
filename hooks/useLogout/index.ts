"use client";

import { logoutService } from "@/services/logout";
import { useMutation } from "@tanstack/react-query";
import useToast from "../useToast";

const useLogout = () => {
  const { error: errorToast } = useToast();

  const logoutMutate = useMutation({
    mutationKey: ["logout"],
    mutationFn: (csrfToken?: string) => logoutService(csrfToken),
    onError: () => {
      errorToast("Error logging out");
    },
  });

  return {
    logoutMutate,
  };
};

export default useLogout;
