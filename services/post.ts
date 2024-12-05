import {
  axiosWithCredentialsFormDataInstance,
  axiosWithCredentialsInstance,
} from "@/lib/fetchUtility";
import { GetPostAxiosResponse } from "@/types/post";
import { AxiosError } from "axios";

export const getPostByFollowingService = async (
  limit: number = 5,
  page: number
) => {
  const res = await axiosWithCredentialsInstance().get(
    `post/getByUserFollowed`,
    {
      params: {
        limit,
        page,
      },
    }
  );

  if (res.statusText === "OK") return (res as GetPostAxiosResponse).data.data;
  else throw res.data as AxiosError<{ message: string }>;
};

export const getPostByUserService = async (
  limit: number = 5,
  page: number,
  id?: string
) => {
  const res = await axiosWithCredentialsInstance().get(`post/getByUser/${id}`, {
    params: {
      limit,
      page,
    },
  });

  if (res.statusText === "OK") return (res as GetPostAxiosResponse).data.data;
  else throw res.data as AxiosError<{ message: string }>;
};

export const createPostService = async (formData: FormData, token?: string) => {
  const res = await axiosWithCredentialsFormDataInstance(token).post(
    `/post`,
    formData
  );

  if (res.status === 201) return (res as GetPostAxiosResponse).data.data;
  else throw res.data as AxiosError<{ message: string }>;
};
