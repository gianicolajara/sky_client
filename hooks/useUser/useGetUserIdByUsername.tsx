"use client";

import { getUserIdByUsernameService } from "@/services/user";
import { useMutation } from "@tanstack/react-query";

const useGetUserIdByUsername = () => {
  const getUserIdByUsername = useMutation({
    mutationKey: ["getUserIdByUsername"],
    mutationFn: (username: string) => getUserIdByUsernameService(username),
  });

  return {
    getUserIdByUsername,
  };
};

export default useGetUserIdByUsername;
