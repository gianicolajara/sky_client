import { axiosWithCredentialsInstance } from "@/lib/fetchUtility";
import { UpdateSchemaType } from "@/schemas/update";
import { AxiosError } from "axios";

export const updateService = async (
  data: UpdateSchemaType,
  id: string,
  csrfToken?: string
) => {
  const res = await axiosWithCredentialsInstance(csrfToken).put(
    `user/update/${id}`,
    {
      ...data,
    }
  );

  if (res.status === 200) {
    return res.data;
  }

  throw (res.data as AxiosError<{ message: string }>).response?.data;
};
