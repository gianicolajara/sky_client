import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef, ReactNode } from "react";

type Props = {
  children: ReactNode;
} & ComponentPropsWithoutRef<"h3">;

const TypographyH3 = ({ children, className }: Props) => {
  const classnames = cn(
    "scroll-m-20 text-2xl font-semibold tracking-tight",
    className
  );

  return <h3 className={classnames}>{children}</h3>;
};

export default TypographyH3;
