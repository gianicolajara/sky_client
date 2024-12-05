import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef, ReactNode } from "react";

type Props = {
  children: ReactNode;
} & ComponentPropsWithoutRef<"h4">;

export function TypographyH4({ children, className }: Props) {
  const classnames = cn(
    "scroll-m-20 text-xl font-semibold tracking-tight",
    className
  );

  return <h4 className={classnames}>{children}</h4>;
}
