"use client";

import { Post } from "@/types/post";
import { InfiniteData } from "@tanstack/react-query";
import PostItem from "./PostItem";

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
  idUser?: string;
};

const PostListContent = ({ postsData, idUser }: Props) => {
  return (
    <>
      {postsData?.pages.map((groupPost) => {
        const posts = groupPost.posts;

        return posts.map((post) => (
          <PostItem key={post.id} idUser={idUser} post={post} />
        ));
      })}
    </>
  );
};

export default PostListContent;
