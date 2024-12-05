import axios from "axios";

export const axiosWithoutCredentialInstance = () => {
  const axiosInstance = axios.create({
    baseURL: process.env.API_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return axiosInstance;
};

export const axiosWithCredentialsInstance = (csrfToken?: string) => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (csrfToken) {
    headers["x-csrf-token"] = csrfToken;
  }

  const axiosInstance = axios.create({
    baseURL: process.env.API_URL,
    withCredentials: true,
    headers: headers,
  });

  if (csrfToken) {
    axiosInstance.defaults.headers["x-csrf-token"] = csrfToken;
  }

  return axiosInstance;
};

export const axiosWithCredentialsFormDataInstance = (csrfToken?: string) => {
  const headers: Record<string, string> = {
    "Content-Type": "multipart/form-data",
  };

  if (csrfToken) {
    headers["x-csrf-token"] = csrfToken;
  }

  const axiosInstance = axios.create({
    baseURL: process.env.API_URL,
    withCredentials: true,
    headers: headers,
  });

  if (csrfToken) {
    axiosInstance.defaults.headers["x-csrf-token"] = csrfToken;
  }

  return axiosInstance;
};
