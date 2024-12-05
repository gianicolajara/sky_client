"use client";

import ButtonIconLoading from "@/components/shared/Button/ButtonIcon";
import { TypographyH4 } from "@/components/shared/TypographyH4";
import TypographyP from "@/components/shared/TypographyP";
import { TypographySmall } from "@/components/shared/TypographySmall";
import { AuthContext } from "@/contexts/Auth";
import { formatDate } from "@/helpers/dates";
import useLikePost from "@/hooks/likePost";
import useCsrf from "@/hooks/useCsrf";
import { cn } from "@/lib/utils";
import { Post } from "@/types/post";
import { Heart } from "lucide-react";
import Link from "next/link";
import { useContext } from "react";
import AvatarProfile from "../AvatarProfile";
import TypographyH3 from "../TypographyH3";
import TypographyMuted from "../TypographyMuted";
import PostMediaList from "./PostMediaList";

const PostItem = ({ post, idUser }: { post: Post; idUser?: string }) => {
  const { user } = useContext(AuthContext);

  const classnames = cn(
    {
      "grid-cols-1 grid-rows-1": post.postMedia.length === 1,
      "grid-cols-2 grid-rows-1": post.postMedia.length === 2,
      "grid-cols-2 grid-rows-2": post.postMedia.length >= 3,
    },
    "grid w-full gap-2 rounded-lg h-full max-h-[500px]"
  );

  const {
    getCsrfToken: { mutateAsync: getCsrfToken },
  } = useCsrf();

  const {
    likePost: { mutate: like, isPending: isLikePending },
    unlikePost: { mutate: unLike, isPending: isUnLikePending },
  } = useLikePost({ idUser });

  const handleOnLike = async () => {
    const token = await getCsrfToken();
    if (post.likes.length > 0) {
      unLike({ authorId: user?.id ?? "", postId: post.id, token });
    } else {
      like({ authorId: user?.id ?? "", postId: post.id, token });
    }
  };

  return (
    <article key={post.id} className="w-full h-max border-2 p-4 rounded-lg">
      <div className="w-full h-full flex flex-col gap-y-2">
        <Link href={`/profile/${post.author?.id}`}>
          <div className="flex gap-x-2">
            <AvatarProfile user={post.author} />

            <div className="flex flex-col gap-y-1">
              <TypographyH4>
                {post.author?.name} {post.author?.lastname}
              </TypographyH4>
              <TypographySmall>@{post.author?.username}</TypographySmall>
            </div>
          </div>
        </Link>
        <TypographyH3>{post.title}</TypographyH3>
        <TypographyP>{post.content}</TypographyP>
        <PostMediaList postsMedia={post.postMedia} className={classnames} />
        <TypographyMuted>
          Created {formatDate(new Date(post.createdAt))}
        </TypographyMuted>
        <div className="w-full flex gap-x-2 justify-end">
          <div className="flex gap-x-1 items-center">
            <ButtonIconLoading
              variant="ghost"
              onClick={handleOnLike}
              isLoading={isLikePending || isUnLikePending}
              Icon={<Heart color={post.likes.length > 0 ? "red" : undefined} />}
            />
            {post._count.likes}
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostItem;
