import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { User } from "@/types/user";

type Props = {
  size?: "sm" | "md" | "lg";
  user: User | null;
};

const AvatarProfile = ({ user, size = "sm" }: Props) => {
  const classnames = cn({
    "w-10 h-10": size === "sm",
    "w-24 h-24": size === "md",
    "w-48 h-48": size === "lg",
  });

  return (
    <Avatar className={classnames}>
      <AvatarImage
        crossOrigin="anonymous"
        src={
          user?.avatar
            ? `${process.env.NEXT_PUBLIC_API_URL_STATICS}/${user?.avatar}`
            : undefined
        }
        alt="Profile avatar image of user"
      />
      <AvatarFallback>
        {user?.name.at(0)}
        {user?.lastname.at(0)}
      </AvatarFallback>
    </Avatar>
  );
};

export default AvatarProfile;
