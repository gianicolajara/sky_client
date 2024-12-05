"use client";

import { AuthContext } from "@/contexts/Auth";
import { formatDate } from "@/helpers/dates";
import useCsrf from "@/hooks/useCsrf";
import useFollow from "@/hooks/useFollow";
import { usePostsUser } from "@/hooks/usePosts/usePostsUser";
import useToast from "@/hooks/useToast";
import useUser from "@/hooks/useUser";
import { useContext } from "react";
import AvatarProfile from "../shared/AvatarProfile";
import ButtonLink from "../shared/Button/ButtonLink";
import ButtonLoading from "../shared/Button/ButtonLoading";
import Loading from "../shared/Loading";
import Posts from "../shared/Posts";
import TypographyH3 from "../shared/TypographyH3";
import TypographyMuted from "../shared/TypographyMuted";
import TypographyP from "../shared/TypographyP";
import EditProfile from "./modals/EditProfile";

const Profile = ({ id }: { id?: string }) => {
  const { error: errorToast } = useToast();
  const { user: currentUser } = useContext(AuthContext);

  const {
    getUserQuery: { data: userData, isLoading: isLoadingUser },
  } = useUser(id);

  const {
    getPostsByUser: { data: postsData, fetchNextPage, isLoading, hasNextPage },
  } = usePostsUser(5, id);

  const {
    getCsrfToken: { mutateAsync: getCsrfToken },
  } = useCsrf();

  const {
    followMutation: { mutate: follow, isPending: isLoadingFollow },
    unfollowMutation: { mutate: unfollow, isPending: isLoadingUnfollow },
  } = useFollow();

  const handleFollow = async () => {
    try {
      const token = await getCsrfToken();
      follow({
        followedId: id as string,
        followerId: currentUser?.id as string,
        csrfToken: token,
      });
    } catch {
      errorToast("Error following user");
    }
  };

  const handleUnFollow = async () => {
    try {
      const token = await getCsrfToken();
      unfollow({
        followedId: id as string,
        followerId: currentUser?.id as string,
        csrfToken: token,
      });
    } catch {
      errorToast("Error unfollowing user");
    }
  };

  if (isLoadingUser || !userData)
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Loading />
      </div>
    );

  return (
    <section className="w-full h-screen">
      <div className="h-screen max-w-[1200px] mx-auto px-2">
        <div className="grid grid-cols-1 grid-rows-[auto,_1fr] gap-y-4 w-full h-screen py-4">
          <div className="w-full h-full border-2 rounded-lg flex flex-col justify-center items-center gap-y-2 p-4 relative">
            <div className="flex gap-x-2 absolute top-2 left-2 items-center">
              <ButtonLink url="/home">Go Back</ButtonLink>
            </div>
            <AvatarProfile user={userData} size="md" />
            <div className="flex flex-col justify-center items-center">
              <TypographyH3>
                {userData?.name} {userData?.lastname}
              </TypographyH3>
              <TypographyP>@{userData?.username}</TypographyP>
              <TypographyMuted>
                Created at{" "}
                {formatDate(new Date(userData?.registrationDate as string))}
              </TypographyMuted>
            </div>
            <div className="flex gap-x-2">
              <TypographyP>
                Following: {userData?._count.followers ?? 0}
              </TypographyP>
              |
              <TypographyP>
                Followers: {userData?._count.following ?? 0}
              </TypographyP>
            </div>
            {currentUser?.id !== id && userData.following.length === 0 && (
              <ButtonLoading onClick={handleFollow} isLoading={isLoadingFollow}>
                Follow
              </ButtonLoading>
            )}
            {currentUser?.id !== id && userData.following.length > 0 && (
              <ButtonLoading
                onClick={handleUnFollow}
                isLoading={isLoadingUnfollow}
              >
                UnFollow
              </ButtonLoading>
            )}
            {currentUser?.id === id && <EditProfile />}
          </div>
          <Posts
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isLoading={isLoading}
            postsData={postsData}
            idUser={id}
          />
        </div>
      </div>
    </section>
  );
};

export default Profile;
