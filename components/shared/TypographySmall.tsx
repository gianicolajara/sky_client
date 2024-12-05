import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef, ReactNode } from "react";

type Props = {
  children: ReactNode;
} & ComponentPropsWithoutRef<"small">;

export function TypographySmall({ children, className }: Props) {
  const classnames = cn("text-sm font-medium leading-none", className);

  return <small className={classnames}>{children}</small>;
}
