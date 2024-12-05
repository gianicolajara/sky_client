import { axiosWithCredentialsInstance } from "@/lib/fetchUtility";
import { AxiosError } from "axios";

export const logoutService = async (csrfToken?: string) => {
  const res = await axiosWithCredentialsInstance(csrfToken).post(
    "/auth/logout"
  );

  if (res.statusText === "OK") return res.data;
  else throw res.data as AxiosError<{ message: string }>;
};
