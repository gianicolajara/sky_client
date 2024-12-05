"use client";

import { AuthContext } from "@/contexts/Auth";
import useCsrf from "@/hooks/useCsrf";
import useLogout from "@/hooks/useLogout";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "nextjs-toploader/app";
import { useContext } from "react";
import AvatarProfile from "../shared/AvatarProfile";
import ButtonLink from "../shared/Button/ButtonLink";
import ButtonLoading from "../shared/Button/ButtonLoading";
import { DarkMode } from "../shared/DarkMode";
import { TypographyH4 } from "../shared/TypographyH4";
import TypographyP from "../shared/TypographyP";
import { TypographySmall } from "../shared/TypographySmall";
import { Card, CardContent, CardHeader } from "../ui/card";
import SearchHome from "./Search";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const client = useQueryClient();

  const {
    getCsrfToken: { mutateAsync: getCsrfToken, isPending: isCsrfPending },
  } = useCsrf();
  const {
    logoutMutate: { mutate: logout, isPending: isLogoutPending },
  } = useLogout();

  const handleLogout = async () => {
    const token = await getCsrfToken();
    logout(token, {
      onSuccess: () => {
        client.clear();
        router.replace("/login");
      },
    });
  };

  return (
    <div className="w-full h-full flex flex-col gap-y-4 ">
      <Card className="w-full h-max">
        <CardHeader>
          <Link href={`/profile/${user?.id}`}>
            <div className="flex gap-x-2">
              <AvatarProfile user={user} />
              <div className="flex flex-col gap-y-1">
                <TypographyH4>
                  {user?.name} {user?.lastname}
                </TypographyH4>
                <TypographySmall>@{user?.username}</TypographySmall>
              </div>
            </div>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="w-full h-full flex flex-col gap-y-2">
            <div className="flex gap-x-2">
              <TypographyP>
                Following: {user?._count.followers ?? 0}
              </TypographyP>
              <TypographyP>
                Followers: {user?._count.following ?? 0}
              </TypographyP>
            </div>
          </div>
          <div className="self-end flex flex-col gap-y-2 justify-center ">
            <ButtonLink url={`/profile/${user?.id}`}>Profile</ButtonLink>
            <ButtonLoading
              isLoading={isLogoutPending || isCsrfPending}
              onClick={handleLogout}
            >
              Logout
            </ButtonLoading>
            <div className="flex justify-center lg:justify-end">
              <DarkMode />
            </div>
            <div className="block lg:hidden">
              <SearchHome />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
