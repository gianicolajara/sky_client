"use client";

import { PostMedia } from "@/types/postMedia";
import Image from "next/image";

type Props = {
  itemPostMedia: PostMedia;
};

const PostMediaItem = ({ itemPostMedia }: Props) => {
  return (
    <Image
      key={itemPostMedia.id}
      alt="Post image"
      src={`${process.env.NEXT_PUBLIC_API_URL_STATICS}uploads/posts/images/${itemPostMedia.path}`}
      width={300}
      height={300}
      unoptimized={true}
      loading="lazy"
      className="object-cover w-full h-full"
    />
  );
};

export default PostMediaItem;
