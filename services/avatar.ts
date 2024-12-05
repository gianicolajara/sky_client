import { axiosWithCredentialsFormDataInstance } from "@/lib/fetchUtility";
import { AxiosError } from "axios";

export const updateAvatarService = async (
  data: FormData,
  id?: string,
  csrfToken?: string
) => {
  const res = await axiosWithCredentialsFormDataInstance(csrfToken).put(
    `/user/changeAvatar/${id}`,
    data
  );

  if (res.statusText === "OK") return res;
  else throw res.data as AxiosError<{ message: string }>;
};
