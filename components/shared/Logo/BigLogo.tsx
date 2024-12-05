import { cn } from "@/lib/utils";
import { Cloud } from "lucide-react";
import { TypographyH1 } from "../TypographyH1";

type Props = {
  className?: string;
};

const BigLogo = ({ className }: Props) => {
  const classnames = cn(
    "flex flex-col gap-y-2 items-center lg:hidden",
    className
  );

  return (
    <div className={classnames}>
      <Cloud className="text-white animate-bounce" size="100" />
      <TypographyH1 className="text-white text-center">
        Welcome to Sky
      </TypographyH1>
    </div>
  );
};

export default BigLogo;
