import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef, ReactNode } from "react";

type Props = {
  children: ReactNode;
} & ComponentPropsWithoutRef<"p">;

const TypographyP = ({ children, className }: Props) => {
  const classnames = cn("leading-7", className);

  return <p className={classnames}>{children}</p>;
};

export default TypographyP;
