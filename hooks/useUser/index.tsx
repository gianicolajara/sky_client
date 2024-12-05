"use client";

import { getUserByIdService } from "@/services/user";
import { useQuery } from "@tanstack/react-query";

const useUser = (id?: string) => {
  const getUserQuery = useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserByIdService(id),
    enabled: !!id,
    staleTime: 0,
    select(res) {
      return res.data.data;
    },
  });

  return {
    getUserQuery,
  };
};

export default useUser;
