import { AxiosResponse } from "axios";

export type Like = {
  id: number;
  postId: number;
  userId: number;
};

export type LikePostAxiosResponse = AxiosResponse<{
  data: Like;
  message: string;
  method: string;
  _links: { path: string; self: string };
}>;
