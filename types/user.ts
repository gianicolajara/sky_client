import { AxiosResponse } from "axios";
import { Follow } from "./follow";

export type User = {
  id: string;
  username: string;
  name: string;
  lastname: string;
  email: string;
  isPremium: boolean;
  avatar?: string;
  registrationDate?: string;
  following: Follow[];
  _count: { followers: number; following: number };
};

export type UserIdData = {
  id: string;
  username: string;
};

export type GetUserAxiosResponse = AxiosResponse<{ user: User }>;

export type GetUserIdByUsernameAxiosResponse = AxiosResponse<{
  data: UserIdData[];
}>;

export type GetUserByIdAxiosResponse = AxiosResponse<{ data: User }>;
