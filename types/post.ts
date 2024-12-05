import { AxiosResponse } from "axios";
import { Like } from "./like";
import { PostMedia } from "./postMedia";
import { User } from "./user";

export type Post = {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
  title: string;
  postMedia: PostMedia[];
  author: User;
  likes: Like[];
  _count: { likes: number };
};

export type GetPostAxiosResponse = AxiosResponse<{
  data: {
    posts: Post[];
    nextPage: number;
  };
  message: string;
  method: string;
  _links: { path: string; self: string };
}>;
