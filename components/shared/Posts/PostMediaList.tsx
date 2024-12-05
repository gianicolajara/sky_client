"use client";

import { PostMedia } from "@/types/postMedia";
import PostMediaItem from "./PostMediaItem";

type Props = {
  postsMedia: PostMedia[];
  className?: string;
};

const PostMediaList = ({ postsMedia, className }: Props) => {
  return (
    <div className={className}>
      {postsMedia.map((itemPostMedia) => (
        <PostMediaItem key={itemPostMedia.id} itemPostMedia={itemPostMedia} />
      ))}
    </div>
  );
};

export default PostMediaList;
