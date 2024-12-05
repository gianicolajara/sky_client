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
      src={`${process.env.API_URL_STATICS}/uploads/posts/images/${itemPostMedia.path}`}
      width={300}
      height={300}
      loading="lazy"
      className="object-cover w-full h-full"
    />
  );
};

export default PostMediaItem;
