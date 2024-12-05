import axios from "axios";

/**
 * Create an instance of axios without setting withCredentials to true.
 * This is used for endpoints that do not require authentication.
 *
 * @returns {AxiosInstance}
 */
export const axiosWithoutCredentialInstance = () => {
  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return axiosInstance;
};

/**
 * Create an instance of axios with withCredentials set to true and the
 * appropriate CSRF token header.
 *
 * @param {string} [csrfToken] - The CSRF token to include in the headers.
 * @returns {AxiosInstance}
 */
export const axiosWithCredentialsInstance = (csrfToken?: string) => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (csrfToken) {
    headers["x-csrf-token"] = csrfToken;
  }

  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
    headers: headers,
  });

  if (csrfToken) {
    axiosInstance.defaults.headers["x-csrf-token"] = csrfToken;
  }

  return axiosInstance;
};

/**
 * Create an instance of axios with withCredentials set to true and the
 * appropriate CSRF token header, specifically for handling multipart/form-data
 * requests.
 *
 * @param {string} [csrfToken] - The CSRF token to include in the headers.
 * @returns {AxiosInstance} - An Axios instance configured for multipart/form-data
 *                            requests with CSRF protection.
 */
export const axiosWithCredentialsFormDataInstance = (csrfToken?: string) => {
  const headers: Record<string, string> = {
    "Content-Type": "multipart/form-data",
  };

  if (csrfToken) {
    headers["x-csrf-token"] = csrfToken;
  }

  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
    headers: headers,
  });

  if (csrfToken) {
    axiosInstance.defaults.headers["x-csrf-token"] = csrfToken;
  }

  return axiosInstance;
};
