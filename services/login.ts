import { axiosWithCredentialsInstance } from "@/lib/fetchUtility";
import { GetUserAxiosResponse } from "@/types/user";
import { AxiosError } from "axios";

export const loginService = async (
  email: string,
  password: string,
  csrfToken?: string
) => {
  const res = await axiosWithCredentialsInstance(csrfToken).post("auth/login", {
    email,
    password,
  });

  if (res.status === 200) return res.data;
  else throw res.data as AxiosError<{ message: string }>;
};

export const checkAuthService = async () => {
  const res = await axiosWithCredentialsInstance().get("auth/checkAuth");

  if (res.status === 200) return res.data as GetUserAxiosResponse;
  else throw res.data as AxiosError<{ message: string }>;
};
