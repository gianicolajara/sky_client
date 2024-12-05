import { axiosWithCredentialsInstance } from "@/lib/fetchUtility";
import { RegisterSchemaType } from "@/schemas/register";
import { AxiosError } from "axios";

export const registerService = async (
  data: RegisterSchemaType,
  csrfToken?: string
) => {
  const res = await axiosWithCredentialsInstance(csrfToken).post(
    "/auth/register",
    {
      ...data,
    }
  );

  if (res.status === 201) {
    return res.data;
  }

  throw (res.data as AxiosError<{ message: string }>).response?.data;
};
