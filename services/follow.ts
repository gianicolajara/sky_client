import { axiosWithCredentialsInstance } from "@/lib/fetchUtility";
import { FollowAxiosResponse } from "@/types/follow";
import { AxiosError } from "axios";

export const followService = async (
  followedId: string,
  followerId: string,
  csrfToken?: string
) => {
  const res = await axiosWithCredentialsInstance(csrfToken).post(
    `follow/${followedId}/${followerId}`
  );

  if (res.status === 201) return (res as FollowAxiosResponse).data.data;
  else throw res.data as AxiosError<{ message: string }>;
};

export const unfollowService = async (
  followedId: string,
  followerId: string,
  csrfToken?: string
) => {
  const res = await axiosWithCredentialsInstance(csrfToken).delete(
    `follow/${followedId}/${followerId}`
  );

  if (res.status === 200) return (res as FollowAxiosResponse).data.data;
  else throw res.data as AxiosError<{ message: string }>;
};
