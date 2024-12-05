import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React from "react";
import Loading from "../Loading";

type Props = {
  children: React.ReactNode;
  isLoading?: boolean;
  url: string;
} & ButtonProps;

const ButtonLink = ({ children, className, isLoading, ...props }: Props) => {
  const classesnames = cn(className);

  const router = useRouter();

  const handleClick = () => {
    router.push(props.url);
  };

  return (
    <Button
      className={classesnames}
      {...props}
      onClick={handleClick}
      disabled={isLoading}
    >
      {isLoading ? <Loading /> : children}
    </Button>
  );
};

export default ButtonLink;
