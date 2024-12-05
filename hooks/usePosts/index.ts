import { getPostByFollowingService } from "@/services/post";
import { useInfiniteQuery } from "@tanstack/react-query";

export const usePosts = (limit: number) => {
  const getPostsByFollowing = useInfiniteQuery({
    queryKey: ["getPostsByFollowing"],
    queryFn: ({ pageParam }) => getPostByFollowingService(limit, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  return {
    getPostsByFollowing,
  };
};
