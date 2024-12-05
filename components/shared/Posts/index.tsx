"use client";

import { Post } from "@/types/post";
import { InfiniteData } from "@tanstack/react-query";
import { memo, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Loading from "../../shared/Loading";
import { TypographySmall } from "../../shared/TypographySmall";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import PostListContent from "./PostListContent";

type Props = {
  postsData:
    | InfiniteData<
        {
          posts: Post[];
          nextPage: number;
        },
        unknown
      >
    | undefined;

  fetchNextPage: () => void;
  hasNextPage: boolean;
  isLoading: boolean;
  idUser?: string;
};

const Posts = ({
  postsData,
  fetchNextPage,
  hasNextPage,
  isLoading,
  idUser,
}: Props) => {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <div className="w-full h-full overflow-y-auto scrollbar-thin border-2 rounded-lg">
      <Card className="w-full h-full border-0">
        <CardHeader>
          <CardTitle>Posts</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-y-4">
          <PostListContent postsData={postsData} idUser={idUser} />
        </CardContent>
        <CardFooter>
          {isLoading && <Loading />}

          {postsData && postsData.pages.length > 0 && (
            <div ref={ref}>{isLoading && <Loading />}</div>
          )}

          {!isLoading && !hasNextPage && (
            <TypographySmall>No more posts</TypographySmall>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default memo(
  Posts,
  (prev, next) =>
    prev.idUser !== next.idUser &&
    prev.postsData?.pages.length !== next.postsData?.pages.length
);
