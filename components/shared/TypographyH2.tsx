import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef, ReactNode } from "react";

type Props = {
  children: ReactNode;
} & ComponentPropsWithoutRef<"h2">;

export function TypographyH2({ children, className }: Props) {
  const classnames = cn(
    "scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0",
    className
  );

  return <h2 className={classnames}>{children}</h2>;
}
