import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef, ReactNode } from "react";

type Props = {
  children: ReactNode;
} & ComponentPropsWithoutRef<"h5">;

export function TypographyH5({ children, className }: Props) {
  const classnames = cn(
    "scroll-m-20 text-base font-semibold tracking-tight",
    className
  );

  return <h5 className={classnames}>{children}</h5>;
}
