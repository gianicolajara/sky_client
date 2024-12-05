import { RegisterSchemaType } from "@/schemas/register";
import { registerService } from "@/services/register";
import { useMutation } from "@tanstack/react-query";

const useRegister = () => {
  const registerMutation = useMutation({
    mutationKey: ["register"],
    mutationFn: ({
      data,
      csrfToken,
    }: {
      data: RegisterSchemaType;
      csrfToken?: string;
    }) => registerService(data, csrfToken),
  });

  return {
    registerMutation,
  };
};

export default useRegister;
