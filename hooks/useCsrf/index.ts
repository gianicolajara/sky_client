import { getCsrfTokenService } from "@/services/csrfToken";
import { useMutation } from "@tanstack/react-query";

const useCsrf = () => {
  const getCsrfToken = useMutation({
    mutationKey: ["csrfToken"],
    mutationFn: () => getCsrfTokenService(),
  });

  return {
    getCsrfToken,
  };
};

export default useCsrf;
