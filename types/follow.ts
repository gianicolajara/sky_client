import { AxiosResponse } from "axios";

export type Follow = {
  id: number;
  followerId: number;
  followingId: number;
};

export type FollowAxiosResponse = AxiosResponse<{
  data: Follow;
  message: string;
  method: string;
  _links: { path: string; self: string };
}>;
