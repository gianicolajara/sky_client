import { toast } from "react-toastify";

export const toastUtility = (theme: string = "dark") => {
  const success = (message: string) => {
    toast.success(message, { theme, position: "top-center" });
  };

  const error = (message: string) => {
    toast.error(message, { theme, position: "top-center" });
  };

  return {
    success,
    error,
  };
};
