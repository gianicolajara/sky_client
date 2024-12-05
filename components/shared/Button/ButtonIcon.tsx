import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";
import Loading from "../Loading";

type Props = {
  Icon: React.ReactNode;
  isLoading?: boolean;
} & ButtonProps;

const ButtonIconLoading = ({ Icon, className, isLoading, ...props }: Props) => {
  const classesnames = cn(className);

  return (
    <Button className={classesnames} {...props} disabled={isLoading}>
      {isLoading ? <Loading /> : Icon}
    </Button>
  );
};

export default ButtonIconLoading;
