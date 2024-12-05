import { axiosWithCredentialsInstance } from "@/lib/fetchUtility";
import { LikePostAxiosResponse } from "@/types/like";
import { AxiosError } from "axios";

export const likePostService = async (
  authorId: string,
  postId: string,
  csrfToken?: string
) => {
  const res = await axiosWithCredentialsInstance(csrfToken).post(
    `likePost/like/${authorId}/${postId}`
  );

  if (res.status === 201) return (res as LikePostAxiosResponse).data.data;
  else throw res.data as AxiosError<{ message: string }>;
};

export const unlikePostService = async (
  authorId: string,
  postId: string,
  csrfToken?: string
) => {
  const res = await axiosWithCredentialsInstance(csrfToken).delete(
    `likePost/unlike/${authorId}/${postId}`
  );

  if (res.status === 200) return (res as LikePostAxiosResponse).data.data;
  else throw res.data as AxiosError<{ message: string }>;
};
