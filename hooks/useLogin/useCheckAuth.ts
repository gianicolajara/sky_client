import { checkAuthService } from "@/services/login";
import { useQuery } from "@tanstack/react-query";

const useCheckAuth = () => {
  const checkAuthQuery = useQuery({
    queryKey: ["checkAuth"],
    queryFn: () => checkAuthService(),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
    select(data) {
      return data.data.user;
    },
  });

  return {
    checkAuthQuery,
  };
};

export default useCheckAuth;
