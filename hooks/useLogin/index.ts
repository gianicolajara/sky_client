import { loginService } from "@/services/login";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import useToast from "../useToast";

const useLogin = () => {
  const { success: successToast, error: errorToast } = useToast();

  const loginMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: ({
      email,
      password,
      token,
    }: {
      email: string;
      password: string;
      token?: string;
    }) => loginService(email, password, token),
    onError(error: AxiosError<{ message: string }>) {
      errorToast(error.response?.data.message ?? "Login error");
    },
    onSuccess(data) {
      successToast(data.message);
    },
  });

  return {
    loginMutation,
  };
};

export default useLogin;
