import { toast } from "react-toastify";

/**
 * Utility for displaying toast notifications with specified theme and position.
 *
 * @param {string} theme - The theme of the toast notifications, default is "dark".
 * @returns {Object} An object containing two methods:
 *  - success: Function to display a success toast with a given message.
 *  - error: Function to display an error toast with a given message.
 */
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
