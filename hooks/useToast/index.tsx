"use client";

import { toastUtility } from "@/helpers/toast";
import { useTheme } from "next-themes";

const useToast = () => {
  const { theme } = useTheme();

  return toastUtility(theme);
};

export default useToast;
