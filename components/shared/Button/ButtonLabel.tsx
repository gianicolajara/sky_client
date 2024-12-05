import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  children: React.ReactNode;
} & ButtonProps;

const ButtonLabel = ({ children, className, ...props }: Props) => {
  const classesnames = cn(
    "text-sm font-medium leading-none bg-transparent hover:bg-transparent hover:text-primary shadow-none hover:text-blue-400 text-black transition-all",
    className
  );

  return (
    <Button className={classesnames} {...props}>
      {children}
    </Button>
  );
};

export default ButtonLabel;
