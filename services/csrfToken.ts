import { axiosWithCredentialsInstance } from "@/lib/fetchUtility";

export const getCsrfTokenService = async () => {
  const res = await axiosWithCredentialsInstance().get("auth/csrfToken");
  if (res.status === 200) return res.data.csrfToken;
  else throw new Error(res.data.message);
};
