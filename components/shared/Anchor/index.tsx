import Link from "next/link";
import React from "react";
import { TypographySmall } from "../TypographySmall";

type Props = {
  children: React.ReactNode;
  href: string;
};
const Anchor = ({ children, href }: Props) => {
  return (
    <Link href={href}>
      <TypographySmall className="hover:text-blue-600 hover:underline transition-all">
        <span className="text-xs">{children}</span>
      </TypographySmall>
    </Link>
  );
};

export default Anchor;
