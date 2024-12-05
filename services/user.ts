import { axiosWithCredentialsInstance } from "@/lib/fetchUtility";
import {
  GetUserByIdAxiosResponse,
  GetUserIdByUsernameAxiosResponse,
} from "@/types/user";
import { AxiosError } from "axios";

export const getUserByIdService = async (id?: string) => {
  const res = await axiosWithCredentialsInstance().get(`/user/getByid/${id}`);

  if (res.statusText === "OK") return res as GetUserByIdAxiosResponse;
  else throw res.data as AxiosError<{ message: string }>;
};

export const getUserIdByUsernameService = async (username?: string) => {
  const res = await axiosWithCredentialsInstance().get(
    `/user/getUserIdByUsername/${username}`
  );

  if (res.statusText === "OK")
    return (res as GetUserIdByUsernameAxiosResponse).data.data;
  else throw res.data as AxiosError<{ message: string }>;
};
