import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef, ReactNode } from "react";

type Props = {
  children: ReactNode;
} & ComponentPropsWithoutRef<"h1">;

export function TypographyH1({ children, className }: Props) {
  const classnames = cn(
    "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
    className
  );
  return <h1 className={classnames}>{children}</h1>;
}
